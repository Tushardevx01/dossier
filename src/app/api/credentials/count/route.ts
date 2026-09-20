/**
 * Credential Count API Route
 *
 * GET /api/credentials/count
 * Returns the exact database count of verified credentials.
 */

import { NextResponse } from "next/server";
import { getCredentialsCount } from "@/lib/credentials";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const count = await getCredentialsCount();
  return NextResponse.json({
    success: true,
    count,
  });
}
