/**
 * Score Calculator Module
 * 
 * Calculates SEO scores based on parsed content analysis.
 * Uses weighted scoring system with clear pass/fail criteria.
 */

import type { SEOCheck, SEOMetrics, ParsedContent } from "./types";

/** Score weight configuration */
const WEIGHTS = {
  TITLE_EXISTS: 10,
  TITLE_LENGTH_OPTIMAL: 10,
  META_EXISTS: 10,
  META_LENGTH_OPTIMAL: 10,
  SINGLE_H1: 15,
  HAS_H2: 10,
  WORD_COUNT_300: 15,
  WORD_COUNT_600_BONUS: 5,
  ALL_IMAGES_ALT: 10,
  CANONICAL_EXISTS: 5,
} as const;

/** Title length thresholds */
const TITLE_MIN = 30;
const TITLE_MAX = 60;

/** Meta description length thresholds */
const META_MIN = 120;
const META_MAX = 160;

/** Word count thresholds */
const WORDS_MIN = 300;
const WORDS_BONUS = 600;

/**
 * Creates a check result object
 */
function createCheck(
  id: string,
  name: string,
  passed: boolean,
  score: number,
  maxScore: number,
  message: string,
  severity: "critical" | "warning" | "info" = "warning"
): SEOCheck {
  return {
    id,
    name,
    passed,
    score: passed ? score : 0,
    maxScore,
    message,
    severity,
  };
}

/**
 * Runs all SEO checks against parsed content
 */
