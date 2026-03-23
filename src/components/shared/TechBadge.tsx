"use client";

import { motion } from "motion/react";

import { Tooltip } from "@/components/ui/tooltip";
import { useHover } from "@/hooks/useHover";
import { cn } from "@/lib/utils";
import type { TechBadgeSize, TechStackItem } from "@/types/tech";

interface TechBadgeProps {
  tech: TechStackItem;
  size?: TechBadgeSize;
  delay?: number;
}

const sizeClasses: Record<TechBadgeSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3 py-1.5 text-sm",
  lg: "px-3.5 py-2 text-sm",
};

const iconSizes: Record<TechBadgeSize, string> = {
  sm: "0.9rem",
  md: "0.95rem",
  lg: "1rem",
};

export const TechBadge = ({ tech, size = "md", delay = 0 }: TechBadgeProps) => {
  const { hoverProps } = useHover();
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative"
    >
      <Tooltip content={tech.description}>
        <button
          type="button"
          {...hoverProps}
          aria-label={`${tech.name}: ${tech.description}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-white/75 transition-all duration-150 ease-out hover:bg-white/10 hover:border-primary/40 focus-visible:bg-white/10 focus-visible:border-primary/40 focus-visible:outline-none",
            sizeClasses[size]
          )}
        >
          <Icon
            style={{
              color: tech.color ?? "currentColor",
              fontSize: iconSizes[size],
              flexShrink: 0,
            }}
            className="opacity-80"
            aria-label={`${tech.name} icon`}
            role="img"
          />
          <span className="font-medium">{tech.name}</span>
        </button>
      </Tooltip>
    </motion.div>
  );
};
