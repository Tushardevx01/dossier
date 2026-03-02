/**
 * API Catch-All Not Found Handler
 *
 * Handles 404 responses for undefined API routes.
 * Provides consistent JSON error responses.
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";

function notFoundResponse(method: string, path: string) {
  return NextResponse.json(
    {
      error: "Not Found",
      message: `${method} /api${path} is not a valid endpoint`,
      timestamp: new Date().toISOString(),
    },
    { status: 404 }
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;
  return notFoundResponse("GET", `/${path?.join("/") || ""}`);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;
  return notFoundResponse("POST", `/${path?.join("/") || ""}`);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;
  return notFoundResponse("PUT", `/${path?.join("/") || ""}`);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;
  return notFoundResponse("DELETE", `/${path?.join("/") || ""}`);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;
  return notFoundResponse("PATCH", `/${path?.join("/") || ""}`);
}
