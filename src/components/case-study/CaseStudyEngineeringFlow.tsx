"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const FLOW_ASCII = `
REQUEST
   │
   ▼
REGISTER
   │
   ▼
SCHEDULE
   │
   ▼
ASSIGN
   │
   ▼
CLAIM
   │
   ▼
EXECUTE
   │
   ├──────────────┐
   ▼              ▼
SUCCESS        FAILURE
   │              │
   │          RETRY BUDGET
   │              │
   │         ┌────┴────┐
   │         ▼         ▼
   │       RETRY     FAILED
   │
   ▼
REPORT
   │
   ▼
STATE UPDATE
   │
   ▼
EVENT HISTORY
`;

export const CaseStudyEngineeringFlow = () => {
  return (
    <section id="flow" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          FROM JOB TO RESULT
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        End-to-end execution pipeline: the lifecycle of a compute workload from HTTP admission, deterministic scheduling, and atomic agent claim through to fenced completion and event history.
      </p>

      {/* Summary ASCII Workflow */}
      <div className="pt-1">
        <AsciiDiagram
          title="END-TO-END EXECUTION PIPELINE"
          badge="SYSTEM SUMMARY"
          content={FLOW_ASCII}
          caption="Unbroken chain of custody from client intent to authoritative state update and persistent event log."
        />
      </div>
    </section>
  );
};
