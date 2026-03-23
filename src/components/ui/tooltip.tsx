"use client";

import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface TooltipProps extends PropsWithChildren {
  content: string;
  className?: string;
  contentClassName?: string;
}

export const Tooltip = ({ children, content, className, contentClassName }: TooltipProps) => {
  return (
    <span className={cn("group relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[240px] -translate-x-1/2 rounded-md border border-white/10 bg-black/90 px-2 py-1 text-xs text-white/80 shadow-[0_6px_18px_rgba(0,0,0,0.45),0_0_14px_rgba(255,255,255,0.06)] opacity-0 translate-y-1 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0",
          contentClassName
        )}
      >
        {content}
      </span>
    </span>
  );
};
