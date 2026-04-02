/**
 * Health Check Endpoint
 *
 * Returns application health status.
 * Used by load balancers, monitoring, and orchestration systems.
 *
 * GET /api/health
 */

import { NextResponse } from "next/server";
import { checkMonitoringHealth } from "@/lib/monitoring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number;
  checks: Record<string, { status: "pass" | "warn" | "fail"; message?: string }>;
}

const startTime = Date.now();

async function checkRedis(): Promise<{ status: "pass" | "warn" | "fail"; message?: string }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return { status: "pass", message: "Redis not configured" };
  }

  try {
    const response = await fetch(`${url}/ping`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (response.ok) {
      return { status: "pass" };
    }
    return { status: "fail", message: `HTTP ${response.status}` };
  } catch (error) {
    return { status: "fail", message: error instanceof Error ? error.message : "Unknown error" };
  }
}

function checkEnv(): { status: "pass" | "warn" | "fail"; message?: string } {
  const required = ["QEV_API_KEY", "EMAIL_FROM", "EMAIL_PASSWORD"] as const;
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length === 0) {
    return { status: "pass" };
  }
  return { status: "fail", message: "Missing required configuration values" };
}

export async function GET() {
  const [redisCheck, monitoringCheck] = await Promise.all([
    checkRedis(),
    checkMonitoringHealth(),
  ]);

  const checks: HealthStatus["checks"] = {
    env: { status: checkEnv().status },
    redis: { status: redisCheck.status },
    monitoring: monitoringCheck,
  };

  const allPassing = Object.values(checks).every((c) => c.status === "pass");
  const anyFailing = Object.values(checks).some(
    (c) => c.status === "fail" && !c.message?.includes("Not configured")
  );

  let overallStatus: HealthStatus["status"] = "healthy";
  if (anyFailing) {
    overallStatus = "unhealthy";
  } else if (!allPassing) {
    overallStatus = "degraded";
  }

  const health: HealthStatus = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    checks,
  };

  const statusCode = overallStatus === "unhealthy" ? 503 : 200;

  return NextResponse.json(health, {
    status: statusCode,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
