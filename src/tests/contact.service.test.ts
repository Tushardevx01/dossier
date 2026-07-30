import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/services/contact/contact.rateLimit", () => ({
  checkRateLimit: vi.fn(),
  createRateLimitKey: vi.fn(() => "contact:127.0.0.1"),
}));

vi.mock("@/services/email/email.transport", () => ({
  sendEmail: vi.fn(),
}));

vi.mock("@/services/email/email.templates", () => ({
  renderContactEmail: vi.fn(() => "<p>Contact email</p>"),
  renderContactNotificationEmail: vi.fn(() => "<p>Notification email</p>"),
}));

vi.mock("@/services/email/email.verification", () => ({
  verifyEmailAddress: vi.fn(),
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    exception: vi.fn(),
  },
}));

import { processContactSubmission } from "@/services/contact/contact.service";
import { checkRateLimit } from "@/services/contact/contact.rateLimit";
import { sendEmail } from "@/services/email/email.transport";
import { verifyEmailAddress } from "@/services/email/email.verification";

const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedSendEmail = vi.mocked(sendEmail);
const mockedVerifyEmailAddress = vi.mocked(verifyEmailAddress);

describe("contact service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedCheckRateLimit.mockResolvedValue({ allowed: true, remaining: 4, retryAfterSeconds: 0 });
    mockedSendEmail.mockResolvedValue({ success: true, messageId: "message-1" });
  });

  it("continues sending when email verification fails", async () => {
    mockedVerifyEmailAddress.mockResolvedValue({ valid: false });

    const result = await processContactSubmission(
      {
        requestId: "req-1",
        clientIdentifier: "127.0.0.1",
        body: {
          senderName: "Tushar",
          senderEmail: "sender@example.com",
          reasonToContact: "Collaboration",
          senderMsg: "Hello there",
          website: "",
        },
      },
      {
        emailApiKey: "api-key",
        emailFrom: "thetushardev0@gmail.com",
        emailPassword: "app-password",
      }
    );

    expect(result.success).toBe(true);
    expect(mockedVerifyEmailAddress).toHaveBeenCalledWith(
      "sender@example.com",
      "api-key",
      "req-1"
    );
    expect(mockedSendEmail).toHaveBeenCalledTimes(2);
  });

  it("returns 429 when rate limited", async () => {
    mockedCheckRateLimit.mockResolvedValue({ allowed: false, remaining: 0, retryAfterSeconds: 30 });

    const result = await processContactSubmission(
      {
        requestId: "req-2",
        clientIdentifier: "127.0.0.1",
        body: {
          senderName: "Tushar",
          senderEmail: "sender@example.com",
          reasonToContact: "Collaboration",
          senderMsg: "Hello there",
          website: "",
        },
      },
      {
        emailApiKey: "api-key",
        emailFrom: "thetushardev0@gmail.com",
        emailPassword: "app-password",
      }
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.statusCode).toBe(429);
      expect(result.error.code).toBe("RATE_LIMIT_EXCEEDED");
    }
    expect(mockedSendEmail).not.toHaveBeenCalled();
  });
});