"use client";

import { nasalization, mono } from "@/app/fonts";

const EXECUTION_TRACE = [
  {
    step: "01",
    event: "CONTAINER.EVENT",
    props: ["action=die", "type=container", "actor.id=c8f2a1b9e0"],
    desc: "Docker daemon emits lifecycle death signal across local Unix socket.",
  },
  {
    step: "02",
    event: "WATCHMAN.DETECTED",
    props: ["source=watchman-service", "status=abnormal_exit"],
    desc: "Watchman listener filters out intentional stops and flags unexpected termination.",
  },
  {
    step: "03",
    event: "LOGS.EXTRACTED",
    props: ["tail=100", "streams=stdout,stderr", "encoding=utf-8"],
    desc: "Recent stdout and stderr streams extracted into raw incident diagnostic context.",
  },
  {
    step: "04",
    event: "INCIDENT.PUBLISHED",
    props: ["topic=aegis.incident.detected", "broker=kafka-kraft:9092"],
    desc: "Asynchronous incident payload committed into partitioned Kafka event backbone.",
  },
  {
    step: "05",
    event: "ORCHESTRATOR.DISPATCH",
    props: ["consumer_group=aegis-orchestrator", "partition=0"],
    desc: "NestJS orchestrator consumes event and routes diagnostic payload to local AI engine.",
  },
  {
    step: "06",
    event: "AI.DIAGNOSIS",
    props: ["classifier=mlp", "embedding=all-MiniLM-L6-v2", "vector_dim=384"],
    desc: "Python service returns classification label, confidence score, and suggested action.",
  },
  {
    step: "07",
    event: "SAFETY.GATE",
    props: ["confidence_threshold=0.85", "risk_level=LOW", "rule=allow_restart"],
    desc: "Deterministic safety policy validates diagnosis against blast radius rules.",
  },
  {
    step: "08",
    event: "DOCKERODE.ACTUATION",
    props: ["action=RESTART_CONTAINER", "driver=docker-engine-api"],
    desc: "Orchestrator invokes scoped Dockerode restart call directly on target container.",
  },
  {
    step: "09",
    event: "AUDIT.PERSISTED",
    props: ["collection=incidents", "persisted=true", "outbox_status=acknowledged"],
    desc: "Complete audit record, diagnosis vector, and actuation receipt stored in MongoDB.",
  },
];

export const AegisEventFlow = () => {
  return (
    <section id="event-flow" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          04 // EVENT FLOW
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          FROM CRASH TO RECOVERY
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Terminal execution trace showing the step-by-step progression of an incident from container death to audited recovery.
      </p>

      {/* Terminal-Inspired Execution Trace Box */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6 font-mono text-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-900 text-[11px] text-neutral-500 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>AEGIS CORE EVENT PIPELINE TRACE</span>
          </span>
          <span>9 PHASES</span>
        </div>

        <div className="space-y-3 divide-y divide-neutral-900/60">
          {EXECUTION_TRACE.map((trace) => (
            <div key={trace.step} className="pt-3 first:pt-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-neutral-500 font-bold">[{trace.step}]</span>
                <span className="text-emerald-400 font-semibold">{trace.event}</span>
                <div className="flex flex-wrap gap-1.5 ml-auto">
                  {trace.props.map((p, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-neutral-400 font-sans text-xs pl-6 leading-relaxed">
                {trace.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
