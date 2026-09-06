import React from "react";
import { mono } from "@/app/fonts";

export interface TechnicalLabelProps {
  children: React.ReactNode;
  variant?: "default" | "emerald" | "amber" | "rose" | "muted";
  size?: "xs" | "sm";
  monoFont?: boolean;
  className?: string;
}

const variantStyles: Record<NonNullable<TechnicalLabelProps["variant"]>, string> = {
  default: "bg-neutral-900/90 text-neutral-300 border-neutral-800",
  emerald: "bg-emerald-950/40 text-emerald-400 border-emerald-800/50 shadow-[0_0_12px_rgba(16,185,129,0.1)]",
  amber: "bg-amber-950/40 text-amber-300 border-amber-800/50",
  rose: "bg-rose-950/40 text-rose-300 border-rose-800/50",
  muted: "bg-neutral-950 text-neutral-500 border-neutral-900",
};

const sizeStyles: Record<NonNullable<TechnicalLabelProps["size"]>, string> = {
  xs: "text-[10px] px-2 py-0.5 tracking-wider",
  sm: "text-xs px-2.5 py-1 tracking-wide",
};

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({
  children,
  variant = "default",
  size = "xs",
  monoFont = true,
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 uppercase font-medium border rounded select-none ${
        monoFont ? `${mono.className} font-mono` : ""
      } ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};
