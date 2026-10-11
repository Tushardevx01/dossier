/**
 * SEO Analyzer Types
 * 
 * Type definitions for the production-grade SEO analysis engine.
 */

export interface SEOMetrics {
  /** Total word count of visible content */
  wordCount: number;
  /** Number of H1 tags found */
  h1Count: number;
  /** Number of H2 tags found */
  h2Count: number;
  /** Length of title tag content */
  titleLength: number;
  /** Length of meta description content */
  metaLength: number;
  /** Total images on page */
  imageCount: number;
  /** Images missing alt attribute */
  imagesMissingAlt: number;
}

export interface SEOCheck {
  /** Unique identifier for the check */
  id: string;
  /** Human-readable name */
  name: string;
  /** Pass/fail status */
  passed: boolean;
  /** Score contribution (0-15) */
  score: number;
  /** Maximum possible score for this check */
  maxScore: number;
  /** Detailed message */
  message: string;
  /** Severity level */
  severity: "critical" | "warning" | "info";
}

export interface MetaTags {
  /** Page title */
  title: string | null;
  /** Meta description */
  description: string | null;
  /** Open Graph title */
  ogTitle: string | null;
  /** Open Graph description */
  ogDescription: string | null;
  /** Open Graph image */
  ogImage: string | null;
  /** Canonical URL */
  canonical: string | null;
  /** Robots meta */
  robots: string | null;
}

export interface HeadingStructure {
  /** H1 tags content */
  h1: string[];
  /** H2 tags content */
  h2: string[];
  /** H3 tags content */
  h3: string[];
}

export interface ParsedContent {
  /** Cleaned visible text */
  text: string;
  /** Word count */
  wordCount: number;
  /** Extracted meta tags */
  meta: MetaTags;
  /** Heading structure */
  headings: HeadingStructure;
  /** Image analysis */
  images: {
    total: number;
    withAlt: number;
    withoutAlt: number;
  };
  /** Raw HTML for debugging */
  rawHtmlLength: number;
}

export interface SEOAnalysisResult {
  /** Overall SEO score (0-100) */
  score: number;
  /** Individual check results */
  checks: SEOCheck[];
  /** Quantitative metrics */
  metrics: SEOMetrics;
  /** Extracted meta information */
  meta: MetaTags;
  /** URL analyzed */
  url: string;
  /** Analysis timestamp */
  analyzedAt: string;
  /** Time taken to analyze (ms) */
  duration: number;
}

export interface FetchResult {
  /** Fetched HTML content */
  html: string;
  /** Final URL after redirects */
  finalUrl: string;
  /** HTTP status code */
  statusCode: number;
  /** Response headers */
  headers: Record<string, string>;
}

export interface AnalyzerError {
  /** Error code */
  code: "INVALID_URL" | "FETCH_FAILED" | "TIMEOUT" | "PARSE_ERROR" | "BLOCKED_URL";
  /** Human-readable message */
  message: string;
  /** Technical details */
  details?: string;
}
