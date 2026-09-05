"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const FAILURE_VECTORS_ASCII = `
FAILURE
   │
   ├── OOM
   ├── TIMEOUT
   ├── CRASH LOOP
   ├── PORT COLLISION
   ├── MEMORY LEAK
   └── PERMISSION ERROR
            │
            ▼
       AUTOMATED RESPONSE
`;

const PROBLEM_STEPS = [
  { step: "DETECT", desc: "Understand what failed at the container runtime level." },
  { step: "DIAGNOSE", desc: "Determine the probable failure cause via local semantic classification." },
  { step: "DECIDE", desc: "Determine whether automated remediation is safe under strict policy." },
  { step: "REMEDIATE", desc: "Perform a deterministic, controlled Docker action." },
  { step: "AUDIT", desc: "Preserve the complete end-to-end evidence trail in durable storage." },
];

export const AegisProblem = () => {
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

      {/* Brief Context (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Modern containerized systems fail through OOM conditions, timeouts, crash loops, port collisions, memory leaks, and permission errors.
          Detecting the failure is only the first step — automated systems must safely diagnose, evaluate policy, remediate, and audit without human bottlenecks.
        </p>
      </div>

      {/* 5 Closed-Loop Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1 font-mono text-xs">
        {PROBLEM_STEPS.map((s) => (
          <div
            key={s.step}
            className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1"
          >
            <span className="text-emerald-400 font-bold tracking-wider block">
              {s.step} →
            </span>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ASCII Failure Vector Map */}
      <div className="pt-2">
        <AsciiDiagram
          title="CONTAINER FAILURE CATEGORIES"
          badge="SUPPORTED AI TAXONOMY"
          content={FAILURE_VECTORS_ASCII}
          caption="Explicit failure classes parsed from stdout/stderr tails and classified by the local AI pipeline."
        />
      </div>
    </section>
  );
};
