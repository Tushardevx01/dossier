/**
 * useCopyToClipboard Hook
 *
 * Encapsulates clipboard API interaction with
 * auto-reset feedback state.
 */

"use client";

import { useCallback, useRef, useState } from "react";

interface UseCopyToClipboardOptions {
  /** How long (ms) the "copied" state stays true. Default: 2000 */
  resetDelay?: number;
}

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { resetDelay = 2000 } = options;
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        // Clear any existing timer before setting a new one
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), resetDelay);
      } catch {
        // Silently fail — clipboard may be unavailable in some contexts
        setCopied(false);
      }
    },
    [resetDelay]
  );

  return { copied, copy };
}
