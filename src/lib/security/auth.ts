/**
 * API Key Authentication
 *
 * Validates API keys for protected endpoints.
 * Uses SHA-256 hashing for secure key storage and comparison.
 */

import { createHash, timingSafeEqual } from "node:crypto";
import { getDb } from '@/db';
import { apiKeys } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sql } from "drizzle-orm";
import { logger } from "@/lib/logger";

export interface ApiKeyValidation {
  valid: boolean;
  keyId?: number;
  permissions?: {
    analyze?: boolean;
    rateLimit?: number;
    admin?: boolean;
    credentials?: boolean;
  };
  error?: string;
}

/**
 * Validate an API key
 */
export async function validateApiKey(apiKey: string): Promise<ApiKeyValidation> {
  if (!apiKey || typeof apiKey !== "string") {
    return { valid: false, error: "Invalid credentials" };
  }

  // Apply hard bounds to avoid oversized header abuse and malformed values.
  const normalizedApiKey = apiKey.trim();
  if (normalizedApiKey.length < 16 || normalizedApiKey.length > 256) {
    return { valid: false, error: "Invalid credentials" };
  }

  try {
    const db = getDb();
    const hashedKey = createHash("sha256").update(normalizedApiKey).digest("hex");
    const result = await db
      .select({
        id: apiKeys.id,
        permissions: apiKeys.permissions,
        active: apiKeys.active,
        expiresAt: apiKeys.expiresAt,
      })
      .from(apiKeys)
      .where(eq(apiKeys.keyHash, hashedKey))
      .limit(1);

    if (result.length === 0) {
      return { valid: false, error: "Invalid credentials" };
    }

    const key = result[0];

    if (!key.active) {
      return { valid: false, error: "Invalid credentials" };
    }

    if (key.expiresAt && new Date() > key.expiresAt) {
      return { valid: false, error: "Invalid credentials" };
    }

    // Update last used and usage count
    await db
      .update(apiKeys)
      .set({
        lastUsed: new Date(),
        usageCount: sql`${apiKeys.usageCount} + 1`,
      })
      .where(eq(apiKeys.id, key.id));

    return {
      valid: true,
      keyId: key.id,
      permissions: key.permissions,
    };
  } catch (error) {
    logger.error("API key validation failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return { valid: false, error: "Authentication service unavailable" };
  }
}

/**
 * Extract API key from request headers
 */
export function extractApiKey(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    return token.length > 0 ? token : null;
  }

// Also check X-API-Key header
  const apiKey = request.headers.get("x-api-key")?.trim();
  return apiKey && apiKey.length > 0 ? apiKey : null;
}

/**
 * Validate that an incoming request possesses administrative privileges.
 * Checks against ADMIN_API_KEY environment secret or validated database API keys.
 */
export async function validateAdminRequest(
  request: Request
): Promise<{ authorized: boolean; error?: string }> {
  const apiKey = extractApiKey(request);
  if (!apiKey) {
    return {
      authorized: false,
      error: "Authentication required. Provide Authorization: Bearer <key> or X-API-Key header",
    };
  }

  // 1. Check direct ADMIN_API_KEY environment variable if defined
  const adminSecret = process.env.ADMIN_API_KEY?.trim();
  if (adminSecret && adminSecret.length > 0) {
    const keyHash = createHash("sha256").update(apiKey).digest();
    const adminHash = createHash("sha256").update(adminSecret).digest();
    if (timingSafeEqual(keyHash, adminHash)) {
      return { authorized: true };
    }
  }

  // 2. Validate against api_keys table in database
  const keyValidation = await validateApiKey(apiKey);
  if (!keyValidation.valid) {
    return {
      authorized: false,
      error: keyValidation.error || "Invalid administrator credentials",
    };
  }

  // Check role-based capabilities
  if (
    keyValidation.permissions?.admin === true ||
    keyValidation.permissions?.credentials === true
  ) {
    return { authorized: true };
  }

  return {
    authorized: false,
    error: "Insufficient permissions. Admin or credentials capability required",
  };
}