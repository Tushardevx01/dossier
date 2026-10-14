// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { createCredential } from "@/server/repositories/credentials";
import { deleteFromR2 } from "@/server/storage/r2";
import { POST } from "./route";

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("@/server/security/auth", () => ({
  validateAdminRequest: vi.fn(async () => ({ authorized: true })),
}));
vi.mock("@/server/security/rateLimit", () => ({
  checkRateLimit: vi.fn(async () => ({ allowed: true })),
  createRateLimitKey: vi.fn(() => "test"),
}));
vi.mock("@/server/repositories/credentials", () => ({
  createCredential: vi.fn(),
  getAllCredentials: vi.fn(),
  slugifyTitle: vi.fn(() => "test-certificate"),
}));
vi.mock("@/server/storage/r2", () => ({
  isR2Configured: vi.fn(() => true),
  uploadToR2: vi.fn(async () => ({
    key: "credentials/test/cert.pdf",
    url: "credentials/test/cert.pdf",
  })),
  deleteFromR2: vi.fn(async () => ({ success: true })),
}));

function uploadRequest() {
  const form = new FormData();
  form.set("title", "Test certificate");
  form.set("issuer", "Test issuer");
  form.set("issueDate", "2026-01-01");
  form.set(
    "certificate",
    new File(["%PDF-1.7 test certificate"], "certificate.pdf", {
      type: "application/pdf",
    }),
  );
  return new NextRequest("https://example.com/api/credentials", {
    method: "POST",
    body: form,
  });
}

describe("credential upload compensation", () => {
  beforeEach(() => vi.resetAllMocks());

  it("removes the uploaded asset when the database insert fails", async () => {
    vi.mocked(createCredential).mockRejectedValue(
      new Error("Database unavailable"),
    );
    const response = await POST(uploadRequest());
    expect(response.status).toBe(500);
    expect(deleteFromR2).toHaveBeenCalledWith("credentials/test/cert.pdf");
  });

  it("preserves a committed asset when cache invalidation fails", async () => {
    vi.mocked(createCredential).mockResolvedValue({
      slug: "test-certificate",
    } as Awaited<ReturnType<typeof createCredential>>);
    vi.mocked(revalidatePath).mockImplementation(() => {
      throw new Error("Cache unavailable");
    });
    const response = await POST(uploadRequest());
    expect(response.status).toBe(500);
    expect(createCredential).toHaveBeenCalledOnce();
    expect(deleteFromR2).not.toHaveBeenCalled();
  });
});
