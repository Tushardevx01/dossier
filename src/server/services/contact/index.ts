import "server-only";

/**
 * Contact Service Exports
 */

export { processContactSubmission, isValidBodySize, isOriginAllowed } from "./contact.service";
export type { ContactServiceConfig, ContactRequest, ContactResult } from "./contact.service";

export { validateContactForm, ContactFormSchema, ALLOWED_CONTACT_REASONS } from "@/schemas";
export type { ContactFormInput, ContactReason } from "@/schemas";

export { checkRateLimit, createRateLimitKey } from "./contact.rateLimit";
export type { RateLimitResult } from "./contact.rateLimit";

export { extractClientIdentifier } from "@/server/security/request";
