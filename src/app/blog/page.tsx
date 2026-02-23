"use client";

import { useState } from "react";
import Link from "next/link";

import { nasalization } from "@/app/fonts";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: "Architecture" | "DevOps" | "Full-Stack" | "Performance" | "Infrastructure";
  readTime: number;
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
    slug: "structuring-scalable-fullstack",
  },
  {
    id: "2",
    title: "Designing a Contact Email Pipeline with Nodemailer",
    summary: "Building a reliable, production-grade email system for form submissions. Includes error handling, rate limiting, and monitoring strategies.",
    date: "Feb 18, 2026",
    category: "Full-Stack",
    readTime: 10,
    slug: "contact-email-pipeline-nodemailer",
  },
  {
    id: "3",
    title: "Deploying Next.js to Production: What Actually Matters",
    summary: "Moving beyond local development. Environment configuration, database connections, error monitoring, and performance optimization in production.",
    date: "Feb 15, 2026",
    category: "DevOps",
    readTime: 15,
    slug: "nextjs-production-deployment",
  },
  {
    id: "4",
    title: "Database Schema Design for High-Performance Applications",
    summary: "Lessons learned from optimizing queries. Indexing strategies, query patterns, and how bad schema design manifests as production incidents.",
    date: "Feb 12, 2026",
    category: "Architecture",
    readTime: 14,
    slug: "database-schema-design",
  },
  {
    id: "5",
    title: "Infrastructure as Code: Managing Your Stack with Terraform",
    summary: "Automating infrastructure provisioning, version control, and disaster recovery. Why IaC matters and common pitfalls to avoid.",
    date: "Feb 10, 2026",
    category: "Infrastructure",
    readTime: 16,
    slug: "infrastructure-as-code-terraform",
  },
  {
    id: "6",
    title: "Optimizing React Performance: Beyond the Obvious",
    summary: "Deep dive into bundle splitting, lazy loading, memoization patterns, and when micro-optimizations actually matter in production.",
    date: "Feb 8, 2026",
    category: "Performance",
    readTime: 13,
    slug: "react-performance-optimization",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Architecture", "DevOps", "Full-Stack", "Performance", "Infrastructure"];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-24">
        <h1 className={`${nasalization.className} text-6xl sm:text-7xl font-bold text-white mb-6`}>
          Engineering Notes
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Writing about systems, architecture, and production lessons.
        </p>
      </section>

      {/* Category Filter */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-16">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts List */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        {filteredPosts.length > 0 ? (
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="group cursor-pointer py-6 border-b border-gray-800 hover:border-gray-700 transition-colors duration-300">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-white group-hover:text-gray-300 transition-colors duration-200 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
                      {post.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="text-gray-600">•</span>
                    <span className="px-2 py-1 bg-gray-900 text-gray-300 rounded">
                      {post.category}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span>{post.readTime} min read</span>
                    <span className="text-gray-600 ml-auto group-hover:text-gray-400 transition-colors duration-200">
                      Read →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-lg">
              No articles found in this category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
