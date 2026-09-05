"use client";

interface RigorItem {
  domain: string;
  implementation: string;
  detail: string;
}

const RIGOR_MATRIX: RigorItem[] = [
  {
    domain: "CONCURRENCY",
    implementation: "Bounded analysis slots",
    detail: "MAX_CONCURRENT_ANALYSIS = 4 via acquireSlot / releaseSlot queue",
  },
  {
    domain: "TIMEOUTS",
    implementation: "Dual timeout barriers",
    detail: "5000ms scrape timeout (AbortController) + 6000ms AI timeout",
  },
  {
    domain: "ROBOTS",
    implementation: "Crawl permission check",
    detail: "robots.txt checked before firing scraping requests",
  },
  {
    domain: "VALIDATION",
    implementation: "Runtime schema validation",
    detail: "Zod schemas guarding API routes and URL format inputs",
  },
  {
    domain: "AUTH",
    implementation: "Session management",
    detail: "NextAuth credentials provider with signed JWT sessions",
  },
  {
    domain: "PASSWORD SECURITY",
    implementation: "One-way key stretching",
    detail: "bcrypt salt hashing before database persistence",
  },
  {
    domain: "DATABASE",
    implementation: "Relational modeling",
    detail: "PostgreSQL (Neon) with Prisma ORM migrations and indexed foreign keys",
  },
  {
    domain: "ERROR HANDLING",
    implementation: "Typed error classification",
    detail: "TIMEOUT, NETWORK, DISALLOWED_BY_ROBOTS, and UNKNOWN categories",
  },
  {
    domain: "AI RESILIENCE",
    implementation: "Decoupled fallback layer",
    detail: "Deterministic heuristic output generated first; swapped only if AI resolves",
  },
  {
    domain: "PERSISTENCE",
    implementation: "Longitudinal telemetry",
    detail: "Persistent scan history, threshold-based monitoring, and alert logs",
  },
];

export const WebScopeTechnicalRigor = () => {
  return (
    <section id="rigor" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>06</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>TECHNICAL RIGOR</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Architectural Controls & Implementation Guardrails
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Rather than relying on unconstrained scripts or optimistic client assumptions, WebScope
          enforces clear operational boundaries across concurrency, timeouts, validation, and data
          resilience.
        </p>
      </div>

      {/* Technical Matrix Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950/60 overflow-hidden font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 p-3 bg-neutral-900/80 border-b border-neutral-800 text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">
          <div className="sm:col-span-3 text-emerald-400">CONTROL DOMAIN</div>
          <div className="sm:col-span-4 text-neutral-200">IMPLEMENTED MECHANISM</div>
          <div className="sm:col-span-5 text-neutral-400">ENGINEERING SPECIFICATION</div>
        </div>

        <div className="divide-y divide-neutral-900">
          {RIGOR_MATRIX.map((item) => (
            <div
              key={item.domain}
              className="grid grid-cols-1 sm:grid-cols-12 p-3.5 hover:bg-neutral-900/30 transition-colors gap-1 sm:gap-0"
            >
              <div className="sm:col-span-3 text-emerald-400 font-semibold">{item.domain}</div>
              <div className="sm:col-span-4 text-white">{item.implementation}</div>
              <div className="sm:col-span-5 text-neutral-400 font-sans text-xs">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
