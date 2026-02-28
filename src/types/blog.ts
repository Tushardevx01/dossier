/**
 * Shared Blog Type Definitions
 *
 * Single source of truth for all blog-related types.
 * Consumed by: data layer, components, route files.
 */

/** Supported article categories */
export type BlogCategory =
  | "Architecture"
  | "DevOps"
  | "Full-Stack"
  | "Performance"
  | "Infrastructure";

/** Difficulty levels derived from read time */
export type BlogDifficulty = "Beginner" | "Intermediate" | "Advanced";

/** Category filter including the "All" option */
export type BlogCategoryFilter = "All" | BlogCategory;

/**
 * Raw article shape stored in the data layer.
 * This is the authoring contract — what writers provide.
 */
export interface BlogArticle {
  title: string;
  subtitle: string;
  date: string;
  readTime: number;
  category: BlogCategory;
  description: string;
  content: React.ReactNode;
  whatILearned: string[];
  improvements: string[];
}

/**
 * Lightweight metadata for list pages and SEO.
 * Never includes content — keeps list renders fast.
 */
export interface BlogMetadata {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: number;
  category: BlogCategory;
  description: string;
  difficulty: BlogDifficulty;
}

/**
 * Full post including content — used on article detail page.
 */
export interface BlogPost extends BlogMetadata {
  content: React.ReactNode;
  whatILearned: string[];
  improvements: string[];
}

/** Difficulty color mapping for UI components */
export const DIFFICULTY_COLORS: Record<BlogDifficulty, string> = {
  Beginner: "text-green-400/70",
  Intermediate: "text-blue-400/70",
  Advanced: "text-orange-400/70",
} as const;
