"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const APPROACH_WORKFLOW_ASCII = `
┌─────────────────────┐
│  FAILING CONTAINER  │
└──────────┬──────────┘
           │
      Docker Event
           ▼
┌─────────────────────┐
│   DOCKER WATCHMAN   │
└──────────┬──────────┘
           │
      Kafka Event
           ▼
┌─────────────────────┐
│     KAFKA KRAFT     │
│    EVENT BACKBONE   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    ORCHESTRATOR     │
│       NestJS        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      AI ENGINE      │
│  Diagnose Incident  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     SAFETY GATE     │
└───────┬───────┬─────┘
        │       │
      PASS     FAIL
        │       │
        ▼       ▼
   REMEDIATE   REVIEW
        │
        ▼
     DOCKER
        │
        ▼
      AUDIT
`;

const PIPELINE_STAGES = [
  { name: "DETECT", desc: "Watchman catches container death and tails stdout/stderr logs." },
  { name: "STREAM", desc: "Publishes raw incident payloads into decoupled Kafka KRaft topics." },
  { name: "DIAGNOSE", desc: "Generates 384-dim log embeddings and runs FAISS + MLP classification." },
  { name: "EVALUATE", desc: "Validates confidence, risk level, and blast radius against safety gates." },
  { name: "REMEDIATE", desc: "Executes approved enum actions directly through Dockerode API." },
  { name: "AUDIT", desc: "Stores full incident context, embeddings, and execution receipts in MongoDB." },
];

export const AegisApproach = () => {
  return (
    <section id="approach" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          THE APPROACH
        </h2>
      </div>

      {/* Brief Architectural Philosophy (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Aegis uses a closed-loop architecture. Rather than passively alerting human operators or granting unbounded shell execution to LLMs, it connects detection to policy-gated remediation.
        </p>
      </div>

      {/* Pipeline Stages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 font-mono text-xs">
        {PIPELINE_STAGES.map((s) => (
          <div
            key={s.name}
            className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1"
          >
            <span className="text-emerald-400 font-bold tracking-wider block">
              {s.name} →
            </span>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Primary Workflow ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="CLOSED-LOOP REMEDIATION WORKFLOW"
          badge="EVENT CONTROL LOOP"
          content={APPROACH_WORKFLOW_ASCII}
          caption="Unidirectional event flow: container death through Kafka KRaft, local AI diagnosis, safety evaluation, and Dockerode execution."
        />
      </div>
    </section>
  );
};
