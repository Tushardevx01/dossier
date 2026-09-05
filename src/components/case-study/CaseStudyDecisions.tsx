"use client";

import { nasalization } from "@/app/fonts";

interface DecisionItem {
  tech: string;
  badge: string;
  why: string;
  tradeoff: string;
  outcome: string;
}

const DECISION_RECORDS: DecisionItem[] = [
  {
    tech: "Go",
    badge: "CORE RUNTIME",
    why: "Concurrency primitives, explicit control over execution, low memory overhead, and single binary deployment across Linux hosts.",
    tradeoff: "More explicit lifecycle and state management required compared to heavy actor framework runtimes.",
    outcome: "Clean, portable binaries with microsecond goroutine synchronization and zero runtime dependencies.",
  },
  {
    tech: "In-Memory Registries (V1)",
    badge: "STATE ENGINE",
    why: "Keep initial cluster architecture lightweight, deterministic, and free of external database overhead.",
    tradeoff: "Control plane restart loses runtime state, requiring agent re-registration and job requeueing.",
    outcome: "Crystal-clear state machine contracts that established the exact transactional boundaries needed for V2.",
  },
  {
    tech: "HTTP Polling Architecture",
    badge: "NETWORK TOPOLOGY",
    why: "Agents do not require inbound listening ports, public IPs, or firewall punching; all connections are outbound.",
    tradeoff: "Execution coordination and dispatch latency are bounded by periodic polling intervals.",
    outcome: "Resilient perimeter security where agents safely run across arbitrary private clouds and edge devices.",
  },
  {
    tech: "ExecutionID Fencing",
    badge: "EXECUTION SAFETY",
    why: "Separates logical job identity from individual physical execution attempts across nodes.",
    tradeoff: "Demands per-attempt execution tracking, state generation counters, and rigorous fencing validation.",
    outcome: "Completely prevents stale worker results from overwriting state after node failure and reassignment.",
  },
  {
    tech: "Round-Robin Scheduler",
    badge: "PLACEMENT ENGINE",
    why: "Provides predictable, starvation-free, deterministic node assignment via a sorted ID ring and persistent cursor.",
    tradeoff: "V1 placement is not dynamic resource-aware and does not balance CPU/RAM utilization.",
    outcome: "Deterministic testability and zero starvation across heterogeneous worker nodes.",
  },
  {
    tech: "PostgreSQL V2 Foundation",
    badge: "PERSISTENCE EVOLUTION",
    why: "Move authoritative state toward durable transactional storage with ACID guarantees.",
    tradeoff: "Introduces external database dependency and connection pool lifecycle management.",
    outcome: "Durable state, SELECT FOR UPDATE row-level locking, and SQL-level execution fencing for production clusters.",
  },
];

export const CaseStudyDecisions = () => {
  return (
    <section id="decisions" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          TECHNICAL DECISIONS
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Deliberate engineering trade-offs: why each architectural path was chosen, the operational costs accepted, and the delivered outcome.
      </p>

      {/* Decision Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        {DECISION_RECORDS.map((item) => (
          <div
            key={item.tech}
            className="p-5 rounded-xl border border-neutral-800 bg-[#070709] hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                <h3 className={`${nasalization.className} text-sm sm:text-base font-bold text-white uppercase tracking-wide`}>
                  {item.tech}
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2 py-0.5 rounded font-semibold">
                  {item.badge}
                </span>
              </div>

              {/* WHY */}
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">
                  WHY
                </span>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {item.why}
                </p>
              </div>

              {/* TRADE-OFF */}
              <div className="space-y-0.5 pt-1.5 border-t border-neutral-900">
                <span className="font-mono text-[10px] text-amber-400/90 uppercase tracking-wider block font-semibold">
                  TRADE-OFF
                </span>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
                  {item.tradeoff}
                </p>
              </div>
            </div>

            {/* OUTCOME */}
            <div className="pt-2 border-t border-neutral-900 font-mono text-[11px] text-neutral-300">
              <span className="text-emerald-400 font-bold mr-1">OUTCOME:</span>
              <span className="font-sans text-xs text-neutral-300">{item.outcome}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
