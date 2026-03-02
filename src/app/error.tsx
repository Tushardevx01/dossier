"use client";

/**
 * Error Boundary
 *
 * Catches unhandled errors in route segments.
 * Displays user-friendly error UI with retry option.
 */

import { useEffect } from "react";
import { motion } from "motion/react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Client-side error reporting (sends to API endpoint for server-side processing)
async function reportError(error: Error & { digest?: string }) {
  try {
    // In production, could POST to an error collection endpoint
    // For now, structured console logging
    const errorReport = {
      name: error.name,
      message: error.message,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : "unknown",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
    };
    
    console.error("[Error Boundary]", JSON.stringify(errorReport));
    
    // Optional: Send to backend error collection
    // await fetch("/api/errors", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(errorReport),
    // });
  } catch {
    // Silently fail - don't cause more errors
    console.error("Failed to report error:", error.message);
  }
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    reportError(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-6">
          An unexpected error occurred. Please try again.
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-500/5 rounded-lg text-left">
            <p className="text-sm font-mono text-red-400 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium
                       hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2
                       focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium
                       hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2
                       focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background"
          >
            Go Home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
