/**
 * Email Templates
 *
 * Render and format email templates.
 * Separated from transport for easy testing and modification.
 */

import { generateContactConfirmationEmail } from "./templates";

export interface ContactEmailData {
  userName: string;
  contactReason: string;
  userMessage: string;
  requestId: string;
}

/**
 * Render contact confirmation email to HTML
 */
export function renderContactEmail(data: ContactEmailData): string {
  return generateContactConfirmationEmail({
    name: data.userName,
    inquiryType: data.contactReason,
    message: data.userMessage,
    requestId: data.requestId,
  });
}
