/**
 * Health Check Endpoint
 *
 * Returns a minimal health status for orchestration and uptime checks.
 *
 * GET /api/health
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface HealthStatus {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime: number;
}

const startTime = Date.now();
function checkEnv(): boolean {
  const required = ["QEV_API_KEY", "EMAIL_FROM", "EMAIL_PASSWORD"] as const;
  return required.every((key) => Boolean(process.env[key]));
}

export async function GET() {
  const envReady = checkEnv();

  const health: HealthStatus = {
    status: envReady ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
  };

  const statusCode = envReady ? 200 : 503;

  return NextResponse.json(health, {
    status: statusCode,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
