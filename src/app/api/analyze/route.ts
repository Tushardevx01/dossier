/**
 * SEO Analyzer API Route
 * 
 * POST /api/analyze
 * 
 * Analyzes a URL for SEO best practices and returns structured results.
 * 
 * @example Request
 * ```json
 * { "url": "https://example.com" }
 * ```
 * 
 * @example Success Response (200)
 * ```json
 * {
 *   "success": true,
 *   "data": {
 *     "score": 85,
 *     "checks": [...],
 *     "metrics": {...},
 *     "meta": {...},
 *     "url": "https://example.com",
 *     "analyzedAt": "2024-01-01T00:00:00.000Z",
 *     "duration": 1234
 *   }
 * }
 * ```
 * 
 * @example Error Response (400/500)
 * ```json
 * {
 *   "success": false,
 *   "error": {
 *     "code": "INVALID_URL",
 *     "message": "Only HTTPS URLs are supported"
 *   }
 * }
 * ```
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeSEO, isAnalysisError, validateUrl } from "@/lib/seo-analyzer";
import { logger } from "@/lib/logger";
import { checkRateLimit, createRateLimitKey } from "@/lib/security/rateLimit";
import { extractClientIdentifier } from "@/lib/security/request";
import { validateApiKey, extractApiKey } from "@/lib/security/auth";

// Use Node.js runtime for Cheerio compatibility
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Request validation schema
const AnalyzeRequestSchema = z.object({
  url: z.string().min(1, "URL is required").max(2048, "URL too long"),
});

const MAX_BODY_BYTES = 4096;

const RATE_LIMIT_MAX = 10; // requests per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

function secureJson(payload: Record<string, unknown>, status: number, extraHeaders?: Record<string, string>) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      ...extraHeaders,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return secureJson(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Unsupported content type",
          },
        },
        415
      );
    }

    // Validate API key
    const apiKey = extractApiKey(request);
    if (!apiKey) {
      return secureJson(
        {
          success: false,
          error: {
            code: "AUTHENTICATION_REQUIRED",
            message: "API key required. Use Authorization: Bearer <key> or X-API-Key header",
          },
        },
        401
      );
    }

    const keyValidation = await validateApiKey(apiKey);
    if (!keyValidation.valid) {
      return secureJson(
        {
          success: false,
          error: {
            code: "AUTHENTICATION_FAILED",
            message: keyValidation.error || "Authentication failed",
          },
        },
        401
      );
    }

    if (!keyValidation.permissions?.analyze) {
      return secureJson(
        {
          success: false,
          error: {
            code: "INSUFFICIENT_PERMISSIONS",
            message: "API key does not have analyze permission",
          },
        },
        403
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return secureJson(
        {
          success: false,
          error: {
            code: "PAYLOAD_TOO_LARGE",
            message: "Request body is too large",
          },
        },
        413
      );
    }

    // Get client IP for rate limiting
    const clientIdentifier = extractClientIdentifier(request);
    const key = createRateLimitKey("analyze", clientIdentifier);

    // Check rate limit using API key's limit
    const rateLimitMax = keyValidation.permissions?.rateLimit || RATE_LIMIT_MAX;
    const rateLimit = await checkRateLimit(key, rateLimitMax, RATE_LIMIT_WINDOW_MS);
    if (!rateLimit.allowed) {
      const retryAfter = Math.max(rateLimit.retryAfterSeconds, 1);
      return secureJson(
        {
          success: false,
          error: {
            code: "RATE_LIMITED",
            message: "Too many requests. Please try again later.",
          },
        },
        429,
        {
          "X-RateLimit-Limit": String(rateLimitMax),
          "X-RateLimit-Remaining": "0",
          "Retry-After": String(retryAfter),
        }
      );
    }

    // Parse and validate request body
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return secureJson(
        {
          success: false,
          error: {
            code: "PAYLOAD_TOO_LARGE",
            message: "Request body is too large",
          },
        },
        413
      );
    }

    let body: unknown;
    try {
      body = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      return secureJson(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Invalid JSON body",
          },
        },
        400
      );
    }

    if (!body) {
      return secureJson(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Invalid JSON body",
          },
        },
        400
      );
    }

    if (typeof body !== "object" || Array.isArray(body)) {
      return secureJson(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Invalid input data",
          },
        },
        400
      );
    }

    const validation = AnalyzeRequestSchema.safeParse(body);
    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      return secureJson(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: firstIssue?.message || "Invalid request",
          },
        },
        400
      );
    }

    const { url } = validation.data;

    // Validate URL before analysis
    const urlValidation = await validateUrl(url);
    if (!urlValidation.valid) {
      return secureJson(
        {
          success: false,
          error: urlValidation.error,
        },
        400
      );
    }

    // Run SEO analysis
    const result = await analyzeSEO(url);

    // Check for analysis errors
    if (isAnalysisError(result)) {
      const statusCode = result.code === "TIMEOUT" ? 504 : 
                         result.code === "FETCH_FAILED" ? 502 : 400;
      return secureJson(
        {
          success: false,
          error: result,
        },
        statusCode,
        {
          "X-RateLimit-Limit": String(rateLimitMax),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        }
      );
    }

    // Success response
    return secureJson(
      {
        success: true,
        data: result,
      },
      200,
      {
        "X-RateLimit-Limit": String(rateLimitMax),
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      }
    );
  } catch (error) {
    // Unexpected error handling
    logger.error("[SEO Analyzer] Unexpected error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return secureJson(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred",
        },
      },
      500
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
