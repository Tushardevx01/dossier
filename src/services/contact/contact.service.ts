/**
 * Contact Service
 *
 * Orchestrates contact form submission workflow:
 * 1. Validate input
 * 2. Check rate limit
 * 3. Verify email
 * 4. Send confirmation email
 *
 * All business logic lives here — API routes are thin wrappers.
 */

import { AppError, Errors } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { isTrustedOrigin } from "@/lib/security/request";
import {
  CONTACT_MAX_BODY_BYTES,
  CONTACT_RATE_LIMIT_MAX_REQUESTS,
  CONTACT_RATE_LIMIT_WINDOW_MS,
} from "@/config";
import { validateContactForm } from "./contact.schema";
import { checkRateLimit, createRateLimitKey } from "./contact.rateLimit";
import { sendEmail } from "@/services/email/email.transport";
import { renderContactEmail } from "@/services/email/email.templates";
import { verifyEmailAddress } from "@/services/email/email.verification";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ContactServiceConfig {
  emailApiKey: string;
  emailFrom: string;
  emailPassword: string;
}

export interface ContactRequest {
  body: unknown;
  clientIdentifier: string;
  requestId: string;
}

export type ContactResult =
  | { success: true; message: string }
  | { success: false; error: AppError };

// ─── Service ─────────────────────────────────────────────────────────────────

/**
 * Process a contact form submission
 */
export async function processContactSubmission(
  request: ContactRequest,
  config: ContactServiceConfig
): Promise<ContactResult> {
  const { body, clientIdentifier, requestId } = request;

  logger.info("Processing contact submission", { requestId, clientIdentifier });

  // 1. Rate limit check
  const rateLimitKey = createRateLimitKey("contact", clientIdentifier);
  const rateLimit = await checkRateLimit(
    rateLimitKey,
    CONTACT_RATE_LIMIT_MAX_REQUESTS,
    CONTACT_RATE_LIMIT_WINDOW_MS
  );

  if (!rateLimit.allowed) {
    logger.warn("Rate limit exceeded", { requestId, clientIdentifier });
    return {
      success: false,
      error: Errors.rateLimitExceeded(rateLimit.retryAfterSeconds, { requestId }),
    };
  }

  // 2. Validate input
  const validation = validateContactForm(body);
  if (!validation.success) {
    logger.info("Validation failed", { requestId, error: validation.error });
    return {
      success: false,
      error: Errors.validation(validation.error.message, {
        requestId,
        field: validation.error.field,
      }),
    };
  }

  const formData = validation.data;

  // 3. Honeypot check (bots fill this)
  if (formData.website && formData.website.length > 0) {
    logger.info("Honeypot triggered", { requestId });
    // Return success to not reveal detection
    return { success: true, message: "Message received" };
  }

  // 4. Verify email address
  const verification = await verifyEmailAddress(formData.senderEmail, config.emailApiKey, requestId);
  if (!verification.valid) {
    return { success: false, error: verification.error! };
  }

  // 5. Render and send email
  const htmlContent = renderContactEmail({
    userName: formData.senderName,
    contactReason: formData.reasonToContact,
    userMessage: formData.senderMsg,
    requestId,
  });

  const emailResult = await sendEmail(
    {
      to: { name: formData.senderName, address: formData.senderEmail },
      subject: "Request Received - Tushar Kanti Dey",
      html: htmlContent,
    },
    { from: config.emailFrom, password: config.emailPassword }
  );

  if (!emailResult.success) {
    logger.error("Email send failed", { requestId, error: emailResult.error });
    return {
      success: false,
      error: Errors.internal("Failed to send email", { requestId }),
    };
  }

  logger.info("Contact submission processed successfully", { requestId });
  return { success: true, message: "Message has been sent successfully" };
}

/**
 * Validate request body size
 */
export function isValidBodySize(body: string): boolean {
  return body.length > 0 && body.length <= CONTACT_MAX_BODY_BYTES;
}

/**
 * Validate origin header matches host
 */
export function isOriginAllowed(headers: Headers): boolean {
  return isTrustedOrigin(headers);
}
