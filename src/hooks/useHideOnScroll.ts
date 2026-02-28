/**
 * useHideOnScroll Hook
 *
 * Tracks scroll direction and returns visibility + scroll state.
 * Extracted from Navbar for reusability.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseHideOnScrollOptions {
  /** Scroll threshold (px) before hide/show logic activates. Default: 100 */
  threshold?: number;
}

interface UseHideOnScrollReturn {
  /** Whether the element should be visible */
  isVisible: boolean;
  /** Whether the user has scrolled past the threshold */
  isScrolled: boolean;
}

export function useHideOnScroll(
  options: UseHideOnScrollOptions = {}
): UseHideOnScrollReturn {
  const { threshold = 100 } = options;
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const pastThreshold = currentY > threshold;

    setIsScrolled(pastThreshold);

    if (currentY < lastScrollY.current || currentY < threshold) {
      setIsVisible(true);
    } else if (currentY > lastScrollY.current && pastThreshold) {
      setIsVisible(false);
    }

    lastScrollY.current = currentY;
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { isVisible, isScrolled };
}
