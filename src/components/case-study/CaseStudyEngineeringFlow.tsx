"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const FLOW_ASCII = `
                         REQUEST
                            │
                            ▼
                         REGISTER (SHA-256 Validated)
                            │
                            ▼
                         SCHEDULE (Min-Heap Selected)
                            │
                            ▼
                         DISPATCH (Redlock Mutex Leased)
                            │
                            ▼
                         EXECUTE  (cgroups v2 Sandbox)
                            │
                            ▼
                         REPORT   (Receipt & Exit Code)
                            │
                            ▼
                       STATE UPDATE (Committed & Cached)
`;

export const CaseStudyEngineeringFlow = () => {
  return (
    <section id="flow" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          10 // SYSTEM SUMMARY
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          FROM JOB TO RESULT
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Summary lifecycle pipeline: end-to-end deterministic progression of every compute workload admitted to RunStack.
      </p>

      {/* Summary ASCII Workflow */}
      <div className="pt-1">
        <AsciiDiagram
          title="END-TO-END EXECUTION PIPELINE"
          badge="PIPELINE SUMMARY"
          content={FLOW_ASCII}
          caption="Linear overview of workload progression from initial client request down to state commit."
        />
      </div>
    </section>
  );
};
