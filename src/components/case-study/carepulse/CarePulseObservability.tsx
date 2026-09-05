"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const OBSERVABILITY_ASCII = `
USER ACTION
    │
    ▼
SERVER ACTION
    │
    ├───────────────┐
    │               │
 SUCCESS          ERROR
    │               │
    ▼               ▼
REVALIDATE       LOG ERROR
    │               │
    ▼               ▼
UPDATED UI       SENTRY
`;

export const CarePulseObservability = () => {
  return (
    <section id="observability" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">14</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          ERROR OBSERVABILITY
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Production resilience is maintained via dedicated Sentry integration configured for both server-side actions and client browser boundaries. Successful mutations trigger Next.js cache revalidation (<code className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">revalidatePath(&apos;/admin&apos;)</code>) to guarantee instant UI data synchronization, while runtime rejections or Appwrite API failures are captured and forwarded directly to Sentry.
        </p>
      </div>

      {/* ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="OBSERVABILITY & CACHE REVALIDATION PIPELINE"
          badge="TELEMETRY ARCHITECTURE"
          content={OBSERVABILITY_ASCII}
          caption="Fig 14.1: Branching error path: successful server actions trigger path revalidation for instant UI updates; mutation rejections log structured traces to Sentry."
        />
      </div>

      {/* Dual Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">CACHE INVALIDATION</div>
          <div className="text-white font-medium text-[11px]">revalidatePath(&apos;/admin&apos;)</div>
          <p className="text-neutral-400 font-sans text-xs">
            Ensures that administrative actions immediately refresh server-rendered table rows and stat counters without stale cache latency.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">EXCEPTION TELEMETRY</div>
          <div className="text-white font-medium text-[11px]">Sentry.captureException()</div>
          <p className="text-neutral-400 font-sans text-xs">
            Isolates unexpected third-party gateway failures (Twilio or Appwrite quota limits) with contextual request metadata and stack traces.
          </p>
        </div>
      </div>
    </section>
  );
};
