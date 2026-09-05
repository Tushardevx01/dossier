"use client";

import { nasalization } from "@/app/fonts";
import { LuSmartphone } from "react-icons/lu";

export const CarePulseResults = () => {
  return (
    <section id="results" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">15</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          MEASURABLE RESULTS
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Rather than citing fabricated benchmark numbers, CarePulse is measured by verified implementation evidence: complete architectural coverage across modern technologies, explicit finite state models, centralized validation boundaries, and fully responsive multi-device execution.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono">
        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">8+</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            CORE TECHNOLOGIES
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            Next.js 14, TypeScript, Appwrite, Tailwind CSS, shadcn/ui, Twilio, Sentry, and Vercel.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">3</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            APPOINTMENT STATES
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            Strict finite states: PENDING, SCHEDULED, and CANCELLED with zero ambiguous statuses.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">2</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            PRIMARY USER FLOWS
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            Patient onboarding/booking portal and administrative appointment management dashboard.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">3</div>
          <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
            VALIDATION BOUNDARIES
          </div>
          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            User identity layer, full clinical registration layer, and polymorphic appointment layer.
          </p>
        </div>
      </div>

      {/* Responsive Delivery Callout */}
      <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <LuSmartphone className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-white font-semibold block">FULLY RESPONSIVE ARCHITECTURE</span>
            <span className="text-neutral-500 text-[11px]">DESKTOP · TABLET · MOBILE</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-emerald-400 text-xs">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Form layouts adapt seamlessly across viewports</span>
        </div>
      </div>
    </section>
  );
};
