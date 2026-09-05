"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const OFFLINE_RL_ASCII = `
HISTORICAL INCIDENTS
        │
        ▼
  REPLAY DATASET
        │
        ▼
OFFLINE RL TRAINING
        │
        ▼
POLICY EVALUATION
        │
        ▼
RESEARCH / FUTURE POLICY
`;

export const AegisOfflineRl = () => {
  return (
    <section id="offline-rl" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          14 // ADAPTIVE POLICIES
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          OFFLINE LEARNING LOOP
        </h2>
      </div>

      <div className="max-w-3xl space-y-2">
        <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed font-light">
          Aegis incorporates an offline Reinforcement Learning (RL) replay pipeline to analyze historical incident episodes and evaluate future remediation heuristics without live cluster risk.
        </p>
      </div>

      {/* ASCII Offline Learning Loop */}
      <div className="pt-2">
        <AsciiDiagram
          title="OFFLINE RL RESEARCH PIPELINE"
          badge="OFFLINE REPLAY"
          content={OFFLINE_RL_ASCII}
          caption="Historical incident episodes are compiled into offline replay buffers for research and future policy evaluation."
        />
      </div>

      {/* Critical System Boundary Callout */}
      <div className="p-4 rounded-xl border border-neutral-800 bg-[#070709] font-mono text-xs text-neutral-400 space-y-2">
        <div className="flex items-center gap-2 text-white font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>CRITICAL ARCHITECTURAL BOUNDARY: OFFLINE RESEARCH ONLY</span>
        </div>
        <ul className="space-y-1.5 pl-4 list-disc text-neutral-300 font-sans text-xs">
          <li>The RL engine runs strictly offline in Python as a batch research tool.</li>
          <li>It does <strong>NOT</strong> have direct access to the Docker socket and cannot directly restart or stop containers.</li>
          <li>It can <strong>NEVER</strong> bypass or override the deterministic NestJS safety policy gate.</li>
        </ul>
      </div>
    </section>
  );
};
