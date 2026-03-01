/**
 * Contact Service Exports
 */

export { processContactSubmission, isValidBodySize, extractClientIdentifier, isOriginAllowed } from "./contact.service";
export type { ContactServiceConfig, ContactRequest, ContactResult } from "./contact.service";

export { validateContactForm, ContactFormSchema, ALLOWED_CONTACT_REASONS } from "./contact.schema";
export type { ContactFormInput, ContactReason } from "./contact.schema";

export { checkRateLimit, createRateLimitKey } from "./contact.rateLimit";
export type { RateLimitResult } from "./contact.rateLimit";
