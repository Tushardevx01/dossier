"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const HEALTH_SEPARATION_ASCII = `
                    INSTANCE

       ┌────────────┼────────────┐
       ▼            ▼            ▼
     STATUS       HEALTH      NODE STATE
       │            │            │
       └────────────┼────────────┘
                    ▼
               RECONCILER
`;

const FAILURE_PROGRESSION_ASCII = `
NODE LOSS
    ↓
UNKNOWN
    ↓
Unknown timeout
    ↓
CRASHED
    ↓
Replacement
`;

const CRASH_LOOP_ASCII = `
CONSECUTIVE CRASHES
        │
        ▼
   CRASH LOOP
        │
        ▼
    DEGRADED
        │
        ▼
replacement paused
`;

export const CaseStudyInstanceHealth = () => {
  return (
    <section id="instance-health" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          INSTANCE HEALTH & RECOVERY
        </h2>
      </div>

      {/* Tripartite Health Concept (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          RunStack strictly separates <span className="text-emerald-400 font-mono text-sm">Instance Status</span>, <span className="text-emerald-400 font-mono text-sm">Health Probes</span>, and <span className="text-emerald-400 font-mono text-sm">Host Node State</span>.
          Infrastructure drops and application failures are evaluated independently by the Reconciler.
        </p>
      </div>

      {/* Tripartite ASCII Separation Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="TRIPARTITE HEALTH SEPARATION"
          badge="HEALTH PROBING"
          content={HEALTH_SEPARATION_ASCII}
          caption="Independent evaluation vectors feeding into the authoritative Reconciler."
        />
      </div>

      {/* Dual Progression Diagrams: Node Loss vs Crash Loop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        <AsciiDiagram
          title="NODE LOSS RECOVERY FLOW"
          badge="INFRASTRUCTURE LOSS"
          content={FAILURE_PROGRESSION_ASCII}
          caption="Node disappearance transitions instances from UNKNOWN to CRASHED, scheduling replacements."
        />
        <AsciiDiagram
          title="CRASH LOOP BACKOFF"
          badge="APP INSTABILITY"
          content={CRASH_LOOP_ASCII}
          caption="Repeated immediate failures pause replacement to protect host nodes from restart storms."
        />
      </div>
    </section>
  );
};
