/**
 * Content Parser Module
 * 
 * Extracts and normalizes visible content from HTML using Cheerio.
 * Handles modern Next.js SSR/streaming sites correctly.
 */

import { load } from "cheerio";
import type { ParsedContent, MetaTags, HeadingStructure, AnalyzerError } from "./types";

/** Cheerio document type */
type CheerioDocument = ReturnType<typeof load>;

/** Tags to remove before content extraction */
const REMOVE_TAGS = ["script", "style", "noscript", "svg", "iframe", "template", "canvas"];

/** Attributes that contain hidden content */
const HIDDEN_SELECTORS = [
  "[hidden]",
  "[aria-hidden='true']",
  ".sr-only",
  ".visually-hidden",
  "[style*='display: none']",
  "[style*='display:none']",
  "[style*='visibility: hidden']",
  "[style*='visibility:hidden']",
];

/**
 * Extracts meta tags from the document head
 */
function extractMetaTags($: CheerioDocument): MetaTags {
  const getMeta = (selector: string): string | null => {
    const content = $(selector).attr("content");
    return content ? content.trim() : null;
  };

  return {
    title: $("title").first().text().trim() || null,
    description: getMeta('meta[name="description"]'),
    ogTitle: getMeta('meta[property="og:title"]'),
    ogDescription: getMeta('meta[property="og:description"]'),
    ogImage: getMeta('meta[property="og:image"]'),
    canonical: $('link[rel="canonical"]').attr("href")?.trim() || null,
    robots: getMeta('meta[name="robots"]'),
  };
}

/**
 * Extracts heading structure from the document
 */
function extractHeadings($: CheerioDocument): HeadingStructure {
  const getHeadings = (tag: string): string[] => {
    const headings: string[] = [];
    $(tag).each((_, el) => {
      const text = $(el).text().trim();
      if (text) {
        headings.push(text);
      }
    });
    return headings;
  };

  return {
    h1: getHeadings("h1"),
    h2: getHeadings("h2"),
    h3: getHeadings("h3"),
  };
}

/**
 * Analyzes images for alt attribute presence
 */
function analyzeImages($: CheerioDocument): { total: number; withAlt: number; withoutAlt: number } {
  const images = $("img");
  let withAlt = 0;
  let withoutAlt = 0;

  images.each((_, el) => {
    const alt = $(el).attr("alt");
    // Alt must exist and not be empty
    if (alt !== undefined && alt.trim().length > 0) {
      withAlt++;
    } else {
      withoutAlt++;
    }
  });

  return {
    total: images.length,
    withAlt,
    withoutAlt,
  };
}

/**
 * Normalizes whitespace in text
 */
function normalizeText(text: string): string {
  return text
    .replace(/[\r\n\t]+/g, " ") // Replace newlines/tabs with space
    .replace(/\s+/g, " ")       // Collapse multiple spaces
    .trim();
}

/**
 * Counts words in normalized text
 */
function countWords(text: string): number {
  if (!text) return 0;
  // Split on whitespace and filter empty strings
  const words = text.split(/\s+/).filter((word) => word.length > 0);
  return words.length;
}

/**
 * Parses HTML and extracts structured content
 */
export function parseContent(html: string): ParsedContent | AnalyzerError {
  if (!html || typeof html !== "string") {
    return {
      code: "PARSE_ERROR",
      message: "Invalid HTML input",
      details: "HTML content is required",
    };
  }

  try {
    // Load HTML into Cheerio
    const $ = load(html);

    // Remove non-visible elements
    REMOVE_TAGS.forEach((tag) => {
      $(tag).remove();
    });

    // Remove hidden elements
    HIDDEN_SELECTORS.forEach((selector) => {
      $(selector).remove();
    });

    // Extract meta tags (before body manipulation)
    const meta = extractMetaTags($);

    // Extract headings
    const headings = extractHeadings($);

    // Analyze images
    const images = analyzeImages($);

    // Extract visible body text
    const bodyText = $("body").text();
    const normalizedText = normalizeText(bodyText);
    const wordCount = countWords(normalizedText);

    return {
      text: normalizedText,
      wordCount,
      meta,
      headings,
      images,
      rawHtmlLength: html.length,
    };
  } catch (error) {
    return {
      code: "PARSE_ERROR",
      message: "Failed to parse HTML content",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Type guard to check if result is an error
 */
export function isParseError(result: ParsedContent | AnalyzerError): result is AnalyzerError {
  return "code" in result && "message" in result && !("text" in result);
}
