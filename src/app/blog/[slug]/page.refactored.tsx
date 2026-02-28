/**
 * Blog Article Page (Refactored)
 * 
 * IMPROVEMENTS:
 * 1. Uses getBlogPost from data layer instead of direct access
 * 2. TableOfContents is a proper React component (not inline script)
 * 3. Scroll percentage tracking as a hook (reusable)
 * 4. No dangling client-side scripts
 * 5. Better error handling
 * 6. More maintainable and testable
 */

import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticlePage } from "@/components/BlogArticlePage";
import { getBlogPost, generateBlogStaticParams } from "@/lib/blogLoader";

// Prism imports (server-side, loaded once)
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-hcl";

interface GenerateMetadataParams {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for article
 * This is Next.js specific and cannot be refactored away
 */
export async function generateMetadata(
  { params }: GenerateMetadataParams
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const baseUrl = "https://tushardevx01.dev";
  const articleUrl = `${baseUrl}/engineering-notes/${slug}`;

  return {
    title: `${post.title} — Tushar DevX`,
    description: post.description,
    authors: [{ name: "Tushar DevX" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: articleUrl,
      publishedTime: post.date,
      authors: ["Tushar DevX"],
      tags: [post.category],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    keywords: [post.category, "engineering", "software development"],
  };
}

/**
 * Generate static params for all blog posts
 */
export function generateStaticParams() {
  return generateBlogStaticParams().map(({ slug }) => ({
    slug,
  }));
}

/**
 * Blog Article Page
 * 
 * This is now a simple server component that delegates to BlogArticlePage
 * The actual logic is in the client component for better separation
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticlePage post={post} slug={slug} />;
}
