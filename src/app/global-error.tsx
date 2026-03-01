"use client";

/**
 * Global Error Boundary
 *
 * Catches errors in the root layout.
 * Must include its own <html> and <body> since root layout is not rendered.
 */

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "400px", textAlign: "center", padding: "20px" }}>
          {/* Error Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 24px",
              borderRadius: "50%",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#fafafa",
            }}
          >
            Application Error
          </h1>

          <p
            style={{
              color: "#a1a1aa",
              marginBottom: "24px",
              lineHeight: 1.5,
            }}
          >
            A critical error occurred. Please refresh the page or try again later.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: "12px",
                color: "#71717a",
                marginBottom: "24px",
              }}
            >
              Error ID: {error.digest}
            </p>
          )}

          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                padding: "12px 24px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                padding: "12px 24px",
                backgroundColor: "#27272a",
                color: "#fafafa",
                border: "none",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
