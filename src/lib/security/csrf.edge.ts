/**
 * CSRF helpers for Edge runtime.
 */

import {
  CSRF_TOKEN_LENGTH,
  getCsrfCookieName,
  normalizeBase64Token,
  readCsrfTokenFromCookieString,
} from "./csrf.shared";

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";

  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeToken(token: string): Uint8Array | null {
  try {
    const binary = atob(normalizeBase64Token(token));
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
  } catch {
    return null;
  }
}

function timingSafeEqualBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left[index] ^ right[index];
  }

  return diff === 0;
}

export function generateCsrfToken(): string {
  const bytes = new Uint8Array(CSRF_TOKEN_LENGTH);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

export function validateCsrfToken(cookieToken?: string, bodyToken?: string): boolean {
  if (!cookieToken || !bodyToken) {
    return false;
  }

  const decodedCookie = decodeToken(cookieToken);
  const decodedBody = decodeToken(bodyToken);

  if (!decodedCookie || !decodedBody) {
    return false;
  }

  if (decodedCookie.length !== CSRF_TOKEN_LENGTH || decodedBody.length !== CSRF_TOKEN_LENGTH) {
    return false;
  }

  return timingSafeEqualBytes(decodedCookie, decodedBody);
}

export { CSRF_TOKEN_LENGTH, getCsrfCookieName, readCsrfTokenFromCookieString };