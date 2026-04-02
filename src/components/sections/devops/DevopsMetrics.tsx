"use client";

import { motion } from "motion/react";

import { mono, nasalization } from "@/app/fonts";
import { latencyPoints } from "@/constant/system";
import type { TelemetryItem } from "@/types/system";

interface DevopsMetricsProps {
  telemetry: TelemetryItem;
}

export const DevopsMetrics = ({ telemetry }: DevopsMetricsProps) => {
  return (
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
        <MetricCard label="Uptime %" value={`${telemetry.uptime.toFixed(2)}%`} valueClassName="text-emerald-300" />
        <MetricCard label="Requests/sec" value={`${telemetry.rps}`} valueClassName="text-sky-300" />
        <MetricCard label="Error Rate" value={`${telemetry.errorRate.toFixed(1)}%`} valueClassName="text-amber-300" />
        <MetricCard label="Latency" value={`${telemetry.latency}ms`} valueClassName="text-violet-300" />
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
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  valueClassName: string;
}

const MetricCard = ({ label, value, valueClassName }: MetricCardProps) => {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-3.5">
      <p className="system-label">{label}</p>
      <motion.p key={value} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className={`${nasalization.className} mt-2 text-xl ${valueClassName}`}>
        {value}
      </motion.p>
    </div>
  );
};
