import { SITE_URL } from "@/lib/site";

const TRUSTED_ORIGIN = new URL(SITE_URL).origin;

type RequestLike = {
  headers: Headers;
  ip?: string | null;
};

function normalizeClientIp(value: string | null | undefined): string | null {
  if (!value) return null;
  const candidate = value.split(",")[0]?.trim();
  if (!candidate) return null;
  if (candidate.length > 64) return null;
  return candidate;
}

function shouldTrustForwardedHeaders(): boolean {
  return process.env.VERCEL === "1" || process.env.TRUST_PROXY_HEADERS === "true";
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
  const headerCandidates = [
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-forwarded-for"),
    headers.get("cf-connecting-ip"),
    headers.get("x-real-ip"),
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

  const requestOrigin = resolveRequestOrigin(headers);
  if (requestOrigin) {
    try {
      return new URL(originHeader).origin === requestOrigin || new URL(originHeader).origin === TRUSTED_ORIGIN;
    } catch {
      return false;
    }
  }

  try {
    return new URL(originHeader).origin === TRUSTED_ORIGIN;
  } catch {
    return false;
  }
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

  return "unknown";
}