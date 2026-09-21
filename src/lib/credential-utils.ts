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
 * Uses UTC to avoid timezone shifts and React hydration mismatches.
 */
export function formatEditorialDate(dateInput: Date | string): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase();
    const year = d.getUTCFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return String(dateInput);
  }
}

/**
 * Format a date in standard full style: "August 23, 2026".
 * Uses UTC to avoid timezone shifts and React hydration mismatches.
 */
export function formatFullDate(dateInput: Date | string): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return String(dateInput);
  }
}

/**
 * Format validity expiration style: "August 2028".
 * Uses UTC to avoid timezone shifts and React hydration mismatches.
 */
export function formatValidityDate(dateInput: Date | string): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return String(dateInput);
  }
}

/**
 * Format a date in card style: "Aug 26, 2026".
 * Uses UTC to avoid timezone shifts and React hydration mismatches.
 */
export function formatCardDate(dateInput: Date | string): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return String(dateInput);
  }
}

