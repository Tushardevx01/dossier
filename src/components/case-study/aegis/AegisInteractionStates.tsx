"use client";

import { useState } from "react";
import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const LIFECYCLE_ASCII = `
HEALTHY
   │
   │ crash
   ▼
DETECTED
   │
   ▼
INCIDENT_CREATED
   │
   ▼
LOGS_EXTRACTED
   │
   ▼
DIAGNOSING
   │
   ▼
DIAGNOSIS_READY
   │
   ▼
SAFETY_EVALUATION
      │
   ┌──┴───────┐
   ▼          ▼
APPROVED    SKIPPED
   │          │
   ▼          ▼
REMEDIATED  REVIEW
   │
   ▼
AUDITED
`;

interface StateItem {
  id: string;
  name: string;
  category: "normal" | "pass" | "fail" | "audit";
  description: string;
}

const STATES_LIST: StateItem[] = [
  { id: "healthy", name: "HEALTHY", category: "normal", description: "Container running normally with active heartbeat." },
  { id: "detected", name: "DETECTED", category: "normal", description: "Docker Watchman traps 'die' lifecycle event via Unix socket." },
  { id: "incident_created", name: "INCIDENT_CREATED", category: "normal", description: "Incident metadata assigned UUID and published to Kafka KRaft." },
  { id: "logs_extracted", name: "LOGS_EXTRACTED", category: "normal", description: "Last 100 lines of stdout/stderr tails captured from container buffer." },
  { id: "diagnosing", name: "DIAGNOSING", category: "normal", description: "Python AI engine embedding logs via all-MiniLM-L6-v2." },
  { id: "diagnosis_ready", name: "DIAGNOSIS_READY", category: "normal", description: "FAISS lookup and MLP classification emit label, confidence, and suggested action." },
  { id: "safety_evaluation", name: "SAFETY_EVALUATION", category: "normal", description: "NestJS Orchestrator tests confidence >= 0.85, risk == LOW, and action == RESTART." },
  { id: "approved", name: "APPROVED", category: "pass", description: "Safety policy gates satisfied; remediation plan authorized." },
  { id: "skipped", name: "SKIPPED", category: "fail", description: "Thresholds not met; automatic actuation halted to prevent damage." },
  { id: "remediated", name: "REMEDIATED", category: "pass", description: "Dockerode executes approved restart call directly on Docker socket." },
  { id: "review", name: "REVIEW", category: "fail", description: "Incident escalated to human on-call SRE with complete diagnosis context." },
  { id: "audited", name: "AUDITED", category: "audit", description: "Full event, vector embedding, policy outcome, and execution logs committed to MongoDB." },
];

export const AegisInteractionStates = () => {
  const [selectedState, setSelectedState] = useState<StateItem>(STATES_LIST[6]);

  return (
    <section id="states" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          12 // LIFECYCLE OBSERVABILITY
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          SYSTEM INTERACTION STATES
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Deterministic incident state machine tracking every container transition from failure detection to audited recovery. Hover or click any state to inspect its operational invariant.
      </p>

      {/* Interactive State Machine Explorer */}
      <div className="p-5 sm:p-6 rounded-xl border border-neutral-800 bg-[#070709] space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          {STATES_LIST.map((st) => {
            const isSelected = selectedState.id === st.id;
            let badgeStyle = "text-neutral-400 border-neutral-800 hover:border-neutral-700 bg-neutral-950";
            if (st.category === "pass") {
              badgeStyle = isSelected
                ? "text-emerald-300 border-emerald-500 bg-emerald-950/60"
                : "text-emerald-400/80 border-emerald-900/60 bg-emerald-950/20";
            } else if (st.category === "fail") {
              badgeStyle = isSelected
                ? "text-rose-300 border-rose-500 bg-rose-950/60"
                : "text-rose-400/80 border-rose-900/60 bg-rose-950/20";
            } else if (isSelected) {
              badgeStyle = "text-white border-neutral-600 bg-neutral-900";
            }

            return (
              <button
                key={st.id}
                onMouseEnter={() => setSelectedState(st)}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition-all cursor-pointer ${badgeStyle}`}
              >
                {st.name}
              </button>
            );
          })}
        </div>

        {/* Selected State Inspector Card */}
        <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-bold">{selectedState.name}</span>
            <span className="text-neutral-600">|</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">{selectedState.category}</span>
          </div>
          <p className="text-neutral-300 font-sans text-xs sm:text-sm pt-1 leading-relaxed">
            {selectedState.description}
          </p>
        </div>
      </div>

      {/* ASCII State Machine Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="INCIDENT LIFECYCLE STATE MACHINE"
          badge="STATE COORDINATION"
          content={LIFECYCLE_ASCII}
          caption="Deterministic incident lifecycle: branching at SAFETY_EVALUATION into either automated remediation or human SRE review."
        />
      </div>
    </section>
  );
};
