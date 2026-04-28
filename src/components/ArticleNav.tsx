"use client";

import Link from "next/link";
import { ArticleMetadata } from "@/lib/articleLoader";

interface ArticleNavProps {
  relatedArticles: ArticleMetadata[];
}

export function ArticleNav({ relatedArticles }: ArticleNavProps) {
  if (relatedArticles.length === 0) return null;

  return (
    <div className="border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-sm uppercase tracking-widest font-semibold text-zinc-400 mb-8">
          Continue Reading
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedArticles.slice(0, 2).map((article, idx) => (
            <Link
              key={article.slug}
              href={`/engineering-notes/${article.slug}`}
              className="group p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs uppercase tracking-widest font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  {article.category}
                </span>
                <span className="text-zinc-600 group-hover:text-zinc-400 transition-all duration-300 transform">
                  {idx === 0 ? "→" : "←"}
                </span>
              </div>

              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-2 mb-4">
                {article.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span>{article.readTime} min</span>
                <span>•</span>
                <span>{article.difficulty}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
