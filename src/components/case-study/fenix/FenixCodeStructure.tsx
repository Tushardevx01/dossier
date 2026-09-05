"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const CODE_STRUCTURE_ASCII = `
Fenix
│
├── app/
│   ├── (auth)/              # Clerk sign-in & sign-up flows
│   ├── (root)/
│   │   ├── meeting/[id]/    # Core meeting route with access gates
│   │   └── (home)/          # Home dashboard, previous, upcoming, recordings
│   └── layout.tsx           # Global StreamClientProvider & ClerkProvider
│
├── components/
│   ├── MeetingRoom.tsx      # Active meeting room, layouts, & participants
│   ├── MeetingSetup.tsx     # Pre-join camera/mic preview & setup
│   ├── MeetingModal.tsx     # Reusable dialog for instant/scheduled calls
│   └── CallList.tsx         # Tabbed previous, upcoming, and recording lists
│
├── hooks/
│   ├── useGetCalls.ts       # Custom hook fetching previous, upcoming, & recorded calls
│   └── useGetCallById.ts    # Custom hook fetching active call metadata & state
│
├── actions/
│   └── stream.actions.ts    # Server action generating signed Stream tokens
│
├── providers/
│   └── StreamClientProvider.tsx # Injects StreamVideoClient into React context
│
└── lib/
    └── utils.ts             # Styling helpers and class merging
`;

export const FenixCodeStructure = () => {
  return (
    <section id="structure" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          ENGINEERING STRUCTURE
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The Fenix codebase is structured as a modular full-stack application, cleanly separating route handlers, UI components, custom reactive hooks, server actions, and SDK providers rather than overloading single files.
        </p>
      </div>

      {/* Code Structure ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="REPOSITORY CODEBASE ORGANIZATION"
          badge="DIRECTORY HIERARCHY"
          content={CODE_STRUCTURE_ASCII}
          caption="Fig 12.1: Codebase architecture: isolating authentication, meeting routes, custom call hooks, server actions, and provider contexts."
        />
      </div>
    </section>
  );
};
