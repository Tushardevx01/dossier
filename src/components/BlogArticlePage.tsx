/**
 * Blog Article Page Component
 * 
 * Extracted into a separate component for:
 * 1. Better separation of concerns (page component vs rendering)
 * 2. Easier testing
 * 3. Reusable logic
 * 4. Cleaner structure
 */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { nasalization } from "@/app/fonts";
import { PrismHighlighter } from "@/components/PrismHighlighter";
import { TableOfContents } from "@/components/TableOfContents";
import { BlogPost } from "@/lib/blogLoader";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface BlogArticlePageProps {
  post: BlogPost;
  slug: string;
}

/**
 * Blog Article Renderer
 * Displays the full article with all interactive features
 */
export function BlogArticlePage({ post, slug }: BlogArticlePageProps) {
  const scrollPercentage = useScrollProgress();

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed scroll indicator - now using hook instead of script */}
      <ScrollPercentageIndicator percentage={scrollPercentage} />

      {/* Table of Contents - proper React component */}
      <TableOfContents containerSelector=".article-content" headingLevels={[3]} />

      {/* Article Header */}
      <ArticleHeader post={post} />

      {/* Article Content */}
      <PrismHighlighter slug={slug}>
        <ArticleContent post={post} />
      </PrismHighlighter>

      {/* Article Footer */}
      <ArticleFooter />
    </div>
  );
}

/**
 * Scroll Percentage Indicator
 * Displays current scroll position
 */
function ScrollPercentageIndicator({ percentage }: { percentage: number }) {
  return (
    <div className="fixed top-3 right-6 text-xs text-neutral-500 z-40">
      <span>{Math.round(percentage)}</span>%
    </div>
  );
}

/**
 * Article Header Section
 * Displays title, subtitle, and metadata
 */
function ArticleHeader({ post }: { post: BlogPost }) {
  return (
    <div className="pt-28 pb-16 border-b border-neutral-800">
      <div className="max-w-[720px] mx-auto px-6">
        <h1
          className={`${nasalization.className} text-5xl font-semibold text-white`}
        >
          {post.title}
        </h1>
        <p className="text-2xl text-neutral-500 mt-6">{post.subtitle}</p>
        <div className="flex gap-4 mt-8 text-neutral-500 text-xs uppercase tracking-widest flex-wrap">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.readTime} min read</span>
          <span>•</span>
          <span className="px-3 py-1 rounded bg-neutral-900 text-neutral-300">
            {post.category}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Article Content
 * Includes content, takeaways, and improvements sections
 */
function ArticleContent({ post }: { post: BlogPost }) {
  return (
    <div className="py-20">
      <div className="max-w-[720px] mx-auto px-6">
        {/* Main article prose section */}
        <div className="article-content prose prose-invert max-w-none space-y-6">
          {post.content}
        </div>

        {/* Divider */}
        <div className="my-20 border-t border-neutral-800" />

        {/* Key Takeaways Section */}
        <TakeawaysSection takeaways={post.whatILearned} />

        {/* Future Improvements Section */}
        <ImprovementsSection improvements={post.improvements} />
      </div>
    </div>
  );
}

/**
 * Takeaways Section
 * Extracted for reusability
 */
function TakeawaysSection({ takeaways }: { takeaways: string[] }) {
  return (
    <section>
      <h2 className="text-3xl text-white mb-6">Key Takeaways</h2>
      <ul className="space-y-4 text-neutral-400">
        {takeaways.map((point, i) => (
          <li key={i} className="text-base leading-relaxed">
            • {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Improvements Section
 * Extracted for reusability
 */
function ImprovementsSection({ improvements }: { improvements: string[] }) {
  return (
    <section className="mt-16">
      <h2 className="text-3xl text-white mb-6">Future Improvements</h2>
      <ul className="space-y-4 text-neutral-400">
        {improvements.map((point, i) => (
          <li key={i} className="text-base leading-relaxed">
            → {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Article Footer
 * Navigation back to blog list
 */
function ArticleFooter() {
  return (
    <div className="max-w-[720px] mx-auto px-6 mt-20 pt-10 border-t border-neutral-800 pb-20">
      <Link
        href="/blog"
        className="text-neutral-400 hover:text-white text-sm uppercase tracking-widest transition-colors duration-200"
      >
        ← Back to all articles
      </Link>
    </div>
  );
}
