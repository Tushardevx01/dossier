/**
 * Article Page Component
 *
 * Server Component: article HTML is sanitized here on the server so
 * sanitize-html never ships to the browser. Interactive concerns
 * (sticky TOC scroll-spy, Prism highlighting) remain client islands.
 */

import Link from "next/link";

import { ArticlePost } from "@/lib/articleLoader";
import { ArticleHero } from "@/components/ArticleHero";
import { ArticleToc } from "@/components/ArticleToc";
import { PrismHighlighter } from "@/components/PrismHighlighter";
import { sanitizeHtml } from "@/lib/sanitize";

interface ArticlePageProps {
  post: ArticlePost;
  slug: string;
}

/**
 * Article Renderer
 */
export function ArticlePage({ post, slug }: ArticlePageProps) {
  const articleHtml = typeof post.content === "string" ? post.content : "";
  // SECURITY: sanitize on the server before it reaches any client boundary
  const safeHtml = sanitizeHtml(articleHtml);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <ArticleHero post={post} />

      {/* Sticky TOC on Desktop (client island) */}
      <ArticleToc containerSelector=".article-content" headingLevels={[2, 3]} />

      {/* Main Content (client island handles Prism highlighting only) */}
      <PrismHighlighter slug={slug}>
        <div className="pt-8 pb-20 md:pt-10 md:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Article Content */}
            <article className="article-content space-y-8">
              <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
            </article>

            {/* Takeaways Section */}
            <TakeawaysSection takeaways={post.whatILearned} />

            {/* Improvements Section */}
            {Array.isArray(post.improvements) && post.improvements.length > 0 && (
              <>
                <div className="h-16 md:h-20" />
                <ImprovementsSection improvements={post.improvements} />
              </>
            )}
          </div>
        </div>
      </PrismHighlighter>

      {/* Footer */}
      <ArticleFooter />
    </div>
  );
}

/**
 * Takeaways Section
 */
function TakeawaysSection({ takeaways }: { takeaways: string[] }) {
  return (
    <section className="mt-12 md:mt-16 rounded-2xl bg-zinc-950/50 p-6 md:p-8 ring-1 ring-inset ring-zinc-800/40">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
        Key Takeaways
      </h2>
      <div className="space-y-4">
        {takeaways.map((point, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 rounded-lg border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors"
          >
            <span className="text-cyan-400 font-bold mt-1 flex-shrink-0" aria-hidden="true">•</span>
            <p className="text-base text-zinc-300 leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Improvements Section
 *
 * Safely handles improvements that may be:
 * - A proper array: string[]
 * - A JSON stringified array: string
 * - Null/undefined/empty
 */
function ImprovementsSection({ improvements }: { improvements: string[] | string | null | undefined }) {
  // Normalize improvements: handle both array and stringified cases
  const normalizedImprovements = normalizeStringArray(improvements);

  if (normalizedImprovements.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl bg-zinc-950/40 p-6 md:p-8 ring-1 ring-inset ring-zinc-800/30">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
        Future Improvements
      </h2>
      <div className="space-y-4">
        {normalizedImprovements.map((point, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 rounded-lg border border-zinc-800/50 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors"
          >
            <span className="text-amber-400 font-bold mt-1 flex-shrink-0" aria-hidden="true">→</span>
            <p className="text-base text-zinc-300 leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Utility: Safely parse and normalize string arrays
 *
 * Handles both:
 * - Proper arrays: ['item1', 'item2']
 * - JSON stringified: '["item1", "item2"]'
 * - Invalid/null/empty cases
 */
function normalizeStringArray(value: string[] | string | null | undefined): string[] {
  if (!value) return [];

  // Already an array
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  // Try to parse if it's a stringified JSON array
  if (typeof value === "string") {
    // If it doesn't start with '[', it's not stringified JSON
    if (!value.startsWith("[")) {
      return [];
    }

    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      // Invalid JSON, return empty array
      return [];
    }
  }

  return [];
}

/**
 * Article Footer
 */
function ArticleFooter() {
  return (
    <footer className="bg-gradient-to-b from-black to-zinc-950/20 pt-10 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/engineering-notes"
            replace
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium text-zinc-400 hover:text-white transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform" aria-hidden="true">←</span>
            Back to Notes
          </Link>

          <div className="text-xs text-zinc-600">
            Engineering insights by{" "}
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Tushar Kanti Dey
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
