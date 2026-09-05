"use client";

import { LuCircleAlert, LuZap, LuShieldCheck, LuLock } from "react-icons/lu";

export const SignifiyaProblem = () => {
  return (
    <section id="problem" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>01</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>THE PROBLEM</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Event Operations at Scale Break Fragile Mobile Stacks
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Signifiya 2026 is an annual university summit spanning 18 competitive technical,
          esports, and cultural events, thousands of attendee gate entries, and multi-tier
          registration pipelines. Designing a mobile application for live festival operations
          uncovers severe operational and architectural pitfalls that naive CRUD apps cannot
          withstand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/70 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <LuCircleAlert className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Burst Registrations & Team Roster Drift
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Multi-person team events (Valorant, BGMI, Robotics, Refab) require atomic links between
            team leaders, roster members, specific game IDs (Riot ID, Free Fire UUID), and weight
            categories. Partial client failure or connection dropouts during payment checkout
            result in orphaned member records, lost payments, and mismatched booking allocations.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/70 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <LuZap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Android 60Hz Display Throttling on 120Hz Hardware
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Even when high-refresh-rate displays (90Hz, 120Hz, 144Hz) dominate modern Android
            devices, the Android window manager defaults third-party React Native rendering to
            60fps. Complex physics animations, gesture carousels, and nested FlatLists suffer
            noticeable frame drops without OS-level display mode unlocking.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/70 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <LuLock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Client-Side Over-Fetching & PII Vulnerabilities
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Connecting mobile apps directly to PostgREST/Supabase without rigorous schema
            projection policies invites catastrophic privacy leaks. Unrestricted queries
            (<code className="text-red-400">.select(&apos;*&apos;)</code>) allow any authenticated client to
            scrape attendee phone numbers, student IDs, emails, and transaction UTR strings across
            all registered teams.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/70 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <LuShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-white">
            Gate Check-in Bottlenecks & Pass Fraud
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            At high-density campus entry gates, cellular networks degrade rapidly under crowd load.
            If digital passes rely on active network round-trips or lack tamper-evident offline
            booking identifiers (<code className="text-emerald-400">SGF26-XXXXXXXX</code>), entry staff
            face massive delays, gate congestion, and screenshot pass counterfeiting.
          </p>
        </div>
      </div>
    </section>
  );
};
