/**
 * Article Page Component
 * 
 * Extracted into a separate component for:
 * 1. Better separation of concerns (page component vs rendering)
 * 2. Easier testing
 * 3. Reusable logic
 * 4. Cleaner structure
 */

"use client";

import Link from "next/link";

import { nasalization } from "@/app/fonts";
import { PrismHighlighter } from "@/components/PrismHighlighter";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticlePost } from "@/lib/articleLoader";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const TOC_HEADING_LEVELS = [3];

interface ArticlePageProps {
  post: ArticlePost;
  slug: string;
}

type DepthGuide = {
  intro: string;
  coreConcepts: string[];
  mistakes: string[];
  patterns: string[];
  tradeoffs: string[];
  production: string[];
  takeaway: string;
};

const DEPTH_GUIDES: Record<ArticlePost["category"], DepthGuide> = {
  Architecture: {
    intro:
      "Architecture decisions become expensive only after the system succeeds. That is why unclear boundaries, implicit contracts, and mixed responsibilities feel acceptable early and painful later.",
    coreConcepts: [
      "Define explicit module ownership so each boundary has one clear maintainer.",
      "Model contracts as first-class artifacts: request schema, response schema, and failure semantics.",
      "Keep high-churn code isolated from foundational platform paths.",
      "Prefer deterministic behavior over clever abstraction in critical request paths.",
    ],
    mistakes: [
      "Embedding domain rules in adapters and transport handlers.",
      "Using shared utility files as hidden dependency hubs.",
      "Relying on convention-only contracts without automated validation.",
      "Skipping architecture review for seemingly small service changes.",
    ],
    patterns: [
      "Use service interfaces for domain operations and keep route handlers thin.",
      "Keep architecture decision records for high-impact design trade-offs.",
      "Enforce schema validation at ingress and invariant checks in domain services.",
      "Instrument boundaries with request IDs to make call flow traceable.",
    ],
    tradeoffs: [
      "Layered design increases initial wiring cost but lowers long-term regression risk.",
      "Strict boundaries can slow prototyping but materially improve maintainability.",
      "Explicit contracts require discipline yet reduce integration breakage between teams.",
    ],
    production: [
      "Reliability improves when dependency failures are classified rather than treated as a generic 500.",
      "Security posture improves when auth and policy are separated from business rules.",
      "Performance work becomes predictable when latency budgets are applied per boundary.",
      "Maintainability compounds when architecture encodes ownership and review expectations.",
    ],
    takeaway:
      "Strong architecture is not about complexity. It is about reducing ambiguity under pressure so systems remain understandable, debuggable, and safe to change.",
  },
  DevOps: {
    intro:
      "Operational quality is decided before launch. Teams that delay observability, rollback strategy, and deployment discipline eventually spend release velocity on avoidable incidents.",
    coreConcepts: [
      "Treat deployment as a repeatable system, not a sequence of manual steps.",
      "Validate configuration at startup so failure happens early and visibly.",
      "Collect logs, metrics, and traces with consistent naming and ownership.",
      "Define health checks that represent dependency readiness, not process existence.",
    ],
    mistakes: [
      "Shipping with no rollback conditions or release gates.",
      "Alerting on noise rather than user-impacting SLO conditions.",
      "Using mutable runtime assumptions that differ across environments.",
      "Relying on ad hoc incident handling with no runbooks.",
    ],
    patterns: [
      "Use pre-deploy checklists with automation for schema, env, and service readiness.",
      "Adopt immutable builds and environment-specific runtime configuration.",
      "Use request correlation IDs across logs and traces for triage speed.",
      "Implement canary rollout plus fast rollback paths for high-risk changes.",
    ],
    tradeoffs: [
      "More deployment controls increase process overhead but reduce outage frequency.",
      "Tighter alerting thresholds can increase pager volume if not tuned to business impact.",
      "High observability depth has tooling cost but pays back during every incident.",
    ],
    production: [
      "Reliability improves when releases are gated by measurable health conditions.",
      "Security improves when secrets and config handling are centralized and validated.",
      "Performance regressions are easier to catch with release-time baseline comparisons.",
      "Maintainability improves when incident learnings feed into deployment policy updates.",
    ],
    takeaway:
      "DevOps maturity is the ability to change systems quickly without sacrificing confidence, auditability, or recovery speed.",
  },
  "Full-Stack": {
    intro:
      "Full-stack quality is mostly about boundary management. Systems become fragile when frontend, API, and infrastructure concerns blur into one change surface.",
    coreConcepts: [
      "Separate transport, domain, and integration layers to keep responsibilities clear.",
      "Use shared types for contracts, not shared implementation logic.",
      "Design async flows to be idempotent and observable.",
      "Keep environment strategy explicit across local, CI, and production.",
    ],
    mistakes: [
      "Putting business logic in page components or route handlers.",
      "Duplicating validation rules between client and server with drift over time.",
      "Treating external providers as hardcoded implementation details.",
      "Skipping failure-path testing for async workflows.",
    ],
    patterns: [
      "Use thin route handlers that delegate to service modules.",
      "Keep schema validation in dedicated modules consumed by server boundaries.",
      "Wrap third-party integrations with internal interfaces for replaceability.",
      "Use queue-backed flows when user-facing latency and reliability conflict.",
    ],
    tradeoffs: [
      "Shared contracts improve consistency but require stronger type governance.",
      "Service abstraction adds indirection but drastically simplifies testing and migrations.",
      "Queue-backed processing increases system complexity while improving reliability.",
    ],
    production: [
      "Reliability requires explicit ownership for every cross-layer contract.",
      "Security improves when validation and policy checks happen before service execution.",
      "Performance improves when the UI only hydrates what the user needs immediately.",
      "Maintainability improves when folder structure reflects architectural intent.",
    ],
    takeaway:
      "Strong full-stack systems are built by reducing coupling between layers while keeping contracts explicit, typed, and observable.",
  },
  Performance: {
    intro:
      "Performance is a systems property, not a UI micro-optimization exercise. Most regressions come from cross-layer behavior: rendering strategy, network waterfalls, and cache policy drift.",
    coreConcepts: [
      "Profile first: use route-level metrics and interaction timing before making changes.",
      "Prioritize perceived speed through immediate feedback and stable loading states.",
      "Optimize critical rendering path before touching secondary interactions.",
      "Align data shape with above-the-fold UI requirements.",
    ],
    mistakes: [
      "Optimizing component re-renders while backend latency dominates user wait time.",
      "Hydrating large client trees where static rendering would be sufficient.",
      "Using animation-heavy transitions that increase perceived sluggishness.",
      "Applying one global cache strategy for data with different volatility.",
    ],
    patterns: [
      "Define performance budgets per route and enforce in CI.",
      "Use dynamic import and suspense boundaries for non-critical UI modules.",
      "Implement skeleton states that preserve layout continuity.",
      "Use cache segmentation with explicit revalidation policy per data class.",
    ],
    tradeoffs: [
      "Aggressive caching improves speed but can risk stale critical data.",
      "More client interactivity increases bundle and hydration cost.",
      "Fine-grained splitting improves load time but can increase complexity in dependency management.",
    ],
    production: [
      "Reliability improves when performance budgets are treated as release gates.",
      "Observability should include p95/p99 interaction latency, not just averages.",
      "Security and performance must be balanced when introducing third-party scripts.",
      "Maintainability depends on keeping performance decisions documented and measurable.",
    ],
    takeaway:
      "Fast products are engineered, not hoped for. Measurement discipline plus deliberate rendering and caching strategy creates durable performance gains.",
  },
  Infrastructure: {
    intro:
      "Infrastructure choices define operational behavior long after features ship. Small setup shortcuts often become recurring incident patterns at scale.",
    coreConcepts: [
      "Prefer deterministic, versioned infrastructure definitions over manual operations.",
      "Treat runtime configuration and secrets as controlled system inputs.",
      "Build with immutable artifacts and explicit runtime assumptions.",
      "Define health and readiness semantics as deployment gates.",
    ],
    mistakes: [
      "Unpinned dependencies and mutable runtime environments.",
      "Missing health checks or checks that do not reflect dependency readiness.",
      "Treating container images as build outputs without security hardening.",
      "No disaster-recovery drills for stateful infrastructure changes.",
    ],
    patterns: [
      "Use multi-stage builds and least-privilege runtime users.",
      "Keep infra changes in version control with review and plan/apply discipline.",
      "Validate startup config and fail fast on invalid critical settings.",
      "Add smoke tests and post-deploy verification for critical routes.",
    ],
    tradeoffs: [
      "Hardening and deterministic builds increase setup effort but reduce runtime risk.",
      "Strict startup checks can fail releases early, which is preferable to partial boot failures.",
      "Operational controls can slow iteration slightly while dramatically improving reliability.",
    ],
    production: [
      "Reliability improves when every deploy has explicit rollback criteria.",
      "Security improves with smaller images, non-root runtime, and secret hygiene.",
      "Performance stability depends on resource limits and health-driven orchestration.",
      "Maintainability improves when infrastructure behavior is testable and documented.",
    ],
    takeaway:
      "Infrastructure quality is the discipline of making runtime behavior predictable, secure, and recoverable under change.",
  },
  Data: {
    intro:
      "Data architecture decisions compound quietly until scale exposes them. Type drift, weak indexing, and query-pattern mismatch can turn normal growth into chronic latency and incident pressure.",
    coreConcepts: [
      "Design schemas for domain clarity first, then optimize from measured access patterns.",
      "Use indexes deliberately for real predicates and sort paths, not blanket coverage.",
      "Keep data types precise and stable to preserve planner and index efficiency.",
      "Separate transactional and analytical workloads when contention patterns diverge.",
    ],
    mistakes: [
      "Storing typed fields as strings and losing query planner effectiveness.",
      "Ignoring ORM query shape and shipping N+1 behavior into production.",
      "Adding reactive indexes without validating write amplification trade-offs.",
      "Running schema migrations without backfill and rollback strategy.",
    ],
    patterns: [
      "Track top queries with plan snapshots and detect regressions in staging.",
      "Document index intent and ownership to avoid accidental removal drift.",
      "Use dual-write/dual-read migration phases for high-risk schema changes.",
      "Add query latency SLOs by endpoint to tie data health to user impact.",
    ],
    tradeoffs: [
      "Normalization improves integrity but can increase read complexity.",
      "Denormalization improves read speed but raises consistency and update cost.",
      "Index depth improves query latency while increasing write overhead.",
    ],
    production: [
      "Reliability improves when migration safety is treated as a release concern.",
      "Performance stability depends on continuous query-plan visibility.",
      "Maintainability improves when schema intent is explicit and versioned.",
      "Incident recovery is faster with clear data ownership boundaries.",
    ],
    takeaway:
      "Data systems scale when modeling, indexing, and migration strategy are treated as product-critical engineering, not afterthoughts.",
  },
  Engineering: {
    intro:
      "Engineering quality degrades less from syntax and more from unresolved decisions. Ownership gaps, weak standards, and undocumented trade-offs create recurring drag that compounds across releases.",
    coreConcepts: [
      "Treat architectural decisions as first-class artifacts with rationale and expiry.",
      "Assign ownership per subsystem and keep escalation paths explicit.",
      "Define engineering standards for error handling, observability, and testing.",
      "Measure delivery health with operational signals, not intuition.",
    ],
    mistakes: [
      "Relying on tribal knowledge for critical design assumptions.",
      "Shared modules without maintainers or review accountability.",
      "Deferring small cleanup repeatedly until rewrites become unavoidable.",
      "Treating debt as only code refactoring, not decision and process drift.",
    ],
    patterns: [
      "Use ADRs for high-impact decisions and revisit them on schedule.",
      "Set explicit code ownership for critical modules and interfaces.",
      "Reserve sprint capacity for targeted debt retirement.",
      "Tie quality gates to release metrics such as failure rate and rollback frequency.",
    ],
    tradeoffs: [
      "Governance adds overhead but reduces high-cost ambiguity during incidents.",
      "Stricter standards can slow prototyping while improving long-term velocity.",
      "Decision transparency takes effort yet improves onboarding and review quality.",
    ],
    production: [
      "Reliability improves when ownership and standards are enforceable.",
      "Maintainability improves when decisions are documented and revisitable.",
      "Incident triage accelerates when system boundaries have clear maintainers.",
      "Delivery confidence rises when quality signals are tracked continuously.",
    ],
    takeaway:
      "Most technical debt is decision debt. Clarity in ownership and standards is the fastest path to durable engineering velocity.",
  },
  Systems: {
    intro:
      "Real systems operate in imperfect conditions: weak networks, constrained devices, unstable integrations, and malformed inputs. Reliability depends on tolerance for reality, not ideal assumptions.",
    coreConcepts: [
      "Design every external dependency with timeout, retry, and fallback semantics.",
      "Optimize payload and rendering paths for constrained client environments.",
      "Validate and normalize inputs at all ingress boundaries.",
      "Test adverse scenarios regularly: throttling, packet loss, cold caches, and dependency faults.",
    ],
    mistakes: [
      "Building primarily for fast desktop environments and stable networks.",
      "Assuming upstream contracts remain clean and static.",
      "Providing no degraded UX path when dependencies are unstable.",
      "Testing only happy-path flows before release.",
    ],
    patterns: [
      "Use progressive enhancement and resilient loading states for core journeys.",
      "Apply circuit breakers and bounded retries for noisy dependencies.",
      "Adopt reconnect-aware UX for critical user actions.",
      "Track device-class and network-segment performance metrics.",
    ],
    tradeoffs: [
      "Resilience controls add complexity but reduce outage severity.",
      "Defensive validation adds code paths while protecting domain integrity.",
      "Graceful degradation can limit features temporarily to preserve trust.",
    ],
    production: [
      "Reliability improves when degraded behavior is designed, not improvised.",
      "Performance consistency improves with network- and device-aware strategies.",
      "Security improves when malformed or hostile input is normalized early.",
      "Maintainability improves when resilience rules are standardized across services.",
    ],
    takeaway:
      "Systems earn trust by staying predictable in non-ideal environments. Engineering for real conditions is a core product responsibility.",
  },
};

