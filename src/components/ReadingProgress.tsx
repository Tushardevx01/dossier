"use client";

import { motion } from "framer-motion";

interface ReadingProgressProps {
  percentage: number;
}

export function ReadingProgress({ percentage }: ReadingProgressProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-50"
      style={{ width: `${percentage}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}
