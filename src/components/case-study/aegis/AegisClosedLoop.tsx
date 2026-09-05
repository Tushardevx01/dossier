"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const CLOSED_LOOP_ASCII = `
                     FAILURE
                        │
                        ▼
                  DOCKER EVENT
                        │
                        ▼
                 EVENT CAPTURE
                        │
                        ▼
                    KAFKA
                        │
                        ▼
                 ORCHESTRATOR
                        │
                        ▼
                  AI DIAGNOSIS
                        │
                        ▼
                  SAFETY GATE
                   /        \\
                 PASS        FAIL
                  │            │
                  ▼            ▼
              REMEDIATE     REVIEW
                  │
                  ▼
                 AUDIT
                  │
                  ▼
              HISTORICAL
                DATA
                  │
                  ▼
             OFFLINE LEARNING
`;

export const AegisClosedLoop = () => {
  return (
    <section id="closed-loop" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase tracking-tight`}>
          THE CLOSED LOOP
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        The complete autonomous lifecycle: capturing Docker failure signals, streaming through Kafka, computing local neural classifications, verifying safety gates, executing remediations, auditing state, and compiling offline learning buffers.
      </p>

      {/* Large System Workflow ASCII */}
      <div className="pt-2">
        <AsciiDiagram
          title="END-TO-END CLOSED LOOP REMEDIATION PIPELINE"
          badge="SYSTEM SYNTHESIS"
          content={CLOSED_LOOP_ASCII}
          caption="Unbroken closed-loop architecture connecting raw failure detection to guarded execution and offline replay datasets."
          className="border-neutral-800"
        />
      </div>
    </section>
  );
};