const DEFAULT_DEPTH_GUIDE: DepthGuide = {
  intro:
    "Production systems are shaped by boundaries, failure behavior, and operational clarity. Strong engineering keeps behavior predictable as complexity and load increase.",
  coreConcepts: [
    "Define explicit contracts at every system boundary.",
    "Design with bounded latency and concurrency limits.",
    "Make errors observable and actionable with structured telemetry.",
    "Keep ownership clear for critical code and infrastructure paths.",
  ],
  mistakes: [
    "Relying on implicit assumptions instead of documented contracts.",
    "Optimizing happy paths while ignoring degraded conditions.",
    "Shipping changes without rollback criteria and observability baselines.",
  ],
  patterns: [
    "Use validation at ingress and invariants in domain services.",
    "Prefer deterministic behavior over hidden control flow.",
    "Track p95/p99 outcomes for user-critical operations.",
    "Continuously feed incident learnings back into architecture decisions.",
  ],
  tradeoffs: [
    "Higher upfront discipline slows initial speed but reduces long-term risk.",
    "Operational guardrails add overhead while improving release confidence.",
  ],
  production: [
    "Reliability comes from explicit limits, ownership, and recovery rules.",
    "Maintainability improves when system intent is encoded in structure.",
    "Performance and safety both improve when behavior is measurable.",
  ],
  takeaway:
    "The best systems are not the most complex. They are the most predictable under real production pressure.",
};

