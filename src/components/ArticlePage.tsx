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

type LongFormSection = {
  intro: string[];
  coreConcepts: string[];
  mistakes: string[];
  patterns: string[];
  tradeoffs: string[];
  production: string[];
  finalTakeaway: string[];
  implementationChecklist: string[];
  architectureNotes: string[];
  codeExampleTitle: string;
  codeLanguage: string;
  codeExample: string;
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

const LONG_FORM_CONTEXT: Record<ArticlePost["category"], LongFormSection> = {
  Architecture: {
    intro: [
      "Most architecture failures are not caused by one bad decision. They are caused by many unowned assumptions that slowly become coupling: implicit contracts, hidden side effects, and unclear module boundaries. Teams feel productive until change frequency increases, then every release carries disproportionate risk.",
      "In production, architecture quality is observed through behavior under stress: whether incidents are diagnosable, whether rollbacks are safe, and whether one subsystem failure is contained or amplified. Good architecture is less about abstract diagrams and more about preserving predictable change as systems and teams grow.",
    ],
    coreConcepts: [
      "Boundary quality matters more than component count. A smaller number of explicit boundaries beats many loosely defined layers.",
      "Contract-first thinking prevents drift: schema, invariants, and error semantics should be defined before implementation details.",
      "Ownership is an architecture primitive. Unowned modules become long-term reliability risks.",
      "High-churn logic should be isolated from critical execution paths to limit blast radius.",
    ],
    mistakes: [
      "Optimizing for local code elegance while ignoring cross-service coupling.",
      "Treating architecture docs as static artifacts instead of living decision records.",
      "Allowing transport concerns to leak into core domain services.",
      "Skipping backward-compatibility planning for internal interfaces.",
    ],
    patterns: [
      "Use architectural decision records with explicit context, alternatives, and rollback conditions.",
      "Run boundary reviews for high-impact changes before implementation begins.",
      "Enforce schema validation and invariant checks at every system edge.",
      "Instrument boundary latency and error classes to detect structural degradation early.",
    ],
    tradeoffs: [
      "Explicit layering increases initial implementation cost but reduces long-term debugging cost.",
      "Strict ownership can slow ad hoc changes while improving accountability and operational quality.",
      "Contract rigor adds ceremony but dramatically lowers integration failure rates.",
    ],
    production: [
      "Reliability improves when failure modes are classified and routed to explicit recovery paths.",
      "Security posture improves when policy checks are centralized rather than scattered.",
      "Performance tuning gets easier when latency can be attributed to a specific boundary.",
      "Maintainability compounds when architecture encodes intent and ownership clearly.",
    ],
    finalTakeaway: [
      "Architecture should optimize for safe change, not only for initial delivery speed.",
      "If your system is easy to reason about during incidents, your architecture is working.",
    ],
    implementationChecklist: [
      "Define ownership for every critical module and service boundary.",
      "Version and validate contracts at ingress and integration points.",
      "Measure p95/p99 latency and error rates by architectural boundary.",
      "Document rollback strategies for high-risk structural changes.",
    ],
    architectureNotes: [
      "Boundary-first architecture scales better than framework-first architecture because it keeps design intent stable while implementation details evolve.",
      "Teams should review architecture through incident history: repeated failure patterns usually reveal structural coupling rather than isolated bugs.",
      "A practical litmus test: if rollback decisions require cross-team emergency synchronization, your boundaries are too entangled.",
    ],
    codeExampleTitle: "Boundary-Safe Service Contract",
    codeLanguage: "typescript",
    codeExample: `type CreateOrderInput = {
  customerId: string;
  items: Array<{ sku: string; quantity: number }>;
};

type CreateOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; code: "VALIDATION" | "FORBIDDEN" | "DEPENDENCY"; message: string };

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  // transport validation should happen before this boundary
  if (!input.customerId || input.items.length === 0) {
    return { ok: false, code: "VALIDATION", message: "Invalid order payload" };
  }

  // domain + dependency orchestration here
  return { ok: true, orderId: crypto.randomUUID() };
}`,
  },
  DevOps: {
    intro: [
      "DevOps maturity is the ability to ship quickly with bounded risk. Teams that treat operations as post-launch work eventually spend delivery time on avoidable incidents, noisy alerts, and unclear release decisions.",
      "Production outcomes are largely determined by release discipline: startup validation, rollout strategy, dependency-aware health checks, and meaningful observability. Without those controls, deployment velocity creates instability rather than business value.",
    ],
    coreConcepts: [
      "Release safety is built from deterministic pipelines, not manual heroics.",
      "Health checks must represent dependency readiness, not process liveness alone.",
      "Observability must be actionable: clear ownership, stable naming, and runbook links.",
      "Rollback is a design-time decision, not an emergency-time debate.",
    ],
    mistakes: [
      "Deploying without explicit error-budget based release gates.",
      "Alerting on raw exceptions instead of user-impacting signals.",
      "Allowing environment drift between local, CI, staging, and production.",
      "Treating incident response as tribal knowledge rather than operational process.",
    ],
    patterns: [
      "Adopt progressive delivery with canary analysis and pre-defined rollback triggers.",
      "Fail fast on invalid runtime configuration before accepting traffic.",
      "Use immutable artifacts with environment-specific configuration boundaries.",
      "Review post-incident actions into deployment and monitoring policy.",
    ],
    tradeoffs: [
      "More release controls increase pipeline complexity but prevent expensive outages.",
      "Deeper telemetry increases cost while reducing diagnosis time during incidents.",
      "Strict preflight checks can block releases early, which is cheaper than partial runtime failures.",
    ],
    production: [
      "Reliability improves when deploys are gated by measurable dependency and user-flow health.",
      "Security improves with centralized secret management and startup validation.",
      "Performance regressions are easier to isolate when releases carry baseline markers.",
      "Maintainability improves when operational ownership is explicit and audited.",
    ],
    finalTakeaway: [
      "DevOps is not tooling breadth. It is disciplined change management under uncertainty.",
      "A fast team is one that can release and recover predictably, repeatedly, and safely.",
    ],
    implementationChecklist: [
      "Define release and rollback criteria before every production change.",
      "Instrument golden signals with owner-mapped alerts.",
      "Verify dependency-aware health checks for critical paths.",
      "Run periodic failure drills for rollback and alert handling.",
    ],
    architectureNotes: [
      "Release pipelines should be treated as production systems with their own reliability posture and observability requirements.",
      "Deployment maturity is reflected by decision latency during incidents: teams with predefined thresholds recover materially faster.",
      "Operational consistency improves when CI/CD and runbooks use the same service ownership model.",
    ],
    codeExampleTitle: "Release Gate + Rollback Trigger",
    codeLanguage: "typescript",
    codeExample: `type ReleaseSignals = {
  errorRate: number;
  p95LatencyMs: number;
  queueBacklog: number;
};

export function shouldRollback(signals: ReleaseSignals): boolean {
  const breaches = [
    signals.errorRate > 0.03,
    signals.p95LatencyMs > 1200,
    signals.queueBacklog > 5000,
  ];

  return breaches.filter(Boolean).length >= 2;
}`,
  },
  "Full-Stack": {
    intro: [
      "Full-stack systems fail when boundaries blur. A feature that ships quickly across UI, API, and persistence can silently accumulate coupling that later blocks safe iteration. The problem is rarely one layer; it is coordination quality across layers.",
      "Production-ready full-stack engineering requires explicit contracts between frontend behavior, server policy, and infrastructure assumptions. When those contracts are typed, observable, and owned, teams can evolve quickly without recurring regressions.",
    ],
    coreConcepts: [
      "Route composition should stay thin while domain services hold business invariants.",
      "Shared types are useful for contracts, but implementation boundaries must remain independent.",
      "Async user journeys need idempotency, retries, and clear completion semantics.",
      "Configuration strategy should be explicit across build, runtime, and environments.",
    ],
    mistakes: [
      "Embedding domain logic in UI components or transport handlers.",
      "Duplicating validation rules across client/server without synchronization.",
      "Hardcoding third-party behavior directly into feature code paths.",
      "Skipping failure-path testing for queue-backed or webhook-based workflows.",
    ],
    patterns: [
      "Use service interfaces to isolate external providers and ease migration.",
      "Apply schema validation at API boundaries and invariant validation in services.",
      "Use background processing when reliability requirements conflict with synchronous latency.",
      "Treat cross-layer contracts as versioned assets with compatibility checks.",
    ],
    tradeoffs: [
      "More abstraction increases indirection but improves testability and change safety.",
      "Queue-based workflows improve resilience while adding operational complexity.",
      "Strict contract governance can slow ad hoc changes but lowers long-term defect rate.",
    ],
    production: [
      "Reliability improves with explicit ownership of cross-layer contracts.",
      "Security improves when validation and policy happen before domain execution.",
      "Performance improves when rendering and data-fetch decisions follow user intent.",
      "Maintainability improves when folder structure encodes architectural responsibility.",
    ],
    finalTakeaway: [
      "Full-stack quality is coordination quality across boundaries.",
      "Systems scale when contracts stay explicit and behavior remains observable across layers.",
    ],
    implementationChecklist: [
      "Audit where business logic lives and move it behind service boundaries.",
      "Standardize validation schemas and share contract definitions safely.",
      "Instrument async workflows with idempotency and retry telemetry.",
      "Define environment validation and deployment assumptions explicitly.",
    ],
    architectureNotes: [
      "Full-stack complexity becomes manageable when each layer has an explicit reason to change and clear ownership for that change.",
      "Shared types are most useful at boundary contracts; shared implementation logic across layers increases coupling risk.",
      "Route-level composition should optimize user intent, while service-level contracts optimize business correctness.",
    ],
    codeExampleTitle: "Thin Route + Service Boundary",
    codeLanguage: "typescript",
    codeExample: `// app/api/contact/route.ts
export async function POST(req: Request) {
  const payload = await req.json();
  const result = await contactService.submit(payload);
  return Response.json(result, { status: result.ok ? 202 : 400 });
}

// services/contactService.ts
export async function submit(payload: unknown) {
  // parse, validate, enforce policy, queue side effects
  return { ok: true, status: "queued" };
}`,
  },
  Performance: {
    intro: [
      "Performance is an end-to-end systems concern. Teams often optimize render micro-costs while the real bottlenecks are API fan-out, cache misses, payload bloat, and hydration timing. Without measurement, optimization effort becomes expensive guesswork.",
      "Users perceive performance as responsiveness and stability, not benchmark numbers. Improving trust requires balancing network behavior, rendering order, and feedback states across the entire request-to-interaction path.",
    ],
    coreConcepts: [
      "Budget by route and interaction, not by abstract global averages.",
      "Prioritize critical rendering path and above-the-fold data shape.",
      "Use cache strategy by data volatility class, not one universal TTL.",
      "Measure p95/p99 for real-user interactions to catch meaningful regressions.",
    ],
    mistakes: [
      "Optimizing memoization while backend latency dominates the path.",
      "Hydrating large client trees where static or server rendering is sufficient.",
      "Ignoring network waterfalls from fragmented data dependencies.",
      "Shipping performance changes without validating user-impact metrics.",
    ],
    patterns: [
      "Use route-level performance budgets enforced in CI and release checks.",
      "Split bundles by user journey and defer non-critical dependencies.",
      "Use skeleton states to preserve layout continuity and perceived speed.",
      "Correlate frontend interaction timing with backend trace spans.",
    ],
    tradeoffs: [
      "Aggressive caching improves speed but can harm correctness if freshness is critical.",
      "More client interactivity increases bundle/hydration cost.",
      "Deeper instrumentation increases overhead while improving optimization precision.",
    ],
    production: [
      "Reliability improves when performance regressions are treated as release-blocking defects.",
      "Observability should include route-level interaction and long-task telemetry.",
      "Security and performance must be balanced for third-party script loading.",
      "Maintainability improves when optimization rationale is documented and measurable.",
    ],
    finalTakeaway: [
      "Performance wins come from system-level decisions, not isolated tweaks.",
      "Measure first, optimize second, and validate impact against user journeys.",
    ],
    implementationChecklist: [
      "Set p95 budgets for top conversion-critical routes.",
      "Audit and reduce network waterfalls in critical interactions.",
      "Adopt bundle splitting aligned to route intent.",
      "Track real-user interaction metrics continuously.",
    ],
    architectureNotes: [
      "Performance architecture should start from user-critical paths and only then drill into component-level cost.",
      "Latency regressions are often distributed across network, API, and hydration; single-layer tuning rarely holds long term.",
      "Budget policy should include both backend and frontend telemetry to avoid false optimization wins.",
    ],
    codeExampleTitle: "Route-Level Performance Budget Guard",
    codeLanguage: "typescript",
    codeExample: `type RoutePerf = { route: string; p95Ms: number; bundleKb: number };

const budgets: Record<string, { p95Ms: number; bundleKb: number }> = {
  "/": { p95Ms: 900, bundleKb: 180 },
  "/pricing": { p95Ms: 1000, bundleKb: 220 },
};

export function violatesBudget(sample: RoutePerf): boolean {
  const budget = budgets[sample.route];
  if (!budget) return false;
  return sample.p95Ms > budget.p95Ms || sample.bundleKb > budget.bundleKb;
}`,
  },
  Infrastructure: {
    intro: [
      "Infrastructure quality determines runtime predictability. Small shortcuts in build determinism, image hardening, or runtime assumptions often become recurring incident patterns once traffic and deployment frequency increase.",
      "Production-grade infrastructure is not just provisioning. It is the discipline of reproducible builds, secure defaults, dependency-aware health checks, and controlled rollout behavior across environments.",
    ],
    coreConcepts: [
      "Deterministic builds reduce environment drift and improve rollback confidence.",
      "Runtime assumptions should be explicit: ports, env vars, health semantics, and resource limits.",
      "Image minimization and least privilege reduce attack surface and startup variance.",
      "State and migration workflows require reversible, audited execution paths.",
    ],
    mistakes: [
      "Using mutable runtime dependencies and unpinned tooling versions.",
      "Health checks that do not validate critical dependencies.",
      "Shipping containers as root with broad filesystem permissions.",
      "Skipping disaster recovery and restoration drills for stateful systems.",
    ],
    patterns: [
      "Use multi-stage builds, minimal runtime images, and non-root users.",
      "Validate runtime configuration before process start.",
      "Implement deploy smoke checks and post-release verification.",
      "Keep infrastructure changes in version control with plan/apply review discipline.",
    ],
    tradeoffs: [
      "Hardening and deterministic builds add setup cost but reduce incident frequency.",
      "Strict startup checks fail early, which is preferable to hidden partial failures.",
      "Operational controls can slow release pace slightly while improving confidence.",
    ],
    production: [
      "Reliability improves with explicit readiness and rollback conditions.",
      "Security improves via least-privilege runtime and secret hygiene.",
      "Performance stability depends on proper resource limits and healthy orchestration.",
      "Maintainability improves when runtime behavior is observable and testable.",
    ],
    finalTakeaway: [
      "Infrastructure is part of product quality.",
      "Predictable runtime behavior is the baseline for safe delivery at scale.",
    ],
    implementationChecklist: [
      "Pin build/runtime dependencies and validate reproducibility.",
      "Enforce non-root runtime and minimal image footprint.",
      "Define dependency-aware health checks and deploy gates.",
      "Test backup and restore paths regularly.",
    ],
    architectureNotes: [
      "Infrastructure drift is often a governance issue before it becomes an outage issue.",
      "Deterministic builds reduce rollback ambiguity and simplify incident diagnosis.",
      "Security and reliability both improve when runtime assumptions are explicit and validated.",
    ],
    codeExampleTitle: "Container Readiness Contract",
    codeLanguage: "typescript",
    codeExample: `type Health = { app: boolean; db: boolean; queue: boolean };

export function readinessStatus(health: Health) {
  const ready = health.app && health.db && health.queue;
  return {
    ready,
    status: ready ? "ready" : "degraded",
    details: health,
  };
}`,
  },
  Data: {
    intro: [
      "Data systems fail slowly, then suddenly. Early schema shortcuts often look harmless until growth exposes expensive scans, locking contention, migration fragility, and analytics pressure on transactional paths.",
      "At scale, data architecture is an operational concern. Query performance, consistency behavior, and migration safety directly influence user experience, release confidence, and incident frequency.",
    ],
    coreConcepts: [
      "Model for domain clarity and evolve based on measured access patterns.",
      "Index for real predicates and sort paths, balancing read gain against write cost.",
      "Use correct data types to preserve planner efficiency and constraint safety.",
      "Separate transactional and analytical workloads when contention emerges.",
    ],
    mistakes: [
      "Relying on ORM defaults without inspecting generated SQL behavior.",
      "Adding indexes reactively without workload-level validation.",
      "Treating migrations as one-step operations without fallback paths.",
      "Allowing schema and query intent to remain undocumented.",
    ],
    patterns: [
      "Track top query plans and compare before/after schema changes.",
      "Document index ownership and use-case rationale.",
      "Use staged migrations with dual-read or backfill verification where needed.",
      "Set latency SLOs on data-heavy endpoints and monitor regression trends.",
    ],
    tradeoffs: [
      "Normalization improves integrity but can increase read complexity.",
      "Denormalization improves read speed but raises consistency complexity.",
      "More indexing improves reads while increasing write amplification.",
    ],
    production: [
      "Reliability improves when migration safety is a first-class release requirement.",
      "Observability should include lock contention, queue depth, and plan regressions.",
      "Security improves through strict access policy and least-privilege data paths.",
      "Maintainability improves when data decisions are versioned and reviewable.",
    ],
    finalTakeaway: [
      "Data quality at scale is mostly decision quality over time.",
      "Measured schema and query discipline prevents expensive operational debt.",
    ],
    implementationChecklist: [
      "Review top query plans regularly and capture regressions.",
      "Audit indexes for purpose, cost, and ownership.",
      "Define migration rollback and verification strategy.",
      "Track data-layer SLOs tied to user-facing routes.",
    ],
    architectureNotes: [
      "Data architecture should be reviewed with both query latency and migration risk in mind; optimizing one and ignoring the other creates hidden fragility.",
      "Index strategy is part of product performance strategy, not only database maintenance.",
      "Teams should model expected growth vectors explicitly to avoid reactive schema churn.",
    ],
    codeExampleTitle: "Migration Safety Checklist Contract",
    codeLanguage: "typescript",
    codeExample: `type MigrationPlan = {
  hasBackfill: boolean;
  hasRollback: boolean;
  dualReadWindowDays: number;
  verifiedInStaging: boolean;
};

export function migrationIsSafe(plan: MigrationPlan): boolean {
  return (
    plan.hasBackfill &&
    plan.hasRollback &&
    plan.dualReadWindowDays >= 7 &&
    plan.verifiedInStaging
  );
}`,
  },
  Engineering: {
    intro: [
      "Engineering velocity degrades less from syntax quality and more from unresolved decisions. Unclear ownership, weak standards, and undocumented trade-offs create recurring friction in delivery, incident response, and onboarding.",
      "High-performing teams treat decision quality as a technical concern. They make assumptions explicit, maintain enforceable standards, and measure organizational health using operational signals rather than intuition.",
    ],
    coreConcepts: [
      "Ownership is a reliability feature, not just a management convenience.",
      "Standards reduce variance and improve review consistency at scale.",
      "Decision records preserve context that otherwise gets lost during team change.",
      "Continuous debt retirement outperforms periodic rewrite cycles.",
    ],
    mistakes: [
      "Treating debt as only code cleanup while ignoring governance debt.",
      "Critical modules with no clear maintainers.",
      "Architecture decisions made under urgency without revisit points.",
      "Inconsistent quality gates across teams and repositories.",
    ],
    patterns: [
      "Adopt ADRs for major decisions and revisit on scheduled cadence.",
      "Map module ownership and escalation paths for incident-critical code.",
      "Standardize release quality metrics across teams.",
      "Reserve recurring capacity for targeted decision and debt remediation.",
    ],
    tradeoffs: [
      "Process rigor can slow local speed while increasing global reliability.",
      "More governance adds overhead but reduces long-term ambiguity.",
      "Standardization limits local variation while improving operational consistency.",
    ],
    production: [
      "Reliability improves when ownership and standards are enforceable.",
      "Observability quality improves with consistent conventions across teams.",
      "Security improves when review and policy controls are uniform.",
      "Maintainability improves when major decisions remain traceable.",
    ],
    finalTakeaway: [
      "Technical debt is often decision debt with delayed consequences.",
      "Clarity in ownership and standards is a force multiplier for delivery quality.",
    ],
    implementationChecklist: [
      "Track ownership coverage for all production-critical modules.",
      "Enforce shared quality gates and operational conventions.",
      "Record major trade-offs with revisit and rollback criteria.",
      "Monitor debt signals such as change failure rate and cycle time.",
    ],
    architectureNotes: [
      "Engineering systems degrade when decision quality is opaque; clarity is a technical accelerator.",
      "Cross-team standards reduce operational variance and improve code review signal.",
      "Continuous debt management is more effective than episodic cleanup initiatives.",
    ],
    codeExampleTitle: "Decision Record Guardrail",
    codeLanguage: "typescript",
    codeExample: `type DecisionRecord = {
  title: string;
  owner: string;
  rationale: string;
  revisitAt: string; // ISO date
  rollbackPlan: string;
};

export function decisionRecordComplete(d: DecisionRecord): boolean {
  return Boolean(d.title && d.owner && d.rationale && d.revisitAt && d.rollbackPlan);
}`,
  },
  Systems: {
    intro: [
      "Real-world systems run under imperfect conditions: packet loss, weak devices, unstable dependencies, and malformed inputs. Engineering assumptions that hold in lab conditions often fail under actual user contexts.",
      "System quality is measured by graceful behavior under adversity. Products earn trust when they preserve user intent during degraded conditions and communicate state clearly when full success is not possible.",
    ],
    coreConcepts: [
      "Design every external dependency with bounded latency and explicit fallback.",
      "Make user workflows resilient to disconnections and delayed completion.",
      "Normalize and validate all external inputs at ingress boundaries.",
      "Test with adverse conditions that mirror production variability.",
    ],
    mistakes: [
      "Assuming stable network and high-end devices as defaults.",
      "No degraded user path for temporary dependency failures.",
      "Treating malformed input as rare instead of expected.",
      "Running only happy-path testing before launch.",
    ],
    patterns: [
      "Use retry + circuit breaker combinations for unstable dependencies.",
      "Implement reconnect-aware UX with explicit pending/completed states.",
      "Design payloads and rendering paths for constrained clients.",
      "Run resilience and chaos drills against core user journeys.",
    ],
    tradeoffs: [
      "Resilience controls add implementation complexity while reducing outage impact.",
      "Defensive validation increases code paths but protects domain integrity.",
      "Graceful degradation may reduce features temporarily to preserve trust.",
    ],
    production: [
      "Reliability improves when degraded-state behavior is predefined.",
      "Observability should segment performance by network and device class.",
      "Security improves with strict boundary validation against hostile input.",
      "Maintainability improves when resilience patterns are standardized.",
    ],
    finalTakeaway: [
      "Systems are judged by behavior in imperfect conditions.",
      "Design for reality first, then optimize ideal-path performance.",
    ],
    implementationChecklist: [
      "Test core paths under throttled network and constrained CPU profiles.",
      "Define degraded-state UX for every critical user flow.",
      "Instrument failures by dependency and environment segment.",
      "Validate and sanitize all external inputs before domain execution.",
    ],
    architectureNotes: [
      "Systems engineering quality depends on tolerant behavior under adverse, non-ideal environments.",
      "Degraded-state contracts should be explicit so user intent is preserved even when dependencies fail.",
      "Runtime variability should be treated as a first-class design input, not a testing edge case.",
    ],
    codeExampleTitle: "Degraded-State Response Contract",
    codeLanguage: "typescript",
    codeExample: `type ProfileResponse =
  | { state: "ok"; profile: { id: string; name: string } }
  | { state: "degraded"; profile: { id: string }; stale: true; retryAfterSec: number };

export function toDegradedProfile(id: string): ProfileResponse {
  return { state: "degraded", profile: { id }, stale: true, retryAfterSec: 30 };
}`,
  },
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
  const longForm = LONG_FORM_CONTEXT[post.category];
  const articleHtml = typeof post.content === "string" ? post.content : "";

  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6">
        {/* Main article prose section */}
        <div className="article-content prose prose-invert prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:text-[1.7rem] sm:prose-h2:text-[2rem] prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-[0.95rem] sm:prose-h3:text-[0.98rem] prose-h3:font-semibold prose-h3:text-neutral-200 prose-h3:mt-6 prose-h3:mb-2 prose-p:text-[12.5px] sm:prose-p:text-[13px] prose-p:leading-[1.72] prose-p:text-neutral-300 prose-strong:text-neutral-100 prose-a:text-neutral-200 prose-a:no-underline hover:prose-a:text-white prose-li:text-[12.5px] sm:prose-li:text-[13px] prose-li:leading-[1.72] prose-li:text-neutral-300 prose-li:marker:text-neutral-500 prose-ul:my-4 prose-code:text-[0.86em] prose-code:text-neutral-200 prose-pre:my-4 prose-pre:rounded-none prose-pre:border prose-pre:border-neutral-700 prose-pre:bg-neutral-800/65 prose-pre:px-3.5 prose-pre:py-3 prose-pre:leading-[1.42] prose-pre:text-[12px] space-y-4">
          <div dangerouslySetInnerHTML={{ __html: articleHtml }} />

          <h3 id="expanded-introduction">Why This Topic Matters in Production</h3>
          <p>{depthGuide.intro}</p>
          {longForm.intro.map((paragraph, index) => (
            <p key={`${post.slug}-long-intro-${index}`}>{paragraph}</p>
          ))}

          <h3 id="expanded-core-concepts">Core Concepts</h3>
          {longForm.coreConcepts.map((paragraph, index) => (
            <p key={`${post.slug}-long-core-${index}`}>{paragraph}</p>
          ))}
          <ul>
            {depthGuide.coreConcepts.map((concept, index) => (
              <li key={`${post.slug}-concept-${index}`}>{concept}</li>
            ))}
          </ul>

          <h3 id="expanded-real-world-mistakes">Real-World Mistakes</h3>
          {longForm.mistakes.map((paragraph, index) => (
            <p key={`${post.slug}-long-mistakes-${index}`}>{paragraph}</p>
          ))}
          <ul>
            {depthGuide.mistakes.map((mistake, index) => (
              <li key={`${post.slug}-mistake-${index}`}>{mistake}</li>
            ))}
          </ul>

          <h3 id="expanded-recommended-patterns">Recommended Patterns</h3>
          {longForm.patterns.map((paragraph, index) => (
            <p key={`${post.slug}-long-patterns-${index}`}>{paragraph}</p>
          ))}
          <ul>
            {depthGuide.patterns.map((pattern, index) => (
              <li key={`${post.slug}-pattern-${index}`}>{pattern}</li>
            ))}
          </ul>

          <h3 id="expanded-implementation-checklist">Implementation Checklist</h3>
          <ul>
            {longForm.implementationChecklist.map((item, index) => (
              <li key={`${post.slug}-checklist-${index}`}>{item}</li>
            ))}
          </ul>

          <h3 id="expanded-architecture-notes">Architecture Notes</h3>
          {longForm.architectureNotes.map((note, index) => (
            <p key={`${post.slug}-architecture-note-${index}`}>{note}</p>
          ))}

          <h3 id="expanded-applied-example">Applied Example</h3>
          <p>{longForm.codeExampleTitle}</p>
          <pre>
            <code className={`language-${longForm.codeLanguage}`}>{longForm.codeExample}</code>
          </pre>

          <h3 id="expanded-trade-offs">Trade-offs</h3>
          {longForm.tradeoffs.map((paragraph, index) => (
            <p key={`${post.slug}-long-tradeoffs-${index}`}>{paragraph}</p>
          ))}
          <ul>
            {depthGuide.tradeoffs.map((tradeoff, index) => (
              <li key={`${post.slug}-tradeoff-${index}`}>{tradeoff}</li>
            ))}
          </ul>

          <h3 id="expanded-production-perspective">Production Perspective</h3>
          {longForm.production.map((paragraph, index) => (
            <p key={`${post.slug}-long-production-${index}`}>{paragraph}</p>
          ))}
          <ul>
            {depthGuide.production.map((point, index) => (
              <li key={`${post.slug}-production-${index}`}>{point}</li>
            ))}
          </ul>

          <h3 id="expanded-final-takeaway">Final Takeaway</h3>
          <p>{depthGuide.takeaway}</p>
          {longForm.finalTakeaway.map((paragraph, index) => (
            <p key={`${post.slug}-long-final-${index}`}>{paragraph}</p>
          ))}
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
