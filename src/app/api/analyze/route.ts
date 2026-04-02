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

function getClientIdentifier(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Unsupported content type",
          },
        },
        { status: 415, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "PAYLOAD_TOO_LARGE",
            message: "Request body is too large",
          },
        },
        { status: 413, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    // Get client IP for rate limiting
    const clientIdentifier = getClientIdentifier(request);
    const key = createRateLimitKey("analyze", clientIdentifier);

    // Check rate limit
    const rateLimit = await checkRateLimit(key, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
    if (!rateLimit.allowed) {
      const retryAfter = Math.max(rateLimit.retryAfterSeconds, 1);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RATE_LIMITED",
            message: "Too many requests. Please try again later.",
          },
        },
        {
          status: 429,
          headers: {
            "Cache-Control": "no-store",
            "X-Robots-Tag": "noindex, nofollow",
            "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
            "X-RateLimit-Remaining": "0",
            "Retry-After": String(retryAfter),
          },
        }
      );
    }

    // Parse and validate request body
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "PAYLOAD_TOO_LARGE",
            message: "Request body is too large",
          },
        },
        { status: 413, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    let body: unknown;
    try {
      body = rawBody ? JSON.parse(rawBody) : null;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Invalid JSON body",
          },
        },
        { status: 400, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    if (!body) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Invalid JSON body",
          },
        },
        { status: 400, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    if (typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: "Invalid input data",
          },
        },
        { status: 400, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    const validation = AnalyzeRequestSchema.safeParse(body);
    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_REQUEST",
            message: firstIssue?.message || "Invalid request",
          },
        },
        { status: 400, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    const { url } = validation.data;

    // Validate URL before analysis
    const urlValidation = validateUrl(url);
    if (!urlValidation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: urlValidation.error,
        },
        { status: 400, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
      );
    }

    // Run SEO analysis
    const result = await analyzeSEO(url);

    // Check for analysis errors
    if (isAnalysisError(result)) {
      const statusCode = result.code === "TIMEOUT" ? 504 : 
                         result.code === "FETCH_FAILED" ? 502 : 400;
      return NextResponse.json(
        {
          success: false,
          error: result,
        },
        { 
          status: statusCode,
          headers: {
            "Cache-Control": "no-store",
            "X-Robots-Tag": "noindex, nofollow",
            "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
          },
        }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      {
        status: 200,
        headers: {
          "X-Robots-Tag": "noindex, nofollow",
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "Cache-Control": "no-store", // Don't cache analysis results
        },
      }
    );
  } catch (error) {
    // Unexpected error handling
    logger.error("[SEO Analyzer] Unexpected error", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred",
        },
      },
      { status: 500, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } }
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
