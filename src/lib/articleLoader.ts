/**
 * Article Data Layer
 *
 * Single source of truth for all article access.
 * Types are imported from @/types/article — never redefined here.
 *
 * Performance: metadata list is computed once per process (module-level cache).
 * At 100+ articles this avoids re-mapping on every page render.
 */

import { articlesData } from "@/data/articles";
import type {
  ArticleMetadata,
  ArticlePost,
  CategoryFilter,
  ArticleDifficulty,
} from "@/types/article";

// Re-export types so consumers can import from one place
export type { ArticleMetadata, ArticlePost, CategoryFilter };

// ─── Helpers ────────────────────────────────────────────────────────────────

function calculateDifficulty(readTime: number): ArticleDifficulty {
  if (readTime <= 8) return "Beginner";
  if (readTime <= 12) return "Intermediate";
  return "Advanced";
}

// ─── Module-level cache ─────────────────────────────────────────────────────

let _metadataCache: ArticleMetadata[] | null = null;
let _categoryCache: CategoryFilter[] | null = null;

function buildMetadataCache(): ArticleMetadata[] {
  if (_metadataCache) return _metadataCache;

  _metadataCache = Object.entries(articlesData)
    .map(([slug, article], index) => ({
      slug,
      id: String(index + 1),
      title: article.title,
      subtitle: article.subtitle,
      date: article.date,
      readTime: article.readTime,
      category: article.category,
      description: article.description,
      difficulty: article.difficulty ?? calculateDifficulty(article.readTime),
    }))
    .sort((first, second) => {
      const firstDate = new Date(first.date).getTime();
      const secondDate = new Date(second.date).getTime();
      return secondDate - firstDate;
    });

  return _metadataCache;
}

// ─── Public API ─────────────────────────────────────────────────────────────

/** Get all article metadata (cached — safe for repeated calls). */
export function getAllArticles(): ArticleMetadata[] {
  return buildMetadataCache();
}

/** Get a single article by slug. Returns null if not found. */
export function getArticle(slug: string): ArticlePost | null {
  const article = articlesData[slug];
  if (!article) return null;

  const allSlugs = Object.keys(articlesData);
  const id = String(allSlugs.indexOf(slug) + 1);

  return {
    slug,
    id,
    title: article.title,
    subtitle: article.subtitle,
    date: article.date,
    readTime: article.readTime,
    category: article.category,
    description: article.description,
    difficulty: article.difficulty ?? calculateDifficulty(article.readTime),
    content: article.content,
    whatILearned: article.whatILearned,
    improvements: article.improvements,
    relatedNoteSlugs: article.relatedNoteSlugs,
    relatedProjectSlug: article.relatedProjectSlug,
    relatedSystemDesignSlug: article.relatedSystemDesignSlug,
  };
}

/** Get all available categories (cached). */
export function getArticleCategories(): CategoryFilter[] {
  if (_categoryCache) return _categoryCache;

  const categories = new Set(
    Object.values(articlesData).map((article) => article.category)
  );
  _categoryCache = ["All", ...Array.from(categories)];
  return _categoryCache;
}

/** Total published article count. */
export function getTotalArticleCount(): number {
  return Object.keys(articlesData).length;
}

/** Generate static params for Next.js SSG. */
export function generateArticleStaticParams(): { slug: string }[] {
  return Object.keys(articlesData).map((slug) => ({ slug }));
}

/** Filter articles by category. */
export function filterArticlesByCategory(category: CategoryFilter): ArticleMetadata[] {
  const allPosts = getAllArticles();
  if (category === "All") return allPosts;
  return allPosts.filter((post) => post.category === category);
}
