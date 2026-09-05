"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const SAFETY_GATE_ASCII = `
                 AI DIAGNOSIS
                       │
                       ▼
              ┌────────────────┐
              │   FALLBACK?    │
              └───────┬────────┘
                      │ NO
                      ▼
              ┌────────────────┐
              │   CONFIDENCE   │
              │    >= 0.85     │
              └───────┬────────┘
                      │ YES
                      ▼
              ┌────────────────┐
              │  RISK == LOW   │
              └───────┬────────┘
                      │ YES
                      ▼
              ┌────────────────┐
              │   ACTION ==    │
              │    RESTART     │
              └───────┬────────┘
                      │ YES
                      ▼
                AUTO-REMEDIATE

ANY FAILURE
     │
     ▼
   SKIP
     │
     ▼
OPERATOR REVIEW
`;

export const AegisSafetyModel = () => {
  return (
    <section id="safety-model" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase tracking-tight`}>
          AUTOMATION WITH GUARDRAILS
        </h2>
      </div>

      <p className="text-base sm:text-lg text-neutral-200 font-sans max-w-3xl leading-relaxed font-light">
        Aegis separates diagnosis from actuation. AI recommends an action, but a deterministic policy engine evaluates safety thresholds before a single container is touched.
      </p>

      {/* Prominent ASCII Decision Gate Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="DETERMINISTIC SAFETY GATE DECISION TREE"
          badge="GUARDRAILS INVARIANT"
          content={SAFETY_GATE_ASCII}
          caption="Strict hierarchical policy gates: any threshold violation or high-risk classification immediately skips actuation and alerts operators."
          className="border-neutral-800"
        />
      </div>

      {/* 3 Core Invariants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
        <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1.5">
          <div className="text-emerald-400 font-bold tracking-wider">CONFIDENCE CEILING</div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Neural classification confidence must be strictly &ge; 0.85. Low-confidence ambiguity defaults to safe inaction.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1.5">
          <div className="text-emerald-400 font-bold tracking-wider">BLAST RADIUS LIMIT</div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Risk rating must be strictly LOW. Destructive or stateful services are blocked from autonomous intervention.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1.5">
          <div className="text-emerald-400 font-bold tracking-wider">FAIL-SAFE OPERATOR ROUTING</div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Any gate failure aborts automated execution, persists full audit telemetry, and escalates to human on-call engineers.
          </p>
        </div>
      </div>
    </section>
  );
};
