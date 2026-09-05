"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export const CaseStudyProgress = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-neutral-900 pointer-events-none"
    >
      <motion.div
        className="h-full bg-emerald-400"
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </div>
  );
};
