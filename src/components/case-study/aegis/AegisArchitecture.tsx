"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const SYSTEM_ARCHITECTURE_ASCII = `
                    ┌─────────────────────┐
                    │     DOCKER HOST     │
                    │                     │
                    │  Failing Container  │
                    └──────────┬──────────┘
                               │
                        Docker Events
                               │
                               ▼
                    ┌─────────────────────┐
                    │   NESTJS CONTROL    │
                    │       PLANE         │
                    │                     │
                    │  Docker Watchman    │
                    │  Orchestrator       │
                    │  Remediation        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     KAFKA KRAFT     │
                    │    EVENT BACKBONE   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     AI ENGINE       │
                    │                     │
                    │ Embedding           │
                    │ FAISS               │
                    │ MLP Classifier      │
                    └──────────┬──────────┘
                               │
                         Diagnosis
                               │
                               ▼
                    ┌─────────────────────┐
                    │     SAFETY GATE     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      DOCKERODE      │
                    │    REMEDIATION      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MONGODB        │
                    │    AUDIT / STATE    │
                    └─────────────────────┘
`;

const ARCHITECTURE_ANNOTATIONS = [
  {
    tag: "01",
    label: "CONTROL PLANE",
    tech: "NestJS 11 + TypeScript",
    detail: "Coordinates Docker Watchman events, Kafka producers/consumers, safety policy gates, and actuator calls.",
  },
  {
    tag: "02",
    label: "EVENT BACKBONE",
    tech: "Kafka KRaft + KafkaJS",
    detail: "ZooKeeper-free distributed event log for reliable incident streaming, decoupled buffering, and replay.",
  },
  {
    tag: "03",
    label: "AI COMPUTE",
    tech: "Python + SentenceTransformers + FAISS + MLP",
    detail: "Local neural network pipeline: all-MiniLM-L6-v2 embeddings, sub-ms FAISS lookup, and PyTorch MLP classifier.",
  },
  {
    tag: "04",
    label: "STATE & AUDIT",
    tech: "MongoDB + Mongoose",
    detail: "Persistent incident store, raw log history, embedding vectors, remediation plans, and offline RL replay buffers.",
  },
  {
    tag: "05",
    label: "EXECUTION",
    tech: "Dockerode API",
    detail: "Direct Unix socket client executing enum-only container actions (restart, stop, inspect) without shell scripts.",
  },
];

export const AegisArchitecture = () => {
  return (
    <section id="architecture" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase tracking-tight`}>
          ARCHITECTURE & DATA FLOW
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Air-gapped distributed topology running entirely within the host environment. Events flow asynchronously through Kafka KRaft into local neural inference and policy-enforced actuation.
      </p>

      {/* Large System Architecture ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="AEGIS DISTRIBUTED SYSTEM TOPOLOGY"
          badge="LOCAL-FIRST CLUSTER ARCHITECTURE"
          content={SYSTEM_ARCHITECTURE_ASCII}
          caption="Unidirectional event flow linking Docker daemon events to local AI diagnosis, safety gates, and audited remediation."
          className="border-neutral-800"
        />
      </div>

      {/* 5 Technical Annotations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 font-mono text-xs">
        {ARCHITECTURE_ANNOTATIONS.map((ann) => (
          <div
            key={ann.tag}
            className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">{ann.tag} // {ann.label}</span>
            </div>
            <div className="text-white font-medium text-xs">{ann.tech}</div>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              {ann.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
