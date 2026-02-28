/**
 * Shared Article Type Definitions
 *
 * Single source of truth for all engineering-notes types.
 * Consumed by: data layer, components, route files.
 *
 * Domain language:
 *   "article"            — a single engineering note
 *   "engineering notes"  — the collection / section name
 */

/** Supported article categories */
export type ArticleCategory =
  | "Architecture"
  | "DevOps"
  | "Full-Stack"
  | "Performance"
  | "Infrastructure";

/** Difficulty levels derived from read time */
export type ArticleDifficulty = "Beginner" | "Intermediate" | "Advanced";

/** Category filter including the "All" option */
export type CategoryFilter = "All" | ArticleCategory;

/**
 * Raw article shape stored in the data layer.
 * This is the authoring contract — what writers provide.
 */
export interface Article {
  title: string;
  subtitle: string;
  date: string;
  readTime: number;
  category: ArticleCategory;
  description: string;
  content: React.ReactNode;
  whatILearned: string[];
  improvements: string[];
}

/**
 * Lightweight metadata for list pages and SEO.
 * Never includes content — keeps list renders fast.
 */
export interface ArticleMetadata {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: number;
  category: ArticleCategory;
  description: string;
  difficulty: ArticleDifficulty;
}

/**
 * Full article including content — used on the detail page.
 */
export interface ArticlePost extends ArticleMetadata {
  content: React.ReactNode;
  whatILearned: string[];
  improvements: string[];
}

/** Difficulty color mapping for UI components */
export const DIFFICULTY_COLORS: Record<ArticleDifficulty, string> = {
  Beginner: "text-green-400/70",
  Intermediate: "text-blue-400/70",
  Advanced: "text-orange-400/70",
} as const;
