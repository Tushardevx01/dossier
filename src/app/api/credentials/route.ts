/**
 * Credentials API Route
 *
 * GET  /api/credentials - Retrieve all published credentials from database
 * POST /api/credentials - Create new credential and upload certificate to Cloudflare R2 (Admin only)
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  getAllCredentials,
  createCredential,
  slugifyTitle,
} from "@/lib/credentials";
import { CredentialJsonSchema } from "@/db/schema";
import { validateAdminRequest } from "@/lib/security/auth";
import {
  uploadToR2,
  deleteFromR2,
  isR2Configured,
} from "@/lib/storage/r2";
import {
  validateCredentialFile,
  generateSafeStorageKey,
  DEFAULT_MAX_CERT_SIZE,
} from "@/lib/storage/validation";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { checkRateLimit, createRateLimitKey } from "@/lib/security/rateLimit";
import { extractClientIdentifier } from "@/lib/security/request";

/**
 * GET /api/credentials
 * Returns all verified credentials directly from the database.
 */
export async function GET(request: NextRequest) {
  try {
    const ip = extractClientIdentifier(request);
    const rlKey = createRateLimitKey("credentials_get", ip);
    const rl = await checkRateLimit(rlKey, 60, 60000); // 60 per minute
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
      );
    }
    const list = await getAllCredentials();
    return NextResponse.json({
      success: true,
      data: list,
      count: list.length,
    });
  } catch (error) {
    logger.error("Failed to fetch credentials", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Unable to retrieve credentials from database",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/credentials
 * Creates a new credential record and uploads associated certificate asset to Cloudflare R2.
 * Protected: Admin authorization required.
 */
export async function POST(request: NextRequest) {
  const ip = extractClientIdentifier(request);
  const rlKey = createRateLimitKey("credentials_admin_post", ip);
  const rl = await checkRateLimit(rlKey, 30, 60000);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  // 1. Authorize admin
  const auth = await validateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: auth.error || "Administrative privileges required",
        },
      },
      { status: 401 }
    );
  }

  const contentType = request.headers.get("content-type") ?? "";

  // 2. Handle Multipart Form Data (File Uploads)
  if (contentType.includes("multipart/form-data")) {
    const uploadedR2Keys: string[] = [];

    try {
      const formData = await request.formData();

      const title = formData.get("title")?.toString().trim() || "";
      const issuer = formData.get("issuer")?.toString().trim() || "";
      const description = formData.get("description")?.toString().trim() || null;
      const issueDateStr = (formData.get("issueDate") || formData.get("issuedAt"))?.toString().trim() || "";
      const credentialLink = (formData.get("credentialLink") || formData.get("verificationUrl"))?.toString().trim() || null;
      let objectLink = (formData.get("objectLink") || formData.get("certificateUrl"))?.toString().trim() || null;

      // Validate required inputs
      if (!title || !issuer || !issueDateStr) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "VALIDATION_FAILED",
              message: "Title, issuer, and issueDate are required fields",
            },
          },
          { status: 400 }
        );
      }

      const issueDate = new Date(issueDateStr);
      if (isNaN(issueDate.getTime())) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "VALIDATION_FAILED",
              message: "Invalid issueDate format",
            },
          },
          { status: 400 }
        );
      }

      const certFile = formData.get("certificateFile") || formData.get("certificate") || formData.get("file");

      // Upload Certificate file to R2 if provided
      if (certFile && certFile instanceof File && certFile.size > 0) {
        if (!isR2Configured()) {
          return NextResponse.json(
            {
              success: false,
              error: {
                code: "R2_NOT_CONFIGURED",
                message: "Cloudflare R2 storage credentials are not configured",
              },
            },
            { status: 503 }
          );
        }

        const validatedCert = await validateCredentialFile(certFile, {
          maxSizeBytes: DEFAULT_MAX_CERT_SIZE,
          allowedTypes: ["pdf", "png", "jpg", "jpeg", "webp"],
        });

        const slugCandidate = slugifyTitle(title);
        const tempId = slugCandidate || `cert-${Date.now()}`;
        const key = generateSafeStorageKey(tempId, "certificate", validatedCert.extension);

        const uploadResult = await uploadToR2({
          file: validatedCert.buffer,
          key,
          contentType: validatedCert.mimeType,
        });

        uploadedR2Keys.push(uploadResult.key);
        objectLink = uploadResult.url;
      }

      if (!objectLink) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "VALIDATION_FAILED",
              message: "Certificate file or objectLink is required",
            },
          },
          { status: 400 }
        );
      }

      // 3. Save to database
      try {
        const slug = slugifyTitle(title);
        const created = await createCredential({
          title,
          slug,
          issuer,
          issueDate,
          objectLink,
          credentialLink: credentialLink && credentialLink.length > 0 ? credentialLink : null,
          description,
        });

        // Invalidate Next.js caches
        revalidatePath("/credentials");
        revalidatePath(`/credentials/${created.slug}`);
        revalidatePath("/");
        revalidatePath("/api/credentials");
        revalidatePath("/api/credentials/count");

        return NextResponse.json(
          {
            success: true,
            data: created,
          },
          { status: 201 }
        );
      } catch (dbError) {
        // Rollback: Clean up uploaded R2 files if DB insert failed
        logger.error("DB insert failed after R2 upload; rolling back uploaded assets", {
          keys: uploadedR2Keys,
          error: dbError instanceof Error ? dbError.message : String(dbError),
        });

        await Promise.allSettled(uploadedR2Keys.map((key) => deleteFromR2(key)));

        return NextResponse.json(
          {
            success: false,
            error: {
              code: "DATABASE_ERROR",
              message: "Failed to persist credential metadata to database",
            },
          },
          { status: 500 }
        );
      }
    } catch {
      // Clean up any uploaded files on general error
      await Promise.allSettled(uploadedR2Keys.map((key) => deleteFromR2(key)));

      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UPLOAD_ERROR",
            message: "Invalid file or payload",
          },
        },
        { status: 400 }
      );
    }
  }

  // 3. Handle JSON Body (Direct metadata insert)
  if (contentType.includes("application/json")) {
    try {
      const body = await request.json();
      const parsed = CredentialJsonSchema.parse(body);

      const created = await createCredential({
        title: parsed.title,
        slug: parsed.slug || slugifyTitle(parsed.title),
        issuer: parsed.issuer,
        issueDate: new Date(parsed.issueDate),
        objectLink: parsed.objectLink,
        credentialLink: parsed.credentialLink || null,
        description: parsed.description ?? null,
      });

      revalidatePath("/credentials");
      revalidatePath(`/credentials/${created.slug}`);
      revalidatePath("/");
      revalidatePath("/api/credentials");
      revalidatePath("/api/credentials/count");

      return NextResponse.json(
        {
          success: true,
          data: created,
        },
        { status: 201 }
      );
    } catch (validationErr) {
      if (validationErr instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "VALIDATION_FAILED",
              issues: validationErr.issues,
            },
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            code: "DATABASE_ERROR",
            message: "Failed to create credential record",
          },
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "Expected multipart/form-data or application/json",
      },
    },
    { status: 415 }
  );
}
