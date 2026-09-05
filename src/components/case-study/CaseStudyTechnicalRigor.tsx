"use client";

import { nasalization, mono } from "@/app/fonts";

const RIGOR_ITEMS = [
  {
    discipline: "CONCURRENCY",
    practice: "sync.RWMutex locks on all state stores",
    evidence: "Race-safe registry access across parallel worker polling and mutation loops.",
  },
  {
    discipline: "STATE",
    practice: "Explicit transition state machine validation",
    evidence: "Centralized control plane rejects invalid state jumps (e.g. FAILED → RUNNING).",
  },
  {
    discipline: "EXECUTION",
    practice: "ExecutionID fencing tokens",
    evidence: "Stale execution results from evicted or stalled workers are rejected at admission.",
  },
  {
    discipline: "RECOVERY",
    practice: "Node heartbeat timeout detector",
    evidence: "1000ms heartbeat loop detects severed nodes and rescues orphaned work.",
  },
  {
    discipline: "RETRY",
    practice: "Attempts <= MaxRetries budget check",
    evidence: "Guarantees finite retry ceiling, preventing infinite execution loops.",
  },
  {
    discipline: "SCHEDULING",
    practice: "Deterministic round-robin cursor",
    evidence: "Online nodes sorted deterministically by ID to prevent worker starvation.",
  },
  {
    discipline: "OBSERVABILITY",
    practice: "Structured slog logging & event history",
    evidence: "JSON-formatted contextual logging with append-only job lifecycle events.",
  },
  {
    discipline: "SHUTDOWN",
    practice: "Context cancellation propagation",
    evidence: "Clean agent process termination with inflight task signaling and socket release.",
  },
  {
    discipline: "TESTING",
    practice: "go test, go test -race, go vet",
    evidence: "Automated test harness verifying state transitions, race safety, and integration.",
  },
];

export const CaseStudyTechnicalRigor = () => {
  return (
    <section id="rigor" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          07 // TECHNICAL RIGOR
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          TECHNICAL RIGOR
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        System guarantees enforced through disciplined concurrency primitives, explicit state guards, and automated verification suites.
      </p>

      {/* Technical Matrix Table */}
      <div className="rounded-xl border border-neutral-800 bg-[#070709] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 px-5 py-3 border-b border-neutral-800/80 bg-neutral-950 font-mono text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
          <div className="md:col-span-3">DISCIPLINE</div>
          <div className="md:col-span-4">ENGINEERING PRACTICE</div>
          <div className="md:col-span-5">VERIFICATION / ENFORCEMENT</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-neutral-900/80 font-mono text-xs">
          {RIGOR_ITEMS.map((item) => (
            <div
              key={item.discipline}
              className="grid grid-cols-1 md:grid-cols-12 px-5 py-3.5 items-baseline gap-2 md:gap-4 hover:bg-neutral-900/30 transition-colors"
            >
              <div className="md:col-span-3 text-emerald-400 font-semibold text-[11px] uppercase tracking-wider">
                {item.discipline}
              </div>
              <div className="md:col-span-4 text-white font-medium">
                {item.practice}
              </div>
              <div className="md:col-span-5 text-neutral-400 font-sans text-xs leading-relaxed">
                {item.evidence}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
