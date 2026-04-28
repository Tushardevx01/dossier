"use client";

import { motion } from "framer-motion";
import { ArticlePost } from "@/lib/articleLoader";

interface ArticleHeroProps {
  post: ArticlePost;
}

export function ArticleHero({ post }: ArticleHeroProps) {
  const difficultyColors: Record<string, string> = {
    Beginner: "text-blue-400",
    Intermediate: "text-amber-400",
    Advanced: "text-red-400",
  };

  const difficultyBgColors: Record<string, string> = {
    Beginner: "bg-blue-950 border-blue-900",
    Intermediate: "bg-amber-950 border-amber-900",
    Advanced: "bg-red-950 border-red-900",
  };

  const categoryColors: Record<string, string> = {
    Architecture: "text-cyan-400 bg-cyan-950 border-cyan-900",
    DevOps: "text-purple-400 bg-purple-950 border-purple-900",
    "Full-Stack": "text-emerald-400 bg-emerald-950 border-emerald-900",
    Performance: "text-pink-400 bg-pink-950 border-pink-900",
    Infrastructure: "text-indigo-400 bg-indigo-950 border-indigo-900",
    Data: "text-violet-400 bg-violet-950 border-violet-900",
    Engineering: "text-sky-400 bg-sky-950 border-sky-900",
    Systems: "text-lime-400 bg-lime-950 border-lime-900",
  };

  return (
    <motion.div
      className="pt-20 pb-16 border-b border-zinc-800/50"
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
        <div className="flex flex-wrap gap-3">
          {/* Category Badge */}
          <div
            className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-medium tracking-wide ${
              categoryColors[post.category] || "text-cyan-400 bg-cyan-950 border-cyan-900"
            }`}
          >
            {post.category}
          </div>

          {/* Difficulty Badge */}
          <div
            className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-medium tracking-wide ${
              difficultyBgColors[post.difficulty] || "bg-zinc-900 border-zinc-800"
            } ${difficultyColors[post.difficulty] || "text-zinc-400"}`}
          >
            {post.difficulty}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
