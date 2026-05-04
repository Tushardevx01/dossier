/**
 * Blog/Engineering Notes Data Layer
 *
 * Provides clean, type-safe queries for engineering notes from Neon PostgreSQL.
 * Replaces the hardcoded articlesData approach.
 */

import { and, desc, eq, sql } from 'drizzle-orm';

import { ensureDatabaseReady, getDb } from '@/db';
import { engineeringNotes } from '@/db/schema';
import type {
  ArticleCategory,
  ArticleDifficulty,
  ArticleMetadata,
  ArticlePost,
} from '@/types/article';

type NoteRow = {
  slug: string;
  id: number;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: ArticleCategory;
  level: ArticleDifficulty;
};

type NotePostRow = NoteRow & {
  content: string;
  whatILearned: string[] | null;
  improvements: string[] | null;
  relatedNoteSlugs: string[] | null;
  relatedProjectSlug: string | null;
  relatedSystemDesignSlug: string | null;
};

// When building inside Docker or CI without a reachable DB, set SKIP_DB_BUILD=true
// to allow the Next.js build to complete without attempting to connect to the database.
// This prevents build-time DB access while keeping runtime DB behavior unchanged.
const SKIP_DB_BUILD = process.env.SKIP_DB_BUILD === 'true' || process.env.SKIP_DB === 'true';

function mapMetadata(note: NoteRow): ArticleMetadata {
  return {
    slug: note.slug,
    id: String(note.id),
    title: note.title,
    subtitle: note.subtitle,
    date: note.date,
    readTime: note.readTime,
    category: note.category,
    description: note.excerpt,
    difficulty: note.level,
  };
}

function mapPost(note: NotePostRow): ArticlePost {
  return {
    slug: note.slug,
    id: String(note.id),
    title: note.title,
    subtitle: note.subtitle,
    date: note.date,
    readTime: note.readTime,
    category: note.category,
    description: note.excerpt,
    difficulty: note.level,
    content: note.content,
    whatILearned: note.whatILearned ?? [],
    improvements: note.improvements ?? [],
    relatedNoteSlugs: note.relatedNoteSlugs ?? undefined,
    relatedProjectSlug: note.relatedProjectSlug ?? undefined,
    relatedSystemDesignSlug: note.relatedSystemDesignSlug ?? undefined,
  };
}

/**
 * Get all published notes sorted by featured first and newest first.
 */
export async function getAllNotes(): Promise<ArticleMetadata[]> {
  if (SKIP_DB_BUILD) return [];

  await ensureDatabaseReady();
  const db = getDb();

  const notes = await db
    .select({
      slug: engineeringNotes.slug,
      id: engineeringNotes.id,
      title: engineeringNotes.title,
      subtitle: engineeringNotes.subtitle,
      excerpt: engineeringNotes.excerpt,
      date: engineeringNotes.date,
      readTime: engineeringNotes.readTime,
      category: engineeringNotes.category,
      level: engineeringNotes.level,
    })
    .from(engineeringNotes)
    .where(eq(engineeringNotes.published, true))
    .orderBy(desc(engineeringNotes.featured), desc(engineeringNotes.createdAt), desc(engineeringNotes.id));

  return notes.map(mapMetadata);
}

/**
 * Get a single note by slug with full content.
 */
export async function getNoteBySlug(slug: string): Promise<ArticlePost | null> {
  if (SKIP_DB_BUILD) return null;

  await ensureDatabaseReady();
  const db = getDb();
  const normalizedSlug = slug.trim().toLowerCase();

  const note = await db
    .select({
      slug: engineeringNotes.slug,
      id: engineeringNotes.id,
      title: engineeringNotes.title,
      subtitle: engineeringNotes.subtitle,
      excerpt: engineeringNotes.excerpt,
      date: engineeringNotes.date,
      content: engineeringNotes.content,
      readTime: engineeringNotes.readTime,
      category: engineeringNotes.category,
      level: engineeringNotes.level,
      whatILearned: engineeringNotes.whatILearned,
      improvements: engineeringNotes.improvements,
      relatedNoteSlugs: engineeringNotes.relatedNoteSlugs,
      relatedProjectSlug: engineeringNotes.relatedProjectSlug,
      relatedSystemDesignSlug: engineeringNotes.relatedSystemDesignSlug,
    })
    .from(engineeringNotes)
    .where(and(eq(engineeringNotes.slug, normalizedSlug), eq(engineeringNotes.published, true)))
    .limit(1)
      .then((rows: Array<{ slug: string; id: number; title: string; subtitle: string; excerpt: string; date: string; content: string; readTime: number; category: ArticleCategory; level: ArticleDifficulty; whatILearned: string[] | null; improvements: string[] | null; relatedNoteSlugs: string[] | null; relatedProjectSlug: string | null; relatedSystemDesignSlug: string | null; }>) => rows[0]);

  if (!note) {
    return null;
  }

  return mapPost(note as NotePostRow);
}

