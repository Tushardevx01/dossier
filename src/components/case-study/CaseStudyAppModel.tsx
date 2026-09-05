"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const APP_HIERARCHY_ASCII = `
APPLICATION
  │
  │ desired state
  ▼
DEPLOYMENT
  │
  │ immutable snapshot
  ▼
INSTANCES
  │
  │ runtime state
  ▼
CONTAINER RUNTIME
`;

const RECONCILER_LOOP_ASCII = `
DESIRED STATE
      │
      ▼
┌──────────────┐
│  RECONCILER  │
└──────┬───────┘
       │
       ▼
ACTUAL STATE
`;

export const CaseStudyAppModel = () => {
  return (
    <section id="app-model" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          DECLARATIVE APPLICATION MODEL
        </h2>
      </div>

      {/* Brief Editorial Context (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          RunStack orchestrates long-running services through declarative specs. An Application defines desired state, a Deployment captures an immutable snapshot, and Instances represent physical containers.
        </p>
      </div>

      {/* Dual ASCII: App Hierarchy & Reconciler Loop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        <AsciiDiagram
          title="DECLARATIVE HIERARCHY"
          badge="DATA MODEL"
          content={APP_HIERARCHY_ASCII}
          caption="Immutable snapshots decouple application configuration updates from physical running instances."
        />
        <AsciiDiagram
          title="RECONCILIATION CONTROL LOOP"
          badge="CONVERGENCE"
          content={RECONCILER_LOOP_ASCII}
          caption="The Reconciler continuously converges physical cluster state toward desired instance count."
        />
      </div>
    </section>
  );
};
