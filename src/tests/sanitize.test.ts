import { describe, it, expect } from "vitest";
import {
  sanitizeHtml,
  sanitizeText,
  containsSuspiciousPatterns,
} from "@/lib/sanitize";

describe("sanitizeHtml", () => {
  it("returns empty string for non-string or empty input", () => {
    expect(sanitizeHtml("")).toBe("");
    expect(sanitizeHtml(undefined as unknown as string)).toBe("");
    expect(sanitizeHtml(null as unknown as string)).toBe("");
    expect(sanitizeHtml(123 as unknown as string)).toBe("");
  });

  it("preserves legitimate case-study formatting", () => {
    const input =
      '<section id="problem" class="space-y-3"><h2 class="text-2xl">Title</h2><p class="text-neutral-400">Body text</p></section>';
    expect(sanitizeHtml(input)).toBe(input);
  });

  it("preserves inline SVG primitives used by case-study icons", () => {
    const input =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><rect width="18" height="11" x="3" y="11" rx="2"></rect><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M4 14a1 1 0 0 1-.78-1.63"></path><line x1="12" x2="12" y1="8" y2="12"></line><polyline points="12 6 12 12 16 14"></polyline></svg>';
    const output = sanitizeHtml(input);
    expect(output).toContain("<circle");
    expect(output).toContain("<rect");
    expect(output).toContain("<ellipse");
    expect(output).toContain("<path");
    expect(output).toContain("<line");
    expect(output).toContain("<polyline");
  });

  it("strips script tags entirely", () => {
    const output = sanitizeHtml('<p>ok</p><script>alert(1)</script>');
    expect(output).not.toContain("<script");
    expect(output).not.toContain("alert(1)");
    expect(output).toContain("<p>ok</p>");
  });

  it("strips event-handler attributes", () => {
    const output = sanitizeHtml('<p onclick="alert(1)" onmouseover="alert(1)">x</p>');
    expect(output).not.toContain("onclick");
    expect(output).not.toContain("onmouseover");
    expect(output).not.toContain("alert(1)");
  });

  it("removes javascript: URLs from anchors", () => {
    const output = sanitizeHtml('<a href="javascript:alert(1)">click</a>');
    expect(output).not.toContain("javascript:");
    expect(output).toBe("<a>click</a>");
  });

  it("removes data: URLs from anchors", () => {
    const output = sanitizeHtml(
      '<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==">click</a>'
    );
    expect(output).not.toContain("data:");
    expect(output).toBe("<a>click</a>");
  });

  it("removes vbscript: URLs from anchors", () => {
    const output = sanitizeHtml('<a href="vbscript:msgbox(1)">click</a>');
    expect(output).not.toContain("vbscript:");
    expect(output).toBe("<a>click</a>");
  });

  it("keeps safe https URLs on anchors", () => {
    const output = sanitizeHtml('<a href="https://example.com/post" rel="noopener">link</a>');
    expect(output).toContain('href="https://example.com/post"');
  });

  it("keeps relative and fragment URLs on anchors (TOC links)", () => {
    expect(sanitizeHtml('<a href="#problem">Jump</a>')).toBe('<a href="#problem">Jump</a>');
    expect(sanitizeHtml('<a href="/work/aegis">Internal</a>')).toBe(
      '<a href="/work/aegis">Internal</a>'
    );
  });

  it("removes iframe, object, embed and form elements", () => {
    const malicious =
      '<iframe src="https://evil.example"></iframe><object data="x"></object><embed src="x"><form action="x"></form>';
    const output = sanitizeHtml(malicious);
    expect(output).not.toContain("<iframe");
    expect(output).not.toContain("<object");
    expect(output).not.toContain("<embed");
    expect(output).not.toContain("<form");
  });

  it("neutralizes malformed and nested XSS payloads", () => {
    const payloads = [
      "<<script>alert(1);//<</script>",
      "<img src=x onerror=alert(1)>",
      '<a href="jAvAsCrIpT:alert(1)">x</a>',
      '<a href="java\tscript:alert(1)">x</a>',
      "<scr<script>ipt>alert(1)</scr</script>ipt>",
      '<div style="background:url(javascript:alert(1))">x</div>',
    ];
    for (const payload of payloads) {
      const output = sanitizeHtml(payload);
      expect(output.toLowerCase()).not.toContain("javascript:");
      expect(output.toLowerCase()).not.toContain("<script");
      expect(output.toLowerCase()).not.toContain("onerror");
    }
  });

  it("allows data: URIs on img src but not on anchor href", () => {
    const img = sanitizeHtml('<img src="data:image/png;base64,iVBORw0KGgo=" alt="chart">');
    expect(img).toContain("data:image/png;base64");

    const anchor = sanitizeHtml('<a href="data:image/png;base64,iVBORw0KGgo=">x</a>');
    expect(anchor).not.toContain("data:");
  });
});

describe("sanitizeText", () => {
  it("strips all markup to plain text", () => {
    expect(sanitizeText("<p>Hello <b>world</b></p>")).toBe("Hello world");
    expect(sanitizeText('<img src=x onerror="alert(1)">')).not.toContain("onerror");
  });

  it("returns empty string for empty input", () => {
    expect(sanitizeText("")).toBe("");
  });
});

describe("containsSuspiciousPatterns", () => {
  it("flags script tags, event handlers, and dangerous URL schemes", () => {
    expect(containsSuspiciousPatterns("<script>alert(1)</script>")).toBe(true);
    expect(containsSuspiciousPatterns('<p onclick="x()">x</p>')).toBe(true);
    expect(containsSuspiciousPatterns('<a href="javascript:alert(1)">x</a>')).toBe(true);
    expect(containsSuspiciousPatterns('<a href="data:text/html,x">x</a>')).toBe(true);
  });

  it("does not flag clean case-study HTML", () => {
    expect(
      containsSuspiciousPatterns('<section id="approach"><h2>Approach</h2><p>text</p></section>')
    ).toBe(false);
  });

  it("returns false for empty input", () => {
    expect(containsSuspiciousPatterns("")).toBe(false);
  });
});
