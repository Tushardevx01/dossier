"use client";

import { nasalization } from "@/app/fonts";

const CHALLENGES = [
  {
    number: "01",
    title: "AUTHENTICATED REAL-TIME ACCESS",
    tag: "IDENTITY & MEMBERSHIP GATING",
    description:
      "A meeting URL should not unconditionally expose video streams. Fenix verifies Clerk authentication before initializing the Stream Video client and evaluates call membership permissions to ensure only authorized participants enter invited meetings.",
  },
  {
    number: "02",
    title: "DEVICE STATE BEFORE JOIN",
    tag: "PRE-CALL HARDWARE PREVIEW",
    description:
      "Entering meetings with hot microphones or unverified cameras creates user friction. Fenix enforces a dedicated pre-join setup screen featuring camera preview, microphone mute toggles, and device selection dialogs before connecting to the call.",
  },
  {
    number: "03",
    title: "REAL-TIME CALL STATE SYNCHRONIZATION",
    tag: "LIFECYCLE AVAILABILITY",
    description:
      "The client cannot assume a meeting room is immediately available or active. The application inspects call state to cleanly handle loading states, future scheduled meetings, already-ended calls, and unauthorized access before rendering the room interface.",
  },
  {
    number: "04",
    title: "MULTIPLE CALL LAYOUTS",
    tag: "IN-CALL TOPOLOGY ADAPTATION",
    description:
      "Different collaboration scenarios demand different presentation modes. Fenix enables in-flight switching between Paginated Grid, Speaker Left, and Speaker Right layouts, adjusting video tile aspect ratios without dropping media connections.",
  },
];

export const FenixChallenges = () => {
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
          Real-time collaborative applications require engineering solutions for asynchronous connection states, hardware permission lifecycle, access control, and dynamic multi-participant UI presentation.
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
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{ch.tag}</span>
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
