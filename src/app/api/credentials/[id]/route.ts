/**
 * Single Credential Operations API Route
 *
 * GET    /api/credentials/:id - Retrieve single credential
 * PATCH  /api/credentials/:id - Update credential and/or replace files (Admin only)
 * DELETE /api/credentials/:id - Delete credential and remove R2 assets (Admin only)
 */

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  readCredentialJson,
  readCredentialForm,
  parseCredentialId,
} from "@/server/services/credentials/payload";
import { PayloadTooLargeError } from "@/server/http/body";
import {
  getCredentialById,
  updateCredential,
  deleteCredential,
} from "@/server/repositories/credentials";
import { UpdateJsonSchema } from "@/schemas";
import { validateAdminRequest } from "@/server/security/auth";
import { uploadToR2, deleteFromR2, isR2Configured } from "@/server/storage/r2";
import {
  validateCredentialFile,
  generateSafeStorageKey,
  DEFAULT_MAX_CERT_SIZE,
} from "@/server/storage/validation";
import { logger } from "@/lib/logger";
import { checkRateLimit, createRateLimitKey } from "@/server/security/rateLimit";
import { extractClientIdentifier } from "@/server/security/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/credentials/:id
 */
export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const numId = parseCredentialId(id);

  if (numId === null) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_ID", message: "Invalid credential ID" } },
      { status: 400 }
    );
  }

  try {
    const credential = await getCredentialById(numId);
    if (!credential) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Credential not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: credential,
    });
  } catch (error) {
    logger.error("Failed to query credential by ID", {
      id: numId,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { success: false, error: { code: "DATABASE_ERROR", message: "Database query failed" } },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/credentials/:id
 * Updates an existing credential. Handles multipart form replacements or JSON updates.
 */
export async function PATCH(request: NextRequest, context: RouteContext) {
  const ip = extractClientIdentifier(request);
  const rlKey = createRateLimitKey("credentials_admin_patch", ip);
  const rl = await checkRateLimit(rlKey, 30, 60000);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: { code: "RATE_LIMITED", message: "Too many requests" } },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  const auth = await validateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHORIZED", message: auth.error || "Admin access required" },
      },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const numId = parseCredentialId(id);
  if (numId === null) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_ID", message: "Invalid credential ID" } },
      { status: 400 }
    );
  }

  const existing = await getCredentialById(numId);
  if (!existing) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "Credential not found" } },
      { status: 404 }
    );
  }

  const contentType = request.headers.get("content-type") ?? "";

  // 1. Multipart Form Data (replacement files and/or metadata)
  if (contentType.includes("multipart/form-data")) {
    const newlyUploadedKeys: string[] = [];
    const oldKeysToDelete: string[] = [];

    try {
      const formData = await readCredentialForm(request);

      const updateData: Record<string, unknown> = {};

      if (formData.has("title")) updateData.title = formData.get("title")?.toString().trim();
      if (formData.has("slug")) updateData.slug = formData.get("slug")?.toString().trim();
      if (formData.has("issuer")) updateData.issuer = formData.get("issuer")?.toString().trim();
      if (formData.has("objectLink"))
        updateData.objectLink = formData.get("objectLink")?.toString().trim();
      if (formData.has("description"))
        updateData.description = formData.get("description")?.toString().trim() || null;
      if (formData.has("credentialLink"))
        updateData.credentialLink = formData.get("credentialLink")?.toString().trim() || null;
      if (formData.has("verificationUrl"))
        updateData.credentialLink = formData.get("verificationUrl")?.toString().trim() || null;

      if (formData.has("issueDate") || formData.has("issuedAt")) {
        const dateStr =
          (formData.get("issueDate") || formData.get("issuedAt"))?.toString().trim() || "";
        updateData.issueDate = dateStr;
      }

      // Check for replacement certificate file
      const certFile =
        formData.get("certificateFile") || formData.get("certificate") || formData.get("file");
      if (certFile && certFile instanceof File && certFile.size > 0) {
        if (!isR2Configured()) {
          return NextResponse.json(
            {
              success: false,
              error: { code: "R2_NOT_CONFIGURED", message: "R2 is not configured" },
            },
            { status: 503 }
          );
        }

        const validatedCert = await validateCredentialFile(certFile, {
          maxSizeBytes: DEFAULT_MAX_CERT_SIZE,
          allowedTypes: ["pdf", "png", "jpg", "jpeg", "webp"],
        });

        const key = generateSafeStorageKey(numId, "certificate", validatedCert.extension);
        const uploadResult = await uploadToR2({
          file: validatedCert.buffer,
          key,
          contentType: validatedCert.mimeType,
        });

        newlyUploadedKeys.push(uploadResult.key);
        updateData.objectLink = uploadResult.url;
        if (existing.objectLink) {
          oldKeysToDelete.push(existing.objectLink);
        }
      }

      const parsed = UpdateJsonSchema.parse(updateData);
      const validatedUpdate = {
        ...parsed,
        slug: parsed.slug || undefined,
        issueDate: parsed.issueDate ? new Date(parsed.issueDate) : undefined,
      };

      // Update in DB
      try {
        const updated = await updateCredential(numId, validatedUpdate);
        if (!updated) throw new Error("Credential no longer exists");

        // Delete old replaced assets from R2
        await Promise.allSettled(oldKeysToDelete.map((k) => deleteFromR2(k)));

        revalidatePath("/credentials");
        revalidatePath(`/credentials/${numId}`);
        revalidatePath(`/credentials/${existing.slug}`);
        if (updated?.slug) revalidatePath(`/credentials/${updated.slug}`);
        revalidatePath("/");
        revalidatePath("/api/credentials");

        return NextResponse.json({
          success: true,
          data: updated,
        });
      } catch (dbErr) {
        // Rollback: delete new files if DB update failed
        await Promise.allSettled(newlyUploadedKeys.map((k) => deleteFromR2(k)));
        logger.error("Database error updating credential", { id: numId, error: dbErr });
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "DATABASE_ERROR",
              message: "Failed to persist credential updates",
            },
          },
          { status: 500 }
        );
      }
    } catch (uploadErr) {
      await Promise.allSettled(newlyUploadedKeys.map((k) => deleteFromR2(k)));
      logger.error("Error processing multipart credential payload", {
        id: numId,
        error: uploadErr,
      });
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UPDATE_FAILED",
            message: "Invalid file or payload",
          },
        },
        { status: uploadErr instanceof PayloadTooLargeError ? 413 : 400 }
      );
    }
  }

  // 2. JSON Update
  if (contentType.includes("application/json")) {
    try {
      const body = await readCredentialJson(request);
      const parsed = UpdateJsonSchema.parse(body);

      const updateData: Record<string, unknown> = {};
      if (parsed.slug) updateData.slug = parsed.slug;
      if (parsed.title !== undefined) updateData.title = parsed.title;
      if (parsed.issuer !== undefined) updateData.issuer = parsed.issuer;
      if (parsed.description !== undefined) updateData.description = parsed.description;
      if (parsed.issueDate !== undefined) updateData.issueDate = new Date(parsed.issueDate);
      if (parsed.objectLink !== undefined) updateData.objectLink = parsed.objectLink;
      if (parsed.credentialLink !== undefined)
        updateData.credentialLink = parsed.credentialLink || null;

      const updated = await updateCredential(numId, updateData);
      if (!updated)
        return NextResponse.json(
          { success: false, error: { code: "NOT_FOUND", message: "Credential not found" } },
          { status: 404 }
        );

      revalidatePath("/credentials");
      revalidatePath(`/credentials/${numId}`);
      revalidatePath(`/credentials/${existing.slug}`);
      if (updated?.slug) revalidatePath(`/credentials/${updated.slug}`);
      revalidatePath("/");
      revalidatePath("/api/credentials");

      return NextResponse.json({
        success: true,
        data: updated,
      });
    } catch (err) {
      if (err instanceof PayloadTooLargeError || err instanceof SyntaxError) {
        return NextResponse.json(
          {
            success: false,
            error: { code: "INVALID_PAYLOAD", message: "Invalid request payload" },
          },
          { status: err instanceof PayloadTooLargeError ? 413 : 400 }
        );
      }
      if (err instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "VALIDATION_FAILED",
              issues: err.issues,
            },
          },
          { status: 400 }
        );
      }

      logger.error("Failed to update credential via JSON", { id: numId, error: err });
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "DATABASE_ERROR",
            message: "Failed to update credential",
          },
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: { code: "UNSUPPORTED_MEDIA_TYPE", message: "Unsupported content type" },
    },
    { status: 415 }
  );
}

