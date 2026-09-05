"use client";

import { LuShieldCheck, LuLock, LuTerminal, LuDatabase } from "react-icons/lu";

export const SignifiyaTechnicalRigor = () => {
  return (
    <section id="rigor" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
          <span>06</span>
          <span className="w-8 h-px bg-emerald-500/30" />
          <span>TECHNICAL RIGOR & SECURITY MODEL</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Defense-in-Depth Security & Zero-Trust Verification
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Rather than trusting client-side mobile input, Signifiya enforces multi-layer verification:
          PostgreSQL Row-Level Security, strict column projections, post-query identity validation,
          and protected API keys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <LuShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white">Strict Column Whitelisting</h3>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Eliminated all <code className="text-red-400">.select(&apos;*&apos;)</code> calls across mobile screens.
            Queries strictly project needed fields (e.g., <code className="text-neutral-300">id, name, email, passType, status, userBookingId, createdAt</code>),
            preventing internal metadata, admin remarks, or unneeded relational fields from leaking across the network.
          </p>
          <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400">
            <span className="text-emerald-400">AUDIT STATUS:</span> 100% of client queries whitelisted; 0 wildcard selectors.
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <LuDatabase className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white">Database Row-Level Security (RLS)</h3>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Activated PostgreSQL RLS across seven tables (<code className="text-emerald-400">user</code>,
            <code className="text-emerald-400">visitor_registration</code>, <code className="text-emerald-400">participant_team</code>,
            <code className="text-emerald-400">participant_team_member</code>, <code className="text-emerald-400">pass</code>, etc.).
            Attendees can only SELECT, INSERT, or UPDATE rows matching their verified <code className="text-neutral-300">auth.uid()</code>
            or <code className="text-neutral-300">auth.jwt()-&gt;&gt;&apos;email&apos;</code>.
          </p>
          <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400">
            <span className="text-emerald-400">AUDIT STATUS:</span> Source-level database policies prevent client tampering.
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <LuLock className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white">Post-Query Identity Validation</h3>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            As a defense-in-depth safety measure against session tampering or proxy injection,
            <code className="text-neutral-300">ProfileScreen.tsx</code> inspects every returned record against the
            active session email before rendering: records failing equality checks are dropped
            and logged to security monitoring.
          </p>
          <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400">
            <span className="text-emerald-400">AUDIT STATUS:</span> Mismatched identities rejected before reaching React tree.
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <LuTerminal className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-white">Zero Client Secret Leakage</h3>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Verified that <code className="text-neutral-300">SUPABASE_SERVICE_ROLE_KEY</code>, Razorpay API secrets,
            and Better Auth private keys are strictly server-only. The Expo client bundle contains
            exclusively public identifier variables (<code className="text-emerald-400">EXPO_PUBLIC_*</code>),
            preventing reverse-engineering extraction.
          </p>
          <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 text-[11px] font-mono text-neutral-400">
            <span className="text-emerald-400">AUDIT STATUS:</span> Automated regex scans confirm zero hardcoded private tokens.
          </div>
        </div>
      </div>
    </section>
  );
};
