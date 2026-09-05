"use client";

interface DecisionRecord {
  number: string;
  technology: string;
  why: string;
  tradeoff: string;
  outcome: string;
}

const DECISION_RECORDS: DecisionRecord[] = [
  {
    number: "01",
    technology: "AXIOS + CHEERIO",
    why: "Lightweight HTTP fetching and fast, low-overhead server-side HTML parsing.",
    tradeoff:
      "Client-rendered SPA content that only materializes after heavy JavaScript browser execution is not equivalent to a full browser-rendered crawl.",
    outcome:
      "Simple, robust, and serverless-friendly HTML analysis with sub-second execution and minimal RAM overhead.",
  },
  {
    number: "02",
    technology: "PRISMA + POSTGRESQL (NEON)",
    why: "Relational data naturally models users, multi-page scan histories, request logs, threshold monitors, and comparison sets.",
    tradeoff:
      "Requires declarative schema migrations and strict relational index design across foreign keys.",
    outcome:
      "Structured, auditable, and longitudinally queryable website analysis history.",
  },
  {
    number: "03",
    technology: "BOUNDED CONCURRENCY (MAX 4)",
    why: "URL analysis is network-bound, external, and unpredictable.",
    tradeoff:
      "Excess parallel requests wait in a brief FIFO queue during high burst periods.",
    outcome:
      "Strict control over simultaneous outbound network sockets, protecting host resources and remote targets.",
  },
  {
    number: "04",
    technology: "AI + DETERMINISTIC FALLBACK",
    why: "Generative AI enriches the qualitative interpretation of raw numbers with persona archetypes.",
    tradeoff:
      "Requires maintaining a dual-path code pipeline that derives local heuristics before calling LLM APIs.",
    outcome:
      "AI enriches the product without ever becoming a blocking single point of failure.",
  },
  {
    number: "05",
    technology: "NEXT.JS 14 APP ROUTER",
    why: "Unified full-stack architecture combining React Server Components and route handlers.",
    tradeoff:
      "Couples frontend dashboard deployments with API gateway lifecycles.",
    outcome:
      "One unified boundary for authentication, dashboard UI, scanning endpoints, and PDF/CSV data exports.",
  },
];

export const WebScopeDecisions = () => {
  return (
    <section id="decisions" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Architectural Decisions & Tradeoff Log
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Engineering choices grounded in operational simplicity, serverless runtime constraints,
          and decoupled resilience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DECISION_RECORDS.map((record) => (
          <div
            key={record.number}
            className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3 font-mono text-xs flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                <span className="text-[10px] text-emerald-400 font-semibold">
                  DECISION {record.number}
                </span>
                <span className="text-neutral-200 font-bold text-xs">{record.technology}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                  WHY
                </span>
                <p className="text-neutral-300 font-sans leading-relaxed text-xs">{record.why}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-amber-400 uppercase tracking-wider block">
                  TRADE-OFF
                </span>
                <p className="text-neutral-400 font-sans leading-relaxed text-xs">{record.tradeoff}</p>
              </div>
            </div>

            <div className="pt-2.5 border-t border-neutral-900 space-y-1">
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider block">
                OUTCOME
              </span>
              <p className="text-neutral-200 font-sans leading-relaxed text-xs">{record.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
