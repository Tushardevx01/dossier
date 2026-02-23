"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { nasalization } from "@/app/fonts";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: "Architecture" | "DevOps" | "Full-Stack" | "Performance" | "Infrastructure";
  readTime: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  featured?: boolean;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Structuring a Scalable Full-Stack Project: From Next.js to Deployment",
    summary: "How to organize a modern full-stack application with clear separation of concerns, proper folder structure, and production-ready deployment patterns.",
    date: "Feb 20, 2026",
    category: "Full-Stack",
    readTime: 12,
    difficulty: "Intermediate",
    featured: true,
    slug: "structuring-scalable-fullstack",
  },
  {
    id: "2",
    title: "Designing a Contact Email Pipeline with Nodemailer",
    summary: "Building a reliable, production-grade email system for form submissions. Includes error handling, rate limiting, and monitoring strategies.",
    date: "Feb 18, 2026",
    category: "Full-Stack",
    readTime: 10,
    difficulty: "Intermediate",
    slug: "contact-email-pipeline-nodemailer",
  },
  {
    id: "3",
    title: "Deploying Next.js to Production: What Actually Matters",
    summary: "Moving beyond local development. Environment configuration, database connections, error monitoring, and performance optimization in production.",
    date: "Feb 15, 2026",
    category: "DevOps",
    readTime: 15,
    difficulty: "Advanced",
    slug: "nextjs-production-deployment",
  },
  {
    id: "4",
    title: "Database Schema Design for High-Performance Applications",
    summary: "Lessons learned from optimizing queries. Indexing strategies, query patterns, and how bad schema design manifests as production incidents.",
    date: "Feb 12, 2026",
    category: "Architecture",
    readTime: 14,
    difficulty: "Advanced",
    slug: "database-schema-design",
  },
  {
    id: "5",
    title: "Infrastructure as Code: Managing Your Stack with Terraform",
    summary: "Automating infrastructure provisioning, version control, and disaster recovery. Why IaC matters and common pitfalls to avoid.",
    date: "Feb 10, 2026",
    category: "Infrastructure",
    readTime: 16,
    difficulty: "Advanced",
    slug: "infrastructure-as-code-terraform",
  },
  {
    id: "6",
    title: "Optimizing React Performance: Beyond the Obvious",
    summary: "Deep dive into bundle splitting, lazy loading, memoization patterns, and when micro-optimizations actually matter in production.",
    date: "Feb 8, 2026",
    category: "Performance",
    readTime: 13,
    difficulty: "Intermediate",
    slug: "react-performance-optimization",
  },
];

const difficultyColors = {
  Beginner: "text-green-400/70",
  Intermediate: "text-blue-400/70",
  Advanced: "text-orange-400/70",
};


export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Architecture", "DevOps", "Full-Stack", "Performance", "Infrastructure"];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={`${nasalization.className} text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-5 sm:mb-6 tracking-tight leading-tight`}>
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
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-white text-black shadow-lg"
                  : "border border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300 hover:bg-neutral-950/50"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
          <motion.div
            key={featuredPost.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href={`/blog/${featuredPost.slug}`}>
              <article className="group cursor-pointer border border-neutral-800 rounded-lg p-6 sm:p-8 hover:border-neutral-700 hover:bg-neutral-950/30 transition-all duration-300 ease-out hover:-translate-y-1">
                <div className="mb-3">
                  <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Featured</span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl font-semibold text-white group-hover:text-neutral-200 transition-colors duration-200 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-3xl">
                    {featuredPost.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-neutral-800">
                  <span className="text-xs uppercase tracking-widest text-neutral-500">{featuredPost.date}</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-500">
                    {featuredPost.readTime} min read
                  </span>
                  <span className={`text-xs uppercase tracking-widest font-semibold ${difficultyColors[featuredPost.difficulty]}`}>
                    {featuredPost.difficulty}
                  </span>
                  <span className="px-2.5 py-1 rounded text-xs font-medium bg-neutral-900 text-neutral-300">
                    {featuredPost.category}
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
        </section>
      )}

      {/* Blog Posts List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
        {regularPosts.length > 0 ? (
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-8"
          >
            {regularPosts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="group cursor-pointer border border-neutral-800 rounded-lg p-6 sm:p-8 hover:border-neutral-700 hover:bg-neutral-950/30 transition-all duration-300 ease-out hover:-translate-y-1">
                    <div className="space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-semibold text-white group-hover:text-neutral-200 transition-colors duration-200 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-3xl">
                        {post.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-neutral-800">
                      <span className="text-xs uppercase tracking-widest text-neutral-500">{post.date}</span>
                      <span className="text-xs uppercase tracking-widest text-neutral-500">
                        {post.readTime} min read
                      </span>
                      <span className={`text-xs uppercase tracking-widest font-semibold ${difficultyColors[post.difficulty]}`}>
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
