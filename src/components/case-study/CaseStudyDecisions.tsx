"use client";

import { nasalization, mono } from "@/app/fonts";

interface DecisionItem {
  tech: string;
  badge: string;
  why: string;
  tradeoff: string;
  result: string;
}

const DECISION_RECORDS: DecisionItem[] = [
  {
    tech: "Go (Golang)",
    badge: "CORE RUNTIME",
    why: "Predictable low-latency garbage collection, zero-overhead binary packaging, and first-class goroutines/channels.",
    tradeoff: "Explicit concurrency management requires disciplined bounded worker pool budgets and channel leak guards.",
    result: "Sub-millisecond scheduling dispatch with a predictable, constant memory envelope under burst traffic.",
  },
  {
    tech: "Docker Engine API & cgroups v2",
    badge: "WORKER ISOLATION",
    why: "Hard kernel-level multi-tenant CPU throttling and memory ceilings preventing rogue customer workload exhaustion.",
    tradeoff: "Requires local Unix socket permissions and strict host kernel cgroups v2 hierarchy support.",
    result: "Rigid task sandboxes with automated POSIX SIGKILL runaway watchdog protection.",
  },
  {
    tech: "Concurrent Min-Heap Scheduler",
    badge: "PLACEMENT ENGINE",
    why: "O(log N) node capacity selection evaluating real-time memory envelopes and idle CPU metrics.",
    tradeoff: "Scheduler min-heap requires reliable periodic heartbeat telemetry to maintain accurate scoring.",
    result: "Instantaneous placement selection without head-of-line blocking or scheduling starvations.",
  },
  {
    tech: "Redis 7.x & Redlock Mutex",
    badge: "CONSENSUS & LEASE",
    why: "Sub-millisecond distributed lock acquisition with atomic SET NX EX semantics and deterministic 5000ms TTLs.",
    tradeoff: "Demands tight clock synchronization (NTP) across nodes to prevent premature lease expiration.",
    result: "Globally mutually exclusive task execution with zero split-brain duplicate dispatch.",
  },
  {
    tech: "Apache Kafka Event Bus",
    badge: "DURABILITY LOG",
    why: "Partitioned, persistent event log allowing historical replay during node recovery and guaranteed at-least-once delivery.",
    tradeoff: "Higher operational overhead and broker infrastructure compared to ephemeral in-memory queues.",
    result: "Zero dropped jobs during simulated 40% packet-loss network partition events.",
  },
];

export const CaseStudyDecisions = () => {
  return (
    <section id="decisions" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          07 // ENGINEERING DECISIONS
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          TECHNICAL DECISIONS
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Why each technology was chosen, what operational trade-offs were accepted, and the verified result delivered in production.
      </p>

      {/* Decision Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {DECISION_RECORDS.map((item) => (
          <div
            key={item.tech}
            className="p-5 rounded-xl border border-neutral-800 bg-[#070709] hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
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
                <p className="text-xs sm:text-[13px] text-neutral-300 font-sans leading-relaxed">
                  {item.why}
                </p>
              </div>

              {/* TRADE-OFF */}
              <div className="space-y-0.5 pt-2 border-t border-neutral-900">
                <span className="font-mono text-[10px] text-amber-400/90 uppercase tracking-wider block font-semibold">
                  TRADE-OFF
                </span>
                <p className="text-xs sm:text-[13px] text-neutral-400 font-sans leading-relaxed font-light">
                  {item.tradeoff}
                </p>
              </div>
            </div>

            {/* RESULT */}
            <div className="p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/80 space-y-0.5">
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                RESULT
              </span>
              <p className="text-xs text-neutral-200 font-sans leading-relaxed">
                {item.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
