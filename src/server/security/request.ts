import "server-only";

import { SITE_URL } from "@/lib/site";
import { isIP } from "node:net";

const TRUSTED_ORIGIN = new URL(SITE_URL).origin;
const TRUSTED_ORIGINS = new Set([
  TRUSTED_ORIGIN,
  "https://tushardevx01.tech",
  "https://www.tushardevx01.tech",
]);

type RequestLike = {
  headers: Headers;
  ip?: string | null;
};

function normalizeClientIp(value: string | null | undefined): string | null {
  if (!value) return null;
  const candidate = value.split(",")[0]?.trim();
  if (!candidate) return null;
  if (!isIP(candidate)) return null;
  return candidate;
}

function shouldTrustForwardedHeaders(): boolean {
  return (
    process.env.VERCEL === "1" ||
    process.env.TRUST_PROXY_HEADERS === "true" ||
    Boolean(process.env.CF_PAGES)
  );
}

function firstHeaderValue(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const candidate = value.split(",")[0]?.trim();
  return candidate ? candidate : null;
}

function isLocalhostHost(host: string): boolean {
  return (
    /^localhost(?::\d+)?$/i.test(host) ||
    /^127\.0\.0\.1(?::\d+)?$/.test(host) ||
    /^\[::1\](?::\d+)?$/.test(host)
  );
}

function resolveRequestOrigin(headers: Headers): string | null {
  const host = shouldTrustForwardedHeaders()
    ? firstHeaderValue(headers.get("x-forwarded-host")) ?? firstHeaderValue(headers.get("host"))
    : firstHeaderValue(headers.get("host"));

  if (!host) {
    return null;
  }

  const forwardedProto = shouldTrustForwardedHeaders() ? firstHeaderValue(headers.get("x-forwarded-proto")) : null;
  const protocol = forwardedProto === "http" || forwardedProto === "https" ? forwardedProto : isLocalhostHost(host) ? "http" : "https";

  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return null;
  }
}

function extractForwardedClientIp(headers: Headers): string | null {
  // Only trust headers that the configured ingress overwrites. Storage account
  // credentials do not imply that requests passed through Cloudflare.
  if (process.env.VERCEL === "1") {
    return normalizeClientIp(headers.get("x-vercel-forwarded-for")) ??
      normalizeClientIp(headers.get("x-forwarded-for"));
  }
  if (process.env.CF_PAGES) {
    return normalizeClientIp(headers.get("cf-connecting-ip"));
  }
  const headerCandidates = [
    headers.get("x-forwarded-for"),
  ];

  for (const value of headerCandidates) {
    const ip = normalizeClientIp(value);
    if (ip) return ip;
  }

  return null;
}

export function isTrustedOrigin(headers: Headers): boolean {
  const originHeader = headers.get("origin") ?? headers.get("referer");
  if (!originHeader) {
    return false;
  }

  let originToTest: string;
  try {
    originToTest = new URL(originHeader).origin;
  } catch {
    return false;
  }

  if (TRUSTED_ORIGINS.has(originToTest)) {
    return true;
  }

  const requestOrigin = resolveRequestOrigin(headers);
  if (process.env.NODE_ENV !== "production" && requestOrigin &&
      isLocalhostHost(new URL(requestOrigin).host) && originToTest === requestOrigin) {
    return true;
  }

  // Vercel preview hostnames are deployment configuration, never client headers.
  if (process.env.VERCEL === "1" && process.env.VERCEL_URL &&
      originToTest === `https://${process.env.VERCEL_URL}`) return true;

  return false;
}

export function extractClientIdentifier(request: RequestLike): string {
  const directIp = normalizeClientIp(request.ip);
  if (directIp) {
    return directIp;
  }

  if (shouldTrustForwardedHeaders()) {
    const forwardedIp = extractForwardedClientIp(request.headers);
    if (forwardedIp) return forwardedIp;
  }

  // A shared fallback cannot be bypassed by rotating User-Agent/language headers.
  return "unknown";
}
