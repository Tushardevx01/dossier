/**
 * Email Transport Service
 *
 * Handles email delivery infrastructure.
 * Isolated from business logic for testability.
 */

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { logger } from "@/lib/logger";

interface EmailConfig {
  from: string;
  password: string;
}

/**
 * Create a fresh transporter per send operation.
 * Avoids stale credentials/config across runtime updates.
 */
function getTransporter(config: EmailConfig): Transporter {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.from,
      pass: config.password,
    },
  });
}

export interface EmailMessage {
  to: {
    name: string;
    address: string;
  };
  subject: string;
  html: string;
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send an email via configured transport
 */
export async function sendEmail(
  message: EmailMessage,
  config: EmailConfig
): Promise<SendEmailResult> {
  const transport = getTransporter(config);

  try {
    const info = await transport.sendMail({
      from: `"Tushar Kanti Dey - Contact Team" <${config.from}>`,
      to: message.to,
      subject: message.subject,
      html: message.html,
      replyTo: message.replyTo,
      headers: {
        "X-Entity-Ref-ID": "newmail",
      },
    });

    logger.info("Email sent successfully", { messageId: info.messageId });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logger.error("Failed to send email", { error: errorMessage });
    return { success: false, error: errorMessage };
  }
}
