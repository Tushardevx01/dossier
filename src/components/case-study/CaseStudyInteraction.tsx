"use client";

import { nasalization, mono } from "@/app/fonts";
import { AsciiDiagram } from "./AsciiDiagram";
import { motion, useReducedMotion } from "motion/react";

const JOB_LIFECYCLE_ASCII = `
                     JOB
                      │
                      ▼
                   PENDING
                      │
                 scheduler
                      ▼
                   ASSIGNED
                      │
                  agent claim
                      ▼
                   RUNNING
                      │
             ┌────────┴────────┐
             ▼                 ▼
          SUCCESS             FAILURE
             │                 │
             │            retry budget
             │                 │
             │        ┌────────┴────────┐
             │        ▼                 ▼
             │     PENDING            FAILED
             │
             ▼
           EVENT
`;

const NODE_RELATIONSHIP_ASCII = `
NODE ONLINE
     │
 heartbeat
     │
     ▼
NODE OFFLINE
     │
     ▼
JOB RECOVERY
     │
     ▼
RE-SCHEDULE
`;

export const CaseStudyInteraction = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="interaction" className="scroll-mt-28 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="space-y-2 pb-3 border-b border-neutral-900">
        <span className={`${mono.className} text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold block`}>
          13 // SYSTEM INTERACTION STATES
        </span>
        <h2 className={`${nasalization.className} text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight`}>
          SYSTEM INTERACTION STATES
        </h2>
      </div>

      <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-3xl leading-relaxed">
        Combined cluster lifecycle linking job state machines to node heartbeat availability. Node disappearance directly feeds into job recovery and rescheduling loops.
      </p>

      {/* Dual ASCII: Combined Lifecycle & Node Relationship */}
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0.8 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1"
      >
        <AsciiDiagram
          title="JOB LIFECYCLE & RETRY BUDGET"
          badge="WORKLOAD STATE MACHINE"
          content={JOB_LIFECYCLE_ASCII}
          caption="State machine transitions evaluated on every polling interval and worker result submission."
        />
        <AsciiDiagram
          title="NODE OFFLINE RECOVERY RELATIONSHIP"
          badge="SUPERVISION RECOVERY"
          content={NODE_RELATIONSHIP_ASCII}
          caption="Heartbeat lapse triggers offline state, re-claiming orphaned jobs back into the scheduler pool."
        />
      </motion.div>
    </section>
  );
};
