"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const ADMIN_FLOW_ASCII = `
ADMIN ACCESS
     │
     ▼
PASSKEY VERIFICATION
     │
     ▼
ADMIN DASHBOARD
     │
     ├── Scheduled
     ├── Pending
     └── Cancelled
              │
              ▼
        APPOINTMENT TABLE
              │
        ┌─────┴─────┐
        ▼           ▼
     SCHEDULE     CANCEL
        │           │
        └─────┬─────┘
              ▼
        SMS NOTIFICATION
`;

export const CarePulseAdminFlow = () => {
  return (
    <section id="admin-flow" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">13</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          ADMIN CONTROL FLOW
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Administrative operations are managed through an aggregated dashboard protected by a six-digit OTP passkey interface (<code className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">PasskeyModal.tsx</code>) that stores an encrypted access key in <code className="text-neutral-300 font-mono text-xs">localStorage</code>. Once verified, the dashboard fetches recent appointments using Appwrite Database queries, displays live counter cards for scheduled, pending, and cancelled statuses, and presents an interactive appointment table with inline schedule and cancel modals.
        </p>
      </div>

      {/* ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="ADMIN DASHBOARD & APPOINTMENT TRIAGE FLOW"
          badge="CONTROL INTERACTION"
          content={ADMIN_FLOW_ASCII}
          caption="Fig 13.1: Passkey-gated administrative flow: passkey challenge unlocks live appointment aggregation, status counters, table management, and SMS update triggers."
        />
      </div>

      {/* Dashboard Subsystems */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1.5">
          <div className="text-emerald-400 font-bold">PASSKEY GATEWAY</div>
          <div className="text-white font-medium text-[11px]">PasskeyModal.tsx</div>
          <p className="text-neutral-400 font-sans text-xs">
            A six-digit PIN dialog verifying administrative authorization. Accurately implemented as a project passkey gate without claiming enterprise identity federation.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1.5">
          <div className="text-emerald-400 font-bold">STAT AGGREGATION</div>
          <div className="text-white font-medium text-[11px]">StatCard.tsx</div>
          <p className="text-neutral-400 font-sans text-xs">
            Fetches all appointments via <code className="text-neutral-300">getRecentAppointmentList()</code> and tallies counts for <code className="text-neutral-300">scheduledCount</code>, <code className="text-neutral-300">pendingCount</code>, and <code className="text-neutral-300">cancelledCount</code>.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1.5">
          <div className="text-emerald-400 font-bold">TABLE MODAL ACTIONS</div>
          <div className="text-white font-medium text-[11px]">AppointmentModal.tsx</div>
          <p className="text-neutral-400 font-sans text-xs">
            Embeds interactive schedule and cancel actions directly inside appointment rows, opening the polymorphic form with pre-populated patient data.
          </p>
        </div>
      </div>
    </section>
  );
};
