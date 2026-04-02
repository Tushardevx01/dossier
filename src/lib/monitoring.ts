/**
 * Production Monitoring & Error Tracking
 *
 * Provides centralized error reporting and performance monitoring.
 * Supports multiple providers (Sentry, custom webhooks, console fallback).
 *
 * @example
 * ```ts
 * import { captureException, captureMessage, measurePerformance } from "@/lib/monitoring";
 *
 * // Report errors
 * captureException(error, { userId: "123", context: "checkout" });
 *
 * // Track custom events
 * captureMessage("User completed onboarding", { level: "info" });
 *
 * // Measure performance
 * const end = measurePerformance("api.contact.send");
 * // ... do work ...
 * end(); // Automatically reports duration
 * ```
 */

import { logger } from "./logger";

// ─── Types ──────────────────────────────────────────────────────────────────

type Severity = "fatal" | "error" | "warning" | "info" | "debug";

interface ErrorContext {
  userId?: string;
  requestId?: string;
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
  level?: Severity;
}

// ─── Configuration ──────────────────────────────────────────────────────────

const config = {
  enabled: process.env.NODE_ENV === "production",
  sentryDsn: process.env.SENTRY_DSN,
  webhookUrl: process.env.ERROR_WEBHOOK_URL,
  serviceName: process.env.SERVICE_NAME || "tushardevx01-portfolio",
  environment: process.env.NODE_ENV || "development",
};

// ─── Error Capture ──────────────────────────────────────────────────────────

/**
 * Capture and report an exception
 */
export function captureException(
  error: Error | unknown,
  context: ErrorContext = {}
): void {
  const errorObj = error instanceof Error ? error : new Error(String(error));
  const { requestId, tags = {}, extra = {}, level = "error" } = context;

  // Always log locally
  logger.error(errorObj.message, {
    requestId,
    stack: errorObj.stack,
    ...tags,
    ...extra,
  });

  // In production, send to external services
  if (config.enabled) {
    // Sentry integration placeholder
    if (config.sentryDsn) {
      // When Sentry is configured:
      // Sentry.captureException(errorObj, {
      //   level,
      //   tags,
      //   extra: { requestId, ...extra },
      // });
    }

    // Webhook integration (Discord, Slack, etc.)
    if (config.webhookUrl) {
      sendToWebhook({
        type: "exception",
        level,
        message: errorObj.message,
        stack: errorObj.stack,
        context: { requestId, ...tags, ...extra },
        timestamp: new Date().toISOString(),
      }).catch(() => {
        // Silently fail webhook - don't crash on monitoring failure
      });
    }
  }
}

/**
 * Capture a custom message/event
 */
export function captureMessage(
  message: string,
  context: ErrorContext = {}
): void {
  const { requestId, tags = {}, extra = {}, level = "info" } = context;

  // Log locally
  const logFn = level === "error" ? logger.error : level === "warning" ? logger.warn : logger.info;
  logFn(message, { requestId, ...tags, ...extra });

  // In production, send to external services
  if (config.enabled && config.webhookUrl) {
    sendToWebhook({
      type: "message",
      level,
      message,
      context: { requestId, ...tags, ...extra },
      timestamp: new Date().toISOString(),
    }).catch(() => {});
  }
}

// ─── Performance Monitoring ─────────────────────────────────────────────────

/**
 * Start measuring performance for an operation
 * Returns a function to call when the operation completes
 */
export function measurePerformance(
  name: string,
  tags?: Record<string, string>
): () => number {
  const startTime = performance.now();

  return () => {
    const durationMs = Math.round(performance.now() - startTime);

    // Log performance metrics
    logger.debug(`Performance: ${name}`, { durationMs, ...tags });

    // In production, could send to metrics service
    if (config.enabled) {
      // Example: Send to StatsD, Datadog, etc.
      // metricsClient.timing(name, durationMs, tags);
    }

    return durationMs;
  };
}

/**
 * Wrap an async function with automatic performance measurement
 */
export async function withPerformance<T>(
  name: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>
): Promise<T> {
  const end = measurePerformance(name, tags);
  try {
    return await fn();
  } finally {
    end();
  }
}

// ─── Webhook Helper ─────────────────────────────────────────────────────────

interface WebhookPayload {
  type: "exception" | "message";
  level: Severity;
  message: string;
  stack?: string;
  context: Record<string, unknown>;
  timestamp: string;
}

async function sendToWebhook(payload: WebhookPayload): Promise<void> {
  if (!config.webhookUrl) return;

  // Format for Discord/Slack compatible webhook
  const body = {
    content: null,
    embeds: [
      {
        title: `[${payload.level.toUpperCase()}] ${payload.type === "exception" ? "🔴 Exception" : "📝 Event"}`,
        description: payload.message.slice(0, 2000),
        color: payload.level === "error" || payload.level === "fatal" ? 0xed4245 : 0x5865f2,
        fields: [
          {
            name: "Environment",
            value: config.environment,
            inline: true,
          },
          {
            name: "Service",
            value: config.serviceName,
            inline: true,
          },
          {
            name: "Timestamp",
            value: payload.timestamp,
            inline: true,
          },
        ],
        footer: {
          text: payload.stack ? payload.stack.split("\n")[1]?.trim() || "No stack" : "No stack trace",
        },
      },
    ],
  };

  await fetch(config.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ─── Health Check Integration ───────────────────────────────────────────────

/**
 * Check if monitoring services are healthy
 */
export async function checkMonitoringHealth(): Promise<{
  status: "pass" | "warn" | "fail";
  message: string;
}> {
  if (!config.enabled) {
    return { status: "pass", message: "Monitoring disabled (non-production)" };
  }

  if (!config.sentryDsn && !config.webhookUrl) {
    return { status: "warn", message: "No external monitoring configured" };
  }

  return { status: "pass", message: "Monitoring configured" };
}
