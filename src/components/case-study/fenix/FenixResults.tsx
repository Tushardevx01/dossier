"use client";

import { nasalization } from "@/app/fonts";
import { LuSmartphone } from "react-icons/lu";

export const FenixResults = () => {
  return (
    <section id="results" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          MEASURABLE RESULTS
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Fenix is evaluated on verifiable engineering deliverables rather than fabricated benchmark metrics. The outcomes demonstrate complete real-time capability coverage, device control, and authenticated access.
        </p>
      </div>

      {/* Verified Deliverables Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 font-mono">
        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">3</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            CALL MODES
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            Instant ad-hoc rooms, direct meeting link joins, and future scheduled calendar meetings.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">3</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            CALL LAYOUTS
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            Dynamically switchable Paginated Grid, Speaker Left, and Speaker Right presentation modes.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">100%</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            AUTHENTICATED ACCESS
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            All calls require verified Clerk sessions and cryptographically signed Stream tokens.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">2-WAY</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            REAL-TIME MEDIA
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            Synchronized audio and video streams powered by Stream Video SDK with speaking indicators.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">PRE-JOIN</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            DEVICE CONTROL
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            Live camera preview and microphone toggles verified before entering any active room.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">RESPONSIVE</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            MULTI-VIEWPORT UI
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            Adaptive controls, mobile drawer navigation, and responsive participant grids.
          </p>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <LuSmartphone className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-white font-semibold block">PRODUCTION-GRADE ARCHITECTURE</span>
            <span className="text-neutral-500 text-[11px]">CLERK + STREAM VIDEO + NEXT.JS APP ROUTER</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-emerald-400 text-xs">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>All capabilities grounded in repository code</span>
        </div>
      </div>
    </section>
  );
};
