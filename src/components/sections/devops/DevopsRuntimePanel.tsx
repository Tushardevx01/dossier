"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

import { mono } from "@/app/fonts";
import { dotClassByState, levelClasses, serviceHealthTiles, statusClassByState } from "@/constant/system";
import type { RuntimeLogLine } from "@/types/system";

interface DevopsRuntimePanelProps {
  logs: RuntimeLogLine[];
}

export const DevopsRuntimePanel = ({ logs }: DevopsRuntimePanelProps) => {
  const logsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logsRef.current) return;
    logsRef.current.scrollTo({ top: logsRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  return (
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
          {serviceHealthTiles.map((tile) => (
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
  );
};