/**
 * DELETE /api/credentials/:id
 * Deletes credential record from DB and deletes all associated R2 storage objects.
 */
export async function DELETE(request: NextRequest, context: RouteContext) {
  const ip = extractClientIdentifier(request);
  const rlKey = createRateLimitKey("credentials_admin_delete", ip);
  const rl = await checkRateLimit(rlKey, 30, 60000);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: { code: "RATE_LIMITED", message: "Too many requests" } },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  const auth = await validateAdminRequest(request);
  if (!auth.authorized) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNAUTHORIZED", message: auth.error || "Admin access required" },
      },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const numId = parseCredentialId(id);
  if (numId === null) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_ID", message: "Invalid credential ID" } },
      { status: 400 }
    );
  }

  const existing = await getCredentialById(numId);
  if (!existing) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "Credential not found" } },
      { status: 404 }
    );
  }

  // 1. Delete DB record first to protect against orphaned asset loss
  try {
    await deleteCredential(numId);
  } catch (error) {
    logger.error("Failed to delete credential record from DB", {
      id: numId,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DELETE_FAILED",
          message: "Failed to delete credential record",
        },
      },
      { status: 500 }
    );
  }

  // 2. Clean up associated R2 asset after DB deletion succeeds
  const r2DeletionErrors: string[] = [];
  if (existing.objectLink) {
    const res = await deleteFromR2(existing.objectLink);
    if (!res.success && isR2Configured()) {
      r2DeletionErrors.push(`Failed to remove certificate file: ${res.key}`);
    }
  }

  revalidatePath("/credentials");
  revalidatePath(`/credentials/${numId}`);
  if (existing.slug) revalidatePath(`/credentials/${existing.slug}`);
  revalidatePath("/");
  revalidatePath("/api/credentials");
  revalidatePath("/api/credentials/count");

  return NextResponse.json({
    success: true,
    message: "Credential deleted successfully",
    warnings: r2DeletionErrors.length > 0 ? r2DeletionErrors : undefined,
  });
}
