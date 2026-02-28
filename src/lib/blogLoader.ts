/**
 * Blog Data Layer
 *
 * Single source of truth for all blog post access.
 * Types are imported from @/types/blog — never redefined here.
 *
 * Performance: metadata list is computed once per process (module-level cache).
 * At 100+ articles this avoids re-mapping on every page render.
 */

import { blogData } from "@/data/blogData";
import type {
  BlogMetadata,
  BlogPost,
  BlogCategoryFilter,
  BlogDifficulty,
} from "@/types/blog";

// Re-export types so consumers can import from one place
export type { BlogMetadata, BlogPost, BlogCategoryFilter };

// ─── Helpers ────────────────────────────────────────────────────────────────

function calculateDifficulty(readTime: number): BlogDifficulty {
  if (readTime <= 8) return "Beginner";
  if (readTime <= 12) return "Intermediate";
  return "Advanced";
}

// ─── Module-level cache ─────────────────────────────────────────────────────

let _metadataCache: BlogMetadata[] | null = null;
let _categoryCache: BlogCategoryFilter[] | null = null;

function buildMetadataCache(): BlogMetadata[] {
  if (_metadataCache) return _metadataCache;

  _metadataCache = Object.entries(blogData).map(([slug, article], index) => ({
    slug,
    id: String(index + 1),
    title: article.title,
    subtitle: article.subtitle,
    date: article.date,
    readTime: article.readTime,
    category: article.category,
    description: article.description,
    difficulty: calculateDifficulty(article.readTime),
  }));

  return _metadataCache;
}

// ─── Public API ─────────────────────────────────────────────────────────────

/** Get all blog posts metadata (cached — safe for repeated calls). */
export function getAllBlogMetadata(): BlogMetadata[] {
  return buildMetadataCache();
}

/** Get a single blog post by slug. Returns null if not found. */
export function getBlogPost(slug: string): BlogPost | null {
  const article = blogData[slug];
  if (!article) return null;

  const allSlugs = Object.keys(blogData);
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
    difficulty: calculateDifficulty(article.readTime),
    content: article.content,
    whatILearned: article.whatILearned,
    improvements: article.improvements,
  };
}

/** Get all available categories (cached). */
export function getBlogCategories(): BlogCategoryFilter[] {
  if (_categoryCache) return _categoryCache;

  const categories = new Set(
    Object.values(blogData).map((article) => article.category)
  );
  _categoryCache = ["All", ...Array.from(categories)];
  return _categoryCache;
}

/** Total published post count. */
export function getTotalBlogCount(): number {
  return Object.keys(blogData).length;
}

/** Generate static params for Next.js SSG. */
export function generateBlogStaticParams(): { slug: string }[] {
  return Object.keys(blogData).map((slug) => ({ slug }));
}

/** Filter posts by category. */
export function filterBlogByCategory(category: BlogCategoryFilter): BlogMetadata[] {
  const allPosts = getAllBlogMetadata();
  if (category === "All") return allPosts;
  return allPosts.filter((post) => post.category === category);
}
