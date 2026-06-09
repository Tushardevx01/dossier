/**
 * CSRF helpers for Node.js runtime.
 */

import { randomBytes, timingSafeEqual } from "node:crypto";

import {
  CSRF_TOKEN_LENGTH,
  getCsrfCookieName,
  readCsrfTokenFromCookieString,
} from "./csrf.shared";

export function generateCsrfToken(): string {
  return randomBytes(CSRF_TOKEN_LENGTH).toString("base64url");
}

export function validateCsrfToken(cookieToken?: string, bodyToken?: string): boolean {
  if (!cookieToken || !bodyToken) {
    return false;
  }

  const cookieBuf = Buffer.from(cookieToken, "utf8");
  const bodyBuf = Buffer.from(bodyToken, "utf8");

  if (cookieBuf.length !== bodyBuf.length) {
    return false;
  }

  return timingSafeEqual(cookieBuf, bodyBuf);
}

export { CSRF_TOKEN_LENGTH, getCsrfCookieName, readCsrfTokenFromCookieString };