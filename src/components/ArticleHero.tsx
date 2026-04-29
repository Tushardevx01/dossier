"use client";

import { motion } from "motion/react";
import { ArticlePost } from "@/lib/articleLoader";
import { TagBadge } from "@/components/notes/TagBadge";

interface ArticleHeroProps {
  post: ArticlePost;
}

export function ArticleHero({ post }: ArticleHeroProps) {
  return (
    <motion.div
      className="pt-20 pb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb-style metadata */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
            Engineering Note
          </span>
          <div className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
            {post.category}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Subtitle/Excerpt */}
        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-8 max-w-2xl">
          {post.subtitle}
        </p>

        {/* Meta Information */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-sm text-zinc-400">{post.readTime} min read</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <TagBadge type="level" label={post.difficulty} />
          <TagBadge type="category" label={post.category} />
        </div>
      </div>
    </motion.div>
  );
}
