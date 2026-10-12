import { afterEach, describe, expect, it, vi } from "vitest";

import { getCorsHeaders } from "@/lib/security/corsHeaders";
import {
  generateCsrfToken as generateServerCsrfToken,
  readCsrfTokenFromCookieString,
  validateCsrfToken,
} from "@/server/security/csrf.server";
import { generateCsrfToken as generateEdgeCsrfToken } from "@/lib/security/csrf.edge";
import { getCsrfCookieName } from "@/lib/security/csrf.client";
import { extractClientIdentifier, isTrustedOrigin } from "@/server/security/request";
import { logger } from "@/lib/logger";

describe("security helpers", () => {
  it.each([null, 42, {}, [], "short"])("rejects malformed CSRF tokens: %j", (token) => {
    expect(validateCsrfToken(token, token)).toBe(false);
  });

  it("does not allow a forged Host header to authorize a production origin", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(
      isTrustedOrigin(new Headers({ origin: "https://evil.example", host: "evil.example" }))
    ).toBe(false);
  });

  it("ignores attacker-controlled Cloudflare headers on Vercel", () => {
    vi.stubEnv("VERCEL", "1");
    const headers = new Headers({
      "cf-connecting-ip": "1.1.1.1",
      "x-vercel-forwarded-for": "8.8.8.8",
    });
    expect(extractClientIdentifier({ headers })).toBe("8.8.8.8");
  });

  it("cannot rotate the fallback identity using User-Agent", () => {
    vi.stubEnv("VERCEL", "");
    vi.stubEnv("CF_PAGES", "");
    vi.stubEnv("TRUST_PROXY_HEADERS", "");
    const first = extractClientIdentifier({ headers: new Headers({ "user-agent": "first" }) });
    const second = extractClientIdentifier({ headers: new Headers({ "user-agent": "second" }) });
    expect(first).toBe(second);
  });

  it("does not infer proxy trust from storage credentials", () => {
    vi.stubEnv("VERCEL", "");
    vi.stubEnv("CF_PAGES", "");
    vi.stubEnv("TRUST_PROXY_HEADERS", "");
    vi.stubEnv("CLOUDFLARE_ACCOUNT_ID", "storage-account");
    expect(
      extractClientIdentifier({ headers: new Headers({ "cf-connecting-ip": "1.1.1.1" }) })
    ).toBe("unknown");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("preserves CSRF base64 padding when reading cookies", () => {
    const token = generateServerCsrfToken();

    expect(
      readCsrfTokenFromCookieString(`theme=dark; ${getCsrfCookieName()}=${token}; session=abc`)
    ).toBe(token);
  });

  it("rejects mismatched CSRF tokens", () => {
    const token = generateServerCsrfToken();
    const mismatched = token.endsWith("A") ? `${token.slice(0, -1)}B` : `${token.slice(0, -1)}A`;

    expect(validateCsrfToken(token, mismatched)).toBe(false);
  });

  it("generates edge-safe CSRF tokens compatible with server validation", () => {
    const edgeToken = generateEdgeCsrfToken();

    expect(edgeToken).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(validateCsrfToken(edgeToken, edgeToken)).toBe(true);
  });

  it("prefers direct request IPs over spoofable forwarded headers", () => {
    const request = {
      ip: "203.0.113.9",
      headers: new Headers({
        "x-forwarded-for": "10.0.0.1",
        "x-vercel-forwarded-for": "192.168.1.10",
      }),
    };

    expect(extractClientIdentifier(request)).toBe("203.0.113.9");
  });

  it("trusts forwarded headers only behind an explicit trusted proxy", () => {
    vi.stubEnv("VERCEL", "1");

    const request = {
      headers: new Headers({
        "x-forwarded-for": "198.51.100.7, 10.0.0.1",
      }),
    };

    expect(extractClientIdentifier(request)).toBe("198.51.100.7");
  });

  it("allows same-origin submissions on localhost", () => {
    const headers = new Headers({
      origin: "http://localhost:3000",
      host: "localhost:3000",
    });

    expect(isTrustedOrigin(headers)).toBe(true);
  });

  it("rejects cross-origin submissions even when the host is local", () => {
    const headers = new Headers({
      origin: "https://evil.example",
      host: "localhost:3000",
    });

    expect(isTrustedOrigin(headers)).toBe(false);
  });

  it("handles invalid CORS origins safely", () => {
    const headers = getCorsHeaders("not-a-valid-origin");

    expect(headers["Access-Control-Allow-Origin"]).toBe("https://www.tushardevx01.tech");
    expect(headers.Vary).toBe("Origin");
  });

  it("safely handles circular references in logging metadata without infinite recursion", () => {
    const circular: Record<string, unknown> = { name: "test", email: "secret@example.com" };
    circular.self = circular;

    expect(() => {
      logger.info("testing circular structure", { data: circular });
    }).not.toThrow();
  });
});