/**
 * Get featured notes for homepage.
 */
export async function getFeaturedNotes(limit = 6): Promise<ArticleMetadata[]> {
  if (SKIP_DB_BUILD) return [];

  await ensureDatabaseReady();
  const db = getDb();

  const notes = await db
    .select({
      slug: engineeringNotes.slug,
      id: engineeringNotes.id,
      title: engineeringNotes.title,
      subtitle: engineeringNotes.subtitle,
      excerpt: engineeringNotes.excerpt,
      date: engineeringNotes.date,
      readTime: engineeringNotes.readTime,
      category: engineeringNotes.category,
      level: engineeringNotes.level,
    })
    .from(engineeringNotes)
    .where(and(eq(engineeringNotes.published, true), eq(engineeringNotes.featured, true)))
    .orderBy(desc(engineeringNotes.createdAt))
    .limit(limit);

  return notes.map(mapMetadata);
}

/**
 * Get related notes by category, excluding the current slug.
 */
export async function getRelatedNotes(
  category: ArticleCategory,
  excludeSlug: string,
  limit = 2
): Promise<ArticleMetadata[]> {
  if (SKIP_DB_BUILD) return [];

  await ensureDatabaseReady();
  const db = getDb();

  const notes = await db
    .select({
      slug: engineeringNotes.slug,
      id: engineeringNotes.id,
      title: engineeringNotes.title,
      subtitle: engineeringNotes.subtitle,
      excerpt: engineeringNotes.excerpt,
      date: engineeringNotes.date,
      readTime: engineeringNotes.readTime,
      category: engineeringNotes.category,
      level: engineeringNotes.level,
    })
    .from(engineeringNotes)
    .where(
      and(
        eq(engineeringNotes.published, true),
        eq(engineeringNotes.category, category),
        sql`${engineeringNotes.slug} != ${excludeSlug}`
      )
    )
    .orderBy(desc(engineeringNotes.createdAt))
    .limit(limit);

  return notes.map(mapMetadata);
}

/**
 * Get all unique categories.
 */
export async function getCategories(): Promise<ArticleCategory[]> {
  if (SKIP_DB_BUILD) return [];

  await ensureDatabaseReady();
  const db = getDb();

  const categories = (await db
    .selectDistinct({ category: engineeringNotes.category })
    .from(engineeringNotes)
    .where(eq(engineeringNotes.published, true))
    .orderBy(engineeringNotes.category)) as Array<{ category: string }>;

  return categories.map((row: { category: string }) => row.category as ArticleCategory);
}

/**
 * Filter notes by category.
 */
export async function getNotesByCategory(category: ArticleCategory): Promise<ArticleMetadata[]> {
  if (SKIP_DB_BUILD) return [];

  await ensureDatabaseReady();
  const db = getDb();

  const notes = await db
    .select({
      slug: engineeringNotes.slug,
      id: engineeringNotes.id,
      title: engineeringNotes.title,
      subtitle: engineeringNotes.subtitle,
      excerpt: engineeringNotes.excerpt,
      date: engineeringNotes.date,
      readTime: engineeringNotes.readTime,
      category: engineeringNotes.category,
      level: engineeringNotes.level,
    })
    .from(engineeringNotes)
    .where(and(eq(engineeringNotes.published, true), eq(engineeringNotes.category, category)))
    .orderBy(desc(engineeringNotes.createdAt));

  return notes.map(mapMetadata);
}

/**
 * Get total count of published notes.
 */
export async function getNoteCount(): Promise<number> {
  if (SKIP_DB_BUILD) return 0;

  await ensureDatabaseReady();
  const db = getDb();

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(engineeringNotes)
    .where(eq(engineeringNotes.published, true))
    .then((rows: Array<{ count: number }>) => rows[0]);

  return result?.count ?? 0;
}

/**
 * Get all published note slugs for static params.
 */
export async function getAllNoteSlugs(): Promise<{ slug: string }[]> {
  if (SKIP_DB_BUILD) return [];

  await ensureDatabaseReady();
  const db = getDb();

  const notes = (await db
    .select({ slug: engineeringNotes.slug })
    .from(engineeringNotes)
    .where(eq(engineeringNotes.published, true))) as Array<{ slug: string }>;

  return notes.map((row: { slug: string }) => ({ slug: String(row.slug).trim().toLowerCase() }));
}