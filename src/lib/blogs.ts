/**
 * Blog/Engineering Notes Data Layer
 *
 * Provides clean, type-safe queries for engineering notes from Neon PostgreSQL.
 * Replaces the hardcoded articlesData approach.
 *
 * Functions:
 * - getAllNotes(published?)     → list all notes (optionally filter by published status)
 * - getNoteBySlug(slug)        → fetch single note by slug
 * - getFeaturedNotes()         → fetch featured articles for homepage
 * - getRelatedNotes(slug, limit) → get notes related to a given slug
 * - getCategories()            → get all unique categories
 * - getNotesByCategory()       → filter by category
 */

import { getDb } from '@/db';
import { engineeringNotes } from '@/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import type {
  ArticleCategory,
  ArticleDifficulty,
  ArticleMetadata,
  ArticlePost,
} from '@/types/article';

/**
 * Get all published notes sorted by date (newest first)
 */
export async function getAllNotes(): Promise<ArticleMetadata[]> {
  const db = getDb();
  
  const notes = await db
    .select({
      slug: engineeringNotes.slug,
      id: engineeringNotes.id,
      title: engineeringNotes.title,
      subtitle: engineeringNotes.subtitle,
      date: engineeringNotes.date,
      readTime: engineeringNotes.readTime,
      category: engineeringNotes.category,
      description: engineeringNotes.description,
      difficulty: engineeringNotes.difficulty,
    })
    .from(engineeringNotes)
    .where(eq(engineeringNotes.published, true))
    .orderBy(desc(sql`CAST(DATE_PART('year', TO_DATE(${engineeringNotes.date}, 'Mon DD, YYYY')) AS INTEGER) || '-' || LPAD(CAST(DATE_PART('month', TO_DATE(${engineeringNotes.date}, 'Mon DD, YYYY')) AS INTEGER) AS TEXT, 2, '0')`));
  
  return notes.map(note => ({
    ...note,
    id: String(note.id),
  }));
}

/**
 * Get a single note by slug with full content
 */
export async function getNoteBySlug(slug: string): Promise<ArticlePost | null> {
  const db = getDb();
  
  const note = await db
    .select()
    .from(engineeringNotes)
    .where(and(
      eq(engineeringNotes.slug, slug),
      eq(engineeringNotes.published, true)
    ))
    .limit(1)
    .then(rows => rows[0]);

  if (!note) {
    return null;
  }

  return {
    slug: note.slug,
    id: String(note.id),
    title: note.title,
    subtitle: note.subtitle,
    date: note.date,
    readTime: note.readTime,
    category: note.category as ArticleCategory,
    description: note.description,
    difficulty: note.difficulty as ArticleDifficulty,
    content: note.content, // Markdown content - render on client
    whatILearned: note.whatILearned || [],
    improvements: note.improvements || [],
    relatedNoteSlugs: note.relatedNoteSlugs,
    relatedProjectSlug: note.relatedProjectSlug || undefined,
    relatedSystemDesignSlug: note.relatedSystemDesignSlug || undefined,
  };
}

/**
 * Get featured notes for homepage
 */
export async function getFeaturedNotes(limit = 6): Promise<ArticleMetadata[]> {
  const db = getDb();
  
  const notes = await db
    .select({
      slug: engineeringNotes.slug,
      id: engineeringNotes.id,
      title: engineeringNotes.title,
      subtitle: engineeringNotes.subtitle,
      date: engineeringNotes.date,
      readTime: engineeringNotes.readTime,
      category: engineeringNotes.category,
      description: engineeringNotes.description,
      difficulty: engineeringNotes.difficulty,
    })
    .from(engineeringNotes)
    .where(and(
      eq(engineeringNotes.published, true),
      eq(engineeringNotes.featured, true)
    ))
    .orderBy(desc(engineeringNotes.createdAt))
    .limit(limit);

  return notes.map(note => ({
    ...note,
    id: String(note.id),
  }));
}

/**
 * Get related notes by category (excluding the given slug)
 */
export async function getRelatedNotes(
  category: ArticleCategory,
  excludeSlug: string,
  limit = 2
): Promise<ArticleMetadata[]> {
  const db = getDb();
  
  const notes = await db
    .select({
      slug: engineeringNotes.slug,
      id: engineeringNotes.id,
      title: engineeringNotes.title,
      subtitle: engineeringNotes.subtitle,
      date: engineeringNotes.date,
      readTime: engineeringNotes.readTime,
      category: engineeringNotes.category,
      description: engineeringNotes.description,
      difficulty: engineeringNotes.difficulty,
    })
    .from(engineeringNotes)
    .where(and(
      eq(engineeringNotes.published, true),
      eq(engineeringNotes.category, category),
      sql`${engineeringNotes.slug} != ${excludeSlug}`
    ))
    .orderBy(desc(engineeringNotes.createdAt))
    .limit(limit);

  return notes.map(note => ({
    ...note,
    id: String(note.id),
  }));
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<ArticleCategory[]> {
  const db = getDb();
  
  const categories = await db
    .selectDistinct({ category: engineeringNotes.category })
    .from(engineeringNotes)
    .where(eq(engineeringNotes.published, true))
    .orderBy(engineeringNotes.category);

  return categories.map(c => c.category as ArticleCategory);
}

/**
 * Filter notes by category
 */
export async function getNotesByCategory(category: ArticleCategory): Promise<ArticleMetadata[]> {
  const db = getDb();
  
  const notes = await db
    .select({
      slug: engineeringNotes.slug,
      id: engineeringNotes.id,
      title: engineeringNotes.title,
      subtitle: engineeringNotes.subtitle,
      date: engineeringNotes.date,
      readTime: engineeringNotes.readTime,
      category: engineeringNotes.category,
      description: engineeringNotes.description,
      difficulty: engineeringNotes.difficulty,
    })
    .from(engineeringNotes)
    .where(and(
      eq(engineeringNotes.published, true),
      eq(engineeringNotes.category, category)
    ))
    .orderBy(desc(engineeringNotes.createdAt));

  return notes.map(note => ({
    ...note,
    id: String(note.id),
  }));
}

/**
 * Get total count of published notes
 */
export async function getNoteCount(): Promise<number> {
  const db = getDb();
  
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(engineeringNotes)
    .where(eq(engineeringNotes.published, true))
    .then(rows => rows[0]);

  return result?.count || 0;
}

/**
 * Get all notes for generating static params (for SSG)
 */
export async function getAllNoteSlugs(): Promise<{ slug: string }[]> {
  const db = getDb();
  
  const notes = await db
    .select({ slug: engineeringNotes.slug })
    .from(engineeringNotes)
    .where(eq(engineeringNotes.published, true));

  return notes;
}
