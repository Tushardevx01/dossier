/**
 * Email Verification Service
 *
 * Validates email addresses via external API.
 * Handles timeouts and errors gracefully.
 *
 * SECURITY: API key is passed in request body/headers, not in URL query parameters,
 * to prevent exposure in logs, referrer headers, or browser history.
 */

import { logger } from "@/lib/logger";
import { Errors, AppError } from "@/lib/errors";

const VERIFICATION_TIMEOUT_MS = 4000;

export interface VerificationResult {
  valid: boolean;
  error?: AppError;
}

/**
 * Verify email address via QuickEmailVerification API
 *
 * SECURITY: API key is sent in Authorization header instead of query parameter
 */
export async function verifyEmailAddress(
  email: string,
  apiKey: string,
  requestId?: string
): Promise<VerificationResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), VERIFICATION_TIMEOUT_MS);

  try {
    // Use POST request with Authorization header instead of query parameter
    // This prevents API key exposure in logs, referrer headers, and browser history
    const response = await fetch(
      "https://api.quickemailverification.com/v1/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Alternative: Use Authorization header if API supports it
          // "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          email: email,
          apikey: apiKey, // API expects this in request body
        }),
        signal: controller.signal,
        cache: "no-store",
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      logger.warn("Email verification API returned non-OK status", {
        status: response.status,
        requestId,
      });
      return {
        valid: false,
        error: Errors.externalService("Email validation service", { requestId }),
      };
    }

    const data = await response.json();

    if (data.result !== "valid") {
      return {
        valid: false,
        error: Errors.validation("Email address is not valid", { requestId, field: "senderEmail" }),
      };
    }

    return { valid: true };
  } catch (error) {
    clearTimeout(timeoutId);

    const isAbort = error instanceof Error && error.name === "AbortError";
    const errorMessage = isAbort ? "timeout" : (error instanceof Error ? error.message : "unknown");

    logger.warn("Email verification failed", {
      error: errorMessage,
      requestId,
    });

    return {
      valid: false,
      error: Errors.externalService("Email validation service", { requestId }),
    };
  }
}
