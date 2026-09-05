"use client";

import { nasalization } from "@/app/fonts";

const FEATURES = [
  {
    action: "CREATE",
    label: "Instant Meetings",
    description: "Generates an immediate call with a unique UUID, initializes Stream state, and routes directly to setup.",
  },
  {
    action: "JOIN",
    label: "Meeting ID / URL",
    description: "Accepts a shareable link or meeting ID input, queries call availability, and checks user authorization.",
  },
  {
    action: "SCHEDULE",
    label: "Future Scheduled Calls",
    description: "Configures start time, date, and description, saving the meeting to the user's scheduled dashboard list.",
  },
  {
    action: "SETUP",
    label: "Hardware Configuration",
    description: "Live camera video preview, device selection, and mic/camera toggle before joining the active call.",
  },
  {
    action: "CALL",
    label: "Real-Time Audio/Video",
    description: "Interactive real-time media streams with automatic speaking indicators and active participant tracking.",
  },
  {
    action: "LAYOUT",
    label: "Dynamic Presentation",
    description: "Toggles live between equal-weight Grid view, Speaker Left view, and Speaker Right view without reconnecting.",
  },
  {
    action: "PARTICIPANTS",
    label: "Member Drawer",
    description: "Opens a sidebar listing all connected participants with mute indicators and membership status.",
  },
  {
    action: "STATS",
    label: "Call Diagnostics",
    description: "Provides network latency, resolution, bitrate, and packet loss diagnostics for technical troubleshooting.",
  },
  {
    action: "RECORDINGS",
    label: "Meeting Recordings",
    description: "Surfaces past meeting recordings stored via Stream Video for asynchronous review.",
  },
];

export const FenixFeatures = () => {
  return (
    <section id="features" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          WHAT THE SYSTEM ACTUALLY DOES
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The meeting management interface supports four primary home actions (New Meeting, Join Meeting, Schedule Meeting, View Recordings) paired with an active in-call suite of controls.
        </p>
      </div>

      {/* Feature Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        {FEATURES.map((f) => (
          <div
            key={f.action}
            className="p-4 rounded-xl border border-neutral-800/80 bg-[#09090b] space-y-1.5 hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold tracking-wider">{f.action}</span>
              <span className="text-white font-medium text-[11px]">{f.label}</span>
            </div>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed pt-1">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
