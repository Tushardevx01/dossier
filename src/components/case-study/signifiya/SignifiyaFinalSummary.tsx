"use client";

import { LuShieldCheck, LuZap, LuSmartphone } from "react-icons/lu";

export const SignifiyaFinalSummary = () => {
  return (
    <section id="summary" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Lessons from Festival Scale Mobile Infrastructure
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Engineering the official mobile platform for Signifiya 2026 reinforced core principles
          for building mission-critical consumer mobile systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <LuZap className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-white text-base">
            Don&apos;t Settle for Default OS Throttles
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Mobile frameworks often accept lowest-common-denominator OS defaults like Android 60Hz
            locks. Writing targeted native plugins (Kotlin in Expo) unlocks modern 120Hz/144Hz
            hardware displays, delivering the tactile responsiveness that separates production
            applications from hobby prototypes.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <LuShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-white text-base">
            Security Must Live in the Database
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Client-side filtering is merely cosmetic. In public mobile applications where APKs can
            be decompiled and PostgREST endpoints inspected, database Row-Level Security policies
            and column projection whitelists are the only reliable barrier protecting attendee data
            and financial records.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <LuSmartphone className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-white text-base">
            Defensive State Protects Event Rushes
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Network connectivity during live campus events is volatile. Combining offline-safe
            booking tokens (<code className="text-emerald-400">SGF26-XXXXXXXX</code>), defensive array
            unboxing, 14:30 session countdowns, and dual-track payment verification guarantees that
            high-volume gate operations continue smoothly regardless of signal fluctuations.
          </p>
        </div>
      </div>
    </section>
  );
};
