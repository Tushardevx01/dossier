"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const NODE_LIFECYCLE_ASCII = `
        AGENT START
             │
             ▼
        REGISTER
             │
             ▼
         ONLINE
             │
       heartbeat loop
             │
             ▼
       ┌─────────────┐
       │ heartbeat?  │
       └──────┬──────┘
              │
        ┌─────┴─────┐
       YES          NO
        │            │
        ▼            ▼
     ONLINE       OFFLINE
                     │
                     ▼
              recovery logic
`;

export const CaseStudyNodeLifecycle = () => {
  return (
    <section id="node-lifecycle" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          09 // HOST SUPERVISION
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          NODE LIFECYCLE
        </h2>
      </div>

      {/* Brief Context (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Nodes register on startup and maintain an active heartbeat loop with the Control Plane. Missed heartbeats trigger automated offline transition and workload recovery.
        </p>
      </div>

      {/* ASCII Node Lifecycle Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="NODE REGISTRATION & HEARTBEAT DETECTOR"
          badge="HEALTH PROBING"
          content={NODE_LIFECYCLE_ASCII}
          caption="Sliding-window node health loop: missed heartbeats transition the node to OFFLINE, triggering recovery."
        />
      </div>

      {/* Machine Capabilities Reporting Strip */}
      <div className="p-4 rounded-xl border border-neutral-800 bg-[#070709] space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
          <span className="text-white font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>REPORTED NODE CAPABILITIES</span>
          </span>
          <span className="text-[10px] text-neutral-500 uppercase">TELEMETRY ONLY</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded bg-neutral-950 border border-neutral-900">
            <span className="text-neutral-500 block text-[10px]">HOST OS</span>
            <span className="text-neutral-200 font-medium">Linux / Darwin</span>
          </div>
          <div className="p-2.5 rounded bg-neutral-950 border border-neutral-900">
            <span className="text-neutral-500 block text-[10px]">CPU CORES</span>
            <span className="text-neutral-200 font-medium">runtime.NumCPU()</span>
          </div>
          <div className="p-2.5 rounded bg-neutral-950 border border-neutral-900">
            <span className="text-neutral-500 block text-[10px]">TOTAL MEMORY</span>
            <span className="text-neutral-200 font-medium">Host RAM (bytes)</span>
          </div>
          <div className="p-2.5 rounded bg-neutral-950 border border-neutral-900">
            <span className="text-neutral-500 block text-[10px]">RUNTIME ENGINE</span>
            <span className="text-emerald-400 font-medium">Docker / Podman</span>
          </div>
        </div>

        <p className="text-neutral-400 font-sans text-xs leading-relaxed pt-1">
          <strong className="text-neutral-300 font-mono">Architecture Note:</strong> Node capabilities are collected upon registration for cluster visibility, but the V1 scheduler uses deterministic round-robin placement rather than dynamic resource scoring.
        </p>
      </div>
    </section>
  );
};
