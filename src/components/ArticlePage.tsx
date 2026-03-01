/**
 * Article Page Component
 * 
 * Extracted into a separate component for:
 * 1. Better separation of concerns (page component vs rendering)
 * 2. Easier testing
 * 3. Reusable logic
 * 4. Cleaner structure
 */

"use client";

import Link from "next/link";

import { nasalization } from "@/app/fonts";
import { PrismHighlighter } from "@/components/PrismHighlighter";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticlePost } from "@/lib/articleLoader";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const TOC_HEADING_LEVELS = [3];

interface ArticlePageProps {
  post: ArticlePost;
  slug: string;
}

/**
 * Article Renderer
 * Displays the full article with all interactive features
 */
export function ArticlePage({ post, slug }: ArticlePageProps) {
  const scrollPercentage = useScrollProgress();

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed scroll indicator - now using hook instead of script */}
      <ScrollPercentageIndicator percentage={scrollPercentage} />

      {/* Table of Contents - proper React component */}
      <TableOfContents containerSelector=".article-content" headingLevels={TOC_HEADING_LEVELS} />

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
    <div className="hidden xl:block fixed top-3 right-8 text-[10px] tracking-[0.2em] uppercase text-neutral-600 z-40">
      <span>{Math.round(percentage)}</span>%
    </div>
  );
}

/**
 * Article Header Section
 * Displays title, subtitle, and metadata
 */
function ArticleHeader({ post }: { post: ArticlePost }) {
  return (
    <div className="pt-24 sm:pt-28 pb-10 sm:pb-12">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6">
        <div className="h-px w-20 bg-neutral-700 mb-6" />
        <h1
          className={`${nasalization.className} text-[2.1rem] sm:text-[2.55rem] font-semibold text-white leading-tight tracking-tight`}
        >
          {post.title}
        </h1>
        <p className="text-[0.95rem] sm:text-[1.18rem] text-neutral-500 mt-3 leading-relaxed">
          {post.subtitle}
        </p>
        <div className="flex items-center gap-2.5 mt-5 text-neutral-500 text-[9.5px] uppercase tracking-[0.2em] flex-wrap">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.readTime} min read</span>
          <span>•</span>
          <span className="px-3 py-1 rounded border border-neutral-700 bg-neutral-900/70 text-neutral-300">
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
function ArticleContent({ post }: { post: ArticlePost }) {
  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6">
        {/* Main article prose section */}
        <div className="article-content prose prose-invert prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:text-[1.7rem] sm:prose-h2:text-[2rem] prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-[0.95rem] sm:prose-h3:text-[0.98rem] prose-h3:font-semibold prose-h3:text-neutral-200 prose-h3:mt-6 prose-h3:mb-2 prose-p:text-[12.5px] sm:prose-p:text-[13px] prose-p:leading-[1.72] prose-p:text-neutral-300 prose-strong:text-neutral-100 prose-a:text-neutral-200 prose-a:no-underline hover:prose-a:text-white prose-li:text-[12.5px] sm:prose-li:text-[13px] prose-li:leading-[1.72] prose-li:text-neutral-300 prose-li:marker:text-neutral-500 prose-ul:my-4 prose-code:text-[0.86em] prose-code:text-neutral-200 prose-pre:my-4 prose-pre:rounded-none prose-pre:border prose-pre:border-neutral-700 prose-pre:bg-neutral-800/65 prose-pre:px-3.5 prose-pre:py-3 prose-pre:leading-[1.42] prose-pre:text-[12px] space-y-4">
          {post.content}
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-neutral-800" />

        {/* Key Takeaways Section */}
        <TakeawaysSection takeaways={post.whatILearned} />

        {/* Future Improvements Section */}
        <ImprovementsSection improvements={post.improvements} />
      </div>

      <style jsx global>{`
        .article-content pre[class*="language-"],
        .article-content pre {
          background: #2b2b2b !important;
          border: 1px solid #3a3a3a !important;
          border-radius: 0 !important;
          padding: 0.9rem 1rem !important;
          box-shadow: none !important;
          overflow-x: auto;
        }

        .article-content code[class*="language-"],
        .article-content pre[class*="language-"] code {
          color: #d4d4d4;
          text-shadow: none !important;
          font-size: 12px;
          line-height: 1.62;
          font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo,
            Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          background: transparent !important;
        }

        .article-content .token.comment,
        .article-content .token.prolog,
        .article-content .token.doctype,
        .article-content .token.cdata {
          color: #808080;
        }

        .article-content .token.punctuation {
          color: #d4d4d4;
        }

        .article-content .token.keyword,
        .article-content .token.atrule {
          color: #c586c0;
        }

        .article-content .token.string,
        .article-content .token.char,
        .article-content .token.attr-value {
          color: #6a9955;
        }

        .article-content .token.number,
        .article-content .token.boolean,
        .article-content .token.constant {
          color: #b5cea8;
        }

        .article-content .token.function,
        .article-content .token.method,
        .article-content .token.selector {
          color: #dcdcaa;
        }

        .article-content .token.property,
        .article-content .token.parameter,
        .article-content .token.variable {
          color: #9cdcfe;
        }

        .article-content .token.class-name,
        .article-content .token.builtin,
        .article-content .token.type {
          color: #4ec9b0;
        }

        .article-content .token.operator,
        .article-content .token.entity,
        .article-content .token.url {
          color: #d4d4d4;
          background: transparent;
        }
      `}</style>
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
      <h2 className="text-[2rem] text-white mb-5 tracking-tight">Key Takeaways</h2>
      <ul className="space-y-3 text-neutral-400">
        {takeaways.map((point, i) => (
          <li key={i} className="text-[13px] leading-relaxed pl-1">
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
    <section className="mt-12">
      <h2 className="text-[2rem] text-white mb-5 tracking-tight">Future Improvements</h2>
      <ul className="space-y-3 text-neutral-400">
        {improvements.map((point, i) => (
          <li key={i} className="text-[13px] leading-relaxed pl-1">
            → {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Article Footer
 * Navigation back to engineering notes
 */
function ArticleFooter() {
  return (
    <div className="max-w-[640px] mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-neutral-800 pb-16">
      <Link
        href="/engineering-notes"
        className="text-neutral-400 hover:text-white text-[11px] uppercase tracking-[0.16em] transition-colors duration-200"
      >
        ← Back to all articles
      </Link>
    </div>
  );
}
