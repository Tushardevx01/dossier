/**
 * Case Studies Data Layer
 *
 * Provides type-safe queries for technical case studies from Neon PostgreSQL.
 * Includes build-time static fallback for offline and CI environments.
 *
 * Query purposes are kept separate:
 * - getAllCaseStudySlugs(): slug-only listing (lightest)
 * - getAllCaseStudies():   metadata listing (excludes the large content column)
 * - getCaseStudyBySlug():  full record including content (detail pages only)
 */

import { cache } from 'react';
import { asc, eq, and } from 'drizzle-orm';
import { ensureDatabaseReady, getDb } from '@/db';
import { sanitizeHtml } from '@/lib/sanitize';
import { caseStudies, type CaseStudy } from '@/db/schema';
import { caseStudiesMeta, type CaseStudyRecord } from '@/lib/case-studies-meta';

const SKIP_DB_BUILD = process.env.SKIP_DB_BUILD === 'true' || process.env.SKIP_DB === 'true';

function mapCaseStudyRow(row: CaseStudy): CaseStudyRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    excerpt: row.excerpt,
    content: sanitizeHtml(row.content),
    category: row.category,
    level: row.level,
    readTime: row.readTime,
    date: row.date,
    tags: Array.isArray(row.tags) ? row.tags : [],
    published: row.published,
    featured: row.featured,
    whatILearned: Array.isArray(row.whatILearned) ? row.whatILearned : [],
    improvements: Array.isArray(row.improvements) ? row.improvements : [],
    relatedNoteSlugs: Array.isArray(row.relatedNoteSlugs) ? row.relatedNoteSlugs : [],
    relatedProjectSlug: row.relatedProjectSlug,
    relatedSystemDesignSlug: row.relatedSystemDesignSlug,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Get all published case studies sorted by ID.
 *
 * Listing query: intentionally excludes the `content` column (~170KB per
 * record). Detail pages must use getCaseStudyBySlug() to fetch full content.
 */
export const getAllCaseStudies = cache(async (): Promise<CaseStudyRecord[]> => {
  if (SKIP_DB_BUILD || !process.env.DATABASE_URL) {
    return caseStudiesMeta.filter((cs) => cs.published);
  }

  try {
    await ensureDatabaseReady();
    const db = getDb();
    const rows = await db
      .select({
        id: caseStudies.id,
        slug: caseStudies.slug,
        title: caseStudies.title,
        subtitle: caseStudies.subtitle,
        excerpt: caseStudies.excerpt,
        // content intentionally excluded from listing queries
        category: caseStudies.category,
        level: caseStudies.level,
        readTime: caseStudies.readTime,
        date: caseStudies.date,
        tags: caseStudies.tags,
        published: caseStudies.published,
        featured: caseStudies.featured,
        whatILearned: caseStudies.whatILearned,
        improvements: caseStudies.improvements,
        relatedNoteSlugs: caseStudies.relatedNoteSlugs,
        relatedProjectSlug: caseStudies.relatedProjectSlug,
        relatedSystemDesignSlug: caseStudies.relatedSystemDesignSlug,
        createdAt: caseStudies.createdAt,
        updatedAt: caseStudies.updatedAt,
      })
      .from(caseStudies)
      .where(eq(caseStudies.published, true))
      .orderBy(asc(caseStudies.id));

    if (rows.length === 0) {
      return caseStudiesMeta.filter((cs) => cs.published);
    }

    return rows.map((row) => ({
      ...row,
      // Placeholder for the excluded content column; full content is only
      // ever fetched via getCaseStudyBySlug().
      content: '',
      tags: Array.isArray(row.tags) ? row.tags : [],
      whatILearned: Array.isArray(row.whatILearned) ? row.whatILearned : [],
      improvements: Array.isArray(row.improvements) ? row.improvements : [],
      relatedNoteSlugs: Array.isArray(row.relatedNoteSlugs) ? row.relatedNoteSlugs : [],
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.warn('Failed to query case_studies from DB, falling back to static cache:', error);
    return caseStudiesMeta.filter((cs) => cs.published);
  }
});

/**
 * Get a single case study by slug (full record, including content).
 */
export const getCaseStudyBySlug = cache(async (slug: string): Promise<CaseStudyRecord | null> => {
  const normalizedSlug = slug.trim().toLowerCase();

  // Static fallback helper — uses the in-memory meta array (which has empty
  // content, but prevents crashes when the DB is unreachable).
  const findInStaticMeta = (): CaseStudyRecord | null =>
    caseStudiesMeta.find((cs) => cs.slug.toLowerCase() === normalizedSlug && cs.published) ?? null;

  if (SKIP_DB_BUILD || !process.env.DATABASE_URL) {
    return findInStaticMeta();
  }

  try {
    await ensureDatabaseReady();
    const db = getDb();
    const rows = await db
      .select()
      .from(caseStudies)
      .where(and(eq(caseStudies.slug, normalizedSlug), eq(caseStudies.published, true)))
      .limit(1);

    if (rows.length === 0) {
      return findInStaticMeta();
    }

    return mapCaseStudyRow(rows[0]);
  } catch (error) {
    console.warn(`Failed to fetch case study ${slug} from DB, falling back to static cache:`, error);
    return findInStaticMeta();
  }
});

/**
 * Get all valid case study slugs for static params generation.
 *
 * Dedicated slug-only query: avoid routing static params through the
 * metadata listing (and definitely not through the content column).
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  if (SKIP_DB_BUILD || !process.env.DATABASE_URL) {
    return caseStudiesMeta.filter((cs) => cs.published).map((cs) => cs.slug);
  }

  try {
    await ensureDatabaseReady();
    const db = getDb();
    const rows = await db
      .select({ slug: caseStudies.slug })
      .from(caseStudies)
      .where(eq(caseStudies.published, true))
      .orderBy(asc(caseStudies.id));

    if (rows.length === 0) {
      return caseStudiesMeta.filter((cs) => cs.published).map((cs) => cs.slug);
    }

    return rows.map((row) => row.slug);
  } catch (error) {
    console.warn('Failed to query case_studies slugs from DB, falling back to static cache:', error);
    return caseStudiesMeta.filter((cs) => cs.published).map((cs) => cs.slug);
  }
}
