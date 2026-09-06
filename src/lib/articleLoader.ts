/**
 * Article Data Layer (Updated for Neon PostgreSQL)
 *
 * Now fetches from Neon PostgreSQL instead of hardcoded files.
 * Maintains backward compatibility with existing route handlers.
 *
 * IMPORTANT: All functions are now ASYNC and must be called with await.
 */

import {
  getAllNotes,
  getNoteBySlug,
  getCategories,
  getAllNoteSlugs,
} from "@/lib/blogs";
import type {
  ArticleMetadata,
  ArticlePost,
  CategoryFilter,
} from "@/types/article";

// Re-export types so consumers import from one place
export type { ArticleMetadata, ArticlePost, CategoryFilter };

// ─── Public API (All ASYNC) ──────────────────────────────────────────────────

/**
 * Get all published articles sorted by date (newest first)
 *
 * ASYNC - Must be called with await
 * @example const posts = await getAllArticles();
 */
export async function getAllArticles(): Promise<ArticleMetadata[]> {
  return getAllNotes();
}

/**
 * Get a single article by slug with full content
 *
 * ASYNC - Must be called with await
 * @example const post = await getArticle('my-article-slug');
 */
export async function getArticle(slug: string): Promise<ArticlePost | null> {
  return getNoteBySlug(slug);
}

/**
 * Get all available categories
 *
 * ASYNC - Must be called with await
 * @example const categories = await getArticleCategories();
 */
export async function getArticleCategories(): Promise<CategoryFilter[]> {
  const categories = await getCategories();
  return ["All", ...categories];
}

/**
 * Generate static params for Next.js SSG
 *
 * ASYNC - Must be called with await
 * @example export const generateStaticParams = generateArticleStaticParams;
 */
export async function generateArticleStaticParams(): Promise<{ slug: string }[]> {
  return getAllNoteSlugs();
}

