"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const V2_EVOLUTION_ASCII = `
V1: IN-MEMORY CONTROL PLANE
             │
             │ learned durability &
             │ concurrency boundaries
             ▼
V2: POSTGRESQL FOUNDATION
             │
             ├── ACID Transactions
             ├── SELECT FOR UPDATE (Row Locking)
             ├── Durable Cluster State
             └── SQL-Level Execution Fencing
`;

const V1_LIMITATIONS = [
  {
    title: "IN-MEMORY STATE",
    impact: "Control Plane restart loses runtime state, requiring worker re-registration.",
    direction: "Migrated to durable PostgreSQL schema with transaction logs in V2.",
  },
  {
    title: "SINGLE JOB CONCURRENCY",
    impact: "Agent daemon executes one job at a time to keep local state deterministic.",
    direction: "Multi-worker slot pools per host planned for future runtime releases.",
  },
  {
    title: "NO RESOURCE-AWARE SCHEDULING",
    impact: "Capabilities are collected, but V1 placement is round-robin rather than CPU/RAM-weighted.",
    direction: "Capacity-weighted placement heuristics mapped for future scheduling engines.",
  },
  {
    title: "NO PHYSICAL EXACTLY-ONCE",
    impact: "Fencing prevents stale results, but network partitions can cause duplicate physical container run.",
    direction: "ExecutionID fencing ensures result correctness even if physical task executed twice.",
  },
  {
    title: "COMMAND PARSING BOUNDARIES",
    impact: "strings.Fields() splits whitespace safely, but quoted arguments with spaces are not supported.",
    direction: "Explicit array tokenization spec planned for complex workload commands.",
  },
];

export const CaseStudyTradeoffs = () => {
  return (
    <section id="tradeoffs" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          KNOWN TRADE-OFFS
        </h2>
      </div>

      {/* Honest Engineering Context (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Engineering rigor requires documenting what a system does <strong className="text-white font-medium">not</strong> guarantee.
          Explicit V1 constraints directly guided the design of the PostgreSQL V2 persistence foundation.
        </p>
      </div>

      {/* V1 Limitations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1 font-mono text-xs">
        {V1_LIMITATIONS.map((lim) => (
          <div
            key={lim.title}
            className="p-4 rounded-xl border border-neutral-800 bg-[#070709] space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="text-rose-400 font-bold tracking-wider block text-[11px]">
                {lim.title}
              </span>
              <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                {lim.impact}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-900/80 text-[11px] text-neutral-400">
              <span className="text-emerald-400 font-bold block text-[10px] uppercase">EVOLUTION:</span>
              <span className="font-sans text-neutral-400 text-xs">{lim.direction}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ASCII V1 to V2 Evolution Flow */}
      <div className="pt-2">
        <AsciiDiagram
          title="V1 IN-MEMORY TO V2 POSTGRESQL EVOLUTION"
          badge="PERSISTENCE UPGRADE"
          content={V2_EVOLUTION_ASCII}
          caption="Transitioning atomic in-memory mutex boundaries into durable PostgreSQL transactions and row-level locks."
        />
      </div>
    </section>
  );
};
