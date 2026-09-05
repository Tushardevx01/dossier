"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const APPROACH_WORKFLOW = `
USER (gRPC Manifest)
  │
  ▼
CONTROL PLANE
  │
  ├── Job Registry (SHA-256 Idempotency)
  ├── Scheduler (Concurrent Min-Heap)
  └── Node Registry (Heartbeats & Leases)
          │
          ▼
     NODE AGENT (Host Go Daemon)
          │
          ▼
     WORKER SANDBOX (cgroups v2 Limits)
          │
          ▼
     RESULT RECEIPT (Exit Code & Logs)
          │
          └────────────────────────► CONTROL PLANE
`;

const STRATEGY_POINTS = [
  "Centralized control plane decouples admission validation from physical execution.",
  "Partitioned Kafka event log ensures durable, at-least-once workload buffering.",
  "Concurrent min-heap scheduler computes placement using real-time node capacity scores.",
  "Sliding-window heartbeats detect silent node stalls and trigger automatic requeueing.",
  "Local Go host daemons isolate untrusted processes inside strict Linux cgroups v2 boundaries.",
];

export const CaseStudyApproach = () => {
  return (
    <section id="approach" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          02 // SYSTEM STRATEGY
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          THE APPROACH
        </h2>
      </div>

      {/* 3-5 Concise Points */}
      <div className="max-w-3xl space-y-3 font-sans text-sm sm:text-base text-neutral-300">
        <ul className="space-y-2.5">
          {STRATEGY_POINTS.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-emerald-400 font-mono text-xs font-bold mt-1">
                // 0{idx + 1}
              </span>
              <span className="leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Terminal-Inspired ASCII Workflow */}
      <div className="pt-2">
        <AsciiDiagram
          title="CONTROL FLOW WORKFLOW"
          badge="UNIDIRECTIONAL INTENT"
          content={APPROACH_WORKFLOW}
          caption="Unidirectional dispatch loop from client manifest to worker sandbox receipt."
        />
      </div>
    </section>
  );
};
