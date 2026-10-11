/**
 * Credential Certificate Download API Route
 *
 * GET /api/credentials/:id/download
 *
 * Resolves the certificate asset from Cloudflare R2 and streams it directly to the browser
 * with an attachment Content-Disposition header, triggering an authentic download.
 */

import { NextRequest, NextResponse } from "next/server";
import { getCredentialById } from "@/server/repositories/credentials";
import { getR2Object, extractR2Key } from "@/server/storage/r2";
import { logger } from "@/lib/logger";
import { parseCredentialId } from "@/server/services/credentials/payload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const numId = parseCredentialId(id);

  if (numId === null) {
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

  let safeRedirectUrl: URL | null = null;
  try {
    const parsed = new URL(credential.objectLink);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      safeRedirectUrl = parsed;
    }
  } catch {
    safeRedirectUrl = null;
  }

  const key = extractR2Key(credential.objectLink);

  try {
    const r2Obj = await getR2Object(key);

    if (r2Obj && r2Obj.body) {
      const rawBase = credential.slug || `certificate-${credential.id}`;
      let extension = "pdf";
      const ct = (r2Obj.contentType || "").toLowerCase();
      if (ct.includes("png") || key.endsWith(".png")) {
        extension = "png";
      } else if (ct.includes("jpeg") || ct.includes("jpg") || key.endsWith(".jpg") || key.endsWith(".jpeg")) {
        extension = "jpg";
      } else if (ct.includes("webp") || key.endsWith(".webp")) {
        extension = "webp";
      }
      const safeFilename = `${rawBase.replace(/[^a-zA-Z0-9_.-]/g, "_").replace(/\.+/g, ".")}.${extension}`;
      const isInline = _request.nextUrl.searchParams.get("inline") === "true";
      const disposition = isInline ? "inline" : "attachment";
      const headers = new Headers();
      const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
      headers.set("Content-Type", allowedTypes.includes(ct) ? ct : "application/octet-stream");
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("Content-Security-Policy", "sandbox; default-src 'none'");
      headers.set(
        "Content-Disposition",
        `${disposition}; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(safeFilename)}`
      );
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

    if (!safeRedirectUrl) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_ASSET_URL", message: "Certificate asset URL is invalid" } },
        { status: 502 }
      );
    }

    // Fallback: Redirect directly to public R2 URL
    return NextResponse.redirect(safeRedirectUrl.toString(), 302);
  } catch (error) {
    logger.error("Failed to stream certificate from R2, redirecting to public URL", {
      key,
      error: error instanceof Error ? error.message : String(error),
    });

    if (!safeRedirectUrl) {
      return NextResponse.json(
        { success: false, error: { code: "FETCH_FAILED", message: "Failed to retrieve certificate asset" } },
        { status: 502 }
      );
    }

    return NextResponse.redirect(safeRedirectUrl.toString(), 302);
  }
}
