"use client";

import { LuCheck, LuShieldCheck } from "react-icons/lu";

const IMPLEMENTATION_CONSTRAINTS = [
  { value: "4", unit: "SLOTS", label: "MAX CONCURRENT ANALYSES", desc: "Explicit bounded queue slots in analyzeWebsite.ts preventing worker exhaustion." },
  { value: "5s", unit: "LIMIT", label: "SCRAPE TIMEOUT", desc: "Hard AbortController cancellation ceiling on all remote Axios HTTP requests." },
  { value: "6s", unit: "LIMIT", label: "AI TIMEOUT", desc: "Maximum time permitted for LLM generation before falling back to local heuristics." },
  { value: "5", unit: "HOPS", label: "MAX REDIRECT LIMIT", desc: "Strict limit on HTTP redirect follow-throughs to eliminate infinite crawl loops." },
  { value: "24", unit: "TARGETS", label: "MAX MONITOR URLS", desc: "Upper bound on unique URLs processed in a single automated monitoring sweep." },
  { value: "3", unit: "BATCH", label: "DEFAULT MONITOR BATCH SIZE", desc: "Chunk size for parallel analysis in monitorService.ts to manage memory load." },
];

const VERIFIED_CAPABILITIES = [
  "Algorithmic SEO scoring based on title length, meta presence, H1 hygiene, and image alt ratios.",
  "Network performance breakdown evaluating TTFB, payload size, script counts, and asset density.",
  "Relational scan history stored in PostgreSQL via Prisma with search and pagination.",
  "Side-by-side website comparison engine calculating verdicts across speed, SEO, and content size.",
  "Background website monitoring with threshold-based alert generation and resolution tracking.",
  "Automated PDF report export via pdfkit and structured JSON/CSV data export routes.",
  "Credentials authentication powered by NextAuth with bcrypt password hashing and JWT sessions.",
  "Full-featured responsive dashboard built on Next.js 14 App Router and Tailwind CSS.",
];

export const WebScopeResults = () => {
  return (
    <section id="results" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>11</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>MEASURABLE RESULTS & VERIFICATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Implementation Constraints & Verified Capabilities
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          These metrics represent verified architectural constraints enforced directly in source
          code, rather than synthetic marketing benchmarks.
        </p>
      </div>

      {/* Verified Constraints Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {IMPLEMENTATION_CONSTRAINTS.map((item) => (
          <div
            key={item.label}
            className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-1 font-mono"
          >
            <div className="flex items-baseline gap-1.5 text-emerald-400">
              <span className="text-2xl sm:text-3xl font-bold">{item.value}</span>
              <span className="text-[10px] text-neutral-400">{item.unit}</span>
            </div>
            <div className="text-[11px] font-semibold text-white uppercase">{item.label}</div>
            <p className="text-[11px] text-neutral-400 font-sans leading-relaxed pt-1">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Verified Capabilities Checklist */}
      <div className="p-5 sm:p-6 rounded-xl bg-neutral-950/40 border border-neutral-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase">
          <LuShieldCheck className="w-4 h-4" />
          <span>VERIFIED PRODUCT CAPABILITIES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {VERIFIED_CAPABILITIES.map((cap) => (
            <div key={cap} className="flex items-start gap-2.5 text-xs text-neutral-300">
              <LuCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="font-sans leading-relaxed">{cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
