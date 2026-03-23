export type HealthStatus = "ONLINE" | "DEGRADED" | "OFFLINE";
export type LogLevel = "INFO" | "SUCCESS" | "WARN" | "ERROR";

export interface TelemetryItem {
  uptime: number;
  rps: number;
  errorRate: number;
  latency: number;
}

export interface RuntimeLogSeed {
  level: LogLevel;
  msg: string;
}

export interface RuntimeLogLine extends RuntimeLogSeed {
  time: string;
}

export interface ServiceHealthTile {
  label: string;
  status: HealthStatus;
  note: string;
}
