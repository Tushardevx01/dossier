"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { mono, nasalization } from "@/app/fonts";

const metrics = [
    { key: "uptime", label: "Service Uptime", value: "99.97%", note: "Last 30 days" },
    { key: "latency", label: "P95 Latency", value: "182ms", note: "API gateway" },
    { key: "rollback", label: "Rollback Window", value: "26s", note: "Blue/green" },
    { key: "deploys", label: "Deploy Frequency", value: "14/day", note: "Automated" },
];

const deploymentStages = [
    { name: "Commit", status: "done" },
    { name: "Build", status: "done" },
    { name: "Tests", status: "done" },
    { name: "Deploy", status: "active" },
    { name: "Verify", status: "pending" },
];

type LogLevel = "INFO" | "SUCCESS" | "WARN" | "ERROR";

const logLines = [
    { time: "23:14:01", level: "INFO", msg: "Release train #482 initialized" },
    { time: "23:14:06", level: "SUCCESS", msg: "Container image published (sha256:fa91...)" },
    { time: "23:14:10", level: "WARN", msg: "Read replica lag spiked to 190ms" },
    { time: "23:14:13", level: "INFO", msg: "Health probes stable across 6 regions" },
    { time: "23:14:15", level: "ERROR", msg: "Canary error rate crossed 1.2% threshold" },
    { time: "23:14:19", level: "SUCCESS", msg: "Auto-rollback completed · traffic normalized" },
] as Array<{ time: string; level: LogLevel; msg: string }>;

const levelClasses: Record<LogLevel, string> = {
    INFO: "text-blue-300 border-blue-400/25 bg-blue-500/10",
    SUCCESS: "text-emerald-300 border-emerald-400/25 bg-emerald-500/10",
    WARN: "text-amber-300 border-amber-400/25 bg-amber-500/10",
    ERROR: "text-rose-300 border-rose-400/25 bg-rose-500/10",
};

const stageClasses: Record<"done" | "active" | "pending", string> = {
    done: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
    active: "text-sky-300 border-sky-400/30 bg-sky-500/10",
    pending: "text-neutral-400 border-neutral-700 bg-neutral-800/40",
};

export const DevOps = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px", amount: 0.15 });

    return (
        <section id="devops" ref={ref} className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <motion.div
                    className="mb-12 space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        className={`${nasalization.className} text-3xl sm:text-4xl md:text-5xl font-bold`}
                        style={{ color: "hsl(var(--foreground))" }}
                    >
                        Production Control{" "}
                        <span style={{ color: "hsl(var(--primary) / 0.85)" }}>
                            Center.
                        </span>
                    </h2>
                    <p
                        className={`${mono.className} text-sm`}
                        style={{ color: "hsl(var(--foreground) / 0.45)" }}
                    >
                        Live deployment telemetry, resilient rollout control, and system-state visibility.
                    </p>
                </motion.div>

                {/* Control center */}
                <motion.div
                    className="relative rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur-sm p-4 sm:p-5 lg:p-6"
                    style={{
                        boxShadow:
                            "0 0 0 1px hsl(var(--glass-border) / 0.28), 0 0 36px hsl(var(--accent) / 0.08)",
                    }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
                >
                    <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.35fr] gap-5 lg:gap-6">
                        {/* Left column: metrics + health */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                            transition={{ duration: 0.55, delay: 0.25 }}
                            className="space-y-4"
                        >
                            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className={`${mono.className} text-[11px] uppercase tracking-wider text-neutral-400`}>
                                            Fleet Status
                                        </p>
                                        <p className={`${nasalization.className} text-2xl sm:text-3xl text-white mt-2`}>
                                            Operational
                                        </p>
                                        <p className={`${mono.className} text-xs text-neutral-500 mt-2`}>
                                            Global uptime across production regions
                                        </p>
                                    </div>

                                    <div className="relative mt-1">
                                        <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
                                        <span className="relative block h-3 w-3 rounded-full bg-emerald-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {metrics.map((metric) => (
                                    <div key={metric.key} className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-3.5">
                                        <p className={`${mono.className} text-[10px] uppercase tracking-wider text-neutral-500`}>
                                            {metric.label}
                                        </p>
                                        <p className={`${nasalization.className} text-xl text-white mt-1.5`}>
                                            {metric.value}
                                        </p>
                                        <p className={`${mono.className} text-[11px] text-neutral-500 mt-1`}>
                                            {metric.note}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-3.5">
                                <p className={`${mono.className} text-[10px] uppercase tracking-wider text-neutral-500 mb-3`}>
                                    Status Classifier
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {(Object.keys(levelClasses) as LogLevel[]).map((level) => (
                                        <span
                                            key={level}
                                            className={`${mono.className} text-[10px] px-2.5 py-1 rounded border font-medium tracking-wide ${levelClasses[level]}`}
                                        >
                                            {level}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right column: deployment monitor */}
                        <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                            transition={{ duration: 0.55, delay: 0.32 }}
                            className="rounded-xl border border-neutral-800 bg-neutral-950/75 overflow-hidden"
                        >
                            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-800">
                                <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <p className={`${mono.className} text-[11px] uppercase tracking-wider text-neutral-300`}>
                                        Live Deployment Monitor
                                    </p>
                                </div>
                                <p className={`${mono.className} text-[11px] text-neutral-500`}>prod-eu-west-1</p>
                            </div>

                            <div className="px-4 py-4 border-b border-neutral-800">
                                <p className={`${mono.className} text-[10px] uppercase tracking-wider text-neutral-500 mb-3`}>
                                    Pipeline
                                </p>

                                <div className="flex flex-col md:flex-row md:items-center md:flex-wrap gap-2">
                                    {deploymentStages.map((stage, index) => (
                                        <div key={stage.name} className="flex items-center gap-2">
                                            <span
                                                className={`${mono.className} text-[10px] px-2.5 py-1 rounded-md border ${stageClasses[stage.status as "done" | "active" | "pending"]}`}
                                            >
                                                {stage.status === "done" ? "✓" : stage.status === "active" ? "▶" : "…"} {stage.name}
                                            </span>

                                            {index < deploymentStages.length - 1 && (
                                                <>
                                                    <span className="hidden md:block h-px w-6 bg-neutral-700" />
                                                    <span className="md:hidden block h-4 w-px bg-neutral-700 ml-3" />
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="px-4 py-4 bg-black/40">
                                <p className={`${mono.className} text-[10px] uppercase tracking-wider text-neutral-500 mb-3`}>
                                    Runtime Logs
                                </p>
                                <div className="rounded-lg border border-neutral-800 bg-black/70 p-3 space-y-2.5">
                                    {logLines.map((line, index) => (
                                        <motion.div
                                            key={`${line.time}-${line.level}-${index}`}
                                            className={`${mono.className} text-[11px] flex items-start gap-2.5`}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                                            transition={{ duration: 0.25, delay: 0.42 + index * 0.06 }}
                                        >
                                            <span className="text-neutral-500 shrink-0">{line.time}</span>
                                            <span className="text-neutral-600 shrink-0">›</span>
                                            <span
                                                className={`${mono.className} text-[10px] px-2 py-0.5 rounded border shrink-0 ${levelClasses[line.level]}`}
                                            >
                                                {line.level}
                                            </span>
                                            <span className="text-neutral-300 leading-relaxed">{line.msg}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
