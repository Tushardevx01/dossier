"use client";

import { motion } from "motion/react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import { mono, nasalization } from "@/app/fonts";
import { DevopsMetrics } from "@/components/sections/devops/DevopsMetrics";
import { DevopsRuntimePanel } from "@/components/sections/devops/DevopsRuntimePanel";
import { useSystemStatus } from "@/hooks/useSystemStatus";

export const DevOps = () => {
  const { ref, isInView } = useScrollAnimation({ once: true, margin: "-80px", amount: 0.15 });
  const { telemetry, logs } = useSystemStatus();

  return (
    <section id="devops" ref={ref} className="py-24 relative overflow-hidden control-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-12 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`${nasalization.className} text-3xl sm:text-4xl md:text-5xl font-bold`} style={{ color: "hsl(var(--foreground))" }}>
            Production Control <span style={{ color: "hsl(var(--primary) / 0.85)" }}>Center.</span>
          </h2>
          <p className={`${mono.className} text-sm`} style={{ color: "hsl(var(--foreground) / 0.45)" }}>
            Live System Dashboard • deployment telemetry, incident traces, and service-state visibility.
          </p>
        </motion.div>

        <motion.div
          className="panel-shell rounded-2xl p-4 sm:p-5 lg:p-6"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 xl:grid-cols-[1.02fr_1.18fr] gap-5 lg:gap-6">
            <DevopsMetrics telemetry={telemetry} />
            <DevopsRuntimePanel logs={logs} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
