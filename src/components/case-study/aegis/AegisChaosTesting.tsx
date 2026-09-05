"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const CHAOS_WORKFLOW_ASCII = `
CHAOS TRIGGER
      │
      ▼
CONTAINER FAILURE
      │
      ▼
AEGIS DETECTION
      │
      ▼
  DIAGNOSIS
      │
      ▼
 SAFETY GATE
      │
      ▼
 REMEDIATION
      │
      ▼
    AUDIT
`;

const CHAOS_SCENARIOS = [
  { name: "OOM", desc: "Spawns a memory-greedy worker allocating unconstrained RAM until Linux kernel OOM-killer fires." },
  { name: "TIMEOUT", desc: "Injects deadlocks and hung HTTP keep-alive loops that exceed service health-check deadlines." },
  { name: "CRASH", desc: "Forces unhandled runtime panics and fatal SIGSEGV exit codes to test immediate recovery." },
  { name: "PERMISSION", desc: "Revokes host volume filesystem permissions to evaluate permission-denied classification." },
  { name: "PORT COLLISION", desc: "Attempts binding already-occupied host TCP ports to test address-in-use detection." },
];

export const AegisChaosTesting = () => {
  return (
    <section id="chaos-testing" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          CHAOS TESTING
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Aegis ships with a built-in chaos engineering suite to intentionally inject container failure modes and verify closed-loop detection, neural classification, and policy gating.
      </p>

      {/* ASCII Chaos Injection Workflow */}
      <div className="pt-1">
        <AsciiDiagram
          title="CHAOS INJECTION TO REMEDIATION PIPELINE"
          badge="FAILURE SIMULATION"
          content={CHAOS_WORKFLOW_ASCII}
          caption="Controlled failure injection simulating microservice crashes to continuously validate the self-healing loop."
        />
      </div>

      {/* Terminal CLI Commands & Scenarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
        {/* CLI Example Box */}
        <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-950 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-900 text-[11px] text-neutral-500 uppercase tracking-wider">
            <span>CHAOS CLI HARNESS</span>
            <span className="text-emerald-400">EXECUTABLE</span>
          </div>

          <div className="space-y-2 text-neutral-300">
            <div className="p-2 rounded bg-black/60 border border-neutral-900 flex items-center justify-between">
              <code>$ aegis chaos oom</code>
              <span className="text-[10px] text-neutral-500">Injects heap exhaustion</span>
            </div>
            <div className="p-2 rounded bg-black/60 border border-neutral-900 flex items-center justify-between">
              <code>$ aegis chaos timeout</code>
              <span className="text-[10px] text-neutral-500">Triggers socket stall</span>
            </div>
            <div className="p-2 rounded bg-black/60 border border-neutral-900 flex items-center justify-between">
              <code>$ aegis chaos crash</code>
              <span className="text-[10px] text-neutral-500">Forces panic termination</span>
            </div>
            <div className="p-2 rounded bg-black/60 border border-neutral-900 flex items-center justify-between">
              <code>$ aegis chaos port</code>
              <span className="text-[10px] text-neutral-500">Induces port collision</span>
            </div>
          </div>
        </div>

        {/* 5 Scenarios List */}
        <div className="p-5 rounded-xl border border-neutral-800 bg-[#070709] font-mono text-xs space-y-2.5">
          <div className="pb-2 border-b border-neutral-900 text-[11px] text-neutral-500 uppercase tracking-wider">
            SUPPORTED FAILURE TAXONOMY
          </div>
          {CHAOS_SCENARIOS.map((sc) => (
            <div key={sc.name} className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-bold shrink-0">{sc.name} //</span>
              <p className="text-neutral-400 font-sans text-xs leading-relaxed">{sc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
