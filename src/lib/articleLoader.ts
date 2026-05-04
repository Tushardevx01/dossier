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
  getNotesByCategory,
  getAllNoteSlugs,
  getFeaturedNotes,
  getRelatedNotes,
  getNoteCount,
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
 * Total published article count
 *
 * ASYNC - Must be called with await
 * @example const count = await getTotalArticleCount();
 */
export async function getTotalArticleCount(): Promise<number> {
  return getNoteCount();
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

/**
 * Filter articles by category
 *
 * ASYNC - Must be called with await
 * @example const posts = await filterArticlesByCategory('Architecture');
 */
export async function filterArticlesByCategory(
  category: CategoryFilter
): Promise<ArticleMetadata[]> {
  if (category === "All") {
    return getAllNotes();
  }
  return getNotesByCategory(category);
}

/**
 * Get featured articles for homepage
 *
 * ASYNC - Must be called with await
 * @example const featured = await getFeaturedArticles();
 */
export async function getFeaturedArticles(limit = 6): Promise<ArticleMetadata[]> {
  return getFeaturedNotes(limit);
}

/**
 * Get related articles by category
 *
 * ASYNC - Must be called with await
 * @example const related = await getRelatedArticles('Full-Stack', 'current-slug', 2);
 */
export async function getRelatedArticles(
  category: CategoryFilter,
  excludeSlug: string,
  limit = 2
): Promise<ArticleMetadata[]> {
  if (category === "All") return [];
  return getRelatedNotes(category, excludeSlug, limit);
}

/**
 * Check if database connection is working
 *
 * Useful for health checks and startup verification.
 * ASYNC - Must be called with await
 */
export async function verifyDatabaseConnection(): Promise<boolean> {
  try {
    await getNoteCount();
    return true;
  } catch {
    return false;
  }
}
