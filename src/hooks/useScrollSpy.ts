/**
 * useScrollSpy Hook
 *
 * Observes a set of DOM elements via IntersectionObserver
 * and reports which one is currently "active" (visible).
 *
 * Extracted from TableOfContents to be reusable across
 * any component that needs scroll-aware active state.
 */

"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollSpyOptions {
  /** Margin passed to IntersectionObserver rootMargin. Default: "-40% 0px -55% 0px" */
  rootMargin?: string;
  /** Threshold for intersection. Default: 0 */
  threshold?: number;
}

/**
 * @param ids - Array of element IDs to observe
 * @param options - IntersectionObserver configuration
 * @returns The ID of the currently active (intersecting) element
 */
export function useScrollSpy(
  ids: string[],
  options: UseScrollSpyOptions = {}
): string {
  const { rootMargin = "-40% 0px -55% 0px", threshold = 0 } = options;
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;

    // Disconnect previous observer
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin, threshold }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [ids, rootMargin, threshold]);

  return activeId;
}
