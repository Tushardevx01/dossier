"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useScroll, useMotionValueEvent, motion } from "motion/react";
import { useState, useRef } from "react";
import { nasalization } from "@/app/fonts";

// Blog articles data
const articles: Record<
  string,
  {
    title: string;
    subtitle: string;
    date: string;
    readTime: number;
    category: string;
    content: React.ReactNode;
    whatILearned: string[];
    improvements: string[];
  }
> = {
  "structuring-scalable-fullstack": {
    title: "Structuring a Scalable Full-Stack Project",
    subtitle: "From Next.js to Deployment",
    date: "Feb 20, 2026",
    readTime: 12,
    category: "Full-Stack",
    content: (
      <>
        <p>
          Building a scalable full-stack application requires more than just writing code. It requires thoughtful architecture,
          clear separation of concerns, and patterns that scale as your application grows.
        </p>

        <h3>The Foundation: Folder Structure</h3>
        <p>
          Start with a clear folder hierarchy. Your project should tell a story about how data flows through it.
        </p>
        <pre>
          <code>{`src/
├── app/              # Next.js App Router
├── components/       # Reusable UI components
├── lib/              # Utilities and helpers
├── services/         # External API calls
├── types/            # TypeScript definitions
├── middleware/       # Middleware functions
└── config/           # Environment & config`}</code>
        </pre>

        <h3>API Routes and Data Flow</h3>
        <p>
          Keep your API routes lean. They should handle HTTP concerns only: validation, auth, error handling.
          Business logic belongs in services, not in route handlers.
        </p>

        <h3>Environment and Secrets</h3>
        <p>
          Never hardcode secrets. Use .env.local for development and environment variables in production.
          Validate that required variables exist on startup.
        </p>

        <h3>Database and Migrations</h3>
        <p>
          Use an ORM like Prisma or TypeORM. Keep migrations in version control. Test migrations locally before deploying.
        </p>

        <h3>Error Handling Strategy</h3>
        <p>
          Errors should be structured, loggable, and safe to show to users. Create custom error classes for different
          failure scenarios. Log them with context, not just the message.
        </p>

        <h3>Testing and Type Safety</h3>
        <p>
          TypeScript catches many errors at compile time. Write integration tests for critical paths.
          Mock external services in unit tests.
        </p>
      </>
    ),
    whatILearned: [
      "Clear folder structure prevents architectural debt",
      "Separating concerns makes testing easier",
      "Environment management is critical for multi-environment deployments",
      "Type safety catches errors early",
    ],
    improvements: [
      "Add a monitoring and logging strategy from day one",
      "Implement feature flags for safer deployments",
      "Use API versioning if you have external consumers",
    ],
  },

  "contact-email-pipeline-nodemailer": {
    title: "Designing a Contact Email Pipeline with Nodemailer",
    subtitle: "Building Reliability into Form Submissions",
    date: "Feb 18, 2026",
    readTime: 10,
    category: "Full-Stack",
    content: (
      <>
        <p>
          Email feels simple: form submission → send email. In production, it's more complex.
          You need error handling, retries, rate limiting, and monitoring.
        </p>

        <h3>The Architecture</h3>
        <p>
          A reliable email system has three parts: validation, queueing, and sending.
          You don't want to send an email and have the user wait for the response.
        </p>

        <h3>Setting Up Nodemailer</h3>
        <pre>
          <code>{`const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(to, subject, html) {
  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return result;
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
}`}</code>
        </pre>

        <h3>Rate Limiting</h3>
        <p>
          Without rate limiting, a bot can spam emails from your server. Use Redis to track submission counts
          and reject requests that exceed the limit.
        </p>

        <h3>Error Handling</h3>
        <p>
          Email failures happen. Your system should retry with exponential backoff.
          Log failures to a database so you can investigate why emails aren't getting through.
        </p>

        <h3>Monitoring</h3>
        <p>
          Track: sent emails, failed sending attempts, bounces, and user complaints.
          Set up alerts if the failure rate spikes.
        </p>
      </>
    ),
    whatILearned: [
      "Queuing separates submission from sending",
      "Rate limiting prevents abuse",
      "Logging failures helps you find issues fast",
      "Email providers have limits too—watch your quota",
    ],
    improvements: [
      "Implement a dead letter queue for permanently failed emails",
      "Add email preview rendering to catch template bugs",
      "Use webhook verification to confirm email provider responses",
    ],
  },

  "nextjs-production-deployment": {
    title: "Deploying Next.js to Production",
    subtitle: "What Actually Matters",
    date: "Feb 15, 2026",
    readTime: 15,
    category: "DevOps",
    content: (
      <>
        <p>
          Deploying to production is different from running locally. You need to think about uptime, scaling,
          secrets, monitoring, and rollback strategies.
        </p>

        <h3>Environment Configuration</h3>
        <p>
          Never commit secrets. Use environment variables for everything that changes between dev and production.
          Validate required variables exist on startup.
        </p>

        <h3>Database Connections</h3>
        <p>
          Connection pooling is critical. If you create a new database connection per request, you'll run out of
          connections. Use a connection pool and set reasonable limits.
        </p>

        <h3>Error Logging and Monitoring</h3>
        <p>
          Set up Sentry, LogRocket, or similar. Errors in production need immediate visibility.
          You can't debug what you don't know about.
        </p>

        <h3>Gzip and Caching Headers</h3>
        <p>
          Enable Gzip compression. Set proper Cache-Control headers for static assets.
          This reduces bandwidth costs and improves page load time.
        </p>

        <h3>Health Checks and Graceful Shutdown</h3>
        <p>
          Implement a /health endpoint that your orchestrator (Kubernetes, load balancer) can hit.
          Gracefully handle SIGTERM signals for clean shutdown during deployments.
        </p>

        <h3>Secrets and .env Management</h3>
        <p>
          Use your platform's native secrets management (Vercel Secrets, AWS Secrets Manager, etc.).
          Never use .env files in production—they're for local development only.
        </p>
      </>
    ),
    whatILearned: [
      "Production is not a bigger localhost",
      "Monitoring is non-negotiable",
      "Graceful shutdown prevents data loss",
      "Connection pooling scales better than raw connections",
    ],
    improvements: [
      "Implement gradual rollouts instead of big-bang deployments",
      "Add synthetic monitoring to catch issues before users do",
      "Set up performance budgets to track Core Web Vitals",
    ],
  },

  "database-schema-design": {
    title: "Database Schema Design for High-Performance Applications",
    subtitle: "Lessons from Optimizing Queries",
    date: "Feb 12, 2026",
    readTime: 14,
    category: "Architecture",
    content: (
      <>
        <p>
          Schema design decisions made early echo through your system for years. Bad design causes slow queries,
          scaling problems, and technical debt.
        </p>

        <h3>Normalization vs. Denormalization</h3>
        <p>
          Normalize to avoid duplication. Denormalize when you have a specific performance problem.
          Don't denormalize speculatively—measure first.
        </p>

        <h3>Indexing Strategy</h3>
        <p>
          Indexes speed up reads at the cost of write performance. Index columns you filter or join on.
          Don't index everything. Measure query performance with EXPLAIN ANALYZE.
        </p>

        <h3>Foreign Keys and Constraints</h3>
        <p>
          Foreign keys enforce data consistency but add overhead. Use them for critical relationships.
          Be careful with cascading deletes—they can delete more than you expect.
        </p>

        <h3>Handling Large Tables</h3>
        <p>
          As tables grow, queries slow down. Partition large tables by date or ID range.
          Archive old data. Use pagination instead of loading everything.
        </p>

        <h3>Common Pitfalls</h3>
        <p>
          Storing JSON in a text column when you need to query it. Using VARCHAR(255) for everything.
          Not setting NOT NULL constraints. Missing unique constraints.
        </p>
      </>
    ),
    whatILearned: [
      "Bad indexes hurt more than no indexes",
      "Normalization is a starting point, not the end goal",
      "Query performance depends on schema design",
      "Foreign keys catch errors early",
    ],
    improvements: [
      "Use a query analyzer to identify slow queries early",
      "Document why denormalization exists in your schema",
      "Set up monitoring for query performance trends",
    ],
  },

  "infrastructure-as-code-terraform": {
    title: "Infrastructure as Code",
    subtitle: "Managing Your Stack with Terraform",
    date: "Feb 10, 2026",
    readTime: 16,
    category: "Infrastructure",
    content: (
      <>
        <p>
          Manual infrastructure is fragile. Terraform lets you version control your infrastructure,
          review changes, and reproduce environments exactly.
        </p>

        <h3>Basic Terraform Structure</h3>
        <pre>
          <code>{`terraform/
├── main.tf           # Main resources
├── variables.tf      # Input variables
├── outputs.tf        # Output values
├── provider.tf       # Provider config
└── terraform.tfstate # State file (don't commit)`}</code>
        </pre>

        <h3>State Management</h3>
        <p>
          Terraform state tracks your infrastructure. Store it remotely (S3, Terraform Cloud) and lock it
          to prevent concurrent modifications.
        </p>

        <h3>Modules for Reusability</h3>
        <p>
          Group related resources into modules. You can reuse modules across projects and version them.
          This reduces copy-paste mistakes.
        </p>

        <h3>Testing Infrastructure</h3>
        <p>
          Use terratest or similar tools to test your infrastructure code. Catch configuration errors
          before they reach production.
        </p>

        <h3>Disaster Recovery</h3>
        <p>
          IaC makes disaster recovery straightforward. Recreate your entire stack from code.
          Test recovery regularly—don't assume it will work.
        </p>
      </>
    ),
    whatILearned: [
      "IaC is essential for reproducibility",
      "State files are critical—protect them",
      "Modules are worth building from the start",
      "Infrastructure bugs are as critical as code bugs",
    ],
    improvements: [
      "Implement policy checks with Sentinel or similar",
      "Use workspaces to separate dev and production",
      "Document assumptions baked into infrastructure",
    ],
  },

  "react-performance-optimization": {
    title: "Optimizing React Performance",
    subtitle: "Beyond the Obvious",
    date: "Feb 8, 2026",
    readTime: 13,
    category: "Performance",
    content: (
      <>
        <p>
          React is fast by default. Most performance problems aren't React's fault—they're your code's.
          Focus on the right optimizations.
        </p>

        <h3>Identify the Problem First</h3>
        <p>
          Use React DevTools Profiler to measure. Don't optimize what you haven't measured.
          Optimize the biggest bottlenecks first.
        </p>

        <h3>Code Splitting and Lazy Loading</h3>
        <p>
          Split your bundle by route. Lazy load components that aren't immediately visible.
          This reduces initial page load time.
        </p>

        <h3>Memoization: When It Helps</h3>
        <p>
          useMemo and useCallback prevent recreating values. But they have overhead.
          Only use them if you've measured that they help. Premature memoization slows things down.
        </p>

        <h3>Virtual Scrolling for Large Lists</h3>
        <p>
          Don't render 10,000 list items. Use a virtual scroller to render only visible items.
          This is a night-and-day difference for performance.
        </p>

        <h3>Image Optimization</h3>
        <p>
          Images are often the biggest assets. Use next/image, serve modern formats (WebP),
          and resize for different screen sizes.
        </p>

        <h3>Network Waterfall</h3>
        <p>
          Sometimes the bottleneck isn't React—it's slow API requests. Parallelize requests.
          Use caching. Consider prefetching.
        </p>
      </>
    ),
    whatILearned: [
      "Measure before optimizing",
      "Most React apps don't need heavy optimization",
      "Network is often the bottleneck, not rendering",
      "Small optimizations compound",
    ],
    improvements: [
      "Set up performance budgets in your CI",
      "Use Lighthouse for automated audits",
      "Profile with real user data, not just synthetic tests",
    ],
  },
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({ container: containerRef });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  const article = articles[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-black pt-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article not found</h1>
          <Link href="/blog" className="text-white hover:text-neutral-300">
            ← Back to all articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black" ref={containerRef}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neutral-600 to-neutral-700 origin-left z-50"
        style={{ scaleX: scrollProgress }}
      />
      {/* Article Header */}
      <div className="bg-black pt-20 sm:pt-28 pb-12 sm:pb-16 border-b border-neutral-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          

          <h1 className={`${nasalization.className} text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 tracking-tight leading-tight`}>
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-xl sm:text-2xl text-neutral-500 mb-6 sm:mb-8 leading-relaxed">{article.subtitle}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-neutral-500 text-xs uppercase tracking-widest font-medium">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime} min read</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-300 font-medium no-underline">
              {article.category}
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="prose prose-invert max-w-none prose-p:text-neutral-400 prose-p:text-lg prose-p:leading-relaxed prose-headings:text-white prose-headings:font-semibold prose-h3:text-xl prose-h3:tracking-tight prose-h3:mt-10 prose-h3:mb-4 prose-strong:text-white prose-a:text-neutral-400 prose-a:underline hover:prose-a:text-neutral-300 prose-code:text-neutral-300 prose-code:bg-neutral-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-800 prose-pre:text-neutral-300 prose-li:text-neutral-400 prose-li:text-lg prose-li:leading-relaxed">
            {article.content}
          </div>

          {/* Divider */}
          <div className="my-16 sm:my-20 border-t border-neutral-800" />

          {/* Takeaways Section */}
          <div className="space-y-12 sm:space-y-16">
            <div>
              <h2 className={`${nasalization.className} text-3xl font-semibold text-white mb-6 tracking-tight`}>
                Key Takeaways
              </h2>
              <ul className="space-y-3 sm:space-y-4">
                {article.whatILearned.map((point, index) => (
                  <li key={index} className="flex gap-4 text-base sm:text-lg text-neutral-400 leading-relaxed">
                    <span className="text-white font-semibold min-w-6 flex-shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={`${nasalization.className} text-3xl font-semibold text-white mb-6 tracking-tight`}>
                Future Improvements
              </h2>
              <ul className="space-y-3 sm:space-y-4">
                {article.improvements.map((point, index) => (
                  <li key={index} className="flex gap-4 text-base sm:text-lg text-neutral-400 leading-relaxed">
                    <span className="text-white font-semibold min-w-6 flex-shrink-0">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-16 sm:mt-20 pt-8 border-t border-neutral-800">
            <Link href="/blog" className="text-neutral-400 hover:text-neutral-200 font-medium text-sm uppercase tracking-widest transition-colors duration-200">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
