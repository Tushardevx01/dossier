"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { CategoryFilter, ArticleMetadata } from "@/lib/articleLoader";
import { DIFFICULTY_COLORS } from "@/types/article";

interface NotesListClientProps {
  posts: ArticleMetadata[];
  categories: CategoryFilter[];
}

export function NotesListClient({ posts, categories }: NotesListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((item) => {
            const isSelected = selectedCategory === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedCategory(item)}
                className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? "bg-white text-black shadow-lg"
                    : "border border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300 hover:bg-neutral-950/50"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        {filteredPosts.length > 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/engineering-notes/${post.slug}`}>
                <article className="group cursor-pointer border border-neutral-800 rounded-lg p-6 sm:p-8 hover:border-neutral-700 hover:bg-neutral-950/30 transition-all duration-300 ease-out hover:-translate-y-1">
                  <div className="space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-neutral-200 transition-colors duration-200 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-3xl">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-neutral-800">
                    <time
                      dateTime={post.date}
                      className="text-xs uppercase tracking-widest text-neutral-500"
                    >
                      {post.date}
                    </time>
                    <span className="text-xs uppercase tracking-widest text-neutral-500">
                      {post.readTime} min read
                    </span>
                    <span
                      className={`text-xs uppercase tracking-widest font-semibold ${
                        DIFFICULTY_COLORS[post.difficulty]
                      }`}
                    >
                      {post.difficulty}
                    </span>
                    <span className="px-2.5 py-1 rounded text-xs font-medium bg-neutral-900 text-neutral-300">
                      {post.category}
                    </span>
                    <span className="ml-auto text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200 flex-shrink-0">
                      Read →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-neutral-400 text-lg">No articles found in this category.</p>
          </div>
        )}
      </section>
    </>
  );
}