export function runChecks(content: ParsedContent): SEOCheck[] {
  const checks: SEOCheck[] = [];
  const { meta, headings, wordCount, images } = content;

  // 1. Title exists check
  const titleExists = meta.title !== null && meta.title.length > 0;
  checks.push(
    createCheck(
      "title-exists",
      "Title Tag",
      titleExists,
      WEIGHTS.TITLE_EXISTS,
      WEIGHTS.TITLE_EXISTS,
      titleExists
        ? `Title found: "${meta.title?.substring(0, 50)}${(meta.title?.length ?? 0) > 50 ? "..." : ""}"`
        : "Missing title tag - critical for SEO",
      "critical"
    )
  );

  // 2. Title length optimal
  const titleLen = meta.title?.length ?? 0;
  const titleOptimal = titleLen >= TITLE_MIN && titleLen <= TITLE_MAX;
  checks.push(
    createCheck(
      "title-length",
      "Title Length",
      titleOptimal,
      WEIGHTS.TITLE_LENGTH_OPTIMAL,
      WEIGHTS.TITLE_LENGTH_OPTIMAL,
      titleExists
        ? titleOptimal
          ? `Title length (${titleLen} chars) is optimal (${TITLE_MIN}-${TITLE_MAX})`
          : `Title length (${titleLen} chars) should be ${TITLE_MIN}-${TITLE_MAX} characters`
        : "Cannot check - no title found",
      "warning"
    )
  );

  // 3. Meta description exists
  const metaExists = meta.description !== null && meta.description.length > 0;
  checks.push(
    createCheck(
      "meta-exists",
      "Meta Description",
      metaExists,
      WEIGHTS.META_EXISTS,
      WEIGHTS.META_EXISTS,
      metaExists
        ? `Meta description found (${meta.description?.length} chars)`
        : "Missing meta description - important for click-through rates",
      "critical"
    )
  );

  // 4. Meta description length optimal
  const metaLen = meta.description?.length ?? 0;
  const metaOptimal = metaLen >= META_MIN && metaLen <= META_MAX;
  checks.push(
    createCheck(
      "meta-length",
      "Meta Description Length",
      metaOptimal,
      WEIGHTS.META_LENGTH_OPTIMAL,
      WEIGHTS.META_LENGTH_OPTIMAL,
      metaExists
        ? metaOptimal
          ? `Meta description length (${metaLen} chars) is optimal (${META_MIN}-${META_MAX})`
          : `Meta description (${metaLen} chars) should be ${META_MIN}-${META_MAX} characters`
        : "Cannot check - no meta description found",
      "warning"
    )
  );

  // 5. Exactly one H1
  const h1Count = headings.h1.length;
  const singleH1 = h1Count === 1;
  checks.push(
    createCheck(
      "single-h1",
      "Single H1 Tag",
      singleH1,
      WEIGHTS.SINGLE_H1,
      WEIGHTS.SINGLE_H1,
      singleH1
        ? `Found exactly 1 H1: "${headings.h1[0]?.substring(0, 40)}${(headings.h1[0]?.length ?? 0) > 40 ? "..." : ""}"`
        : h1Count === 0
          ? "No H1 tag found - every page needs exactly one H1"
          : `Found ${h1Count} H1 tags - page should have exactly one`,
      "critical"
    )
  );

  // 6. At least one H2
  const h2Count = headings.h2.length;
  const hasH2 = h2Count >= 1;
  checks.push(
    createCheck(
      "has-h2",
      "H2 Subheadings",
      hasH2,
      WEIGHTS.HAS_H2,
      WEIGHTS.HAS_H2,
      hasH2
        ? `Found ${h2Count} H2 subheading(s) providing content structure`
        : "No H2 tags found - add subheadings for better content structure",
      "warning"
    )
  );

  // 7. Word count > 300
  const hasMinWords = wordCount >= WORDS_MIN;
  checks.push(
    createCheck(
      "word-count-min",
      "Content Length",
      hasMinWords,
      WEIGHTS.WORD_COUNT_300,
      WEIGHTS.WORD_COUNT_300,
      hasMinWords
        ? `Found ${wordCount} words of visible content (minimum ${WORDS_MIN})`
        : `Only ${wordCount} words found - aim for at least ${WORDS_MIN} words`,
      "warning"
    )
  );

  // 8. Word count > 600 bonus
  const hasBonusWords = wordCount >= WORDS_BONUS;
  checks.push(
    createCheck(
      "word-count-bonus",
      "Extended Content",
      hasBonusWords,
      WEIGHTS.WORD_COUNT_600_BONUS,
      WEIGHTS.WORD_COUNT_600_BONUS,
      hasBonusWords
        ? `Excellent! ${wordCount} words exceeds recommended ${WORDS_BONUS}`
        : `Content has ${wordCount} words - ${WORDS_BONUS}+ words can improve rankings`,
      "info"
    )
  );

  // 9. All images have alt
  const allImagesHaveAlt = images.total === 0 || images.withoutAlt === 0;
  checks.push(
    createCheck(
      "images-alt",
      "Image Alt Text",
      allImagesHaveAlt,
      WEIGHTS.ALL_IMAGES_ALT,
      WEIGHTS.ALL_IMAGES_ALT,
      images.total === 0
        ? "No images found on page"
        : allImagesHaveAlt
          ? `All ${images.total} images have alt attributes`
          : `${images.withoutAlt} of ${images.total} images missing alt text`,
      images.withoutAlt > 0 ? "warning" : "info"
    )
  );

  // 10. Canonical tag exists
  const hasCanonical = meta.canonical !== null && meta.canonical.length > 0;
  checks.push(
    createCheck(
      "canonical",
      "Canonical URL",
      hasCanonical,
      WEIGHTS.CANONICAL_EXISTS,
      WEIGHTS.CANONICAL_EXISTS,
      hasCanonical
        ? `Canonical URL set: ${meta.canonical}`
        : "No canonical URL - helps prevent duplicate content issues",
      "info"
    )
  );

  return checks;
}

/**
 * Calculates total score from checks (capped at 100)
 */
export function calculateScore(checks: SEOCheck[]): number {
  const rawScore = checks.reduce((sum, check) => sum + check.score, 0);
  return Math.min(rawScore, 100);
}

/**
 * Extracts metrics from parsed content
 */
export function extractMetrics(content: ParsedContent): SEOMetrics {
  return {
    wordCount: content.wordCount,
    h1Count: content.headings.h1.length,
    h2Count: content.headings.h2.length,
    titleLength: content.meta.title?.length ?? 0,
    metaLength: content.meta.description?.length ?? 0,
    imageCount: content.images.total,
    imagesMissingAlt: content.images.withoutAlt,
  };
}
