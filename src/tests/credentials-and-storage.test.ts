import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  detectMimeFromMagicBytes,
  validateCredentialFile,
  generateSafeStorageKey,
} from "@/lib/storage/validation";
import {
  extractR2Key,
  getPublicUrl,
  isR2Configured,
} from "@/lib/storage/r2";
import { validateAdminRequest } from "@/lib/security/auth";

describe("Credential Storage Validation", () => {
  it("detects PDF magic bytes accurately", () => {
    const pdfBuffer = Buffer.from("%PDF-1.7 standard header");
    const result = detectMimeFromMagicBytes(pdfBuffer);
    expect(result).toEqual({ mimeType: "application/pdf", extension: "pdf" });
  });

  it("detects PNG magic bytes accurately", () => {
    const pngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x00]);
    const result = detectMimeFromMagicBytes(pngBuffer);
    expect(result).toEqual({ mimeType: "image/png", extension: "png" });
  });

  it("detects JPEG magic bytes accurately", () => {
    const jpegBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
    const result = detectMimeFromMagicBytes(jpegBuffer);
    expect(result).toEqual({ mimeType: "image/jpeg", extension: "jpg" });
  });

  it("detects WEBP magic bytes accurately", () => {
    const webpBuffer = Buffer.from([
      0x52, 0x49, 0x46, 0x46, // RIFF
      0x20, 0x00, 0x00, 0x00,
      0x57, 0x45, 0x42, 0x50, // WEBP
    ]);
    const result = detectMimeFromMagicBytes(webpBuffer);
    expect(result).toEqual({ mimeType: "image/webp", extension: "webp" });
  });

  it("rejects invalid or corrupted magic bytes even with valid extension", async () => {
    const fakePdf = Buffer.from("NOT_A_REAL_PDF_HEADER_CONTENT");
    await expect(
      validateCredentialFile(fakePdf, { allowedTypes: ["pdf"] })
    ).rejects.toThrow(/File content does not match any accepted format/);
  });

  it("rejects files exceeding size limit", async () => {
    const bigBuffer = Buffer.alloc(200);
    await expect(
      validateCredentialFile(bigBuffer, { maxSizeBytes: 100 })
    ).rejects.toThrow(/File size exceeds/);
  });

  it("generates safe, normalized R2 storage keys", () => {
    const key = generateSafeStorageKey("cert-123", "certificate", "pdf");
    expect(key).toMatch(/^credentials\/cert-123\/certificate-\d+\.pdf$/);

    // Sanitizes traversal and weird characters
    const dirtyKey = generateSafeStorageKey("../../../etc/passwd", "thumbnail", ".png");
    expect(dirtyKey).not.toContain("..");
    expect(dirtyKey).toMatch(/^credentials\/etcpasswd\/thumbnail-\d+\.png$/);
  });
});

describe("Cloudflare R2 Abstraction", () => {
  it("extracts R2 key from full public URL", () => {
    const url = "https://pub-12345.r2.dev/credentials/42/certificate-1718000.pdf";
    expect(extractR2Key(url)).toBe("credentials/42/certificate-1718000.pdf");
  });

  it("extracts R2 key from already-clean relative key", () => {
    const key = "credentials/42/certificate-1718000.pdf";
    expect(extractR2Key(key)).toBe("credentials/42/certificate-1718000.pdf");
  });

  it("handles leading slashes gracefully", () => {
    const key = "/credentials/42/thumbnail.webp";
    expect(extractR2Key(key)).toBe("credentials/42/thumbnail.webp");
  });

  it("constructs public URL when R2_PUBLIC_URL is configured", () => {
    const original = process.env.R2_PUBLIC_URL;
    process.env.R2_PUBLIC_URL = "https://assets.example.com";

    expect(getPublicUrl("credentials/99/cert.pdf")).toBe(
      "https://assets.example.com/credentials/99/cert.pdf"
    );

    process.env.R2_PUBLIC_URL = original;
  });

  it("reports isR2Configured as false when env variables are empty", () => {
    const origAcc = process.env.R2_ACCOUNT_ID;
    delete process.env.R2_ACCOUNT_ID;

    expect(isR2Configured()).toBe(false);

    process.env.R2_ACCOUNT_ID = origAcc;
  });
});

