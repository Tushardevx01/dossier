"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const PROBLEM_MAP = `
                    DISTRIBUTED EXECUTION

                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
      STATE            OWNERSHIP          FAILURE
        │                  │                  │
        ▼                  ▼                  ▼
   Consistency          Claiming         Recovery
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                     COORDINATION
`;

export const CaseStudyProblem = () => {
  return (
    <section id="problem" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          01 // THE PROBLEM
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          THE PROBLEM
        </h2>
      </div>

      {/* Brief Editorial Questions (No large generic marketing paragraph) */}
      <div className="max-w-3xl space-y-4">
        <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
          Running work across multiple machines introduces problems that a single-process application does not have:
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs text-neutral-300">
          {[
            "Who owns the job?",
            "Which node should execute it?",
            "What happens when that node disappears?",
            "How do we prevent stale workers from reporting old results?",
            "How do we retry failures without creating infinite loops?",
            "How do desired application state and actual runtime state converge?",
          ].map((question, i) => (
            <li key={i} className="flex items-start gap-2 p-2.5 rounded bg-neutral-950 border border-neutral-900">
              <span className="text-emerald-400 font-bold shrink-0">?</span>
              <span className="leading-snug">{question}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ASCII Distributed Coordination Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="DISTRIBUTED EXECUTION TRIANGLE"
          badge="COORDINATION VECTORS"
          content={PROBLEM_MAP}
          caption="Distributed state consistency, claim ownership, and failure recovery collapsing into authoritative coordination."
        />
      </div>
    </section>
  );
};
