"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const JOB_EXECUTION_ASCII = `
      CREATE
        │
        ▼
     PENDING
        │
        │ Scheduler
        ▼
     ASSIGNED
        │
        │ Agent Claim
        ▼
      RUNNING
        │
        ├─────────────────┐
        ▼                 ▼
   SUCCEEDED            FAILED
        │                 │
        │                 │
        │            Retry Budget
        │                 │
        │          ┌──────┴──────┐
        │          ▼             ▼
        │       PENDING       FAILED
        │
        ▼
      EVENT
`;

export const CaseStudyJobExecution = () => {
  return (
    <section id="execution" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          JOB EXECUTION
        </h2>
      </div>

      {/* State Machine Transition Strip */}
      <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-900 font-mono text-xs flex flex-wrap items-center gap-2">
        <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold mr-1">STATE MACHINE:</span>
        <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300">PENDING</span>
        <span className="text-emerald-400">→</span>
        <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300">ASSIGNED</span>
        <span className="text-emerald-400">→</span>
        <span className="px-2 py-0.5 rounded bg-neutral-900 text-neutral-300">RUNNING</span>
        <span className="text-emerald-400">→</span>
        <span className="px-2 py-0.5 rounded bg-neutral-900 text-emerald-400 font-medium">SUCCEEDED</span>
        <span className="text-neutral-600">/</span>
        <span className="px-2 py-0.5 rounded bg-neutral-900 text-rose-400 font-medium">FAILED</span>
      </div>

      {/* 2-3 lines of technical context */}
      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Jobs transition through strict, centrally validated states. The scheduler assigns pending jobs to online nodes, agents atomically claim the execution, and failures evaluate against a deterministic retry budget.
      </p>

      {/* ASCII Job Execution Flow Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="JOB EXECUTION STATE MACHINE & RETRY BUDGET"
          badge="STATE COORDINATION"
          content={JOB_EXECUTION_ASCII}
          caption="Deterministic job lifecycle: scheduler assignment, atomic agent claim, and bounded retry budget evaluation."
        />
      </div>
    </section>
  );
};
