/**
 * Credentials Data Access Layer
 *
 * Centralized data access methods for verified credentials stored in Neon PostgreSQL.
 * Aligns with existing patterns in src/lib/blogs.ts and src/lib/case-studies.ts.
 */

import { eq, desc, sql } from "drizzle-orm";
import { ensureDatabaseReady, getDb } from "@/db";
import { credentials, type Credential, type NewCredential } from "@/db/schema";
import { logger } from "@/lib/logger";
import { slugifyTitle, formatEditorialDate } from "./credential-utils";

export { slugifyTitle, formatEditorialDate };

const SKIP_DB_BUILD = process.env.SKIP_DB_BUILD === "true" || process.env.SKIP_DB === "true";

/**
 * Retrieve all credentials ordered by issued date (newest first) and ID.
 * Returns empty array if database is empty or unavailable.
 */
export async function getAllCredentials(): Promise<Credential[]> {
  if (SKIP_DB_BUILD) return [];

  try {
    await ensureDatabaseReady();
    const db = getDb();

    return await db
      .select()
      .from(credentials)
      .orderBy(desc(credentials.issueDate), desc(credentials.id));
  } catch (error) {
    logger.warn("Failed to query credentials from DB, returning empty list", {
      error: error instanceof Error ? error.message : String(error),
    });
    return [];
  }
}

/**
 * Retrieve the total count of credential records in the database.
 * Executes an efficient COUNT(*) query without fetching whole rows.
 */
export async function getCredentialsCount(): Promise<number> {
  if (SKIP_DB_BUILD) return 0;

  try {
    await ensureDatabaseReady();
    const db = getDb();

    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(credentials);

    return Number(result[0]?.count ?? 0);
  } catch (error) {
    logger.warn("Failed to query credentials count from DB, returning 0", {
      error: error instanceof Error ? error.message : String(error),
    });
    return 0;
  }
}

/**
 * Retrieve a single credential by its primary key ID.
 */
export async function getCredentialById(id: number): Promise<Credential | null> {
  if (SKIP_DB_BUILD || !Number.isInteger(id) || id <= 0) return null;

  try {
    await ensureDatabaseReady();
    const db = getDb();

    const rows = await db
      .select()
      .from(credentials)
      .where(eq(credentials.id, id))
      .limit(1);

    return rows[0] ?? null;
  } catch (error) {
    logger.warn("Failed to query credential by ID from DB", {
      id,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/**
 * Retrieve a single credential by its URL slug or title slug.
 */
export async function getCredentialBySlug(slug: string): Promise<Credential | null> {
  if (SKIP_DB_BUILD || !slug?.trim()) return null;

  const normalized = slug.trim().toLowerCase();

  try {
    await ensureDatabaseReady();
    const db = getDb();

    // 1. Direct match on slug column
    const rows = await db
      .select()
      .from(credentials)
      .where(eq(credentials.slug, normalized))
      .limit(1);

    if (rows.length > 0) return rows[0];

    // 2. Fallback: match by slugified title across records
    const all = await db.select().from(credentials);
    const matched = all.find((c) => slugifyTitle(c.title) === normalized);
    return matched ?? null;
  } catch (error) {
    logger.warn("Failed to query credential by slug from DB", {
      slug,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/**
 * Retrieve a credential by either slug or numeric ID (handles backward compatibility).
 */
export async function getCredentialBySlugOrId(slugOrId: string | number): Promise<Credential | null> {
  if (SKIP_DB_BUILD || slugOrId === undefined || slugOrId === null) return null;

  const stringVal = String(slugOrId).trim();
  if (!stringVal) return null;

  // If it's a numeric ID, try lookup by ID first
  const numId = parseInt(stringVal, 10);
  if (!isNaN(numId) && String(numId) === stringVal && numId > 0) {
    const byId = await getCredentialById(numId);
    if (byId) return byId;
  }

  // Otherwise, lookup by slug
  return await getCredentialBySlug(stringVal);
}

/**
 * Retrieve all valid credential slugs for static params generation.
 */
export async function getAllCredentialSlugs(): Promise<string[]> {
  if (SKIP_DB_BUILD) return [];

  try {
    await ensureDatabaseReady();
    const db = getDb();

    const rows = await db.select({ slug: credentials.slug, title: credentials.title }).from(credentials);
    return rows.map((r) => r.slug || slugifyTitle(r.title)).filter(Boolean);
  } catch (error) {
    logger.warn("Failed to query credential slugs from DB", {
      error: error instanceof Error ? error.message : String(error),
    });
    return [];
  }
}

/**
 * Insert a new credential record into the database.
 */
export async function createCredential(data: NewCredential): Promise<Credential> {
  await ensureDatabaseReady();
  const db = getDb();

  const slug = data.slug || slugifyTitle(data.title);

  const [inserted] = await db
    .insert(credentials)
    .values({
      ...data,
      slug,
      updatedAt: new Date(),
    })
    .returning();

  if (!inserted) {
    throw new Error("Failed to insert credential record");
  }

  return inserted;
}

/**
 * Update an existing credential by ID.
 */
export async function updateCredential(
  id: number,
  data: Partial<NewCredential>
): Promise<Credential | null> {
  await ensureDatabaseReady();
  const db = getDb();

  const updatePayload: Partial<NewCredential> = {
    ...data,
    updatedAt: new Date(),
  };

  if (data.title && !data.slug) {
    updatePayload.slug = slugifyTitle(data.title);
  }

  const [updated] = await db
    .update(credentials)
    .set(updatePayload)
    .where(eq(credentials.id, id))
    .returning();

  return updated ?? null;
}

/**
 * Delete a credential record by ID. Returns the deleted record or null.
 */
export async function deleteCredential(id: number): Promise<Credential | null> {
  await ensureDatabaseReady();
  const db = getDb();

  const [deleted] = await db
    .delete(credentials)
    .where(eq(credentials.id, id))
    .returning();

  return deleted ?? null;
}