describe("Admin Authorization for Credentials", () => {
  const originalAdminKey = process.env.ADMIN_API_KEY;

  beforeEach(() => {
    process.env.ADMIN_API_KEY = "test-super-secret-admin-key-98765";
  });

  afterEach(() => {
    process.env.ADMIN_API_KEY = originalAdminKey;
  });

  it("rejects unauthenticated requests", async () => {
    const req = new Request("http://localhost:3000/api/credentials", {
      method: "POST",
    });

    const result = await validateAdminRequest(req);
    expect(result.authorized).toBe(false);
  });

  it("authorizes requests with correct Bearer token matching ADMIN_API_KEY", async () => {
    const req = new Request("http://localhost:3000/api/credentials", {
      method: "POST",
      headers: {
        Authorization: "Bearer test-super-secret-admin-key-98765",
      },
    });

    const result = await validateAdminRequest(req);
    expect(result.authorized).toBe(true);
  });

  it("authorizes requests with correct X-API-Key matching ADMIN_API_KEY", async () => {
    const req = new Request("http://localhost:3000/api/credentials", {
      method: "POST",
      headers: {
        "x-api-key": "test-super-secret-admin-key-98765",
      },
    });

    const result = await validateAdminRequest(req);
    expect(result.authorized).toBe(true);
  });

  it("rejects requests with mismatched admin key", async () => {
    const req = new Request("http://localhost:3000/api/credentials", {
      method: "POST",
      headers: {
        Authorization: "Bearer invalid-admin-key",
      },
    });

    const result = await validateAdminRequest(req);
    expect(result.authorized).toBe(false);
  });

  it("handles alphanumeric credential IDs safely", () => {
    const key = generateSafeStorageKey("330877722AAI26OFA", "certificate", "pdf");
    expect(key).toMatch(/^credentials\/330877722AAI26OFA\/certificate-\d+\.pdf$/);
  });
});

describe("Credential Download Endpoint", () => {
  it("rejects invalid non-numeric ID parameter", async () => {
    const { GET } = await import("@/app/api/credentials/[id]/download/route");
    const req = new Request("http://localhost:3000/api/credentials/invalid/download");
    const res = await GET(req as unknown as import("next/server").NextRequest, {
      params: Promise.resolve({ id: "invalid" }),
    });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.error.code).toBe("INVALID_ID");
  });
});

describe("Credential Slug Utilities", () => {
  it("generates clean URL-safe slugs from titles", async () => {
    const { slugifyTitle } = await import("@/lib/credential-utils");

    expect(slugifyTitle("Agentic AI Certified Foundations Associate")).toBe(
      "agentic-ai-certified-foundations-associate"
    );
    expect(slugifyTitle("Google Cloud Certified: Professional Cloud Architect")).toBe(
      "google-cloud-certified-professional-cloud-architect"
    );
    expect(slugifyTitle("AWS Solutions Architect -- Associate (SAA-C03)!")).toBe(
      "aws-solutions-architect-associate-saa-c03"
    );
    expect(slugifyTitle("")).toBe("");
  });
});

