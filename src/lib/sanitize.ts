/**
 * HTML Sanitization Utility
 *
 * Prevents XSS attacks by sanitizing user-generated or database HTML content.
 * Uses sanitize-html which is pure JS and works reliably in Edge/Serverless environments.
 */

import sanitizeHtmlLib from "sanitize-html";

/**
 * Configuration for HTML sanitization
 * Allows formatting tags but prevents script execution and malicious attributes
 */
const SANITIZE_CONFIG = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "br", "span", "strong", "em", "i", "b", "u",
    "a", "ul", "ol", "li", "blockquote", "pre", "code",
    "table", "thead", "tbody", "tr", "th", "td",
    "img", "figure", "figcaption", "div", "section", "article",
  ],
  allowedAttributes: {
    "*": ["class"],
    "a": ["href", "title", "target", "rel"],
    "img": ["src", "alt"],
  },
};

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param html - Potentially unsafe HTML string
 * @returns Safe HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  return sanitizeHtmlLib(html, SANITIZE_CONFIG);
}

/**
 * Sanitize user input text (removes all HTML tags)
 *
 * @param text - Text that may contain HTML
 * @returns Plain text with HTML removed
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  return sanitizeHtmlLib(text, { allowedTags: [], allowedAttributes: {} });
}

/**
 * Check if HTML content contains potentially dangerous patterns
 * (deep defense - sanitization is primary defense)
 *
 * @param html - HTML to check
 * @returns true if suspicious patterns found
 */
export function containsSuspiciousPatterns(html: string): boolean {
  if (!html || typeof html !== "string") {
    return false;
  }

  // Check for script tags (should be removed by sanitizer, this is defense-in-depth)
  if (/<script\b/i.test(html)) return true;

  // Check for event handlers
  if (/on\w+\s*=/i.test(html)) return true;

  // Check for data URIs in href (can execute scripts)
  if (/href\s*=\s*['"]?data:/i.test(html)) return true;

  // Check for JavaScript protocol
  if (/href\s*=\s*['"]?javascript:/i.test(html)) return true;

  return false;
}
