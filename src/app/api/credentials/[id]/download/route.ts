/**
 * Credential Certificate Download API Route
 *
 * GET /api/credentials/:id/download
 *
 * Resolves the certificate asset from Cloudflare R2 and streams it directly to the browser
 * with an attachment Content-Disposition header, triggering an authentic download.
 */

import { NextRequest, NextResponse } from "next/server";
import { getCredentialById } from "@/lib/credentials";
import { getR2Object, extractR2Key } from "@/lib/storage/r2";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const numId = parseInt(id, 10);

  if (isNaN(numId) || numId <= 0) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_ID", message: "Invalid credential ID" } },
      { status: 400 }
    );
  }

  const credential = await getCredentialById(numId);
  if (!credential || !credential.objectLink) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "Certificate asset not found" } },
      { status: 404 }
    );
  }

  const key = extractR2Key(credential.objectLink);

  try {
    const r2Obj = await getR2Object(key);

    if (r2Obj && r2Obj.body) {
      const filename = `${credential.slug || `certificate-${credential.id}`}.pdf`;
      const isInline = _request.nextUrl.searchParams.get("inline") === "true";
      const disposition = isInline ? "inline" : "attachment";
      const headers = new Headers();
      headers.set("Content-Type", r2Obj.contentType || "application/pdf");
      headers.set("Content-Disposition", `${disposition}; filename="${filename}"`);
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
      if (r2Obj.contentLength) {
        headers.set("Content-Length", String(r2Obj.contentLength));
      }

      // Check if transformToWebStream is available on the AWS SDK stream
      if (typeof (r2Obj.body as { transformToWebStream?: () => ReadableStream }).transformToWebStream === "function") {
        const stream = (r2Obj.body as { transformToWebStream: () => ReadableStream }).transformToWebStream();
        return new NextResponse(stream, { headers, status: 200 });
      }

      return new NextResponse(r2Obj.body as unknown as BodyInit, { headers, status: 200 });
    }

    // Fallback: Redirect directly to public R2 URL
    return NextResponse.redirect(credential.objectLink, 302);
  } catch (error) {
    logger.error("Failed to stream certificate from R2, redirecting to public URL", {
      key,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.redirect(credential.objectLink, 302);
  }
}
