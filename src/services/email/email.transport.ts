/**
 * Email Transport Service
 *
 * Handles email delivery infrastructure.
 * Isolated from business logic for testability.
 */

import dns from "node:dns/promises";
import net from "node:net";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { logger } from "@/lib/logger";

export interface EmailConfig {
  from: string;
  password: string;
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
 * Sanitize email credentials by stripping surrounding quotes and internal whitespace.
 * Prevents issues when environment variables are copied into cloud providers (like Vercel)
 * with quotation marks or formatted with spaces.
 */
function sanitizeConfig(config: EmailConfig): { from: string; password: string } {
  return {
    from: config.from.replace(/^["']|["']$/g, "").trim(),
    password: config.password.replace(/^["']|["']$/g, "").replace(/\s+/g, ""),
  };
}

/**
 * Resolve IPv4 address for SMTP host.
 * Serverless environments (like AWS Lambda / Vercel) frequently lack outbound IPv6 routing.
 * Pre-resolving to IPv4 prevents nodemailer from selecting an unreachable IPv6 address,
 * which causes 20-30s connection timeouts (ETIMEDOUT).
 */
async function resolveIpv4Host(hostname: string): Promise<string> {
  if (net.isIP(hostname)) {
    return hostname;
  }

  try {
    const addresses = await dns.resolve4(hostname);
    if (addresses && addresses.length > 0) {
      return addresses[Math.floor(Math.random() * addresses.length)];
    }
  } catch (err) {
    logger.warn("DNS resolve4 failed, falling back to hostname", {
      hostname,
      error: err instanceof Error ? err.message : String(err),
    });
  }

  return hostname;
}

/**
 * Create a transporter with serverless-friendly timeouts and explicit TLS options.
 */
function createTransporter(
  host: string,
  port: number,
  user: string,
  pass: string,
  servername: string
): Transporter {
  const isSecure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    requireTLS: !isSecure,
    auth: {
      user,
      pass,
    },
    tls: {
      servername,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
}

function isNetworkError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as Record<string, unknown> & Error;
  const code = String(err.code || "");
  const msg = String(err.message || "").toLowerCase();

  return (
    ["ETIMEDOUT", "ESOCKETTIMEDOUT", "ECONNREFUSED", "ECONNRESET", "EHOSTUNREACH", "ENOTFOUND"].includes(code) ||
    msg.includes("timeout") ||
    msg.includes("greeting never received") ||
    msg.includes("connection closed")
  );
}

/**
 * Send email via Resend HTTP API.
 * Preferred modern alternative for serverless platforms (Vercel) without SMTP hurdles.
 */
async function sendViaResend(
  message: EmailMessage,
  apiKey: string,
  fromEmail: string
): Promise<SendEmailResult> {
  try {
    const sender = process.env.RESEND_FROM || `Tushar Kanti Dey <onboarding@resend.dev>`;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: message.to.address,
        subject: message.subject,
        html: message.html,
        reply_to: message.replyTo,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data?.message || data?.error || `Resend error (${response.status})`;
      logger.error("Failed to send email via Resend", { error: errorMsg });
      return { success: false, error: String(errorMsg) };
    }

    logger.info("Email sent successfully via Resend", { messageId: data.id });
    return { success: true, messageId: data.id };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown Resend error";
    logger.error("Failed to send email via Resend", { error: errorMsg });
    return { success: false, error: errorMsg };
  }
}

/**
 * Send an email via configured transport with IPv4 resolution and fallback port support.
 */
export async function sendEmail(
  message: EmailMessage,
  config: EmailConfig
): Promise<SendEmailResult> {
  const { from: cleanFrom, password: cleanPass } = sanitizeConfig(config);

  if (process.env.RESEND_API_KEY) {
    return sendViaResend(message, process.env.RESEND_API_KEY, cleanFrom);
  }

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const resolvedHost = await resolveIpv4Host(smtpHost);

  const defaultPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
  const fallbackPort = defaultPort === 465 ? 587 : 465;

  let transport = createTransporter(resolvedHost, defaultPort, cleanFrom, cleanPass, smtpHost);

  try {
    const info = await transport.sendMail({
      from: `"Tushar Kanti Dey - Contact Team" <${cleanFrom}>`,
      to: message.to,
      subject: message.subject,
      html: message.html,
      replyTo: message.replyTo,
      headers: {
        "X-Entity-Ref-ID": crypto.randomUUID(),
      },
    });

    logger.info("Email sent successfully", { messageId: info.messageId, port: defaultPort });
    return { success: true, messageId: info.messageId };
  } catch (primaryError) {
    const errObj = primaryError as Record<string, unknown> & Error;
    const errorCode = String(errObj?.code || "");
    const errorMessage = errObj.message || "Unknown error";

    try {
      transport.close();
    } catch {
      // ignore
    }

    // Only retry on network/connection timeout errors, never on auth errors (e.g. EAUTH / 535)
    if (isNetworkError(primaryError) && defaultPort !== fallbackPort) {
      logger.warn("Primary SMTP connection failed, attempting fallback port", {
        primaryPort: defaultPort,
        fallbackPort,
        error: errorMessage,
        code: errorCode,
      });

      try {
        transport = createTransporter(resolvedHost, fallbackPort, cleanFrom, cleanPass, smtpHost);
        const info = await transport.sendMail({
          from: `"Tushar Kanti Dey - Contact Team" <${cleanFrom}>`,
          to: message.to,
          subject: message.subject,
          html: message.html,
          replyTo: message.replyTo,
          headers: {
            "X-Entity-Ref-ID": crypto.randomUUID(),
          },
        });

        logger.info("Email sent successfully via fallback port", {
          messageId: info.messageId,
          port: fallbackPort,
        });
        return { success: true, messageId: info.messageId };
      } catch (fallbackError) {
        const fbErrObj = fallbackError as Record<string, unknown> & Error;
        const fbErrorMessage = fbErrObj.message || "Fallback send failed";
        logger.error("Failed to send email via fallback port", {
          error: fbErrorMessage,
          code: fbErrObj?.code,
          command: fbErrObj?.command,
          response: fbErrObj?.response,
          port: fallbackPort,
        });
        return { success: false, error: fbErrorMessage };
      }
    }

    logger.error("Failed to send email", {
      error: errorMessage,
      code: errObj?.code,
      command: errObj?.command,
      response: errObj?.response,
      port: defaultPort,
    });
    const diagnostic = `[From: ${cleanFrom}, Pass: ${cleanPass.slice(0, 2)}***${cleanPass.slice(-2)} (len:${cleanPass.length})] - ${errorMessage}`;
    return { success: false, error: diagnostic };
  } finally {
    try {
      transport.close();
    } catch {
      // ignore
    }
  }
}
