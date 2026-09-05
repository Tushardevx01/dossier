"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const APPROACH_WORKFLOW = `
                         CLI
                          │
                         HTTP
                          ▼
                 ┌─────────────────┐
                 │  CONTROL PLANE  │
                 │                 │
                 │ API             │
                 │ Node Registry   │
                 │ Job Registry    │
                 │ App Registry    │
                 │ Deployment      │
                 │ Scheduler       │
                 │ Reconciler      │
                 └────────┬────────┘
                          │
                     HTTP / Poll
                          │
                          ▼
                  ┌───────────────┐
                  │     AGENT     │
                  │               │
                  │ Heartbeat     │
                  │ Poll          │
                  │ Claim         │
                  │ Execute       │
                  │ Report        │
                  └───────┬───────┘
                          │
                          ▼
                   Docker / Podman
`;

export const CaseStudyApproach = () => {
  return (
    <section id="approach" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          THE APPROACH
        </h2>
      </div>

      {/* Core Architectural Decision (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          RunStack uses a trusted Control Plane as the authoritative source of state, while Agents remain thin execution workers.
        </p>
      </div>

      {/* Terminal-Inspired ASCII Workflow */}
      <div className="pt-2">
        <AsciiDiagram
          title="CONTROL PLANE & AGENT SEPARATION"
          badge="TOPOLOGY ARCHITECTURE"
          content={APPROACH_WORKFLOW}
          caption="Thin agent pull loop: agents poll and claim work over HTTP, keeping the network perimeter outbound-only."
        />
      </div>

      {/* 3 Concise Structural Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
        <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1.5">
          <div className="text-emerald-400 font-bold tracking-wider">CONTROL PLANE</div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Owns authoritative state, node registrations, deterministic scheduling, and application reconciliation loops.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1.5">
          <div className="text-emerald-400 font-bold tracking-wider">AGENT</div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Discovers the host node, maintains heartbeat, polls and claims assigned work, executes tasks, and reports results.
          </p>
        </div>
        <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1.5">
          <div className="text-emerald-400 font-bold tracking-wider">RUNTIME</div>
          <p className="text-neutral-400 font-sans text-xs leading-relaxed">
            Provides strict process and container lifecycle isolation through Docker or Podman on the host.
          </p>
        </div>
      </div>
    </section>
  );
};
