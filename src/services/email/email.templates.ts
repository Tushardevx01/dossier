/**
 * Email Templates
 *
 * Render and format email templates.
 * Separated from transport for easy testing and modification.
 */

import {
  generateContactConfirmationEmail,
  generateContactNotificationEmail,
} from "./templates";

export interface ContactEmailData {
  userName: string;
  contactReason: string;
  userMessage: string;
  requestId: string;
}

export interface ContactNotificationData {
  userName: string;
  userEmail: string;
  contactReason: string;
  userMessage: string;
  requestId: string;
}

/**
 * Render contact confirmation email to HTML (sent to user)
 */
export function renderContactEmail(data: ContactEmailData): string {
  return generateContactConfirmationEmail({
    name: data.userName,
    inquiryType: data.contactReason,
    message: data.userMessage,
    requestId: data.requestId,
  });
}

/**
 * Render contact notification email to HTML (sent to owner)
 */
export function renderContactNotificationEmail(data: ContactNotificationData): string {
  return generateContactNotificationEmail({
    name: data.userName,
    email: data.userEmail,
    inquiryType: data.contactReason,
    message: data.userMessage,
    requestId: data.requestId,
  });
}
