/**
 * Next.js Proxy (formerly Middleware)
 *
 * Runs before every request. Handles:
 * - Request timing headers
 * - Security headers for API routes
 * - Request ID propagation
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

import { NextResponse, type NextRequest } from "next/server";
import { nanoid } from "nanoid";

export function proxy(request: NextRequest) {
  const requestId = nanoid(12);
  const startTime = Date.now();

  // Clone the response to add headers
  const response = NextResponse.next();

  // Add request ID for correlation
  response.headers.set("X-Request-ID", requestId);

  // Add timing header (for observability)
  response.headers.set("X-Response-Time", `${Date.now() - startTime}ms`);

  // Add security headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Prevent caching of API responses by default
    if (!response.headers.has("Cache-Control")) {
      response.headers.set("Cache-Control", "no-store");
    }

    // Prevent content type sniffing
    response.headers.set("X-Content-Type-Options", "nosniff");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|fonts/|docs/).*)",
  ],
};
