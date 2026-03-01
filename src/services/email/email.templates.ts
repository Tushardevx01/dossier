/**
 * Email Templates
 *
 * Render and format email templates.
 * Separated from transport for easy testing and modification.
 */

import { render, pretty } from "@react-email/render";
import { EmailTemplate } from "@/components/template/Email";

export interface ContactEmailData {
  userName: string;
  contactReason: string;
  userMessage: string;
}

/**
 * Render contact confirmation email to HTML
 */
export async function renderContactEmail(data: ContactEmailData): Promise<string> {
  const htmlContent = await pretty(
    await render(
      EmailTemplate({
        userName: data.userName,
        contactReason: data.contactReason,
        userMessage: data.userMessage,
      })
    )
  );
  
  return htmlContent;
}
