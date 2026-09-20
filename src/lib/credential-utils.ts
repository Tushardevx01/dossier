/**
 * Pure credential utilities safe for both client and server components.
 */

/**
 * Convert a credential title into a clean, URL-safe slug.
 *
 * Example:
 * "Agentic AI Certified Foundations Associate" -> "agentic-ai-certified-foundations-associate"
 */
export function slugifyTitle(title: string): string {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Format a date in uppercase editorial style: "23 AUG 2026".
 */
export function formatEditorialDate(dateInput: Date | string): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return String(dateInput);
  }
}

/**
 * Format a date in standard full style: "August 23, 2026".
 */
export function formatFullDate(dateInput: Date | string): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return String(dateInput);
  }
}

/**
 * Format validity expiration style: "August 2028".
 */
export function formatValidityDate(dateInput: Date | string): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(dateInput);
  }
}