/**
 * Article Renderer
 * Displays the full article with all interactive features
 */
export function ArticlePage({ post, slug }: ArticlePageProps) {
  const scrollPercentage = useScrollProgress();

  return (
    <div className="min-h-screen bg-black">
      {/* Fixed scroll indicator - now using hook instead of script */}
      <ScrollPercentageIndicator percentage={scrollPercentage} />

      {/* Table of Contents - proper React component */}
      <TableOfContents containerSelector=".article-content" headingLevels={TOC_HEADING_LEVELS} />

      {/* Article Header */}
      <ArticleHeader post={post} />

      {/* Article Content */}
      <PrismHighlighter slug={slug}>
        <ArticleContent post={post} />
      </PrismHighlighter>

      {/* Article Footer */}
      <ArticleFooter />
    </div>
  );
}

/**
 * Scroll Percentage Indicator
 * Displays current scroll position
 */
function ScrollPercentageIndicator({ percentage }: { percentage: number }) {
  return (
    <div className="hidden xl:block fixed top-3 right-8 text-[10px] tracking-[0.2em] uppercase text-neutral-600 z-40">
      <span>{Math.round(percentage)}</span>%
    </div>
  );
}

/**
 * Article Header Section
 * Displays title, subtitle, and metadata
 */
function ArticleHeader({ post }: { post: ArticlePost }) {
  return (
    <div className="pt-24 sm:pt-28 pb-10 sm:pb-12">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6">
        <div className="h-px w-20 bg-neutral-700 mb-6" />
        <h1
          className={`${nasalization.className} text-[2.1rem] sm:text-[2.55rem] font-semibold text-white leading-tight tracking-tight`}
        >
          {post.title}
        </h1>
        <p className="text-[0.95rem] sm:text-[1.18rem] text-neutral-500 mt-3 leading-relaxed">
          {post.subtitle}
        </p>
        <div className="flex items-center gap-2.5 mt-5 text-neutral-500 text-[9.5px] uppercase tracking-[0.2em] flex-wrap">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.readTime} min read</span>
          <span>•</span>
          <span className="px-3 py-1 rounded border border-neutral-700 bg-neutral-900/70 text-neutral-300">
            {post.category}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Article Content
 * Includes content, takeaways, and improvements sections
 */
function ArticleContent({ post }: { post: ArticlePost }) {
  const depthGuide = DEPTH_GUIDES[post.category] ?? DEFAULT_DEPTH_GUIDE;

  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6">
        {/* Main article prose section */}
        <div className="article-content prose prose-invert prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:text-[1.7rem] sm:prose-h2:text-[2rem] prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-[0.95rem] sm:prose-h3:text-[0.98rem] prose-h3:font-semibold prose-h3:text-neutral-200 prose-h3:mt-6 prose-h3:mb-2 prose-p:text-[12.5px] sm:prose-p:text-[13px] prose-p:leading-[1.72] prose-p:text-neutral-300 prose-strong:text-neutral-100 prose-a:text-neutral-200 prose-a:no-underline hover:prose-a:text-white prose-li:text-[12.5px] sm:prose-li:text-[13px] prose-li:leading-[1.72] prose-li:text-neutral-300 prose-li:marker:text-neutral-500 prose-ul:my-4 prose-code:text-[0.86em] prose-code:text-neutral-200 prose-pre:my-4 prose-pre:rounded-none prose-pre:border prose-pre:border-neutral-700 prose-pre:bg-neutral-800/65 prose-pre:px-3.5 prose-pre:py-3 prose-pre:leading-[1.42] prose-pre:text-[12px] space-y-4">
          {post.content}

          <h3 id="expanded-introduction">Why This Topic Matters in Production</h3>
          <p>{depthGuide.intro}</p>

          <h3 id="expanded-core-concepts">Core Concepts</h3>
          <ul>
            {depthGuide.coreConcepts.map((concept, index) => (
              <li key={`${post.slug}-concept-${index}`}>{concept}</li>
            ))}
          </ul>

          <h3 id="expanded-real-world-mistakes">Real-World Mistakes</h3>
          <ul>
            {depthGuide.mistakes.map((mistake, index) => (
              <li key={`${post.slug}-mistake-${index}`}>{mistake}</li>
            ))}
          </ul>

          <h3 id="expanded-recommended-patterns">Recommended Patterns</h3>
          <ul>
            {depthGuide.patterns.map((pattern, index) => (
              <li key={`${post.slug}-pattern-${index}`}>{pattern}</li>
            ))}
          </ul>

          <h3 id="expanded-trade-offs">Trade-offs</h3>
          <ul>
            {depthGuide.tradeoffs.map((tradeoff, index) => (
              <li key={`${post.slug}-tradeoff-${index}`}>{tradeoff}</li>
            ))}
          </ul>

          <h3 id="expanded-production-perspective">Production Perspective</h3>
          <ul>
            {depthGuide.production.map((point, index) => (
              <li key={`${post.slug}-production-${index}`}>{point}</li>
            ))}
          </ul>

          <h3 id="expanded-final-takeaway">Final Takeaway</h3>
          <p>{depthGuide.takeaway}</p>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-neutral-800" />

        {/* Key Takeaways Section */}
        <TakeawaysSection takeaways={post.whatILearned} />

        {/* Future Improvements Section */}
        <ImprovementsSection improvements={post.improvements} />
      </div>

      <style jsx global>{`
        .article-content pre[class*="language-"],
        .article-content pre {
          background: #2b2b2b !important;
          border: 1px solid #3a3a3a !important;
          border-radius: 0 !important;
          padding: 0.9rem 1rem !important;
          box-shadow: none !important;
          overflow-x: auto;
        }

        .article-content code[class*="language-"],
        .article-content pre[class*="language-"] code {
          color: #d4d4d4;
          text-shadow: none !important;
          font-size: 12px;
          line-height: 1.62;
          font-family: var(--font-mono), ui-monospace, SFMono-Regular, Menlo,
            Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          background: transparent !important;
        }

        .article-content .token.comment,
        .article-content .token.prolog,
        .article-content .token.doctype,
        .article-content .token.cdata {
          color: #808080;
        }

        .article-content .token.punctuation {
          color: #d4d4d4;
        }

        .article-content .token.keyword,
        .article-content .token.atrule {
          color: #c586c0;
        }

        .article-content .token.string,
        .article-content .token.char,
        .article-content .token.attr-value {
          color: #6a9955;
        }

        .article-content .token.number,
        .article-content .token.boolean,
        .article-content .token.constant {
          color: #b5cea8;
        }

        .article-content .token.function,
        .article-content .token.method,
        .article-content .token.selector {
          color: #dcdcaa;
        }

        .article-content .token.property,
        .article-content .token.parameter,
        .article-content .token.variable {
          color: #9cdcfe;
        }

        .article-content .token.class-name,
        .article-content .token.builtin,
        .article-content .token.type {
          color: #4ec9b0;
        }

        .article-content .token.operator,
        .article-content .token.entity,
        .article-content .token.url {
          color: #d4d4d4;
          background: transparent;
        }
      `}</style>
    </div>
  );
}

/**
 * Takeaways Section
 * Extracted for reusability
 */
function TakeawaysSection({ takeaways }: { takeaways: string[] }) {
  return (
    <section>
      <h2 className="text-[2rem] text-white mb-5 tracking-tight">Key Takeaways</h2>
      <ul className="space-y-3 text-neutral-400">
        {takeaways.map((point, i) => (
          <li key={i} className="text-[13px] leading-relaxed pl-1">
            • {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Improvements Section
 * Extracted for reusability
 */
function ImprovementsSection({ improvements }: { improvements: string[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-[2rem] text-white mb-5 tracking-tight">Future Improvements</h2>
      <ul className="space-y-3 text-neutral-400">
        {improvements.map((point, i) => (
          <li key={i} className="text-[13px] leading-relaxed pl-1">
            → {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Article Footer
 * Navigation back to engineering notes
 */
function ArticleFooter() {
  return (
    <div className="max-w-[640px] mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-neutral-800 pb-16">
      <Link
        href="/engineering-notes"
        className="text-neutral-400 hover:text-white text-[11px] uppercase tracking-[0.16em] transition-colors duration-200"
      >
        ← Back to all articles
      </Link>
    </div>
  );
}
