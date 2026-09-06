import React from "react";
import { nasalization, mono } from "@/app/fonts";

export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

export interface MetricGridProps {
  metrics: MetricItem[];
  className?: string;
}

export const MetricGrid: React.FC<MetricGridProps> = ({
  metrics,
  className = "",
}) => {
  if (!metrics || metrics.length === 0) return null;

  // Choose responsive column layout based on number of metrics
  const gridCols =
    metrics.length === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : metrics.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : metrics.length === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={`rounded-lg border border-neutral-800/80 bg-[#07070a] overflow-hidden ${className}`}
    >
      <div className={`grid ${gridCols} divide-y sm:divide-y-0 divide-neutral-800/80 sm:divide-x`}>
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 lg:p-7 space-y-2.5 hover:bg-neutral-900/30 transition-colors"
          >
            <div
              className={`${nasalization.className} text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-emerald-400`}
            >
              {m.value}
            </div>

            <div
              className={`${mono.className} font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white font-semibold`}
            >
              {m.label}
            </div>

            {m.description && (
              <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
                {m.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
