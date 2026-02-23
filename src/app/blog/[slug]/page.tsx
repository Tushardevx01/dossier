"use client";

import Link from "next/link";
import { use } from "react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
  content: string;
  author: string;
}

const blogPostsData: Record<string, BlogPost> = {
  "getting-started-nextjs-14": {
    id: "1",
    title: "Getting Started with Next.js 14",
    description:
      "Learn how to set up and build modern web applications with Next.js 14, the latest version of the popular React framework.",
    date: "Feb 20, 2026",
    category: "NextJS",
    readTime: "5 min read",
    slug: "getting-started-nextjs-14",
    author: "Tushardevx01",
    content: `Next.js 14 brings powerful new features and improvements to make building web applications easier than ever.

## Why Next.js 14?

Next.js has become the go-to framework for modern React development. With version 14, we see significant improvements in performance, developer experience, and features.

### Key Features

1. **App Router**: A more intuitive file-based routing system that makes it easier to build complex applications.
2. **Server Components**: Write components that run on the server, improving performance and security.
3. **Streaming**: Stream content as it's ready, providing faster perceived performance.
4. **Image Optimization**: Built-in image optimization for better performance.

## Getting Started

To create a new Next.js 14 project, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Building Your First Page

Create a new file at \`src/app/page.tsx\`:

\`\`\`typescript
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Next.js 14</h1>
    </main>
  );
}
\`\`\`

## Conclusion

Next.js 14 is a fantastic choice for building modern web applications. With its powerful features and excellent developer experience, you'll be productive from day one.`,
  },
  "typescript-best-practices": {
    id: "2",
    title: "TypeScript Best Practices",
    description:
      "Master TypeScript by learning industry-standard practices and patterns used in production applications.",
    date: "Feb 15, 2026",
    category: "TypeScript",
    readTime: "8 min read",
    slug: "typescript-best-practices",
    author: "Tushardevx01",
    content: `TypeScript has revolutionized how we write JavaScript. Here are the best practices to follow when using TypeScript in your projects.

## Use Strict Mode

Enable strict mode in your \`tsconfig.json\` to catch potential issues:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
\`\`\`

## Type Your Functions

Always provide explicit type annotations for function parameters and return types:

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Use Interfaces Over Types

For object shapes, prefer interfaces:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}
\`\`\`

## Avoid Any

Never use \`any\` unless absolutely necessary. It defeats the purpose of TypeScript:

\`\`\`typescript
// Bad
function process(data: any) {}

// Good
function process(data: unknown) {
  if (typeof data === 'string') {
    // Process string
  }
}
\`\`\`

## Conclusion

Following these practices will make your TypeScript code more maintainable, safer, and easier to understand.`,
  },
  "tailwind-tips-tricks": {
    id: "3",
    title: "Tailwind CSS Tips & Tricks",
    description:
      "Discover advanced Tailwind CSS techniques to create stunning, responsive designs with minimal code.",
    date: "Feb 10, 2026",
    category: "CSS",
    readTime: "6 min read",
    slug: "tailwind-tips-tricks",
    author: "Tushardevx01",
    content: `Tailwind CSS is an amazing utility-first CSS framework. Here are some tips and tricks to level up your styling game.

## Use Arbitrary Values

Tailwind allows you to use arbitrary values when the default scale doesn't fit:

\`\`\`jsx
<div className="w-[572px] h-[242px]">
  Custom dimensions
</div>
\`\`\`

## Compose with @apply

Create reusable component styles with @apply:

\`\`\`css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
  }
}
\`\`\`

## Use Dark Mode

Tailwind makes it easy to support dark mode:

\`\`\`jsx
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Dark mode support
</div>
\`\`\`

## Responsive Design

Build responsive designs effortlessly:

\`\`\`jsx
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive layout
</div>
\`\`\`

## Conclusion

Tailwind CSS empowers you to build beautiful interfaces quickly. Master these techniques to become a Tailwind pro.`,
  },
};

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const post = blogPostsData[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            href="/blog"
            className="inline-block px-4 py-2 border border-white/30 hover:border-white/50 text-white rounded-lg transition-colors duration-200"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 pt-32 pb-20">
      {/* Header */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 mb-12">
        

        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-400 border-b border-white/10 pb-6">
          <span>{post.date}</span>
          <span className="text-xs px-3 py-1 rounded-full bg-white/10">
            {post.category}
          </span>
          <span>{post.readTime}</span>
          <span>by {post.author}</span>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6">
        <article className="prose prose-invert max-w-none">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("##")) {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-bold text-white mt-8 mb-4"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("###")) {
                return (
                  <h3
                    key={index}
                    className="text-xl font-semibold text-gray-200 mt-6 mb-3"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("```")) {
                return (
                  <pre key={index} className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-white/10">
                    <code className="text-gray-300 font-mono text-sm">
                      {paragraph
                        .replace(/```typescript\n?/g, "")
                        .replace(/```bash\n?/g, "")
                        .replace(/```json\n?/g, "")
                        .replace(/```jsx\n?/g, "")
                        .replace(/```css\n?/g, "")
                        .replace(/```/g, "")}
                    </code>
                  </pre>
                );
              }
              if (paragraph.startsWith("1.") || paragraph.startsWith("2.") || paragraph.startsWith("3.")) {
                return (
                  <ul key={index} className="list-decimal list-inside space-y-2">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="text-gray-300">
                        {item.replace(/^\d+\.\s*/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-gray-300">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 border border-white/30 hover:border-white/50 text-white rounded-lg transition-colors duration-200"
          >
            ← Back to Blog
          </Link>
        </div>
      </section>
    </div>
  );
}
