"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const SECURITY_BOUNDARIES_ASCII = `
                CONTROL PLANE
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
     OPERATOR                   AGENT
        │                         │
 application management      node execution
 deployment                  claims
 secrets                     status
 routing                     heartbeat
`;

const SECURITY_PRINCIPLES = [
  {
    title: "Role Separation & Auth",
    status: "Implemented / Design Phase",
    detail: "Strict boundary between cluster operators (deployments, routing, secret references) and worker agents (claims, execution, heartbeat).",
  },
  {
    title: "Ownership Validation",
    status: "Implemented",
    detail: "Only the node designated by the scheduler can claim and report on an assigned execution attempt.",
  },
  {
    title: "Execution Fencing",
    status: "Implemented",
    detail: "Every attempt carries an ephemeral ExecutionID token. Stale results from severed or timed-out workers are rejected by the Control Plane.",
  },
  {
    title: "Just-in-Time Secrets",
    status: "Design Phase",
    detail: "Secret references are stored securely in the Control Plane and resolved just-in-time into agent container environment injection.",
  },
  {
    title: "No Shell Interpreter",
    status: "Implemented",
    detail: "Commands are parsed directly via strings.Fields() into exec.Command arguments, eliminating arbitrary shell injection vulnerabilities.",
  },
  {
    title: "Stale Result Rejection",
    status: "Implemented",
    detail: "Guarantees cluster state immutability once a job reaches terminal SUCCEEDED or FAILED status, or when an ExecutionID is superseded.",
  },
];

export const CaseStudySecurity = () => {
  return (
    <section id="security" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          15 // TRUST & ISOLATION
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          SECURITY BOUNDARIES
        </h2>
      </div>

      {/* Brief Context (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          RunStack isolates operator intent from worker execution. The Control Plane acts as the sole security boundary, enforcing ownership validation and rejecting untrusted state mutations.
        </p>
      </div>

      {/* ASCII Security Topology Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="OPERATOR VS AGENT SECURITY BOUNDARY"
          badge="TRUST SEPARATION"
          content={SECURITY_BOUNDARIES_ASCII}
          caption="Unidirectional trust topology isolating administrative actions from worker node execution privileges."
        />
      </div>

      {/* Security Principles Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 font-mono text-xs">
        {SECURITY_PRINCIPLES.map((sec, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-900 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{sec.title}</span>
              <span
                className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono ${
                  sec.status === "Implemented"
                    ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/60"
                    : "bg-neutral-900 text-neutral-400 border border-neutral-800"
                }`}
              >
                {sec.status}
              </span>
            </div>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              {sec.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
