"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const SECURITY_BOUNDARIES_ASCII = `
AI
│
│ enum only
▼
ORCHESTRATOR
│
│ safety policy
▼
DOCKERODE
│
│ restricted API
▼
CONTAINER
`;

const SECURITY_PROMISES = [
  { title: "NO SHELL EXECUTION", desc: "No bash, sh, or exec wrappers. Eliminates command injection vectors completely." },
  { title: "NO CLOUD AI", desc: "Zero outbound network calls to third-party AI APIs; fully isolated from public internet." },
  { title: "NO EXTERNAL LLM", desc: "Guaranteed reproducibility with deterministic embeddings and calibrated MLP output." },
  { title: "FIXED ACTION REGISTRY", desc: "Hardcoded enum values (RESTART, STOP, IGNORE) bounding actuator scope." },
  { title: "PRIVATE SERVICE NETWORK", desc: "Internal Docker bridge network with no external ports exposed for telemetry." },
  { title: "OPERATOR REVIEW GATES", desc: "High-risk, stateful, or uncertain incidents require explicit human sign-off." },
];

export const AegisSecurity = () => {
  return (
    <section id="security" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          SECURITY BOUNDARIES
        </h2>
      </div>

      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Aegis enforces rigid execution firewalls between the probabilistic AI pipeline, the NestJS control plane, and the Docker container host.
        </p>
      </div>

      {/* ASCII Security Flow */}
      <div className="pt-2">
        <AsciiDiagram
          title="RIGID ISOLATION BOUNDARIES"
          badge="SECURITY FIREWALL"
          content={SECURITY_BOUNDARIES_ASCII}
          caption="Unidirectional privilege escalation prevention: AI emits enums only, Orchestrator checks policy, Dockerode executes API only."
        />
      </div>

      {/* 6 Security Boundaries Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 font-mono text-xs">
        {SECURITY_PROMISES.map((item) => (
          <div
            key={item.title}
            className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1"
          >
            <span className="text-emerald-400 font-bold tracking-wider block text-xs">
              {item.title}
            </span>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
