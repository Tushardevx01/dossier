/**
 * Email Service Exports
 */

export { sendEmail } from "./email.transport";
export type { EmailMessage, SendEmailResult } from "./email.transport";

export { renderContactEmail } from "./email.templates";
export type { ContactEmailData } from "./email.templates";

export { verifyEmailAddress } from "./email.verification";
export type { VerificationResult } from "./email.verification";
