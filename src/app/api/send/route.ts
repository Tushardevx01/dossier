import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render, pretty } from "@react-email/render";
import validator from "validator";

import { EmailTemplate } from "@/components/template/Email";
import { getServerEnv } from "@/lib/env.server";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const ALLOWED_REASONS = new Set([
  "Collaboration",
  "Project Discussion",
  "Hiring Opportunity",
  "Technical Conversation",
]);

const MAX_NAME_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 3000;
const MAX_EMAIL_LENGTH = 254;
const MAX_BODY_LENGTH_BYTES = 12_000;

function sanitizeText(value: string, maxLength: number): string {
  return validator.stripLow(value, true).trim().slice(0, maxLength);
}

function sanitizeEmail(value: string): string {
  return sanitizeText(value, MAX_EMAIL_LENGTH).replace(/[\r\n]/g, "").toLowerCase();
}

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function isOriginAllowed(request: Request): boolean {
  const originHeader = request.headers.get("origin");
  if (!originHeader) {
    return true;
  }

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) {
    return false;
  }

  try {
    const origin = new URL(originHeader);
    return origin.host === host;
  } catch {
    return false;
  }
}

function jsonResponse(payload: Record<string, string>, status: number, extraHeaders?: Record<string, string>) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

export async function POST(request: Request) {
  if (!isOriginAllowed(request)) {
    return jsonResponse({ error: "Forbidden origin" }, 403);
  }

  const rateLimit = checkRateLimit(
    `contact:${getClientIdentifier(request)}`,
    5,
    60_000
  );

  if (!rateLimit.allowed) {
    return jsonResponse(
      { error: "Too many requests. Please try again later." },
      429,
      {
        "Retry-After": String(rateLimit.retryAfterSeconds),
      }
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Unsupported content type" }, 415);
  }

  const rawBody = await request.text();
  if (!rawBody || rawBody.length > MAX_BODY_LENGTH_BYTES) {
    return jsonResponse({ error: "Invalid request payload" }, 400);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Malformed JSON payload" }, 400);
  }

  if (!body || typeof body !== "object") {
    return jsonResponse({ error: "Invalid input data" }, 400);
  }

  const { senderName, senderEmail, reasonToContact, senderMsg, website } = body as {
    senderName?: unknown;
    senderEmail?: unknown;
    reasonToContact?: unknown;
    senderMsg?: unknown;
    website?: unknown;
  };

  if (typeof website === "string" && website.trim().length > 0) {
    return jsonResponse({ message: "Message received" }, 200);
  }

  if (
    !senderName ||
    !senderEmail ||
    !reasonToContact ||
    !senderMsg ||
    typeof senderName !== "string" ||
    typeof senderEmail !== "string" ||
    typeof reasonToContact !== "string" ||
    typeof senderMsg !== "string"
  ) {
    return jsonResponse({ error: "Invalid input data" }, 400);
  }

  const sanitizedName = sanitizeText(senderName, MAX_NAME_LENGTH);
  const sanitizedEmail = sanitizeEmail(senderEmail);
  const sanitizedReason = sanitizeText(reasonToContact, 60);
  const sanitizedMessage = sanitizeText(senderMsg, MAX_MESSAGE_LENGTH);

  if (
    !sanitizedName ||
    !sanitizedEmail ||
    !sanitizedReason ||
    !sanitizedMessage
  ) {
    return jsonResponse({ error: "Invalid input data" }, 400);
  }

  if (
    !validator.isEmail(sanitizedEmail, {
      allow_utf8_local_part: false,
      require_tld: true,
    })
  ) {
    return jsonResponse(
      { error: "Email format is not valid" },
      400
    );
  }

  if (!ALLOWED_REASONS.has(sanitizedReason)) {
    return jsonResponse({ error: "Unsupported contact reason" }, 400);
  }

  let env: ReturnType<typeof getServerEnv>;
  try {
    env = getServerEnv();
  } catch {
    return jsonResponse({ error: "Server configuration error" }, 500);
  }

  try {
    const verificationController = new AbortController();
    const timeoutId = setTimeout(() => verificationController.abort(), 4000);

    const qevResponse = await fetch(
      `https://api.quickemailverification.com/v1/verify?email=${encodeURIComponent(
        sanitizedEmail
      )}&apikey=${env.QEV_API_KEY}`,
      {
        signal: verificationController.signal,
        cache: "no-store",
      }
    );
    clearTimeout(timeoutId);

    if (!qevResponse.ok) {
      return jsonResponse(
        { error: "Email validation service unavailable" },
        503
      );
    }

    const data = await qevResponse.json();

    if (data.result !== "valid") {
      return jsonResponse(
        { error: "Email address is not valid" },
        400
      );
    }
  } catch {
    return jsonResponse(
      { error: "Email validation service unavailable" },
      503
    );
  }

  const htmlContent = await pretty(
    await render(
      EmailTemplate({
        userName: sanitizedName,
        contactReason: sanitizedReason,
        userMessage: sanitizedMessage,
      })
    )
  );

  const message = {
    from: `"Tushar Kanti Dey - Contact Team" <${env.EMAIL_FROM}>`,
    to: {
      name: sanitizedName,
      address: sanitizedEmail,
    },
    subject: "Your message has landed! 🚀 We'll get back to you shortly",
    html: htmlContent,
    headers: {
      "X-Entity-Ref-ID": "newmail",
    },
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL_FROM,
      pass: env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail(message);
    return jsonResponse(
      {
        message: "Message has been sent successfully",
      },
      200
    );
  } catch {
    return jsonResponse(
      { error: "Failed to send email" },
      500
    );
  }
}