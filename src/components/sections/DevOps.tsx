"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { mono, nasalization } from "@/app/fonts";

const metrics = [
    { key: "uptime", label: "Uptime SLA", value: "99.97%", badge: "STABLE" },
    { key: "deploys", label: "Deployments", value: "CI/CD", badge: "AUTOMATED" },
    { key: "rollback", label: "Rollback Time", value: "< 30s", badge: "FAST" },
];

const pipelineSteps = [
    { name: "git push", status: "done" },
    { name: "build", status: "done" },
    { name: "test", status: "done" },
    { name: "containerize", status: "done" },
    { name: "deploy", status: "live" },
];

const logLines = [
    { time: "21:04:01", level: "INFO", msg: "Build started — commit a1f3d9c" },
    { time: "21:04:08", level: "INFO", msg: "Docker image built successfully" },
    { time: "21:04:12", level: "INFO", msg: "Health check passed — /api/health 200" },
    { time: "21:04:14", level: "SUCC", msg: "Deployed to production ✓" },
    { time: "21:04:15", level: "INFO", msg: "Monitoring active · 0 alerts" },
];

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
                        className={`${nasalization.className} text-4xl md:text-5xl font-bold`}
                        style={{ color: "hsl(var(--foreground))" }}
                    >
                        Infrastructure that{" "}
                        <span style={{ color: "hsl(var(--primary) / 0.85)" }}>
                            doesn't sleep.
                        </span>
                    </h2>
                    <p
                        className={`${mono.className} text-sm`}
                        style={{ color: "hsl(var(--foreground) / 0.45)" }}
                    >
                        Reliability isn't an afterthought. It's the foundation.
                    </p>
                </motion.div>

                {/* Metrics row */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    {metrics.map((m) => (
                        <div
                            key={m.key}
                            className="tech-grid-card flex items-center justify-between"
                        >
                            <div>
                                <p
                                    className={`${mono.className} text-xs mb-1`}
                                    style={{ color: "hsl(var(--foreground) / 0.38)" }}
                                >
                                    {m.label}
                                </p>
                                <p
                                    className={`${nasalization.className} text-2xl font-bold`}
                                    style={{ color: "hsl(var(--foreground))" }}
                                >
                                    {m.value}
                                </p>
                            </div>
                            <span
                                className={`${mono.className} text-[0.6rem] px-2 py-1 rounded-full font-medium tracking-wide`}
                                style={{
                                    background: "hsl(145 60% 30% / 0.15)",
                                    border: "1px solid hsl(145 50% 35% / 0.4)",
                                    color: "hsl(145 60% 55%)",
                                }}
                            >
                                {m.badge}
                            </span>
                        </div>
                    ))}
                </motion.div>

                {/* Dashboard mockup */}
                <motion.div
                    className="devops-container"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                >
                    {/* Top bar */}
                    <div
                        className="flex items-center justify-between px-5 py-3 border-b"
                        style={{ borderColor: "hsl(210 25% 15% / 0.6)" }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full" style={{ background: "hsl(0 60% 45% / 0.7)" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "hsl(40 60% 45% / 0.7)" }} />
                                <div className="w-3 h-3 rounded-full" style={{ background: "hsl(145 60% 40% / 0.7)" }} />
                            </div>
                            <p
                                className={`${mono.className} text-xs ml-3`}
                                style={{ color: "hsl(var(--foreground) / 0.35)" }}
                            >
                                deployment-pipeline · production
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ background: "hsl(145 60% 55%)" }}
                            />
                            <p
                                className={`${mono.className} text-xs`}
                                style={{ color: "hsl(145 60% 55%)" }}
                            >
                                LIVE
                            </p>
                        </div>
                    </div>

                    {/* Pipeline steps */}
                    <div
                        className="px-5 py-4 border-b flex flex-wrap gap-3 items-center"
                        style={{ borderColor: "hsl(210 25% 15% / 0.6)" }}
                    >
                        {pipelineSteps.map((step, i) => (
                            <div key={step.name} className="flex items-center gap-2">
                                <div
                                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md ${mono.className} text-xs`}
                                    style={{
                                        background:
                                            step.status === "live"
                                                ? "hsl(145 60% 30% / 0.15)"
                                                : "hsl(210 40% 20% / 0.2)",
                                        border:
                                            step.status === "live"
                                                ? "1px solid hsl(145 50% 35% / 0.4)"
                                                : "1px solid hsl(210 25% 22% / 0.5)",
                                        color:
                                            step.status === "live"
                                                ? "hsl(145 60% 55%)"
                                                : "hsl(var(--foreground) / 0.55)",
                                    }}
                                >
                                    {step.status === "done" ? "✓" : "▶"} {step.name}
                                </div>
                                {i < pipelineSteps.length - 1 && (
                                    <span style={{ color: "hsl(210 30% 30% / 0.5)" }}>→</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Log output */}
                    <div className="px-5 py-4 space-y-2">
                        {logLines.map((line, i) => (
                            <motion.div
                                key={i}
                                className={`${mono.className} text-xs flex items-start gap-3`}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + i * 0.08 }}
                            >
                                <span style={{ color: "hsl(var(--foreground) / 0.25)", flexShrink: 0 }}>
                                    {line.time}
                                </span>
                                <span
                                    className="px-1.5 rounded text-[0.6rem] flex-shrink-0 font-medium"
                                    style={{
                                        background:
                                            line.level === "SUCC"
                                                ? "hsl(145 60% 30% / 0.2)"
                                                : "hsl(220 40% 25% / 0.2)",
                                        color:
                                            line.level === "SUCC"
                                                ? "hsl(145 60% 55%)"
                                                : "hsl(220 60% 70%)",
                                        border:
                                            line.level === "SUCC"
                                                ? "1px solid hsl(145 40% 30% / 0.4)"
                                                : "1px solid hsl(220 40% 30% / 0.3)",
                                    }}
                                >
                                    {line.level}
                                </span>
                                <span style={{ color: "hsl(var(--foreground) / 0.55)" }}>
                                    {line.msg}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
