/**
 * SEO Analyzer - Main Entry Point
 * 
 * Production-grade SEO analysis engine for modern Next.js websites.
 * Handles SSR, streaming, and dynamic content correctly.
 * 
 * @module seo-analyzer
 */

import { fetchHTML, isFetchError, validateUrl } from "./fetchHTML";
import { parseContent, isParseError } from "./parseContent";
import { runChecks, calculateScore, extractMetrics } from "./calculateScore";
import type { SEOAnalysisResult, AnalyzerError } from "./types";

// Re-export types for consumers
export type {
  SEOAnalysisResult,
  SEOCheck,
  SEOMetrics,
  MetaTags,
  AnalyzerError,
} from "./types";

// Re-export utilities
export { validateUrl } from "./fetchHTML";

/**
 * Analyzes a URL for SEO best practices
 * 
 * @param url - The HTTPS URL to analyze
 * @returns Analysis result or error
 * 
 * @example
 * ```typescript
 * const result = await analyzeSEO("https://example.com");
 * if ("score" in result) {
 *   console.log(`SEO Score: ${result.score}/100`);
 * } else {
 *   console.error(`Error: ${result.message}`);
 * }
 * ```
 */
export async function analyzeSEO(url: string): Promise<SEOAnalysisResult | AnalyzerError> {
  const startTime = Date.now();

  // Step 1: Fetch HTML
  const fetchResult = await fetchHTML(url);
  if (isFetchError(fetchResult)) {
    return fetchResult;
  }

  // Step 2: Parse content
  const parseResult = parseContent(fetchResult.html);
  if (isParseError(parseResult)) {
    return parseResult;
  }

  // Step 3: Run SEO checks
  const checks = runChecks(parseResult);

  // Step 4: Calculate score
  const score = calculateScore(checks);

  // Step 5: Extract metrics
  const metrics = extractMetrics(parseResult);

  // Build final result
  const duration = Date.now() - startTime;

  return {
    score,
    checks,
    metrics,
    meta: parseResult.meta,
    url: fetchResult.finalUrl,
    analyzedAt: new Date().toISOString(),
    duration,
  };
}

/**
 * Type guard to check if result is an error
 */
export function isAnalysisError(
  result: SEOAnalysisResult | AnalyzerError
): result is AnalyzerError {
  return "code" in result && "message" in result && !("score" in result);
}

/**
 * Get a summary label for the score
 */
export function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Needs Improvement";
  if (score >= 30) return "Poor";
  return "Critical";
}

/**
 * Get score color class for UI
 */
export function getScoreColor(score: number): string {
  if (score >= 90) return "text-emerald-500";
  if (score >= 70) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  if (score >= 30) return "text-orange-500";
  return "text-red-500";
}
