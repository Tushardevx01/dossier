"use client";

import { nasalization, mono } from "@/app/fonts";

export const AegisPhilosophy = () => {
  return (
    <section id="philosophy" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          18 // ENGINEERING INTENT
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          WHAT I WAS SOLVING
        </h2>
      </div>

      {/* Editorial Quote Block */}
      <div className="p-6 sm:p-8 rounded-xl border border-neutral-800 bg-[#070709] space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ARCHITECTURAL CORE</span>
        </div>

        <blockquote className="text-lg sm:text-2xl md:text-3xl text-white font-sans font-light leading-snug tracking-tight">
          &ldquo;I designed a closed-loop remediation system where AI can recommend an action, but deterministic policy controls whether that action is allowed to execute.&rdquo;
        </blockquote>

        <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed max-w-2xl pt-2">
          Autonomous systems in production cannot rely on probabilistic model outputs alone. True infrastructure safety demands decoupling recommendations from execution, bounding actuators to fixed APIs, and keeping the entire loop air-gapped.
        </p>
      </div>
    </section>
  );
};
