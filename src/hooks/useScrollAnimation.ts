"use client";

import type { UseInViewOptions } from "motion/react";
import { useInView } from "motion/react";
import { useMemo, useRef } from "react";

type ScrollAnimationOptions = Partial<UseInViewOptions>;

const DEFAULT_OPTIONS: ScrollAnimationOptions = {
  once: true,
  margin: "-80px",
  amount: 0.1,
};

export const useScrollAnimation = (options?: ScrollAnimationOptions) => {
  const ref = useRef<HTMLElement | null>(null);
  const once = options?.once ?? DEFAULT_OPTIONS.once;
  const margin = options?.margin ?? DEFAULT_OPTIONS.margin;
  const amount = options?.amount ?? DEFAULT_OPTIONS.amount;

  const inViewOptions = useMemo(
    () => ({ once, margin, amount }),
    [once, margin, amount]
  );

  const isInView = useInView(ref, inViewOptions);

  return {
    ref,
    isInView,
  } as const;
};
