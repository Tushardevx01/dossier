"use client";

import { useState } from "react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    description: "Learn how to set up and build modern web applications with Next.js 14, the latest version of the popular React framework.",
    date: "Feb 20, 2026",
    category: "NextJS",
    readTime: "5 min read",
    slug: "getting-started-nextjs-14",
  },
  {
    id: "2",
    title: "TypeScript Best Practices",
    description: "Master TypeScript by learning industry-standard practices and patterns used in production applications.",
    date: "Feb 15, 2026",
    category: "TypeScript",
    readTime: "8 min read",
    slug: "typescript-best-practices",
  },
  {
    id: "3",
    title: "Tailwind CSS Tips & Tricks",
    description: "Discover advanced Tailwind CSS techniques to create stunning, responsive designs with minimal code.",
    date: "Feb 10, 2026",
    category: "CSS",
    readTime: "6 min read",
    slug: "tailwind-tips-tricks",
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "NextJS", "TypeScript", "CSS"];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
          Blog & Insights
        </h1>
        <p className="text-lg text-gray-400">
          Exploring web development, design, and technology trends
        </p>
      </section>

      {/* Category Filter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "border border-white/30 text-white hover:border-white/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 hover:bg-white/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors duration-200">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mt-2">{post.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{post.date}</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-400">{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-white border border-white/30 hover:border-white/50 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No posts found in this category
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
