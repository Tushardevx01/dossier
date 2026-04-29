/**
 * CORS and Security Headers Utilities
 *
 * Provides consistent CORS and security headers for API responses.
 * Implements proper CORS pre-flight handling and explicit header configuration.
 */

import { SITE_URL } from "@/lib/site";

const TRUSTED_ORIGIN = new URL(SITE_URL).origin;

function parseOrigin(value?: string | null): string | null {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

/**
 * Get CORS headers for API responses
 *
 * Returns headers that properly configure CORS for API endpoints.
 * Only allows requests from trusted origins.
 */
export function getCorsHeaders(origin?: string | null): Record<string, string> {
  const requestOrigin = parseOrigin(origin);
  const isAllowedOrigin = requestOrigin === TRUSTED_ORIGIN;

  return {
    "Access-Control-Allow-Origin": isAllowedOrigin && requestOrigin ? requestOrigin : TRUSTED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
    "Access-Control-Max-Age": "86400", // 24 hours
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };
}

/**
 * Get rate limit headers for API responses
 *
 * Returns X-RateLimit-* headers indicating rate limit status.
 */
export function getRateLimitHeaders(
  limit: number,
  remaining: number,
  resetAt: number
): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
  };
}

/**
 * Get security headers for API responses
 *
 * Returns headers that enhance security posture of API responses.
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  };
}

/**
 * Merge multiple header objects
 */
export function mergeHeaders(...headerSets: Record<string, string>[]): Record<string, string> {
  return Object.assign({}, ...headerSets);
}
