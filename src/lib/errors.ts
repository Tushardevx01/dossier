/**
 * Application Error Classes
 *
 * Structured error handling for production systems.
 * All errors have codes, messages, and optional metadata.
 */

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "RATE_LIMIT_EXCEEDED"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "EXTERNAL_SERVICE_ERROR"
  | "CONFIG_ERROR"
  | "INTERNAL_ERROR";

export interface ErrorMeta {
  requestId?: string;
  field?: string;
  [key: string]: unknown;
}

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly statusCode: number;
  readonly meta: ErrorMeta;
  readonly isOperational: boolean;

  constructor(
    code: ErrorCode,
    message: string,
    statusCode: number = 500,
    meta: ErrorMeta = {},
    isOperational: boolean = true
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.meta = meta;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      ...(this.meta.requestId && { requestId: this.meta.requestId }),
      ...(this.meta.field && { field: this.meta.field }),
    };
  }
}

// Factory functions for common errors
export const Errors = {
  validation: (message: string, meta?: ErrorMeta) =>
    new AppError("VALIDATION_ERROR", message, 400, meta),

  rateLimitExceeded: (retryAfter: number, meta?: ErrorMeta) =>
    new AppError("RATE_LIMIT_EXCEEDED", "Too many requests. Please try again later.", 429, {
      ...meta,
      retryAfter,
    }),

  unauthorized: (message = "Authentication required", meta?: ErrorMeta) =>
    new AppError("UNAUTHORIZED", message, 401, meta),

  forbidden: (message = "Access denied", meta?: ErrorMeta) =>
    new AppError("FORBIDDEN", message, 403, meta),

  notFound: (resource: string, meta?: ErrorMeta) =>
    new AppError("NOT_FOUND", `${resource} not found`, 404, meta),

  externalService: (service: string, meta?: ErrorMeta) =>
    new AppError("EXTERNAL_SERVICE_ERROR", `${service} is unavailable`, 503, meta),

  config: (message: string, meta?: ErrorMeta) =>
    new AppError("CONFIG_ERROR", message, 500, meta, false),

  internal: (message = "An unexpected error occurred", meta?: ErrorMeta) =>
    new AppError("INTERNAL_ERROR", message, 500, meta, false),
};
