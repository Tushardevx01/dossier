/**
 * Structured Logger
 *
 * JSON-formatted logging for production observability.
 * Supports log levels, request correlation, and structured metadata.
 */

import { nanoid } from "nanoid";

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  requestId?: string;
  [key: string]: unknown;
}

const PII_KEYS = ["email", "password", "token", "apiKey", "secret", "authorization", "senderEmail"];
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Strips PII from a value recursively
 */
function maskPII(value: unknown): unknown {
  if (typeof value === "string") {
    // Mask emails in strings
    const masked = value.replace(EMAIL_REGEX, "[MASKED_EMAIL]");
    return masked;
  }

  if (Array.isArray(value)) {
    return value.map(maskPII);
  }

  if (value !== null && typeof value === "object") {
    const maskedObj: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      if (PII_KEYS.some((pii) => key.toLowerCase().includes(pii.toLowerCase()))) {
        maskedObj[key] = "[MASKED]";
      } else {
        maskedObj[key] = maskPII(val);
      }
    }
    return maskedObj;
  }

  return value;
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function getMinLogLevel(): LogLevel {
  const env = process.env.LOG_LEVEL as LogLevel | undefined;
  if (env && env in LOG_LEVEL_PRIORITY) return env;
  return process.env.NODE_ENV === "production" ? "info" : "debug";
}

function shouldLog(level: LogLevel): boolean {
  const minLevel = getMinLogLevel();
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[minLevel];
}

function formatLog(entry: LogEntry): string {
  const maskedEntry = maskPII(entry) as LogEntry;

  if (process.env.NODE_ENV === "production") {
    return JSON.stringify(maskedEntry);
  }
  // Pretty print in development
  const { level, message, timestamp, ...rest } = maskedEntry;
  const meta = Object.keys(rest).length > 0 ? ` ${JSON.stringify(rest)}` : "";
  return `[${timestamp}] ${level.toUpperCase()}: ${message}${meta}`;
}

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  if (!shouldLog(level)) return;

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };

  const formatted = formatLog(entry);

  switch (level) {
    case "error":
      console.error(formatted);
      break;
    case "warn":
      console.warn(formatted);
      break;
    default:
      console.log(formatted);
  }
}

export const logger = {
  debug: (message: string, meta?: Record<string, unknown>) => log("debug", message, meta),
  info: (message: string, meta?: Record<string, unknown>) => log("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => log("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => log("error", message, meta),

  /**
   * Log an error object with stack trace
   */
  exception: (error: Error, meta?: Record<string, unknown>) => {
    log("error", error.message, {
      ...meta,
      name: error.name,
      stack: error.stack,
    });
  },
};

/**
 * Generate a unique request ID for correlation
 */
export function generateRequestId(): string {
  return nanoid(12);
}
