/**
 * Article Page Component - Premium Modern Redesign
 * 
 * Features:
 * - Wider content container (max-w-4xl)
 * - Premium typography hierarchy
 * - Modern code blocks with language labels
 * - Sticky table of contents
 * - Reading progress bar
 * - Better spacing and rhythm
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ArticlePost, ArticleMetadata } from "@/lib/articleLoader";
import { ArticleHero } from "@/components/ArticleHero";
import { ArticleToc } from "@/components/ArticleToc";
import { ArticleNav } from "@/components/ArticleNav";
import { PrismHighlighter } from "@/components/PrismHighlighter";

interface ArticlePageProps {
  post: ArticlePost;
  slug: string;
  relatedArticles?: ArticleMetadata[];
}

/**
 * Article Renderer - Premium Modern Layout
 */
export function ArticlePage({ post, slug, relatedArticles = [] }: ArticlePageProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* Premium Hero Section */}
      <ArticleHero post={post} />

      {/* Sticky TOC on Desktop */}
      <ArticleToc containerSelector=".article-content" headingLevels={[2, 3]} />

      {/* Main Content */}
      <PrismHighlighter slug={slug}>
        <ArticleContentWrapper post={post} />
      </PrismHighlighter>

      {/* Related Articles Navigation */}
      {relatedArticles.length > 0 && <ArticleNav relatedArticles={relatedArticles} />}

      {/* Footer */}
      <ArticleFooter />
    </div>
  );
}

/**
 * Article Content Wrapper
 * Handles all prose content with premium modern styling
 */
function ArticleContentWrapper({ post }: { post: ArticlePost }) {
  const articleHtml = typeof post.content === "string" ? post.content : "";

  return (
    <motion.div
      className="py-16 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Article Content */}
        <article className="article-content space-y-8">
          <div dangerouslySetInnerHTML={{ __html: articleHtml }} />
        </article>

        {/* Divider */}
        <div className="my-16 border-t border-zinc-800/50" />

        {/* Takeaways Section */}
        <TakeawaysSection takeaways={post.whatILearned} />

        {/* Improvements Section */}
        {post.improvements.length > 0 && (
          <>
            <div className="my-12 border-t border-zinc-800/50" />
            <ImprovementsSection improvements={post.improvements} />
          </>
        )}
      </div>

      {/* Article Prose Styles */}
      <style jsx global>{`
        .article-content h2 {
          @apply text-3xl md:text-4xl font-bold text-white mt-12 mb-6 tracking-tight;
          scroll-margin-top: 100px;
        }

        .article-content h3 {
          @apply text-xl md:text-2xl font-semibold text-white mt-8 mb-4 tracking-tight;
          scroll-margin-top: 100px;
        }

        .article-content h4 {
          @apply text-lg font-semibold text-white mt-6 mb-3;
          scroll-margin-top: 100px;
        }

        .article-content p {
          @apply text-base md:text-lg text-zinc-300 leading-8 mb-6;
        }

        .article-content a {
          @apply text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors;
        }

        .article-content strong {
          @apply font-semibold text-white;
        }

        .article-content em {
          @apply italic text-zinc-200;
        }

        .article-content ul,
        .article-content ol {
          @apply my-6 ml-6 space-y-3;
        }

        .article-content ul li {
          @apply text-base md:text-lg text-zinc-300 leading-8 list-disc;
        }

        .article-content ol li {
          @apply text-base md:text-lg text-zinc-300 leading-8 list-decimal;
        }

        .article-content blockquote {
          @apply pl-6 border-l-4 border-cyan-500/30 text-zinc-300 italic my-8;
        }

        .article-content code:not(pre code) {
          @apply inline-block px-2 py-1 rounded bg-zinc-900 text-cyan-400 text-sm font-mono;
        }

        .article-content pre {
          @apply !my-8 !rounded-2xl !border !border-zinc-800 !bg-zinc-950 !p-6 !leading-relaxed shadow-lg;
          background-color: #09090b !important;
        }

        .article-content pre code {
          @apply !bg-transparent !text-zinc-300 text-sm font-mono leading-relaxed;
          font-size: 14px;
        }

        .article-content table {
          @apply w-full my-8 border-collapse border border-zinc-800;
        }

        .article-content table th {
          @apply bg-zinc-900 px-4 py-3 text-left text-white font-semibold border border-zinc-800;
        }

        .article-content table td {
          @apply px-4 py-3 text-zinc-300 border border-zinc-800;
        }

        .article-content hr {
          @apply my-12 border-t border-zinc-800/50;
        }
      `}</style>
    </motion.div>
  );
}

/**
 * Takeaways Section
 */
function TakeawaysSection({ takeaways }: { takeaways: string[] }) {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
          Key Takeaways
        </h2>
        <div className="space-y-4">
          {takeaways.map((point, i) => (
            <motion.div
              key={i}
              className="flex gap-4 p-4 rounded-lg border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="text-cyan-400 font-bold mt-1 flex-shrink-0">•</span>
              <p className="text-base text-zinc-300 leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Improvements Section
 */
function ImprovementsSection({ improvements }: { improvements: string[] }) {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
          Future Improvements
        </h2>
        <div className="space-y-4">
          {improvements.map((point, i) => (
            <motion.div
              key={i}
              className="flex gap-4 p-4 rounded-lg border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-400 font-bold mt-1 flex-shrink-0">→</span>
              <p className="text-base text-zinc-300 leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Article Footer
 */
function ArticleFooter() {
  return (
    <motion.footer
      className="border-t border-zinc-800/50 bg-gradient-to-b from-black to-zinc-950/20 py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/engineering-notes"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium text-zinc-400 hover:text-white transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Notes
          </Link>

          <div className="text-xs text-zinc-600">
            Engineering insights by{" "}
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Tushar
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
