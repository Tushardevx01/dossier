"use client";

import { nasalization } from "@/app/fonts";

const SOLUTIONS = [
  {
    number: "01",
    title: "AUTHENTICATED CALL ACCESS",
    problem: "Public meeting URLs must not automatically expose video streams or admit unverified users.",
    constraint: "The application requires verified user identity and call membership state before allowing entry.",
    implementation: "Clerk user identity is evaluated alongside Stream call state in `app/(root)/meeting/[id]/page.tsx`, redirecting unauthenticated users and validating invited-member access.",
    result: "Meeting access is cryptographically evaluated before any media track connects or renders.",
  },
  {
    number: "02",
    title: "PRE-JOIN DEVICE CONTROL",
    problem: "Users entering meetings without testing cameras or microphones cause awkward disruptions.",
    constraint: "Device permissions must be queried and configured prior to joining the active call session.",
    implementation: "A dedicated `MeetingSetup` component provides a live `VideoPreview`, `DeviceSettings` dialog, and mic/camera toggles connected to Stream media controls.",
    result: "Users configure their audio/video hardware and join on their terms with clear visual confirmation.",
  },
  {
    number: "03",
    title: "DYNAMIC CALL PRESENTATION",
    problem: "A rigid video layout fails in diverse scenarios (team roundtables vs 1-on-many presentations).",
    constraint: "Layout changes must occur in-call without reconnecting media tracks or triggering layout thrashing.",
    implementation: "The `MeetingRoom` component maintains a layout state toggle, switching seamlessly between `PaginatedGridLayout`, `SpeakerLayout` (speaker-left), and `SpeakerLayout` (speaker-right).",
    result: "Participants change video topologies dynamically during an active call without media interruption.",
  },
];

export const FenixChallengeSolutions = () => {
  return (
    <section id="solutions" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          ENGINEERING CHALLENGES & SOLUTIONS
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Examining how core product requirements were broken down from architectural constraints into concrete implementations within the Fenix codebase.
        </p>
      </div>

      {/* Structured Solutions */}
      <div className="space-y-4 pt-2">
        {SOLUTIONS.map((s) => (
          <div
            key={s.number}
            className="p-5 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-3 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5">
              <span className="text-emerald-400 font-bold">{s.number} // SOLUTION PATTERN</span>
              <span className="text-white font-medium">{s.title}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-black border border-neutral-900 space-y-1">
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">PROBLEM</span>
                <p className="text-neutral-400 font-sans text-xs">{s.problem}</p>
              </div>

              <div className="p-3 rounded-lg bg-black border border-neutral-900 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">CONSTRAINT</span>
                <p className="text-neutral-400 font-sans text-xs">{s.constraint}</p>
              </div>

              <div className="p-3 rounded-lg bg-black border border-neutral-900 space-y-1">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">IMPLEMENTATION</span>
                <p className="text-neutral-400 font-sans text-xs">{s.implementation}</p>
              </div>

              <div className="p-3 rounded-lg bg-black border border-neutral-900 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">RESULT</span>
                <p className="text-neutral-300 font-sans text-xs font-medium">{s.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
