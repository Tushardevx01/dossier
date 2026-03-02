/**
 * Version Endpoint
 *
 * Returns application version and build information.
 * Useful for deployment verification and debugging.
 *
 * GET /api/version
 */

import { NextResponse } from "next/server";
import packageJson from "../../../../package.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface VersionInfo {
  name: string;
  version: string;
  environment: string;
  buildTime: string;
  commit?: string;
  branch?: string;
}

export async function GET() {
  const versionInfo: VersionInfo = {
    name: packageJson.name || "tushardevx01-portfolio",
    version: packageJson.version || "1.0.0",
    environment: process.env.NODE_ENV || "development",
    buildTime: process.env.BUILD_TIME || new Date().toISOString(),
    // Git info (set during CI/CD build)
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || process.env.GIT_COMMIT,
    branch: process.env.VERCEL_GIT_COMMIT_REF || process.env.GIT_BRANCH,
  };

  // Remove undefined values
  const cleanInfo = Object.fromEntries(
    Object.entries(versionInfo).filter(([, v]) => v !== undefined)
  );

  return NextResponse.json(cleanInfo, {
    headers: {
      "Cache-Control": "public, max-age=60",
    },
  });
}
