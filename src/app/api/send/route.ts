/**
 * Contact Form API Route
 *
 * Thin wrapper around the contact service.
 * Handles HTTP concerns only — business logic lives in the service layer.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { generateRequestId, logger } from "@/lib/logger";
import { getServerEnv } from "@/lib/env.server";
import { AppError } from "@/lib/errors";
import { CONTACT_MAX_BODY_BYTES } from "@/config";
import {
  processContactSubmission,
  isValidBodySize,
  extractClientIdentifier,
  isOriginAllowed,
} from "@/services/contact";
import { validateCsrfToken, getCsrfCookieName } from "@/lib/security/csrf.server";
import { getCorsHeaders, getSecurityHeaders, mergeHeaders } from "@/lib/security/corsHeaders";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;

// ─── Response Helpers ───────────────────────────────────────────────────────

function jsonResponse(
  payload: Record<string, unknown>,
  status: number,
  headers?: Record<string, string>
) {
  return NextResponse.json(payload, {
    status,
    headers: mergeHeaders(
      {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
      getCorsHeaders(),
      getSecurityHeaders(),
      headers ?? {}
    ),
  });
}

function errorResponse(error: AppError, requestId: string) {
  const retryAfterSeconds = Number(error.meta?.retryAfter);
  const retryAfterHeader =
    error.code === "RATE_LIMIT_EXCEEDED" && Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
      ? { "Retry-After": String(Math.ceil(retryAfterSeconds)) }
      : undefined;

  return jsonResponse(
    {
      error: error.message,
      code: error.code,
      requestId,
    },
    error.statusCode,
    retryAfterHeader
  );
}

// ─── Route Handler ──────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > CONTACT_MAX_BODY_BYTES) {
    return jsonResponse({ error: "Invalid request payload", requestId }, 413, { "X-Robots-Tag": "noindex, nofollow" });
  }

  // Origin check (CSRF protection)
  if (!isOriginAllowed(request.headers)) {
    logger.warn("Forbidden origin", { requestId });
    return jsonResponse({ error: "Forbidden origin", requestId }, 403);
  }

  // CSRF token check (Double Submit Cookie pattern)
  const csrfCookieToken = request.cookies.get(getCsrfCookieName())?.value;

  // Content-Type check
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Unsupported content type", requestId }, 415, { "X-Robots-Tag": "noindex, nofollow" });
  }

  // Read and validate body size
  const rawBody = await request.text();
  if (!isValidBodySize(rawBody)) {
    return jsonResponse({ error: "Invalid request payload", requestId }, 400, { "X-Robots-Tag": "noindex, nofollow" });
  }

  // Parse JSON
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Malformed JSON payload", requestId }, 400, { "X-Robots-Tag": "noindex, nofollow" });
  }

  if (!body || typeof body !== "object") {
    return jsonResponse({ error: "Invalid input data", requestId }, 400, { "X-Robots-Tag": "noindex, nofollow" });
  }

  // Validate CSRF token from request body against cookie
  const bodyObj = body as Record<string, unknown>;
  const csrfBodyToken = bodyObj.csrfToken as string | undefined;

  if (!validateCsrfToken(csrfCookieToken, csrfBodyToken)) {
    logger.warn("CSRF validation failed", { requestId });
    return jsonResponse({ error: "CSRF validation failed", requestId }, 403);
  }

  // Get config
  let config;
  try {
    const env = getServerEnv();
    config = {
      emailApiKey: env.QEV_API_KEY,
      emailFrom: env.EMAIL_FROM,
      emailPassword: env.EMAIL_PASSWORD,
    };
  } catch {
    logger.error("Server configuration error", { requestId });
    return jsonResponse({ error: "Server configuration error", requestId }, 500, { "X-Robots-Tag": "noindex, nofollow" });
  }

  // Process submission through service layer
  const result = await processContactSubmission(
    {
      body,
      clientIdentifier: extractClientIdentifier(request),
      requestId,
    },
    config
  );

  if (result.success) {
    return jsonResponse({ message: result.message, requestId }, 200);
  }

  return errorResponse(result.error, requestId);
}