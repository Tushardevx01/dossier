/**
 * useScrollProgress Hook
 * 
 * Tracks scroll progress as a percentage
 * Replaces inline script-based scroll tracking
 * 
 * IMPROVEMENTS:
 * - Reusable across components
 * - Proper cleanup to prevent memory leaks
 * - Debounced for performance
 * - Type-safe
 */

import { useEffect, useState } from "react";

/**
 * Hook that tracks scroll progress as a percentage
 * Returns a value between 0 and 100
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId = 0;

    const calculateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percentage = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      const nextProgress = Math.min(percentage, 100);

      setProgress((prev) => {
        if (Math.abs(prev - nextProgress) < 0.2) {
          return prev;
        }
        return nextProgress;
      });
      animationFrameId = 0;
    };

    // Calculate scroll progress
    const handleScroll = () => {
      if (animationFrameId) return;
      animationFrameId = window.requestAnimationFrame(calculateProgress);
    };

    handleScroll();

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      // Cleanup: remove listener
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return progress;
}

/**
 * Alternative: Debounced version for expensive operations
 * Use this if scroll tracking causes performance issues
 */
export function useDebouncedScrollProgress(delayMs = 100): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(timeoutId);

      // Set new debounced timeout
      timeoutId = setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const percentage = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
        setProgress(Math.min(percentage, 100));
      }, delayMs);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [delayMs]);

  return progress;
}
