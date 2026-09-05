"use client";

import { nasalization } from "@/app/fonts";
import { AsciiDiagram } from "../AsciiDiagram";

const PROBLEM_ASCII = `
AUTHENTICATE
      ↓
CREATE / JOIN ROOM
      ↓
VERIFY ACCESS
      ↓
DEVICE SETUP
      ↓
JOIN CALL
      ↓
MANAGE PARTICIPANTS
      ↓
CONTROL MEDIA
      ↓
END / EXIT SESSION
`;

export const FenixProblem = () => {
  return (
    <section id="problem" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-900">
        <h2 className={`${nasalization.className} text-xl sm:text-2xl font-bold tracking-tight text-white uppercase`}>
          THE PROBLEM
        </h2>
      </div>

      {/* Narrative */}
      <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
        <p>
          Building a video calling interface is not only about rendering a video grid. The application must coordinate authenticated user identity, meeting creation, room membership verification, camera and microphone hardware setup, participant presence, dynamic call layouts, and real-time media transport while remaining responsive across devices.
        </p>
      </div>

      {/* ASCII Diagram */}
      <div className="pt-2">
        <AsciiDiagram
          title="MEETING LIFECYCLE & COORDINATION PIPELINE"
          badge="PROBLEM TOPOLOGY"
          content={PROBLEM_ASCII}
          caption="Fig 1.1: Multi-stage pipeline coordinating identity validation, pre-join device configuration, active call management, and graceful session termination."
        />
      </div>

      {/* Key Coordination Pillars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <span className="text-emerald-400 font-bold">IDENTITY</span>
          <p className="text-neutral-400 text-[11px] mt-1 font-sans">Cryptographically verified Clerk user sessions and access tokens.</p>
        </div>
        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <span className="text-emerald-400 font-bold">DEVICE STATE</span>
          <p className="text-neutral-400 text-[11px] mt-1 font-sans">Pre-join hardware evaluation with camera and microphone controls.</p>
        </div>
        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <span className="text-emerald-400 font-bold">CALL TOPOLOGY</span>
          <p className="text-neutral-400 text-[11px] mt-1 font-sans">Seamless in-call switching between Grid and Speaker presentation modes.</p>
        </div>
        <div className="p-3 rounded-lg border border-neutral-900 bg-[#09090b]">
          <span className="text-emerald-400 font-bold">PARTICIPANTS</span>
          <p className="text-neutral-400 text-[11px] mt-1 font-sans">Real-time presence tracking, speaking indicators, and call statistics.</p>
        </div>
      </div>
    </section>
  );
};
