/**
 * Cloudflare R2 Object Storage Service
 *
 * Official S3-compatible client for Cloudflare R2.
 * Handles server-side upload, retrieval, deletion, and key normalization.
 *
 * SENSITIVE: R2 credentials must NEVER be sent to client bundles or browser responses.
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { logger } from "@/lib/logger";

interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl?: string;
}

let cachedClient: S3Client | null = null;

/**
 * Check if Cloudflare R2 environment variables are configured.
 */
export function isR2Configured(): boolean {
  const accountId = process.env.R2_ACCOUNT_ID?.trim();
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
  const bucketName = process.env.R2_BUCKET_NAME?.trim();

  return Boolean(accountId && accessKeyId && secretAccessKey && bucketName);
}

/**
 * Retrieve validated R2 configuration.
 */
function getR2Config(): R2Config {
  const accountId = process.env.R2_ACCOUNT_ID?.trim() || "";
  const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim() || "";
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim() || "";
  const bucketName = process.env.R2_BUCKET_NAME?.trim() || "";
  const publicUrl = process.env.R2_PUBLIC_URL?.trim() || "";

  if (!isR2Configured()) {
    throw new Error(
      "Cloudflare R2 storage is not configured. Missing R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, or R2_BUCKET_NAME."
    );
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl: publicUrl.replace(/\/$/, ""),
  };
}

/**
 * Get or initialize the S3Client configured for Cloudflare R2.
 */
export function getR2Client(): S3Client {
  if (cachedClient) {
    return cachedClient;
  }

  const config = getR2Config();

  cachedClient = new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  return cachedClient;
}

/**
 * Extract storage key from a full URL or relative path.
 *
 * Example:
 * "https://pub-xyz.r2.dev/credentials/42/certificate-123.pdf" -> "credentials/42/certificate-123.pdf"
 * "credentials/42/certificate-123.pdf" -> "credentials/42/certificate-123.pdf"
 */
export function extractR2Key(keyOrUrl: string): string {
  if (!keyOrUrl || typeof keyOrUrl !== "string") {
    return "";
  }

  let trimmed = keyOrUrl.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const url = new URL(trimmed);
      trimmed = url.pathname;
    } catch {
      return "";
    }
  }

  // Normalize and block traversal
  trimmed = trimmed.replace(/^\/+/, "");
  const segments = trimmed.split("/").filter(s => s !== "." && s !== "..");
  const clean = segments.join("/");

  // Enforce prefix (assuming all usage is within 'credentials/')
  if (!clean.startsWith("credentials/")) {
    return "";
  }
  return clean;
}

/**
 * Formulate public access URL for an R2 storage key.
 */
export function getPublicUrl(key: string): string {
  const cleanKey = extractR2Key(key);
  const publicBase = process.env.R2_PUBLIC_URL?.trim()?.replace(/\/$/, "");

  if (publicBase) {
    return `${publicBase}/${cleanKey}`;
  }

  // Fallback if public bucket domain is not yet configured
  return `https://${process.env.R2_BUCKET_NAME || "bucket"}.r2.dev/${cleanKey}`;
}

/**
 * Upload a binary buffer to Cloudflare R2.
 */
export async function uploadToR2(options: {
  file: Buffer | Uint8Array;
  key: string;
  contentType: string;
}): Promise<{ key: string; url: string }> {
  const config = getR2Config();
  const client = getR2Client();
  const cleanKey = extractR2Key(options.key);

  try {
    const command = new PutObjectCommand({
      Bucket: config.bucketName,
      Key: cleanKey,
      Body: options.file,
      ContentType: options.contentType,
    });

    await client.send(command);

    const publicUrl = getPublicUrl(cleanKey);

    logger.info("Successfully uploaded object to Cloudflare R2", {
      key: cleanKey,
      contentType: options.contentType,
      bytes: options.file.length,
    });

    return {
      key: cleanKey,
      url: publicUrl,
    };
  } catch (error) {
    logger.error("Failed to upload object to Cloudflare R2", {
      key: cleanKey,
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error(
      `R2 upload failed for key '${cleanKey}': ${error instanceof Error ? error.message : "Unknown error"}`,
      { cause: error }
    );
  }
}

/**
 * Delete an object from Cloudflare R2.
 * Idempotent: does not throw if object doesn't exist.
 */
export async function deleteFromR2(
  keyOrUrl: string
): Promise<{ success: boolean; key: string }> {
  const cleanKey = extractR2Key(keyOrUrl);
  if (!cleanKey) {
    return { success: false, key: "" };
  }

  if (!isR2Configured()) {
    logger.warn("Skipping R2 deletion because R2 is not configured", { key: cleanKey });
    return { success: false, key: cleanKey };
  }

  try {
    const config = getR2Config();
    const client = getR2Client();

    const command = new DeleteObjectCommand({
      Bucket: config.bucketName,
      Key: cleanKey,
    });

    await client.send(command);

    logger.info("Successfully deleted object from Cloudflare R2", { key: cleanKey });
    return { success: true, key: cleanKey };
  } catch (error) {
    logger.error("Failed to delete object from Cloudflare R2", {
      key: cleanKey,
      error: error instanceof Error ? error.message : String(error),
    });
    // Surface the failure so the caller can make the operation recoverable
    return { success: false, key: cleanKey };
  }
}

/**
 * Retrieve an object reference or stream from Cloudflare R2.
 */
export async function getR2Object(keyOrUrl: string) {
  const cleanKey = extractR2Key(keyOrUrl);
  if (!cleanKey) return null;

  const config = getR2Config();
  const client = getR2Client();

  try {
    const command = new GetObjectCommand({
      Bucket: config.bucketName,
      Key: cleanKey,
    });

    const response = await client.send(command);
    return {
      body: response.Body,
      contentType: response.ContentType,
      contentLength: response.ContentLength,
    };
  } catch (error) {
    logger.warn("Could not retrieve R2 object", {
      key: cleanKey,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}
