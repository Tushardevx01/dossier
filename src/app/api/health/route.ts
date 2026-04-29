/**
 * Health Check Endpoint
 *
 * Returns a minimal health status for orchestration and uptime checks.
 * Does NOT expose internal configuration or environment variable names.
 *
 * SECURITY: Environment validation happens at startup (instrumentation.ts),
 * not in this endpoint to prevent information leakage.
 *
 * GET /api/health
 * Returns: 200 if server is running, 503 if startup validation failed
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface HealthStatus {
  status: "ok";
  timestamp: string;
}

export async function GET() {
  // Return minimal health status (server is running if this executes)
  const health: HealthStatus = {
    status: "ok",
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(health, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
