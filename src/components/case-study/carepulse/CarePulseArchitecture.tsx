"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const ARCHITECTURE_ASCII = `
                    CAREPULSE
                       │
             ┌─────────┴─────────┐
             │                   │
        PATIENT UI          ADMIN DASHBOARD
             │                   │
             └─────────┬─────────┘
                       ▼
                  NEXT.JS 14
                       │
             ┌─────────┼─────────┐
             │         │         │
             ▼         ▼         ▼
          FORMS    SERVER      ROUTING
                   ACTIONS
                       │
                       ▼
                   APPWRITE
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
        USERS       DATABASE      STORAGE
                       │
                       ▼
                 APPOINTMENTS
                       │
                       ▼
                  MESSAGING
                       │
                       ▼
                     SMS
`;

export const CarePulseArchitecture = () => {
  return (
    <section id="architecture" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <span className="text-xs font-mono text-emerald-400 font-bold">03</span>
        <span className="text-neutral-600 font-mono text-xs">//</span>
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          ARCHITECTURE & DATA FLOW
        </h2>
      </div>

      {/* Description */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          CarePulse is architected around a unified Next.js 14 App Router application paired with Appwrite managed backend services. Rather than deploying artificial microservices, the system couples server actions directly to Appwrite SDK initializers, handling user identity, document database records, secure file storage, and Twilio-backed SMS messaging through explicit server-side boundaries.
        </p>
      </div>

      {/* Main ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="CAREPULSE SYSTEM ARCHITECTURE"
          badge="TOPOLOGY // NEXT.JS + APPWRITE"
          content={ARCHITECTURE_ASCII}
          caption="Fig 3.1: Structural topology connecting client interfaces (Patient & Admin) to Next.js 14 server actions, Appwrite BaaS primitives, and Twilio SMS gateways."
        />
      </div>

      {/* Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            01 / INTERFACE BOUNDARY
          </div>
          <h3 className="text-sm font-semibold text-white font-mono">Patient Portal & Admin Gate</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Patients access multi-step registration and appointment booking. Administrators authenticate via a passkey modal to access global scheduling tables and action dialogs.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            02 / COMPUTATION BOUNDARY
          </div>
          <h3 className="text-sm font-semibold text-white font-mono">Next.js 14 Server Actions</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            All database writes, document uploads, and notification calls execute inside server actions. Appwrite secret credentials and Twilio API keys never touch the client browser.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            03 / PERSISTENCE BOUNDARY
          </div>
          <h3 className="text-sm font-semibold text-white font-mono">Appwrite Service Engine</h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Appwrite provides managed storage buckets for patient IDs, document collections for patient & appointment states, and the messaging bridge triggering automated SMS dispatch.
          </p>
        </div>
      </div>
    </section>
  );
};
