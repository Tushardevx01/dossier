/**
 * Email Transport Service
 *
 * Handles email delivery infrastructure.
 * Isolated from business logic for testability.
 */

import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { logger } from "@/lib/logger";

let transporter: Transporter | null = null;

interface EmailConfig {
  from: string;
  password: string;
}

/**
 * Get or create email transporter (singleton)
 */
function getTransporter(config: EmailConfig): Transporter {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.from,
      pass: config.password,
    },
  });

  return transporter;
}

export interface EmailMessage {
  to: {
    name: string;
    address: string;
  };
  subject: string;
  html: string;
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
