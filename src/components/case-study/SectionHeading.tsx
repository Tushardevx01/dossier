import React from "react";
import { nasalization, mono } from "@/app/fonts";
import { TechnicalLabel } from "./TechnicalLabel";

export interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  action?: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  badge,
  action,
  className = "",
}) => {
  return (
    <div className={`space-y-3 pb-2 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {number && (
            <span
              className={`${mono.className} font-mono text-xs sm:text-sm font-bold text-emerald-400 tracking-wider select-none`}
            >
              {number}
            </span>
          )}
          <h2
            className={`${nasalization.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight`}
          >
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {badge && <TechnicalLabel variant="emerald">{badge}</TechnicalLabel>}
          {action}
        </div>
      </div>

      {subtitle && (
        <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-[760px] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
