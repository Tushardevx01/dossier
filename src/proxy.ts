/**
 * Next.js Proxy (formerly Middleware)
 *
 * Runs before API requests only.
 * Adds request ID and timing headers.
 */

import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Simple request ID using timestamp + random
  const requestId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  
  const response = NextResponse.next();
  
  response.headers.set("X-Request-ID", requestId);
  response.headers.set("Cache-Control", "no-store");
  
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
