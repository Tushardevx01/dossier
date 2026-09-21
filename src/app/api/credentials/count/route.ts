/**
 * Credential Count API Route
 *
 * GET /api/credentials/count
 * Returns the exact database count of verified credentials.
 */

import { NextResponse, NextRequest } from "next/server";
import { getCredentialsCount } from "@/lib/credentials";
import { checkRateLimit, createRateLimitKey } from "@/lib/security/rateLimit";
import { extractClientIdentifier } from "@/lib/security/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const ip = extractClientIdentifier(request);
    const rlKey = createRateLimitKey("credentials_count", ip);
    const rl = await checkRateLimit(rlKey, 60, 60000); // 60 per minute
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
      );
    }
    
    const count = await getCredentialsCount();
    return NextResponse.json({
      success: true,
      count,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { code: "DATABASE_ERROR", message: "Failed to retrieve count" } },
      { status: 500 }
    );
  }
}
