"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const SYSTEM_ARCHITECTURE_ASCII = `
                             ┌─────────────────────────────────────────────┐
                             │                CONTROL PLANE                │
                             │                                             │
                             │  gRPC API Gateway       Token-Bucket Rate   │
                             │  Kafka Log Buffer       Min-Heap Scheduler  │
                             │  Redis Redlock Engine   Lease Coordinator   │
                             └──────────────────────┬──────────────────────┘
                                                    │
                                        Signed Workload Dispatch
                                                    │
                     ┌──────────────────────────────┴──────────────────────────────┐
                     │                                                             │
                     ▼                                                             ▼
          ┌─────────────────────┐                                       ┌─────────────────────┐
          │     NODE HOST A     │                                       │     NODE HOST B     │
          │                     │                                       │                     │
          │  Go Host Daemon     │                                       │  Go Host Daemon     │
          │  Heartbeat Prober   │                                       │  Heartbeat Prober   │
          │  Docker Socket      │                                       │  Docker Socket      │
          └──────────┬──────────┘                                       └──────────┬──────────┘
                     │                                                             │
                     ▼                                                             ▼
          ┌─────────────────────┐                                       ┌─────────────────────┐
          │   WORKER SANDBOX    │                                       │   WORKER SANDBOX    │
          │                     │                                       │                     │
          │  Docker Container   │                                       │  Docker Container   │
          │  cgroups v2 Throttl │                                       │  cgroups v2 Throttl │
          │  SIGKILL Watchdog   │                                       │  SIGKILL Watchdog   │
          └──────────┬──────────┘                                       └──────────┬──────────┘
                     │                                                             │
                     └──────────────────────────────┬──────────────────────────────┘
                                                    ▼
                                      RESULT RECEIPT / HEARTBEAT
                                                    │
                                                    ▼
                                              CONTROL PLANE
`;

const DATA_FLOW_STEPS = [
  { step: "01", title: "Job Submitted", detail: "Client signs manifest with SHA-256 and submits to gRPC admission gateway." },
  { step: "02", title: "Job Registered", detail: "Control plane enforces token-bucket quota and commits intent to partitioned Kafka log." },
  { step: "03", title: "Scheduler Selects Node", detail: "Concurrent min-heap evaluates real-time memory and CPU scores to pick the optimal host." },
  { step: "04", title: "Agent Claims Execution", detail: "Node daemon acquires Redis Redlock mutex (5000ms TTL) to prevent split-brain dual dispatch." },
  { step: "05", title: "Worker Executes", detail: "Daemon spawns Docker container sandbox constrained by hard Linux cgroups v2 limits." },
  { step: "06", title: "Result Reported", detail: "Container terminates; exit status and execution logs are flushed back to the control plane." },
  { step: "07", title: "Registry Updates State", detail: "Redis lease is committed, state transitions to COMPLETED, and receipt is cached for 24 hours." },
];

export const CaseStudyArchitecture = () => {
  return (
    <section id="architecture" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          03 // SYSTEM TOPOLOGY
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase tracking-tight`}>
          ARCHITECTURE & DATA FLOW
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Decoupled cluster topology separating ingress validation, distributed message durability, concurrent placement scoring, and local kernel sandbox boundaries.
      </p>

      {/* Large System Architecture ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="RUNSTACK TOPOLOGY ARCHITECTURE"
          badge="PRODUCTION BLUEPRINT"
          content={SYSTEM_ARCHITECTURE_ASCII}
          caption="Full cluster interaction loop from gRPC ingestion down to host Docker sockets and cgroups v2."
          className="border-neutral-800"
        />
      </div>

      {/* 7-Step Compact Data Flow Explanation */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-900 font-mono text-xs text-neutral-500 uppercase tracking-wider">
          <span>STEP-BY-STEP DATA FLOW SEQUENCE</span>
          <span>7 PHASES</span>
        </div>

        <div className="grid grid-cols-1 gap-2 font-mono text-xs">
          {DATA_FLOW_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-3 rounded-lg border border-neutral-900 bg-neutral-950/60 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 hover:border-neutral-800 transition-colors"
            >
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-emerald-400 font-bold text-[11px]">{item.step}</span>
                <span className="text-white font-semibold">{item.title}:</span>
              </div>
              <span className="text-neutral-400 font-sans text-xs sm:text-[13px] leading-relaxed">
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
