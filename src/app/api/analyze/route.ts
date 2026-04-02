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

// Use Node.js runtime for Cheerio compatibility
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Request validation schema
const AnalyzeRequestSchema = z.object({
  url: z.string().min(1, "URL is required").max(2048, "URL too long"),
});

const MAX_BODY_BYTES = 4096;

// Rate limiting - simple in-memory store (use Redis in production cluster)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10; // requests per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

/**
 * Simple rate limiting check
 */
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    // New window
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count, resetAt: record.resetAt };
}

/**
 * Clean up expired rate limit records periodically
 */
function cleanupRateLimits(): void {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

// Run cleanup every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupRateLimits, 5 * 60 * 1000);
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
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || request.headers.get("x-real-ip") 
      || "unknown";

    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
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
            "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
            "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
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

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
