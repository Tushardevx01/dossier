/**
 * Blog List Page (Refactored)
 * 
 * IMPROVEMENTS over original:
 * 1. Uses single source of truth (getAllBlogMetadata)
 * 2. No hardcoded blog posts in component
 * 3. Categories derived from data, not hardcoded
 * 4. Scales to 50+ posts without issues
 * 5. Cleaner separation of concerns
 * 6. Easier to test and maintain
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { nasalization } from "@/app/fonts";
import { getAllBlogMetadata, filterBlogByCategory, getBlogCategories } from "@/lib/blogLoader";
import { BlogCategoryFilter, BlogMetadata } from "@/lib/blogLoader";

// Difficulty color mapping (extracted to constant)
const DIFFICULTY_COLORS: Record<BlogMetadata["difficulty"], string> = {
  Beginner: "text-green-400/70",
  Intermediate: "text-blue-400/70",
  Advanced: "text-orange-400/70",
};

// Animation variants (extracted for reusability)
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * Blog list component
 * Displays all blog posts with category filtering
 */
export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategoryFilter>("All");

  // Get all blog metadata from single source of truth
  const allPosts = getAllBlogMetadata();
  const categories = getBlogCategories();
  const filteredPosts = filterBlogByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={`${nasalization.className} text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-5 sm:mb-6 tracking-tight leading-tight`}
          >
            Engineering Notes
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Writing about systems, architecture, and production lessons.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </motion.div>
      </section>

      {/* Blog Posts List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        {filteredPosts.length > 0 ? (
          <motion.div
            key={selectedCategory}
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-8"
          >
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="py-20 text-center"
          >
            <p className="text-neutral-400 text-lg">
              No articles found in this category.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}

/**
 * Category Button Component
 * Extracted for reusability and cleaner parent component
 */
function CategoryButton({
  category,
  isSelected,
  onClick,
}: {
  category: BlogCategoryFilter;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`
        px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full
        text-xs sm:text-sm font-medium
        transition-all duration-200
        ${
          isSelected
            ? "bg-white text-black shadow-lg"
            : "border border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300 hover:bg-neutral-950/50"
        }
      `}
    >
      {category}
    </motion.button>
  );
}

/**
 * Blog Post Card Component
 * Extracted for reusability and cleaner rendering
 */
function BlogPostCard({ post }: { post: BlogMetadata }) {
  return (
    <motion.div variants={ITEM_VARIANTS}>
      <Link href={`/blog/${post.slug}`}>
        <article className="group cursor-pointer border border-neutral-800 rounded-lg p-6 sm:p-8 hover:border-neutral-700 hover:bg-neutral-950/30 transition-all duration-300 ease-out hover:-translate-y-1">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-neutral-200 transition-colors duration-200 leading-tight">
              {post.title}
            </h3>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-3xl">
              {post.description}
            </p>
          </div>

          {/* Metadata Footer */}
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
            <motion.span
              className="ml-auto text-neutral-500 group-hover:text-neutral-300 transition-colors duration-200 flex-shrink-0"
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              Read →
            </motion.span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
