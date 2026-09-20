import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { generateCsrfToken, getCsrfCookieName } from "./lib/security/csrf.edge";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Request-ID", crypto.randomUUID());

  if (!request.cookies.has(getCsrfCookieName()) && !request.nextUrl.pathname.startsWith("/api/")) {
    response.cookies.set(getCsrfCookieName(), generateCsrfToken(), {
      path: "/",
      maxAge: 86400,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};