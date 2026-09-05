"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const LIFECYCLE_ASCII = `
CREATE
  │
  ▼
GET / CREATE CALL
  │
  ▼
MEETING ID
  │
  ▼
MEETING URL
  │
  ▼
ACCESS CHECK
  │
  ▼
DEVICE SETUP
  │
  ▼
JOIN
  │
  ▼
ACTIVE CALL
  │
  ├── GRID
  ├── SPEAKER LEFT
  ├── SPEAKER RIGHT
  ├── PARTICIPANTS
  └── CALL STATS
  │
  ▼
LEAVE / END
`;

export const FenixMeetingLifecycle = () => {
  return (
    <section id="lifecycle" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          MEETING LIFECYCLE
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Fenix manages the meeting lifecycle through explicit setup and active stages. Calls are initialized with the Stream client, generating unique meeting IDs, shareable meeting URLs, and scheduled start times. Before entering the room, access permissions and device hardware are validated, enabling seamless entry into active call layouts.
        </p>
      </div>

      {/* ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="MEETING LIFECYCLE & ACTIVE CALL PHASES"
          badge="LIFECYCLE TOPOLOGY"
          content={LIFECYCLE_ASCII}
          caption="Fig 4.1: End-to-end meeting lifecycle from initial call creation, URL generation, and device setup through dynamic active layouts to graceful exit."
        />
      </div>

      {/* Active Call Sub-Components */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">DYNAMIC LAYOUTS</div>
          <div className="text-white font-medium text-[11px]">PaginatedGrid & SpeakerLayout</div>
          <p className="text-neutral-400 font-sans text-xs">
            Users can toggle on the fly between equal-weight grid tiles and speaker-focused layouts with participant sidebars.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">PARTICIPANTS PANEL</div>
          <div className="text-white font-medium text-[11px]">CallParticipantsList</div>
          <p className="text-neutral-400 font-sans text-xs">
            Displays connected users, active speaking indicators, individual mute states, and connection quality indicators.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-neutral-900 bg-[#09090b] space-y-1">
          <div className="text-emerald-400 font-bold">CALL DIAGNOSTICS</div>
          <div className="text-white font-medium text-[11px]">CallStatsButton</div>
          <p className="text-neutral-400 font-sans text-xs">
            Surfaces real-time network latency, video bitrate, frame rates, and packet loss metrics directly within the UI.
          </p>
        </div>
      </div>
    </section>
  );
};
