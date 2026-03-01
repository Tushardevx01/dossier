/**
 * Contact Form API Route
 *
 * Thin wrapper around the contact service.
 * Handles HTTP concerns only — business logic lives in the service layer.
 */

import { NextResponse } from "next/server";

import { generateRequestId, logger } from "@/lib/logger";
import { getServerEnv } from "@/lib/env.server";
import { AppError } from "@/lib/errors";
import {
  processContactSubmission,
  isValidBodySize,
  extractClientIdentifier,
  isOriginAllowed,
} from "@/services/contact";

export const runtime = "nodejs";

// ─── Response Helpers ───────────────────────────────────────────────────────

function jsonResponse(
  payload: Record<string, unknown>,
  status: number,
  headers?: Record<string, string>
) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function errorResponse(error: AppError, requestId: string) {
  return jsonResponse(
    {
      error: error.message,
      code: error.code,
      requestId,
    },
    error.statusCode,
    error.code === "RATE_LIMIT_EXCEEDED" && error.meta.retryAfter
      ? { "Retry-After": String(error.meta.retryAfter) }
      : undefined
  );
}

// ─── Route Handler ──────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const requestId = generateRequestId();

  // Origin check (CSRF protection)
  if (!isOriginAllowed(request.headers)) {
    logger.warn("Forbidden origin", { requestId });
    return jsonResponse({ error: "Forbidden origin", requestId }, 403);
  }

  // Content-Type check
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Unsupported content type", requestId }, 415);
  }

  // Read and validate body size
  const rawBody = await request.text();
  if (!isValidBodySize(rawBody)) {
    return jsonResponse({ error: "Invalid request payload", requestId }, 400);
  }

  // Parse JSON
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Malformed JSON payload", requestId }, 400);
  }

  if (!body || typeof body !== "object") {
    return jsonResponse({ error: "Invalid input data", requestId }, 400);
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
    return jsonResponse({ error: "Server configuration error", requestId }, 500);
  }

  // Process submission through service layer
  const result = await processContactSubmission(
    {
      body,
      clientIdentifier: extractClientIdentifier(request.headers),
      requestId,
    },
    config
  );

  if (result.success) {
    return jsonResponse({ message: result.message, requestId }, 200);
  }

  return errorResponse(result.error, requestId);
}