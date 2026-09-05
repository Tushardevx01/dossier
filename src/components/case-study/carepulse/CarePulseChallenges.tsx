"use client";

import { nasalization } from "@/app/fonts";

const CHALLENGES = [
  {
    number: "01",
    title: "MULTI-STEP PATIENT ONBOARDING",
    flow: "USER → PATIENT RECORD → APPOINTMENT",
    description:
      "Patient creation cannot be completed in a single flat form due to identity separation. The application coordinates user creation via Appwrite Users, transfers the generated userId to `/patients/[userId]/register`, and subsequently guides the verified patient to appointment booking.",
  },
  {
    number: "02",
    title: "COMPLEX HEALTHCARE FORM VALIDATION",
    flow: "CENTRALIZED ZOD SCHEMAS",
    description:
      "Clinical intake forms collect varied data types: RFC emails, E.164 phone formats, date-of-birth constraints, emergency contact relations, insurance policy strings, identification file buffers, and legal consent checkboxes. Centralized Zod schemas enforce strict runtime validation before submission.",
  },
  {
    number: "03",
    title: "POLYMORPHIC APPOINTMENT STATE MANAGEMENT",
    flow: "CREATE · SCHEDULE · CANCEL",
    description:
      "A single unified AppointmentForm modal services create, schedule, and cancel workflows. The component dynamically swaps validation schemas, toggles input visibility (cancellation justification vs appointment schedule time), and reconfigures submit actions based on the active modal mode.",
  },
  {
    number: "04",
    title: "EXTERNAL SERVICE COORDINATION",
    flow: "NEXT.JS + APPWRITE + TWILIO + SENTRY",
    description:
      "Mutations require synchronizing Next.js App Router, Appwrite document collections, file storage buckets, Twilio SMS message relays, Sentry telemetry, and Vercel hosting—ensuring failed external dispatches are surfaced cleanly without leaving corrupted or orphaned records.",
  },
];

export const CarePulseChallenges = () => {
  return (
    <section id="challenges" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          ENGINEERING CHALLENGES
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Full-stack product engineering demands solving concrete integration friction: managing multi-step onboarding pipelines, centralizing dense healthcare validation rules, designing polymorphic form states, and orchestrating external BaaS services reliably.
        </p>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {CHALLENGES.map((ch) => (
          <div
            key={ch.number}
            className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-3 relative group hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-emerald-400 font-bold">{ch.number} // CHALLENGE</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{ch.flow}</span>
            </div>

            <h3 className="text-sm font-semibold text-white font-mono tracking-tight">{ch.title}</h3>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              {ch.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
