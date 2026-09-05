"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const EXECUTION_ATTEMPT_ASCII = `
JOB
 │
 │ claim
 ▼
EXECUTION #1
 │
 │ node failure
 ▼
RECOVERY
 │
 ▼
EXECUTION #2
 │
 ▼
RESULT
`;

const FENCING_VERIFICATION_ASCII = `
                RESULT
                   │
                   ▼
          ┌─────────────────┐
          │ ExecutionID     │
          │ verification    │
          └────────┬────────┘
                   │
          ┌────────┴────────┐
          ▼                 ▼
       CURRENT             STALE
          │                 │
       ACCEPT             REJECT
`;

export const CaseStudyExecutionOwnership = () => {
  return (
    <section id="ownership" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          05 // EXECUTION FENCING
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          EXECUTION OWNERSHIP
        </h2>
      </div>

      {/* Logical JobID vs ExecutionID Concept (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          A <span className="text-emerald-400 font-mono text-sm">JobID</span> identifies the logical task, while an <span className="text-emerald-400 font-mono text-sm">ExecutionID</span> identifies a specific physical attempt.
          Separating logical intent from execution identity prevents zombie workers from corrupting cluster state after node recovery.
        </p>
      </div>

      {/* Dual ASCII Diagrams for Execution Progression & Fencing Gate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        <AsciiDiagram
          title="EXECUTION ATTEMPT SEQUENCE"
          badge="ATTEMPT TRACKING"
          content={EXECUTION_ATTEMPT_ASCII}
          caption="Node loss triggers recovery and re-assignment under a fresh ExecutionID #2."
        />
        <AsciiDiagram
          title="EXECUTIONID FENCING VERIFICATION"
          badge="STALE RESULT REJECTION"
          content={FENCING_VERIFICATION_ASCII}
          caption="The Control Plane rejects delayed results from Execution #1 once #2 has been authorized."
        />
      </div>

      {/* Explicit Systems Constraint Callout */}
      <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 font-mono text-xs text-neutral-400 space-y-1">
        <div className="text-white font-semibold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>FENCING GUARANTEE (NOT PHYSICAL EXACTLY-ONCE)</span>
        </div>
        <p className="font-sans text-xs text-neutral-400 leading-relaxed">
          Physical exactly-once execution is theoretically impossible during network partitions. RunStack guarantees <strong className="text-neutral-200">execution-aware result fencing</strong>: late results from severed nodes are safely dropped, preserving state correctness.
        </p>
      </div>
    </section>
  );
};
