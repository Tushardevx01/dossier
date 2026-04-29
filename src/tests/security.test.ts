import { afterEach, describe, expect, it, vi } from "vitest";

import { getCorsHeaders } from "@/lib/security/corsHeaders";
import {
  generateCsrfToken as generateServerCsrfToken,
  readCsrfTokenFromCookieString,
  validateCsrfToken,
} from "@/lib/security/csrf.server";
import { generateCsrfToken as generateEdgeCsrfToken } from "@/lib/security/csrf.edge";
import { getCsrfCookieName } from "@/lib/security/csrf.client";
import { extractClientIdentifier } from "@/lib/security/request";

describe("security helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("preserves CSRF base64 padding when reading cookies", () => {
    const token = generateServerCsrfToken();

    expect(readCsrfTokenFromCookieString(`theme=dark; ${getCsrfCookieName()}=${token}; session=abc`)).toBe(token);
  });

  it("rejects mismatched CSRF tokens", () => {
    const token = generateServerCsrfToken();

    expect(validateCsrfToken(token, `${token.slice(0, -1)}A`)).toBe(false);
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

  it("handles invalid CORS origins safely", () => {
    const headers = getCorsHeaders("not-a-valid-origin");

    expect(headers["Access-Control-Allow-Origin"]).toBe("https://www.tushardevx01.tech");
    expect(headers.Vary).toBe("Origin");
  });
});