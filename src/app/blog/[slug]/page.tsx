import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogData } from "@/data/blogData";
import { nasalization } from "@/app/fonts";
import { PrismHighlighter } from "@/components/PrismHighlighter";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-hcl";

/* =========================================
   METADATA GENERATION
========================================= */

interface GenerateMetadataParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: GenerateMetadataParams
): Promise<Metadata> {
  const { slug } = await params;
  const article = blogData[slug];

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const baseUrl = "https://tushardevx01.dev"; // Update with your domain
  const articleUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: `${article.title} — Tushar DevX`,
    description: article.description,
    authors: [{ name: "Tushar DevX" }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: articleUrl,
      publishedTime: article.date,
      authors: ["Tushar DevX"],
      tags: [article.category],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
    keywords: [article.category, "engineering", "software development"],
  };
}

/* =========================================
   STATIC GENERATION
========================================= */

export function generateStaticParams() {
  return Object.keys(blogData).map((slug) => ({
    slug,
  }));
}

/* =========================================
   PAGE COMPONENT
========================================= */

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = blogData[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
        {/* Fixed scroll indicator */}
        <div className="fixed top-3 right-6 text-xs text-neutral-500 z-40">
          <span id="scroll-percentage">0</span>%
        </div>

        {/* Table of Contents (Desktop Only) */}
        <aside className="hidden xl:block fixed right-10 top-40 w-64 text-sm">
          
          <ul className="space-y-3" id="toc-list">
            {/* Populated by client-side script */}
          </ul>
        </aside>

        {/* Article Header */}
        <div className="pt-28 pb-16 border-b border-neutral-800">
          <div className="max-w-[720px] mx-auto px-6">
            <h1
              className={`${nasalization.className} text-5xl font-semibold text-white`}
            >
              {article.title}
            </h1>
            <p className="text-2xl text-neutral-500 mt-6">{article.subtitle}</p>
            <div className="flex gap-4 mt-8 text-neutral-500 text-xs uppercase tracking-widest flex-wrap">
              <time dateTime={article.date}>{article.date}</time>
              <span>•</span>
              <span>{article.readTime} min read</span>
              <span>•</span>
              <span className="px-3 py-1 rounded bg-neutral-900 text-neutral-300">
                {article.category}
              </span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <PrismHighlighter slug={slug}>
          <div className="py-20">
            <div className="max-w-[720px] mx-auto px-6">
              <div className="prose prose-invert max-w-none space-y-6">
                {article.content}
              </div>

              {/* Divider */}
              <div className="my-20 border-t border-neutral-800" />

              {/* Key Takeaways */}
              <section>
                <h2 className="text-3xl text-white mb-6">Key Takeaways</h2>
                <ul className="space-y-4 text-neutral-400">
                  {article.whatILearned.map((point, i) => (
                    <li key={i} className="text-base leading-relaxed">
                      • {point}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Future Improvements */}
              <section className="mt-16">
                <h2 className="text-3xl text-white mb-6">Future Improvements</h2>
                <ul className="space-y-4 text-neutral-400">
                  {article.improvements.map((point, i) => (
                    <li key={i} className="text-base leading-relaxed">
                      → {point}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Footer Navigation */}
              <div className="mt-20 pt-10 border-t border-neutral-800">
                <Link
                  href="/blog"
                  className="text-neutral-400 hover:text-white text-sm uppercase tracking-widest transition-colors duration-200"
                >
                  ← Back to all articles
                </Link>
              </div>
            </div>
          </div>
        </PrismHighlighter>

        {/* Client-side interactivity script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Initialize Prism syntax highlighting
                if (typeof Prism !== 'undefined') {
                  Prism.highlightAll();
                }

                // Extract headings for table of contents
                const headings = Array.from(document.querySelectorAll('h3')).map(h => ({
                  id: h.id,
                  text: h.textContent || ''
                }));

                const tocList = document.getElementById('toc-list');
                if (tocList && headings.length > 0) {
                  tocList.innerHTML = headings.map(h => 
                    \`<li><a href="#\${h.id}" class="text-neutral-400 hover:text-white transition-colors">\${h.text}</a></li>\`
                  ).join('');

                  // Scroll spy for active heading
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                      if (entry.isIntersecting) {
                        document.querySelectorAll('#toc-list a').forEach(a => {
                          a.classList.remove('text-white');
                          a.classList.add('text-neutral-400');
                        });
                        document.querySelector(\`#toc-list a[href="#\${entry.target.id}"]\`)?.classList.add('text-white');
                      }
                    });
                  }, { rootMargin: '-40% 0px -55% 0px' });

                  Array.from(document.querySelectorAll('h3')).forEach(h => observer.observe(h));
                }
              })();
            `,
          }}
        />
      </div>
    );
  }
