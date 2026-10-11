import type { HealthStatus, LogLevel, RuntimeLogSeed, ServiceHealthTile, TelemetryItem } from "@/types/system";

export const telemetrySeed: TelemetryItem[] = [
  { uptime: 99.6, rps: 1420, errorRate: 0.9, latency: 190 },
  { uptime: 99.8, rps: 1680, errorRate: 0.6, latency: 174 },
  { uptime: 99.9, rps: 1820, errorRate: 0.4, latency: 160 },
  { uptime: 99.97, rps: 1975, errorRate: 0.3, latency: 148 },
];

export const runtimeLogSeed: RuntimeLogSeed[] = [
  { level: "INFO", msg: "edge-router: health probes stable across regions" },
  { level: "SUCCESS", msg: "deploy-bot: canary rollout reached 20% traffic" },
  { level: "WARN", msg: "db-replica: write lag crossed 160ms threshold" },
  { level: "INFO", msg: "autoscaler: added 2 workers for burst traffic" },
  { level: "ERROR", msg: "api-gateway: transient 502 on service checkout" },
  { level: "SUCCESS", msg: "recovery: retries normalized within SLO" },
];

export const serviceHealthTiles: ServiceHealthTile[] = [
  { label: "API", status: "ONLINE", note: "Gateway healthy" },
  { label: "Database", status: "DEGRADED", note: "Replica lag spike" },
  { label: "Queue", status: "ONLINE", note: "Consumers stable" },
  { label: "CDN", status: "ONLINE", note: "Global cache warm" },
  { label: "Billing", status: "ONLINE", note: "Webhooks processing" },
  { label: "Search", status: "OFFLINE", note: "Maintenance window" },
];

export const levelClasses: Record<LogLevel, string> = {
  INFO: "text-sky-300 border-sky-400/30 bg-sky-500/10",
  SUCCESS: "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  WARN: "text-amber-300 border-amber-400/30 bg-amber-500/10",
  ERROR: "text-rose-300 border-rose-400/30 bg-rose-500/10",
};

export const statusClassByState: Record<HealthStatus, string> = {
  ONLINE: "text-emerald-300",
  DEGRADED: "text-amber-300",
  OFFLINE: "text-rose-300",
};

export const dotClassByState: Record<HealthStatus, string> = {
  ONLINE: "bg-emerald-400",
  DEGRADED: "bg-amber-400",
  OFFLINE: "bg-rose-400",
};

export const latencyPoints: Array<[number, number]> = [
  [8, 72],
  [52, 64],
  [96, 68],
  [140, 42],
  [184, 52],
  [228, 36],
  [272, 45],
  [316, 24],
];
