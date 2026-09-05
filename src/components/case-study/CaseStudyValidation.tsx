"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";

const VALIDATION_PIPELINE_ASCII = `
CODE
 │
 ├── gofmt
 ├── go vet
 ├── go test
 ├── go test -race
 └── binary build
          │
          ▼
      make check
`;

const VALIDATION_SUITES = [
  {
    target: "Concurrency & Race Safety",
    tool: "go test -race",
    scope: "Validates all registry sync.RWMutex locks and channel communications under simulated parallel access.",
  },
  {
    target: "Graceful Shutdown",
    tool: "Signal Traps & Contexts",
    scope: "Tests agent SIGINT/SIGTERM cancellation, completing in-flight jobs and unregistering cleanly.",
  },
  {
    target: "Integration Testing",
    tool: "API & Runtime Harness",
    scope: "End-to-end execution testing verifying client submission, agent claim, Docker container run, and result receipt.",
  },
  {
    target: "PostgreSQL V2 Integration",
    tool: "Docker Database Harness",
    scope: "Verifies database migrations, transactional rollbacks, SELECT FOR UPDATE locks, and SQL fencing.",
  },
];

export const CaseStudyValidation = () => {
  return (
    <section id="validation" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          18 // VERIFICATION HARNESS
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          ENGINEERING VALIDATION
        </h2>
      </div>

      {/* Brief Context (2-3 lines) */}
      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Correctness in distributed systems requires automated enforcement. RunStack standardizes verification through a comprehensive <span className="text-emerald-400 font-mono text-sm">make check</span> pipeline.
        </p>
      </div>

      {/* ASCII Pipeline Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="MAKE CHECK VERIFICATION PIPELINE"
          badge="AUTOMATED TEST HARNESS"
          content={VALIDATION_PIPELINE_ASCII}
          caption="Every commit validates formatting, static analysis, unit suites, race detection, and binary compilation."
        />
      </div>

      {/* Validation Suites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 font-mono text-xs">
        {VALIDATION_SUITES.map((suite) => (
          <div
            key={suite.target}
            className="p-4 rounded-xl border border-neutral-800 bg-[#070709] space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">{suite.target}</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-950/40 border border-emerald-900/60 px-1.5 py-0.5 rounded">
                {suite.tool}
              </span>
            </div>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              {suite.scope}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
