"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const PROBLEM_MAP = `
                     DISTRIBUTED WORKLOAD
                               │
       ┌───────────────┬───────┴───────┬───────────────┐
       ▼               ▼               ▼               ▼
 WORKER FAILURE      STATE        SCHEDULING       RECOVERY
 (Silent Freezes) (Split-Brain)  (Starvation)    (Task Dropouts)
       │               │               │               │
       └───────────────┼───────────────┴───────────────┘
                       │
                       ▼
            COORDINATION BREAKDOWN
`;

export const CaseStudyProblem = () => {
  return (
    <section id="problem" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          01 // THE CHALLENGE
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          THE PROBLEM
        </h2>
      </div>

      {/* 2-4 Sentences Editorial Explanation (No large boxed paragraph) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Modern compute workloads require reliable, multi-node execution across heterogeneous clouds without centralized bottlenecks.
          When compute instances experience transient network partitions or kernel freezes, distributed schedulers suffer from split-brain dual dispatch, worker starvation under load bursts, and unhandled task dropouts.
          Preserving deterministic state consistency and zero-loss recovery under real-world infrastructure failures is the core problem RunStack solves.
        </p>
      </div>

      {/* Compact Technical Problem Map */}
      <div className="pt-2">
        <AsciiDiagram
          title="FAILURE VECTOR MAP"
          badge="COORDINATION VECTORS"
          content={PROBLEM_MAP}
          caption="Core coordination and failure modes the RunStack cluster control loop must reconcile."
        />
      </div>
    </section>
  );
};
