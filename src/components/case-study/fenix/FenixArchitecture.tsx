"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const ARCHITECTURE_ASCII = `
                 ┌──────────────────────┐
                 │       USER           │
                 │   Browser / Client   │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │       NEXT.JS        │
                 │ App Router / React   │
                 └───────┬───────┬──────┘
                         │       │
             ┌───────────┘       └────────────┐
             ▼                                ▼
      ┌─────────────┐                  ┌──────────────┐
      │    CLERK    │                  │ STREAM VIDEO │
      │    AUTH     │                  │    CLIENT    │
      └──────┬──────┘                  └──────┬───────┘
             │                                │
             ▼                                ▼
      authenticated                  real-time session
         identity                         state
             │                                │
             └──────────────┬─────────────────┘
                            ▼
                   ┌─────────────────┐
                   │  MEETING ROOM   │
                   │                 │
                   │ Participants    │
                   │ Media Controls  │
                   │ Layout          │
                   │ Call State      │
                   └─────────────────┘
`;

const TOKEN_FLOW_ASCII = `
USER
  │
  ▼
Clerk Authentication
  │
  ▼
Server Action (tokenProvider)
  │
  ▼
Stream Node SDK (StreamClient)
  │
  ▼
Signed Stream Token (JWT)
  │
  ▼
Stream Video Client
  │
  ▼
Authenticated Call
`;

export const FenixArchitecture = () => {
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

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          The system unifies Clerk session identity with the Stream Video React SDK. Rather than embedding credentials in the browser, a custom Stream provider initializes the client with the authenticated Clerk user and a secure token provider. Server actions use the Stream Node SDK to issue short-lived cryptographic tokens, granting authenticated entry to the active meeting room.
        </p>
      </div>

      {/* Main Architecture ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="SYSTEM ARCHITECTURE & SESSION TOPOLOGY"
          badge="STREAM VIDEO CLIENT"
          content={ARCHITECTURE_ASCII}
          caption="Fig 3.1: Dual-track integration: Clerk provides authenticated user context while Stream Video Client maintains real-time participant and media states."
        />
      </div>

      {/* Token Issuance Flow */}
      <div className="pt-4 space-y-3">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          SERVER-SIDE TOKEN ISSUANCE PIPELINE
        </div>

        <AsciiDiagram
          title="CRYPTOGRAPHIC STREAM TOKEN FLOW"
          badge="SERVER ACTION // NODE SDK"
          content={TOKEN_FLOW_ASCII}
          caption="Fig 3.2: Authenticated token generation: Clerk user identity triggers server action tokenProvider, issuing a signed Stream token for call admission."
        />
      </div>

      {/* Implementation Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
        <div className="p-4 rounded-xl border border-neutral-900 bg-[#09090b] space-y-1.5">
          <div className="text-emerald-400 font-bold">STREAM CLIENT PROVIDER</div>
          <div className="text-white font-medium text-[11px]">StreamClientProvider.tsx</div>
          <p className="text-neutral-400 font-sans text-xs">
            Wraps the application tree in <code className="text-neutral-300">StreamVideoProvider</code>, configuring the client only when the Clerk user is fully loaded and verified.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-neutral-900 bg-[#09090b] space-y-1.5">
          <div className="text-emerald-400 font-bold">TOKEN ISSUANCE ACTION</div>
          <div className="text-white font-medium text-[11px]">actions/stream.actions.ts</div>
          <p className="text-neutral-400 font-sans text-xs">
            Instantiates <code className="text-neutral-300">StreamClient</code> with secret API credentials on the server to sign user tokens with an expiration timestamp.
          </p>
        </div>
      </div>
    </section>
  );
};
