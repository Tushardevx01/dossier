"use client";

import { nasalization, mono } from "@/app/fonts";

interface ChallengeSolutionItem {
  id: string;
  number: string;
  title: string;
  problem: string;
  constraint: string;
  solution: string;
  outcome: string;
}

const CHALLENGES_SOLUTIONS: ChallengeSolutionItem[] = [
  {
    id: "split-brain",
    number: "01",
    title: "SPLIT-BRAIN & LEASE RACE CONDITIONS",
    problem: "Concurrent schedulers dispatched identical batch jobs to different nodes during transient network partitions.",
    constraint: "Workload ownership must remain strictly mutually exclusive without central synchronous database locks.",
    solution: "Implemented distributed Redlock mutexes in Redis with deterministic 5000ms TTLs and conditional CAS state updates.",
    outcome: "Zero duplicate executions recorded across 500 concurrent stress worker routines.",
  },
  {
    id: "eviction",
    number: "02",
    title: "SUB-SECOND NODE EVICTION & WORKLOAD RESCUE",
    problem: "Frozen host kernels stalled assigned tasks indefinitely without emitting explicit failure signals.",
    constraint: "Unhealthy nodes must be evicted quickly without false-positive flapping on momentary latency spikes.",
    solution: "Engineered a sliding-window failure detector on 1000ms ticks (3 misses = DEGRADED; 5000ms = EVICTED and requeued).",
    outcome: "Sub-second node eviction window averaging 3.2s from silent crash to workload recovery.",
  },
  {
    id: "goroutine-exhaustion",
    number: "03",
    title: "GOROUTINE EXHAUSTION UNDER BURST TRAFFIC",
    problem: "Unchecked dispatch streams spawned tens of thousands of goroutines, degrading Go runtime garbage collection.",
    constraint: "Scheduler memory footprint must remain constant regardless of incoming client ingestion bursts.",
    solution: "Adopted bounded worker pools with non-blocking channel selectors and drop-guard backpressure queues.",
    outcome: "Constant memory envelope under peak RPS with zero goroutine leaks.",
  },
  {
    id: "graceful-drain",
    number: "04",
    title: "GRACEFUL TERMINATION DURING ROLLING RELEASES",
    problem: "Restarting node daemons during maintenance could terminate executing containers mid-computation, corrupting state.",
    constraint: "Node supervisors must shut down cleanly without leaving orphaned container processes.",
    solution: "Trapped POSIX SIGTERM signals to enter a 30s drain mode: reject new leases, wait for tasks, flush receipts.",
    outcome: "Zero-data-loss rolling deployments with deterministic process cleanup.",
  },
];

export const CaseStudyChallengeSolutions = () => {
  return (
    <section id="solutions" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          06 // ARCHITECTURAL RESOLUTION
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          ENGINEERING CHALLENGES & SOLUTIONS
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Step-by-step engineering reasoning: decomposing the problem, identifying the core invariant, implementing the fix, and measuring the outcome.
      </p>

      {/* Structured Problem -> Constraint -> Solution -> Outcome Flow */}
      <div className="space-y-6 pt-1">
        {CHALLENGES_SOLUTIONS.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 rounded-xl border border-neutral-800 bg-[#070709] space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  // {item.number}
                </span>
                <h3 className={`${nasalization.className} text-sm sm:text-base font-bold text-white uppercase tracking-wide`}>
                  {item.title}
                </h3>
              </div>
            </div>

            {/* 4-Step Chain with subtle arrows */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
              {/* Problem */}
              <div className="p-3.5 rounded-lg border border-neutral-900 bg-neutral-950/80 space-y-1.5">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                  PROBLEM
                </span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  {item.problem}
                </p>
              </div>

              {/* Constraint */}
              <div className="p-3.5 rounded-lg border border-neutral-900 bg-neutral-950/80 space-y-1.5 relative">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  CONSTRAINT
                </span>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  {item.constraint}
                </p>
              </div>

              {/* Solution */}
              <div className="p-3.5 rounded-lg border border-neutral-900 bg-neutral-950/80 space-y-1.5 relative">
                <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
                  SOLUTION
                </span>
                <p className="text-neutral-200 font-sans text-xs leading-relaxed font-medium">
                  {item.solution}
                </p>
              </div>

              {/* Outcome */}
              <div className="p-3.5 rounded-lg border border-neutral-800/80 bg-neutral-900/60 space-y-1.5">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  OUTCOME
                </span>
                <p className="text-neutral-100 font-sans text-xs leading-relaxed font-medium">
                  {item.outcome}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
