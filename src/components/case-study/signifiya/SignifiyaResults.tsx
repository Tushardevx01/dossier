"use client";

import { LuCheck, LuShieldCheck, LuZap, LuSmartphone, LuDatabase } from "react-icons/lu";

export const SignifiyaResults = () => {
  return (
    <section id="results" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Architectural Rigor & Engineering Verification
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Grounded directly in code audits, security logs, and hardware profiling rather than
          unverified marketing claims.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Result 1 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
            <LuZap className="w-4 h-4" />
            <span>HARDWARE PROFILE</span>
          </div>
          <h3 className="text-base font-semibold text-white">
            Unthrottled 120Hz/144Hz Native Display Mode
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            By querying <code className="text-neutral-300">display.supportedModes</code> in Kotlin and overriding
            <code className="text-neutral-300">windowParams.preferredDisplayModeId</code>, Android devices render
            Reanimated v4 gestures and carousels at full hardware refresh rates rather than the default 60Hz cap.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono pt-1">
            <LuCheck className="w-3.5 h-3.5" />
            <span>Verified via Android WindowManager display mode inspection</span>
          </div>
        </div>

        {/* Result 2 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
            <LuShieldCheck className="w-4 h-4" />
            <span>SECURITY AUDIT</span>
          </div>
          <h3 className="text-base font-semibold text-white">
            Zero Client Secret Leakage & Whitelisted Projections
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Automated code audits in <code className="text-neutral-300">SECURITY_VERIFICATION.md</code> confirmed
            zero instances of private service keys in git history, bundles, or logs. Wildcard selectors
            were eliminated across all client queries in favor of strict field projections.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono pt-1">
            <LuCheck className="w-3.5 h-3.5" />
            <span>Verified via repository-wide regex security scans</span>
          </div>
        </div>

        {/* Result 3 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
            <LuDatabase className="w-4 h-4" />
            <span>DATABASE INTEGRITY</span>
          </div>
          <h3 className="text-base font-semibold text-white">
            Strict PostgreSQL Row-Level Security Isolation
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            RLS policies across seven PostgreSQL tables guarantee that attendees can neither inspect
            nor tamper with registrations or passes belonging to other users, even when attempting
            direct PostgREST requests outside the mobile client.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono pt-1">
            <LuCheck className="w-3.5 h-3.5" />
            <span>Verified via Supabase SQL Editor RLS test policies</span>
          </div>
        </div>

        {/* Result 4 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
            <LuSmartphone className="w-4 h-4" />
            <span>RUNTIME STABILITY</span>
          </div>
          <h3 className="text-base font-semibold text-white">
            Defensive Data Layer & Memory Optimization
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Safe array unboxing and type guards in <code className="text-neutral-300">defensiveHandler.ts</code> ensure
            malformed responses never crash the JavaScript UI thread. Lazy tab unmounting reduces
            startup memory by ~40%, preventing Android out-of-memory terminates.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono pt-1">
            <LuCheck className="w-3.5 h-3.5" />
            <span>Zero unhandled TypeError crashes on schema anomalies</span>
          </div>
        </div>
      </div>
    </section>
  );
};
