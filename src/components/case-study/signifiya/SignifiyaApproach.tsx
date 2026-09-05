"use client";

import { LuSmartphone, LuZap, LuShieldCheck, LuQrCode } from "react-icons/lu";

export const SignifiyaApproach = () => {
  return (
    <section id="approach" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Architecting an Resilient Mobile Event Infrastructure
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Rather than wrapping web views or relying on optimistic CRUD client logic, Signifiya was
          engineered as a native-first mobile system with OS-level hardware optimizations, hybrid
          authentication, strict database boundaries, and defensive data pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 p-6 rounded-xl bg-neutral-950/40 border border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <LuZap className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white">OS-Level Display Optimization</h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Injected a custom Expo config plugin (<code className="text-emerald-400">plugins/withHighRefreshRate.js</code>)
            into the Android compilation step. The plugin patches Android&apos;s <code className="text-neutral-300">MainActivity.kt</code>
            to inspect <code className="text-neutral-300">display.supportedModes</code> at runtime and lock the
            display mode ID to the highest available rate (90Hz, 120Hz, or 144Hz). Combined with
            iOS <code className="text-neutral-300">CADisableMinimumFrameDurationOnPhone</code>, animations and gestures run
            fully unthrottled.
          </p>
        </div>

        <div className="space-y-4 p-6 rounded-xl bg-neutral-950/40 border border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <LuShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white">Zero-Trust Database Security (RLS)</h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Eliminated all client-side wildcard database reads (<code className="text-red-400">.select(&apos;*&apos;)</code>),
            replacing them with explicit, minimal column projections. Built comprehensive PostgreSQL Row-Level
            Security policies (<code className="text-emerald-400">supabase_rls_setup.sql</code>) across seven tables
            restricting records to verified user identity tokens, backed by client-side post-query email validation.
          </p>
        </div>

        <div className="space-y-4 p-6 rounded-xl bg-neutral-950/40 border border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <LuSmartphone className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white">Enterprise Defensive Data Layer</h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Implemented a defensive data-handling module (<code className="text-emerald-400">src/lib/defensiveHandler.ts</code>)
            with strict runtime type guards, safe array unboxers (<code className="text-neutral-300">safeArrayParse</code>),
            and atomic state updates. If network responses contain nulls, unexpected wrappers, or partial payload errors,
            the app fails gracefully rather than crashing rendering cycles.
          </p>
        </div>

        <div className="space-y-4 p-6 rounded-xl bg-neutral-950/40 border border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <LuQrCode className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white">Self-Contained Digital Pass Engine</h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Designed high-impact digital event and visitor passes using an interactive video canvas
            (<code className="text-emerald-400">expo-video</code> looping <code className="text-neutral-300">bg.mp4</code>)
            interlaced with vector QR codes. Passes encode immutable booking tokens (<code className="text-emerald-400">SGF26-XXXXXXXX</code>),
            eliminating reliance on fragile client state and preventing ticket counterfeiting during physical gate entry.
          </p>
        </div>
      </div>
    </section>
  );
};
