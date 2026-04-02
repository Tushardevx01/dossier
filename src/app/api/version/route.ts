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
  buildTime?: string;
}

export async function GET() {
  const versionInfo: VersionInfo = {
    name: packageJson.name || "tushardevx01-portfolio",
    version: packageJson.version || "1.0.0",
    buildTime: process.env.BUILD_TIME,
  };

  // Remove undefined values
  const cleanInfo = Object.fromEntries(
    Object.entries(versionInfo).filter(([, v]) => v !== undefined)
  );

  return NextResponse.json(cleanInfo, {
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
