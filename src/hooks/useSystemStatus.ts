"use client";

import { useEffect, useMemo, useState } from "react";

import { telemetrySeed, runtimeLogSeed } from "@/constants/system";
import type { RuntimeLogLine } from "@/types/system";

const TELEMETRY_UPDATE_MS = 2400;
const LOG_UPDATE_MS = 1400;
const MAX_LOG_LINES = 12;

const formatTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const useSystemStatus = () => {
  const [telemetryIndex, setTelemetryIndex] = useState(0);
  const [logs, setLogs] = useState<RuntimeLogLine[]>(
    runtimeLogSeed.slice(0, 4).map((line) => ({ ...line, time: formatTime() }))
  );

  useEffect(() => {
    const telemetryTimer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % telemetrySeed.length);
    }, TELEMETRY_UPDATE_MS);

    return () => clearInterval(telemetryTimer);
  }, []);

  useEffect(() => {
    const logTimer = setInterval(() => {
      const next = runtimeLogSeed[Math.floor(Math.random() * runtimeLogSeed.length)];
      setLogs((prev) => [...prev.slice(-(MAX_LOG_LINES - 1)), { ...next, time: formatTime() }]);
    }, LOG_UPDATE_MS);

    return () => clearInterval(logTimer);
  }, []);

  const telemetry = useMemo(() => telemetrySeed[telemetryIndex], [telemetryIndex]);

  return {
    telemetry,
    logs,
  } as const;
};
