"use client";

import { FC } from "react";
import { motion } from "motion/react";

interface TechClipProps {
  name: string;
  px?: string;
}

export const Clip: FC<TechClipProps> = ({ name, px = "2" }) => {
  return (
    <motion.span
      className={`relative inline-flex items-center px-${px} py-1 text-xs mt-4 text-primary-foreground/90 bg-primary/80 rounded font-light capitalize`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className="relative z-10">{name}</span>
    </motion.span>
  );
};
