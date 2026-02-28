/**
 * Blog Data Layer
 * 
 * Single source of truth for all blog posts.
 * This replaces the duplication between blog/page.tsx and data/blogData.tsx
 * Ensures consistency across the entire blog system.
 */

import { blogData } from "@/data/blogData";

export interface BlogMetadata {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: number;
  category: "Architecture" | "DevOps" | "Full-Stack" | "Performance" | "Infrastructure";
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface BlogPost extends BlogMetadata {
  content: React.ReactNode;
  whatILearned: string[];
  improvements: string[];
}

export type BlogCategoryFilter = "All" | BlogMetadata["category"];

/**
 * Derive difficulty from readTime - this is a computed field
 * avoids duplication while still maintaining the concept
 */
function calculateDifficulty(readTime: number): BlogMetadata["difficulty"] {
  if (readTime <= 8) return "Beginner";
  if (readTime <= 12) return "Intermediate";
  return "Advanced";
}

/**
 * Get all blog posts with metadata
 * Use this for the blog list page
 */
export function getAllBlogMetadata(): BlogMetadata[] {
  return Object.entries(blogData).map(([slug, article], index) => ({
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
}

/**
 * Get a single blog post by slug
 * Use this for the article page
 */
export function getBlogPost(slug: string): BlogPost | null {
  const article = blogData[slug];
  if (!article) return null;

  return {
    slug,
    id: calculatePostId(slug),
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

/**
 * Get all available categories
 * Dynamically extracted from blog data
 */
export function getBlogCategories(): BlogCategoryFilter[] {
  const categories = new Set<BlogMetadata["category"]>();
  Object.values(blogData).forEach((article) => {
    categories.add(article.category);
  });
  return ["All", ...Array.from(categories)];
}

/**
 * Get total number of published posts
 * Useful for pagination or stats
 */
export function getTotalBlogCount(): number {
  return Object.keys(blogData).length;
}

/**
 * Helper to generate static params for Next.js
 */
export function generateBlogStaticParams() {
  return Object.keys(blogData).map((slug) => ({ slug }));
}

/**
 * Helper to calculate post ID from slug
 * Ensures consistency across the app
 */
function calculatePostId(slug: string): string {
  const allSlugs = Object.keys(blogData);
  const index = allSlugs.indexOf(slug);
  return String(index + 1);
}

/**
 * Filter blog posts by category
 * Reusable utility for filtering logic
 */
export function filterBlogByCategory(
  category: BlogCategoryFilter
): BlogMetadata[] {
  const allPosts = getAllBlogMetadata();
  if (category === "All") return allPosts;
  return allPosts.filter((post) => post.category === category);
}