describe("Credential Schema Validation", () => {
  it("validates a complete and correct credential input payload", async () => {
    const { CredentialJsonSchema } = await import("@/db/schema");

    const payload = {
      title: "Agentic AI Certified Foundations Associate",
      slug: "agentic-ai-certified-foundations-associate",
      issuer: "Oracle University",
      issueDate: "2026-08-23T00:00:00.000Z",
      objectLink: "https://pub-r2.example.com/credentials/agentic-ai.pdf",
      credentialLink: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=TEST",
      description: "Foundations of agentic systems and tool use.",
    };

    const parsed = CredentialJsonSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
  });

  it("fails validation when required fields are missing", async () => {
    const { CredentialJsonSchema } = await import("@/db/schema");

    const payload = {
      title: "Agentic AI Certified",
      // missing issuer, issueDate, objectLink
    };

    const parsed = CredentialJsonSchema.safeParse(payload);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      expect(fieldErrors).toHaveProperty("issuer");
      expect(fieldErrors).toHaveProperty("issueDate");
      expect(fieldErrors).toHaveProperty("objectLink");
    }
  });

  it("fails validation when issueDate is invalid", async () => {
    const { CredentialJsonSchema } = await import("@/db/schema");

    const payload = {
      title: "Agentic AI Certified",
      issuer: "Oracle University",
      issueDate: "invalid-date-string-not-a-date",
      objectLink: "credentials/1/certificate.pdf",
    };

    const parsed = CredentialJsonSchema.safeParse(payload);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.flatten().fieldErrors).toHaveProperty("issueDate");
    }
  });

  it("allows optional and nullable fields in update schema", async () => {
    const { UpdateCredentialJsonSchema } = await import("@/db/schema");

    const updatePayload = {
      issuer: "Updated Organization",
      credentialLink: null,
    };

    const parsed = UpdateCredentialJsonSchema.safeParse(updatePayload);
    expect(parsed.success).toBe(true);
  });

  it("supports large long-form markdown documents without artificial character limits", async () => {
    const { CredentialJsonSchema } = await import("@/db/schema");

    const largeMarkdown = "# Large Document\n\n" + "This is a detailed technical write-up. ".repeat(500);
    const payload = {
      title: "Agentic AI Certified Foundations Associate",
      issuer: "Oracle University",
      issueDate: "2026-08-23T00:00:00.000Z",
      objectLink: "credentials/1/certificate.pdf",
      description: largeMarkdown,
    };

    const parsed = CredentialJsonSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
  });
});

describe("Markdown Renderer & Security Sanitization", () => {
  it("renders headings, lists, tables, code blocks, and blockquotes to semantic HTML", async () => {
    const { renderMarkdownToHtml } = await import("@/lib/markdown");

    const markdown = `
# Title Heading

## Section Overview

This is an **agentic certification** article with *italic* text and \`inline_code\`.

- Point A
- Point B

1. First step
2. Second step

> Note regarding verification

| Key | Value |
|---|---|
| Issuer | Oracle University |
| Year | 2026 |

\`\`\`json
{ "certified": true }
\`\`\`

---

[View External](https://example.com)
`;

    const html = renderMarkdownToHtml(markdown);

    expect(html).toContain("<h1");
    expect(html).toContain("<h2");
    expect(html).toContain("<strong");
    expect(html).toContain("<em");
    expect(html).toContain("<code");
    expect(html).toContain("<ul");
    expect(html).toContain("<ol");
    expect(html).toContain("<blockquote");
    expect(html).toContain("<table");
    expect(html).toContain("<th");
    expect(html).toContain("<td");
    expect(html).toContain("<pre");
    expect(html).toContain("<hr");
    expect(html).toContain('<a href="https://example.com" target="_blank" rel="noopener noreferrer"');
  });

  it("sanitizes malicious script tags and event handlers to prevent XSS", async () => {
    const { renderMarkdownToHtml } = await import("@/lib/markdown");

    const malicious = `
## Safe Heading

<script>alert("xss")</script>
<img src="x" onerror="alert(1)" />
[Malicious Link](javascript:alert(1))
`;

    const html = renderMarkdownToHtml(malicious);

    expect(html).not.toContain("<script>");
    expect(html).not.toContain("alert");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("javascript:");
  });

  it("strips markdown syntax into clean plain text for card previews", async () => {
    const { stripMarkdown } = await import("@/lib/markdown");

    const markdown = `## Overview\n\nThis is **bold** and has [a link](https://example.com) and \`code\`.\n\n- Bullet item`;
    const clean = stripMarkdown(markdown);

    expect(clean).toBe("Overview This is bold and has a link and code. Bullet item");
    expect(clean).not.toContain("##");
    expect(clean).not.toContain("**");
    expect(clean).not.toContain("`");
    expect(clean).not.toContain("- Bullet");
  });
});


