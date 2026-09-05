"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const CONTAINER_LIFECYCLE_ASCII = `
APPLICATION
     │
     ▼
DEPLOYMENT
     │
     ▼
INSTANCE ASSIGNED
     │
     ▼
AGENT CLAIM
     │
     ▼
ContainerRuntime
     │
     ├── Docker
     └── Podman
     │
     ▼
  RUNNING
     │
     ▼
HEALTH / STATUS
     │
     ▼
RECONCILIATION
`;

export const CaseStudyContainerLifecycle = () => {
  return (
    <section id="container-lifecycle" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          CONTAINER LIFECYCLE
        </h2>
      </div>

      {/* Brief Context (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          RunStack extends beyond basic process spawning. The agent interfaces with the local container runtime (Docker or Podman) to drive the full container lifecycle, streaming logs, checking health, and feeding telemetry into the Reconciler.
        </p>
      </div>

      {/* ASCII Container Lifecycle Flow */}
      <div className="pt-2">
        <AsciiDiagram
          title="APPLICATION CONTAINER ORCHESTRATION"
          badge="RUNTIME PIPELINE"
          content={CONTAINER_LIFECYCLE_ASCII}
          caption="Immutable deployment to host container runtime execution, continuous probing, and active reconciliation."
        />
      </div>
    </section>
  );
};
