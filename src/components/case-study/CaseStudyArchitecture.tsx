"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const SYSTEM_ARCHITECTURE_ASCII = `
                              CLI
                               │
                               │ HTTP
                               ▼
        ┌─────────────────────────────────────────┐
        │              CONTROL PLANE              │
        │                                         │
        │  HTTP API                               │
        │      │                                  │
        │      ├──── Node Registry                │
        │      │                                  │
        │      ├──── Job Registry                 │
        │      │                                  │
        │      ├──── Application Registry         │
        │      │                                  │
        │      ├──── Deployment Registry          │
        │      │                                  │
        │      ├──── Instance Registry            │
        │      │                                  │
        │      ├──── Job Scheduler                │
        │      │                                  │
        │      ├──── Instance Scheduler           │
        │      │                                  │
        │      └──── Instance Reconciler          │
        │                                         │
        └──────────────────┬──────────────────────┘
                           │
                           │ HTTP
                           ▼
                 ┌─────────────────────┐
                 │        AGENT        │
                 │                     │
                 │ Registration        │
                 │ Heartbeat           │
                 │ Job Polling         │
                 │ Job Claiming        │
                 │ Job Execution       │
                 │ Result Reporting    │
                 │ Instance Execution  │
                 └──────────┬──────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Docker/Podman │
                    └───────────────┘
`;

const ARCHITECTURE_ANNOTATIONS = [
  {
    tag: "01",
    label: "HTTP API Gateway",
    detail: "Provides REST endpoints for job admission, app deployment manifests, node registrations, polling, and heartbeat reporting.",
  },
  {
    tag: "02",
    label: "Centralized Registries",
    detail: "Maintains authoritative in-memory state (V1) protected by sync.RWMutex: Node, Job, Application, Deployment, and Instance stores.",
  },
  {
    tag: "03",
    label: "Deterministic Schedulers",
    detail: "Dispatches jobs and instances to healthy online nodes using a sorted node ID ring and a persistent round-robin cursor.",
  },
  {
    tag: "04",
    label: "Application Reconciler",
    detail: "Continuous control loop comparing desired instances from immutable deployments against actual runtime instance status.",
  },
  {
    tag: "05",
    label: "Thin Worker Agents",
    detail: "Autonomous host daemons that report capabilities, pulse 1000ms heartbeats, claim work atomically, and run tasks locally.",
  },
  {
    tag: "06",
    label: "Container Runtime Sandbox",
    detail: "Directly drives Docker or Podman on the host node for strict process isolation, CPU/memory quotas, and exit code extraction.",
  },
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
        RunStack couples an authoritative control plane with lightweight worker agents over HTTP. State, scheduling, and reconciliation remain strictly centralized, while agents manage local execution.
      </p>

      {/* Large System Architecture ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="RUNSTACK ARCHITECTURAL TOPOLOGY"
          badge="AUTHORITATIVE CONTROL PLANE"
          content={SYSTEM_ARCHITECTURE_ASCII}
          caption="Unidirectional control plane topology with centralized registries, schedulers, and reconcilers driving thin host agents."
          className="border-neutral-800"
        />
      </div>

      {/* Architecture Annotations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 font-mono text-xs">
        {ARCHITECTURE_ANNOTATIONS.map((ann) => (
          <div
            key={ann.tag}
            className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{ann.tag} //</span>
              <span className="text-neutral-200 font-medium">{ann.label}</span>
            </div>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              {ann.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
