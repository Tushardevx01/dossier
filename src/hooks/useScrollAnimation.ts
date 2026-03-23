"use client";

import type { UseInViewOptions } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

type ScrollAnimationOptions = Partial<UseInViewOptions>;

const DEFAULT_OPTIONS: ScrollAnimationOptions = {
  once: true,
  margin: "-80px",
  amount: 0.1,
};

export const useScrollAnimation = (options?: ScrollAnimationOptions) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { ...DEFAULT_OPTIONS, ...options });

  return {
    ref,
    isInView,
  } as const;
};
