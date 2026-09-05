"use client";

import { nasalization, mono } from "@/app/fonts";

const RIGOR_ITEMS = [
  {
    discipline: "CONCURRENCY",
    practice: "Bounded Worker Pools & Drop-Guards",
    evidence: "Zero race warnings across 500 routines via `go test -race -count=100`.",
  },
  {
    discipline: "STATE CONSISTENCY",
    practice: "Distributed Redlock & Atomic CAS",
    evidence: "Deterministic 5000ms lease TTLs prevent multi-master split-brain dual dispatch.",
  },
  {
    discipline: "NODE HEALTH",
    practice: "Sliding-Window Failure Detector",
    evidence: "1000ms heartbeat ticks; degraded at 3000ms, sub-second eviction at 5000ms.",
  },
  {
    discipline: "GRACEFUL SHUTDOWN",
    practice: "POSIX SIGTERM 30s Drain Sequence",
    evidence: "Lease rejection + running container completion before process termination.",
  },
  {
    discipline: "PROCESS ISOLATION",
    practice: "Linux cgroups v2 Kernel Ceilings",
    evidence: "Hard CPU bandwidth throttling & memory hard limits with SIGKILL watchdog.",
  },
  {
    discipline: "IDEMPOTENCY",
    practice: "SHA-256 Manifest Signature Caching",
    evidence: "Deterministic duplicate execution rejection with 24-hour receipt replay window.",
  },
  {
    discipline: "OBSERVABILITY",
    practice: "Structured Lifecycle Telemetry",
    evidence: "Explicit transition tracing across admission, scoring, leasing, and exit phases.",
  },
];

export const CaseStudyTechnicalRigor = () => {
  return (
    <section id="rigor" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          05 // SYSTEM DISCIPLINE
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          TECHNICAL RIGOR
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        System guarantees enforced through disciplined runtime primitives, strict kernel constraints, and automated verification suites.
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
