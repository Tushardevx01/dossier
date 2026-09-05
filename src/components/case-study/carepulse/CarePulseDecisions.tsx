"use client";

import { nasalization } from "@/app/fonts";

const DECISIONS = [
  {
    number: "01",
    decision: "NEXT.JS 14 APP ROUTER",
    why: "Provides modern React component architecture with explicit server and client boundaries, native layout nesting, and file-based routing.",
    tradeoff:
      "Requires disciplined demarcation between server-side data loaders and interactive client components using the 'use client' directive.",
  },
  {
    number: "02",
    decision: "SERVER ACTIONS FOR MUTATIONS",
    why: "Keeps Appwrite SDK mutations and administrative API calls close to the server-side runtime, eliminating custom REST boilerplate and preventing credential leakage.",
    tradeoff:
      "Client components require structured state management (isSubmitting, form pending indicators) when triggering asynchronous mutations.",
  },
  {
    number: "03",
    decision: "APPWRITE BAAS INTEGRATION",
    why: "Delivers managed user authentication, document collections, encrypted document file storage, and SMS messaging relays without maintaining raw database infrastructure.",
    tradeoff:
      "Application queries and file access patterns are tightly coupled to Appwrite's document modeling conventions and SDK interfaces.",
  },
  {
    number: "04",
    decision: "CENTRALIZED ZOD SCHEMAS",
    why: "Guarantees strict runtime validation and automatic TypeScript type inference for complex clinical patient records and polymorphic appointment states.",
    tradeoff:
      "Form schemas must be strictly synchronized as product requirements, clinical fields, and consent rules expand.",
  },
  {
    number: "05",
    decision: "REACT HOOK FORM + SHADCN/UI",
    why: "Handles 20+ clinical inputs and masked fields without triggering unnecessary global re-renders, offering responsive keyboard navigation and immediate validation feedback.",
    tradeoff:
      "Requires explicit controlled wrappers (FormField, FormControl, FormItem) and integration adapters with the Zod resolver.",
  },
];

export const CarePulseDecisions = () => {
  return (
    <section id="decisions" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          TECHNICAL DECISIONS
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Architectural choices were made to optimize developer velocity, data integrity, and server-side security. Each technology selection represents a measured trade-off between infrastructure overhead and operational control.
        </p>
      </div>

      {/* Decisions List */}
      <div className="space-y-4 pt-2">
        {DECISIONS.map((d) => (
          <div
            key={d.number}
            className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-3"
          >
            <div className="flex items-center justify-between font-mono text-xs border-b border-neutral-900 pb-2.5">
              <span className="text-emerald-400 font-bold">{d.number} // ARCHITECTURAL DECISION</span>
              <span className="text-white font-medium">{d.decision}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-emerald-400/90 font-semibold block uppercase tracking-wider">
                  WHY THIS CHOICE
                </span>
                <p className="text-neutral-300 leading-relaxed">{d.why}</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[11px] text-amber-400/90 font-semibold block uppercase tracking-wider">
                  EVALUATED TRADE-OFF
                </span>
                <p className="text-neutral-400 leading-relaxed">{d.tradeoff}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
