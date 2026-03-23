"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { mono, nasalization } from "@/app/fonts";

type HealthStatus = "ONLINE" | "DEGRADED" | "OFFLINE";
type LogLevel = "INFO" | "SUCCESS" | "WARN" | "ERROR";

const levelClasses: Record<LogLevel, string> = {
  INFO: "text-sky-300 border-sky-400/30 bg-sky-500/10",
  SUCCESS: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  WARN: "text-amber-300 border-amber-400/30 bg-amber-500/10",
  ERROR: "text-rose-300 border-rose-400/30 bg-rose-500/10",
};

const telemetrySeed = [
  { uptime: 99.6, rps: 1420, errorRate: 0.9, latency: 190 },
  { uptime: 99.8, rps: 1680, errorRate: 0.6, latency: 174 },
  { uptime: 99.9, rps: 1820, errorRate: 0.4, latency: 160 },
  { uptime: 99.97, rps: 1975, errorRate: 0.3, latency: 148 },
] as const;

const logSeed = [
  { level: "INFO", msg: "edge-router: health probes stable across regions" },
  { level: "SUCCESS", msg: "deploy-bot: canary rollout reached 20% traffic" },
  { level: "WARN", msg: "db-replica: write lag crossed 160ms threshold" },
  { level: "INFO", msg: "autoscaler: added 2 workers for burst traffic" },
  { level: "ERROR", msg: "api-gateway: transient 502 on service checkout" },
  { level: "SUCCESS", msg: "recovery: retries normalized within SLO" },
] as Array<{ level: LogLevel; msg: string }>;

const healthTiles: Array<{ label: string; status: HealthStatus; note: string }> = [
  { label: "API", status: "ONLINE", note: "Gateway healthy" },
  { label: "Database", status: "DEGRADED", note: "Replica lag spike" },
  { label: "Queue", status: "ONLINE", note: "Consumers stable" },
  { label: "CDN", status: "ONLINE", note: "Global cache warm" },
  { label: "Billing", status: "ONLINE", note: "Webhooks processing" },
  { label: "Search", status: "OFFLINE", note: "Maintenance window" },
];

const statusClassByState: Record<HealthStatus, string> = {
  ONLINE: "text-emerald-300",
  DEGRADED: "text-amber-300",
  OFFLINE: "text-rose-300",
};

const dotClassByState: Record<HealthStatus, string> = {
  ONLINE: "bg-emerald-400",
  DEGRADED: "bg-amber-400",
  OFFLINE: "bg-rose-400",
};

const formatTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const DevOps = () => {
  const ref = useRef(null);
  const logsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px", amount: 0.15 });

  const [telemetryIndex, setTelemetryIndex] = useState(0);
  const [logs, setLogs] = useState(
    logSeed.slice(0, 4).map((line) => ({ ...line, time: formatTime() }))
  );

  const telemetry = telemetrySeed[telemetryIndex];

  const latencyPoints = useMemo(() => [
    [8, 72],
    [52, 64],
    [96, 68],
    [140, 42],
    [184, 52],
    [228, 36],
    [272, 45],
    [316, 24],
  ], []);

  useEffect(() => {
    const telemetryTimer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % telemetrySeed.length);
    }, 2400);

    return () => clearInterval(telemetryTimer);
  }, []);

  useEffect(() => {
    const logTimer = setInterval(() => {
      const next = logSeed[Math.floor(Math.random() * logSeed.length)];
      setLogs((prev) => [...prev.slice(-11), { ...next, time: formatTime() }]);
    }, 1400);

    return () => clearInterval(logTimer);
  }, []);

  useEffect(() => {
    if (!logsRef.current) return;
    logsRef.current.scrollTo({ top: logsRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  return (
    <section id="devops" ref={ref} className="py-24 relative overflow-hidden control-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-black/35 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="system-label">Cluster State</p>
                    <p className={`${nasalization.className} text-2xl sm:text-3xl text-white mt-2`}>Operational</p>
                    <p className={`${mono.className} text-xs text-white/45 mt-2`}>global-control-plane / v1.3.8</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="status-dot bg-emerald-400 animate-pulse" />
                    <span className={`${mono.className} text-xs text-emerald-300`}>ONLINE</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-black/30 p-3.5">
                  <p className="system-label">Uptime %</p>
                  <motion.p key={telemetry.uptime} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className={`${nasalization.className} text-xl text-emerald-300 mt-2`}>
                    {telemetry.uptime.toFixed(2)}%
                  </motion.p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-3.5">
                  <p className="system-label">Requests/sec</p>
                  <motion.p key={telemetry.rps} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className={`${nasalization.className} text-xl text-sky-300 mt-2`}>
                    {telemetry.rps}
                  </motion.p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-3.5">
                  <p className="system-label">Error Rate</p>
                  <motion.p key={telemetry.errorRate} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className={`${nasalization.className} text-xl text-amber-300 mt-2`}>
                    {telemetry.errorRate.toFixed(1)}%
                  </motion.p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 p-3.5">
                  <p className="system-label">Latency</p>
                  <motion.p key={telemetry.latency} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className={`${nasalization.className} text-xl text-violet-300 mt-2`}>
                    {telemetry.latency}ms
                  </motion.p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="system-label">Latency Graph</p>
                  <span className={`${mono.className} text-[11px] text-white/45`}>last 5m</span>
                </div>
                <svg viewBox="0 0 324 84" className="w-full h-[90px]">
                  <polyline
                    points={latencyPoints.map((point) => point.join(",")).join(" ")}
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />
                  <motion.polyline
                    points={latencyPoints.map((point) => point.join(",")).join(" ")}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0.05, opacity: 0.35 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  />
                  <text x="136" y="18" className={`${mono.className} fill-amber-200 text-[8px]`}>
                    activity spike
                  </text>
                  <text x="246" y="20" className={`${mono.className} fill-sky-200 text-[8px]`}>
                    deployment phase
                  </text>
                </svg>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/45 overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="status-dot bg-emerald-400 animate-pulse" />
                  <p className={`${mono.className} text-[11px] uppercase tracking-wider text-white/80`}>Live Runtime Logs</p>
                </div>
                <p className={`${mono.className} text-[11px] text-white/45`}>prod-eu-west-1</p>
              </div>

              <div className="px-4 py-4 border-b border-white/10">
                <p className="system-label mb-3">Service Indicators</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {healthTiles.map((tile) => (
                    <div key={tile.label} className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                      <div className="flex items-center gap-2">
                        <span className={`status-dot ${dotClassByState[tile.status]} h-2.5 w-2.5`} />
                        <span className={`${mono.className} text-xs text-white/80`}>{tile.label}</span>
                      </div>
                      <p className={`${mono.className} text-[10px] mt-1.5 ${statusClassByState[tile.status]}`}>{tile.status}</p>
                      <p className={`${mono.className} text-[10px] text-white/45 mt-1`}>{tile.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div ref={logsRef} className="max-h-[320px] overflow-y-auto px-4 py-4 space-y-2.5 bg-black/40">
                {logs.map((line, index) => (
                  <motion.div
                    key={`${line.time}-${line.level}-${index}`}
                    className={`${mono.className} text-[11px] flex items-start gap-2.5`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <span className="text-white/45 shrink-0">{line.time}</span>
                    <span className="text-white/30 shrink-0">›</span>
                    <span className={`${mono.className} text-[10px] px-2 py-0.5 rounded border shrink-0 ${levelClasses[line.level]}`}>
                      {line.level}
                    </span>
                    <span className="text-white/75 leading-relaxed">{line.msg}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
