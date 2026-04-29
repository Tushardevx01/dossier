/**
 * CSRF shared primitives.
 *
 * This module is runtime-agnostic and safe to import from client, edge, and server code.
 */

export const CSRF_COOKIE_NAME = "csrf-token";
export const CSRF_TOKEN_LENGTH = 32;

export function getCsrfCookieName(): string {
  return CSRF_COOKIE_NAME;
}

export function normalizeCsrfTokenValue(token: string): string {
  return token.trim().replace(/\s+/g, "");
}

export function normalizeBase64Token(token: string): string {
  const canonical = normalizeCsrfTokenValue(token)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const paddingLength = canonical.length % 4;
  if (paddingLength === 0) {
    return canonical;
  }

  return `${canonical}${"=".repeat(4 - paddingLength)}`;
}

/**
 * Read the CSRF token from a cookie string.
 *
 * This preserves the exact token value and avoids splitting on embedded '='.
 */
export function readCsrfTokenFromCookieString(cookieString: string): string | null {
  if (!cookieString || typeof cookieString !== "string") {
    return null;
  }

  const cookieValue = cookieString
    .split("; ")
    .find((row) => row.startsWith(`${CSRF_COOKIE_NAME}=`))
    ?.slice(`${CSRF_COOKIE_NAME}=`.length);

  if (!cookieValue) {
    return null;
  }

  try {
    return decodeURIComponent(cookieValue);
  } catch {
    return cookieValue;
  }
}