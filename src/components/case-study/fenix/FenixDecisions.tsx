"use client";

import { nasalization } from "@/app/fonts";

const DECISIONS = [
  {
    number: "01",
    decision: "CLERK AUTHENTICATION",
    why: "Delegates user identity, session management, and social logins rather than implementing custom credential databases and session refresh flows.",
    tradeoff:
      "The platform becomes dependent on an external identity provider and its token lifecycles.",
  },
  {
    number: "02",
    decision: "STREAM VIDEO SDK",
    why: "Leverages specialized real-time media infrastructure rather than building WebRTC signaling, STUN/TURN traversal, and SFU selective forwarding from scratch.",
    tradeoff:
      "The application architecture and meeting state models are coupled to the Stream Video SDK API contracts.",
  },
  {
    number: "03",
    decision: "NEXT.JS 14 APP ROUTER",
    why: "Consolidates page routing, layout nesting, server actions for token issuance, and client React trees in a single unified TypeScript framework.",
    tradeoff:
      "Requires explicit management of 'use client' directives and boundary isolation for real-time components.",
  },
  {
    number: "04",
    decision: "COMPONENTIZED CALL ARCHITECTURE",
    why: "Isolates meeting setup (`MeetingSetup`), room orchestration (`MeetingRoom`), layout selectors, participant drawers, and modal dialogs into modular components.",
    tradeoff:
      "Requires careful coordination of multi-level component state and SDK hook subscribers.",
  },
];

export const FenixDecisions = () => {
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
          Key engineering decisions focused on delegating complex infrastructure primitives (identity, real-time media transport) so engineering effort could be directed toward meeting lifecycle management, device controls, and call UX.
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
