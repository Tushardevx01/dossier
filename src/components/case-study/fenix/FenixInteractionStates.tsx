"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const INTERACTION_STATES_ASCII = `
                    ┌─────────────┐
                    │ AUTHENTICATE│
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │ CALL LOADING│
                    └──────┬──────┘
                           ▼
                 ┌────────────────────┐
                 │ ACCESS VALIDATION  │
                 └─────────┬──────────┘
                           ▼
                    ┌─────────────┐
                    │    SETUP    │
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │    JOIN     │
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │    ACTIVE   │
                    └──────┬──────┘
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
             LEAVE                  END
                │                     │
                └──────────┬──────────┘
                           ▼
                         EXIT
`;

const ACTIVE_STATE_ASCII = `
ACTIVE CALL SESSION
 ├── Video (Camera toggle & preview feed)
 ├── Audio (Microphone mute & speaking indicator)
 ├── Participants (Drawer list & member presence)
 ├── Layout (Grid, Speaker Left, Speaker Right)
 ├── Statistics (Bitrate, latency, resolution stats)
 └── End Call (Leave room or terminate for all)
`;

export const FenixInteractionStates = () => {
  return (
    <section id="states" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          SYSTEM INTERACTION STATES
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The meeting room is modeled as an explicit state machine that steps from authentication verification through call discovery, access validation, and hardware configuration into the active meeting session before exiting cleanly.
        </p>
      </div>

      {/* State Machine ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="MEETING STATE MACHINE"
          badge="STATE TRANSITION ENGINE"
          content={INTERACTION_STATES_ASCII}
          caption="Fig 9.1: Deterministic state progression: enforcing authentication and hardware setup before transitioning to active media streams."
        />
      </div>

      {/* Active State Sub-Tree */}
      <div className="pt-4 space-y-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          ACTIVE CALL SUB-CAPABILITIES
        </div>

        <AsciiDiagram
          title="ACTIVE STATE CONTROL GRAPH"
          badge="IN-CALL TOPOLOGY"
          content={ACTIVE_STATE_ASCII}
          caption="Fig 9.2: Sub-state controls available once the call enters the ACTIVE state."
        />
      </div>
    </section>
  );
};
