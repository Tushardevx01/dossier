/**
 * Case Study Database Content Parser
 *
 * Transforms serialized database HTML content into structured, type-safe data
 * representations for the case study editorial design system.
 *
 * Preserves 100% of the technical diagrams, ASCII art, engineering records,
 * architecture layers, tables, and narrative paragraphs without data loss.
 */

import * as cheerio from "cheerio";

export interface ParsedDiagram {
  id: string;
  title: string;
  badge: string;
  caption: string;
  ascii: string;
  rawHtml: string;
}

export interface ParsedChallenge {
  num: string;
  tag: string;
  title: string;
  desc: string;
  impact?: string;
}

export interface ParsedSolutionRecord {
  num: string;
  title: string;
  problem: string;
  constraint: string;
  solution: string;
  result: string;
  diagram?: ParsedDiagram;
}

export interface ParsedDecisionRecord {
  num: string;
  area: string;
  tech: string;
  why: string;
  tradeoff: string;
  outcome: string;
}

export interface ParsedOutcomeRecord {
  num: string;
  title: string;
  desc: string;
}

export interface ParsedTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface ParsedSupportingItem {
  num?: string;
  title: string;
  desc: string;
}

export type SectionPattern = "A" | "B" | "C" | "D" | "default";

export interface ParsedSection {
  id: string;
  number: string;
  title: string;
  badge?: string;
  sectionType:
    | "problem"
    | "approach"
    | "architecture"
    | "challenges"
    | "solutions"
    | "decisions"
    | "outcomes"
    | "states"
    | "workflow"
    | "security"
    | "validation"
    | "default";
  pattern: SectionPattern;
  intro: string[];
  readingText: string[];
  constraints: string[];
  diagrams: ParsedDiagram[];
  challenges: ParsedChallenge[];
  solutions: ParsedSolutionRecord[];
  decisions: ParsedDecisionRecord[];
  outcomes: ParsedOutcomeRecord[];
  tables: ParsedTable[];
  supportingItems: ParsedSupportingItem[];
  quote?: { text: string; role?: string };
  rawContentHtml: string;
}

export interface ParsedCaseStudy {
  sections: ParsedSection[];
  totalDiagrams: number;
}

/**
 * Extract clean ASCII diagram data from a container element
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractDiagram($: cheerio.CheerioAPI, $pre: cheerio.Cheerio<any>, index: number): ParsedDiagram {
  const $container = $pre.closest(".rounded-xl, .border, .bg-\\[\\#070709\\]");
  
  let title = $container.find(".border-b span.text-neutral-400, .border-b span.font-semibold, span.text-\\[11px\\], span.font-semibold").first().text().trim();
  if (!title) {
    title = $container.find(".border-b span").filter((_, el) => $(el).text().trim().length > 2).first().text().trim();
  }
  if (!title || title.length > 60) {
    const cardH = $pre.closest(".space-y-3, .space-y-4, .space-y-5, .p-5, .rounded-xl").find("h3, h4").first().text().trim();
    if (cardH) title = cardH;
  }

  // Pre-code content heuristics for concrete source files & functions
  const preText = $pre.text().trim();
  const firstLine = preText.split("\n")[0].trim();
  const commentMatch = firstLine.match(/^\/\/\s*([a-zA-Z0-9_\-\.\/]+)/);
  if (commentMatch) {
    title = commentMatch[1];
  } else if (!title || title.startsWith("SYSTEM FLOW")) {
    if (preText.startsWith("USER\n │\n ▼\nSUBSCRIPTION DATA")) {
      title = "SUBSCRIPTION DATA FLOW & REMINDER OFFSETS";
    } else if (firstLine.includes("findAvailablePort")) {
      title = "DYNAMIC PORT FALLBACK UTILITY (findAvailablePort)";
    } else if (firstLine.includes("gracefulShutdown")) {
      title = "ZERO-DOWNTIME GRACEFUL SHUTDOWN (gracefulShutdown)";
    } else if (firstLine.includes("subscriptionSchema.pre")) {
      title = "PRE-SAVE LIFECYCLE HOOK (subscription.model.js)";
    } else if (firstLine.includes("const authorize")) {
      title = "BEARER TOKEN GUARD (middlewares/auth.middleware.js)";
    } else if (firstLine.includes("sendReminders")) {
      title = "WORKFLOW CONTROLLER ENGINE (workflow.controller.js)";
    } else if (firstLine.includes("signUp")) {
      title = "AUTHENTICATION CONTROLLER (controllers/auth.controller.js)";
    }
  }
  if (!title) title = `SYSTEM FLOW ${index + 1}`;

  let badge = $container.find("span.text-\\[10px\\]").first().text().trim();
  if (!badge) {
    badge = $container.find(".border-b span.text-emerald-400, .border-b span.text-amber-400").first().text().trim();
  }
  if (!badge && commentMatch) {
    badge = "SOURCE CODE";
  }
  if (!badge && (firstLine.includes("const ") || firstLine.includes("function ") || firstLine.includes("export "))) {
    badge = "SOURCE CODE";
  }
  
  // Caption in bottom border
  let caption = "";
  const $bottomBar = $container.find(".border-t");
  if ($bottomBar.length > 0) {
    const $firstSpan = $bottomBar.find("span").first();
    caption = $firstSpan.text().trim();
  }

  const $divs = $pre.children("div");
  let ascii = "";
  if ($divs.length > 0) {
    ascii = $divs
      .map((_, el) => $(el).text())
      .get()
      .join("\n");
  } else {
    ascii = $pre.text();
  }
  let rawHtml = $pre.html() || "";

  // Defensive alignment check:
  // 1. If line 0 is a top-border box (starts with ┌ or ╭) unindented while next line is indented, align it.
  // 2. If line 0 is a short unindented title/label while a subsequent line has an indented stem (│, ↓, ▼), center it.
  if ($divs.length > 1) {
    const l0 = $divs.first().text();
    const l1 = $divs.eq(1).text();
    const l0Indent = l0.length - l0.trimStart().length;
    const l1Indent = l1.length - l1.trimStart().length;
    if (
      (l0.trimStart().startsWith("┌") || l0.trimStart().startsWith("╭")) &&
      l0Indent === 0 &&
      l1Indent > 2
    ) {
      const padding = " ".repeat(l1Indent);
      ascii = padding + ascii;
      rawHtml = rawHtml.replace(/(<span[^>]*>)([┌╭])/, `$1${padding}$2`);
    } else if (l0Indent === 0 && l0.trim().length > 0 && l0.trim().length < 25) {
      const l0Trim = l0.trim();
      for (let i = 1; i <= Math.min(3, $divs.length - 1); i++) {
        const lineText = $divs.eq(i).text();
        const stemIdx = lineText.search(/[│↓▼|]/);
        if (stemIdx >= 4) {
          const neededPadding = Math.max(0, Math.round(stemIdx - l0Trim.length / 2));
          if (neededPadding > 2) {
            const padding = " ".repeat(neededPadding);
            ascii = padding + ascii;
            rawHtml = rawHtml.replace(/(<span[^>]*>)([^<\s])/, `$1${padding}$2`);
          }
          break;
        }
      }
    }
  }

  return {
    id: `diagram-${index}`,
    title,
    badge,
    caption,
    ascii,
    rawHtml,
  };
}

/**
 * Parse an HTML string from the database into structured editorial sections
 */
export function parseCaseStudyContent(html: string): ParsedCaseStudy {
  if (!html || typeof html !== "string") {
    return { sections: [], totalDiagrams: 0 };
  }

  const $ = cheerio.load(html);
  const sections: ParsedSection[] = [];
  let totalDiagrams = 0;

  $("section").each((idx, secEl) => {
    const $sec = $(secEl);
    const id = $sec.attr("id") || `section-${idx}`;
    const rawHeading = $sec.find("h2, h3").first().text().trim();
    const title = rawHeading.replace(/^\s*\d+[\s/.-]*/, "").trim() || id.toUpperCase();
    const number = String(idx + 1).padStart(2, "0");

    // Optional badge from section heading
    const badge = $sec.find(".border-b span.text-emerald-400, .border-b span.text-neutral-500").first().text().trim();

    // Determine section type (exact ID match takes precedence over loose title substring)
    const lowerId = id.toLowerCase();
    const lowerTitle = title.toLowerCase();
    let sectionType: ParsedSection["sectionType"] = "default";

    if (lowerId === "problem") {
      sectionType = "problem";
    } else if (lowerId === "approach") {
      sectionType = "approach";
    } else if (
      lowerId === "architecture" ||
      lowerId === "data-model" ||
      lowerId === "api-surface" ||
      lowerId.includes("topology") ||
      lowerId.includes("architecture")
    ) {
      sectionType = "architecture";
    } else if (lowerId === "challenges") {
      sectionType = "challenges";
    } else if (
      lowerId === "solutions" ||
      lowerId.includes("solution") ||
      lowerId === "deep-dives"
    ) {
      sectionType = "solutions";
    } else if (
      lowerId === "decisions" ||
      lowerId === "tradeoffs" ||
      lowerId.includes("decision")
    ) {
      sectionType = "decisions";
    } else if (
      lowerId === "outcomes" ||
      lowerId === "results" ||
      lowerId === "metrics"
    ) {
      sectionType = "outcomes";
    } else if (
      lowerId.includes("state") ||
      lowerId.includes("interaction") ||
      lowerId.includes("lifecycle")
    ) {
      sectionType = "states";
    } else if (
      lowerId.includes("flow") ||
      lowerId.includes("workflow") ||
      lowerId.includes("execution") ||
      lowerId.includes("pipeline")
    ) {
      sectionType = "workflow";
    } else if (lowerId.includes("security") || lowerId.includes("safety")) {
      sectionType = "security";
    } else if (
      lowerId.includes("validation") ||
      lowerId.includes("rigor") ||
      lowerId.includes("evidence")
    ) {
      sectionType = "validation";
    } else if (lowerTitle.includes("problem")) {
      sectionType = "problem";
    } else if (lowerTitle.includes("approach")) {
      sectionType = "approach";
    } else if (lowerTitle.includes("architecture") || lowerTitle.includes("topology")) {
      sectionType = "architecture";
    } else if (lowerTitle.includes("engineering challenges") || lowerTitle === "challenges") {
      sectionType = "challenges";
    } else if (
      lowerTitle.includes("solutions") ||
      lowerTitle.includes("deep-dives") ||
      lowerTitle.includes("implementations grounded")
    ) {
      sectionType = "solutions";
    } else if (
      lowerTitle.includes("decisions") ||
      lowerTitle.includes("trade-offs") ||
      lowerTitle.includes("tradeoffs") ||
      lowerTitle.includes("rationale") ||
      lowerTitle.includes("why these technologies")
    ) {
      sectionType = "decisions";
    } else if (
      lowerTitle.includes("results") ||
      lowerTitle.includes("outcomes") ||
      lowerTitle.includes("measurable results") ||
      lowerTitle.includes("verified implementation metrics") ||
      lowerTitle.includes("engineering verification")
    ) {
      sectionType = "outcomes";
    } else if (lowerTitle.includes("state machine") || lowerTitle.includes("states")) {
      sectionType = "states";
    } else if (lowerTitle.includes("security") || lowerTitle.includes("defensive")) {
      sectionType = "security";
    } else if (lowerTitle.includes("rigor") || lowerTitle.includes("validation")) {
      sectionType = "validation";
    }

    // Assign varied editorial pattern
    let pattern: SectionPattern = "B";
    if (sectionType === "problem" || sectionType === "approach") {
      pattern = "A"; // Split layout
    } else if (sectionType === "architecture" || sectionType === "validation") {
      pattern = "B"; // Full-width breakout
    } else if (sectionType === "states" || lowerId.includes("ownership")) {
      pattern = "D"; // Paired states / side-by-side
    } else if (sectionType === "workflow" || sectionType === "security") {
      pattern = "C"; // Diagram top + details bottom
    }

    // Extract blockquote if present (e.g. philosophy section)
    let quote: { text: string; role?: string } | undefined;
    const $bq = $sec.find("blockquote");
    if ($bq.length > 0) {
      const qText = $bq.first().text().trim();
      const qRole = $sec.find("span.text-neutral-500, span.text-emerald-400").first().text().trim();
      quote = { text: qText, role: qRole || undefined };
    }

    // Extract intro and reading paragraphs
    const intro: string[] = [];
    const readingText: string[] = [];
    $sec.find("p").each((_, p) => {
      const $p = $(p);
      // Exclude diagram caption bars
      if ($p.closest(".border-t").length > 0) return;
      // Exclude pre tag contents
      if ($p.closest("pre").length > 0) return;
      // Exclude tables
      if ($p.closest("table").length > 0) return;
      // Exclude card contents if this section is specialized challenges/decisions/outcomes
      if (
        (sectionType === "challenges" ||
          sectionType === "solutions" ||
          sectionType === "decisions" ||
          sectionType === "outcomes") &&
        $p.closest(".grid > div, div.space-y-6 > div, div.space-y-4 > div").length > 0
      ) {
        return;
      }

      const text = $p.text().trim();
      if (text && !text.includes("SCROLL HORIZONTALLY") && !text.includes("HORIZONTAL SCROLL")) {
        if (intro.length === 0) {
          intro.push(text);
        } else if (!intro.includes(text) && !readingText.includes(text)) {
          readingText.push(text);
        }
      }
    });

    // Extract constraints / question lists (especially in problem sections)
    const constraints: string[] = [];
    $sec.find("ul li, ol li").each((_, li) => {
      const text = $(li).text().trim().replace(/^\?/, "").replace(/^•/, "").trim();
      if (text && !constraints.includes(text)) {
        constraints.push(text);
      }
    });

    // Check flex bullet lists (common in problem sections like subscription-tracker)
    if (constraints.length === 0) {
      $sec.find("div.flex.items-start, div.flex.items-center").each((_, itemEl) => {
        const $it = $(itemEl);
        if ($it.closest("pre, table").length > 0) return;
        const bullet = $it.find("span.text-emerald-400, span.text-neutral-500").first().text().trim();
        if (bullet === "•" || bullet === "-" || bullet === "→" || bullet === ">" || bullet === "▸") {
          const text = $it.text().replace(/^[•\->▸\s]+/, "").trim();
          if (text && text.length > 5 && !constraints.includes(text)) {
            constraints.push(text);
          }
        }
      });
    }

    // Fallback for card-based constraints in problem sections
    if (constraints.length === 0 && sectionType === "problem") {
      $sec.find("div.grid > div, div.space-y-4 > div, div.p-4.rounded-xl, .rounded-xl.border, div.rounded-xl").each((_, el) => {
        const $el = $(el);
        if ($el.closest("pre, table").length > 0 || $el.find("pre, table").length > 0) return;
        const cardTitle = $el
          .find("h3, h4, span.font-bold, span.font-semibold, div.font-bold, span.text-emerald-400, span.text-neutral-200")
          .first()
          .text()
          .trim();
        const cardDesc = $el.find("p").first().text().trim();
        const fullText = $el.text().trim().replace(/^•\s*/, "").replace(/\s+/g, " ");
        if (cardTitle && cardDesc) {
          const cleanDesc = cardDesc.replace(cardTitle, "").trim().replace(/^:\s*/, "");
          const cleanTitle = cardTitle.replace(/:\s*$/, "").trim();
          const item = cleanDesc ? `${cleanTitle}: ${cleanDesc}` : cleanTitle;
          if (!constraints.includes(item)) constraints.push(item);
        } else if (fullText && fullText.length > 10 && fullText.length < 500) {
          if (!constraints.includes(fullText)) constraints.push(fullText);
        }
      });
    }

    // Extract diagrams
    const diagrams: ParsedDiagram[] = [];
    $sec.find("pre").each((_, preEl) => {
      const diag = extractDiagram($, $(preEl), totalDiagrams);
      diagrams.push(diag);
      totalDiagrams++;
    });

    // Extract challenges (e.g. from challenges section cards)
    const challenges: ParsedChallenge[] = [];
    if (sectionType === "challenges") {
      const $cards = $sec.find(
        "div.grid > div, div.space-y-4 > div.p-5, div.space-y-4 > div.rounded-xl, div.space-y-6 > div.rounded-xl, div.space-y-6 > div.p-5"
      );
      $cards.each((cIdx, cardEl) => {
        const $c = $(cardEl);
        // Avoid inner sub-cards
        if ($c.parent().hasClass("grid") && $c.closest(".p-5, .rounded-xl").not($c).length > 0) return;

        const rawTitle = $c.find("h3, h4").first().text().trim();
        let title = rawTitle;
        let extractedNum = "";
        const numMatch = rawTitle.match(/^(\d+)[\.\s\-:]+(.*)/);
        if (numMatch) {
          extractedNum = numMatch[1].padStart(2, "0");
          title = numMatch[2].trim();
        }

        let num = extractedNum;
        if (!num) {
          const rawNum = $c
            .find("span.text-emerald-400, span.font-mono, span.text-amber-400")
            .filter((_, el) => !$(el).text().toLowerCase().includes("impact"))
            .first()
            .text()
            .trim();
          num = rawNum.replace(/^\/\/\s*/, "").replace(/^CHALLENGE\s*/i, "").trim();
        }
        if (!num || num.length > 5) num = String(cIdx + 1).padStart(2, "0");

        let tag = $c
          .find("span.text-neutral-500, span.text-emerald-400\\/90, span.text-\\[10px\\]")
          .filter((_, el) => !$(el).text().toLowerCase().includes("impact"))
          .first()
          .text()
          .trim();

        if (!tag || tag.toLowerCase().includes("impact")) {
          const titleUpper = title.toUpperCase();
          if (titleUpper.includes("TIMER") || titleUpper.includes("SCHEDUL")) tag = "SCHEDULING & CONCURRENCY";
          else if (titleUpper.includes("ATOMIC") || titleUpper.includes("REGISTRATION") || titleUpper.includes("TRANSACTION")) tag = "DATA INTEGRITY & TRANSACTIONS";
          else if (titleUpper.includes("RENEWAL") || titleUpper.includes("DRIFT") || titleUpper.includes("CYCLE") || titleUpper.includes("LIFECYCLE")) tag = "STATE & LIFECYCLE";
          else if (titleUpper.includes("ABUSE") || titleUpper.includes("SECURITY") || titleUpper.includes("EDGE") || titleUpper.includes("BOT")) tag = "EDGE SECURITY & RATE LIMITS";
          else if (titleUpper.includes("PORT") || titleUpper.includes("SHUTDOWN") || titleUpper.includes("PROCESS") || titleUpper.includes("TERMINATION")) tag = "RUNTIME & PROCESS RELIABILITY";
          else tag = "ENGINEERING CHALLENGE";
        }

        const desc = $c.find("p").first().text().trim();

        let impact = "";
        const $impactSpan = $c.find("span").filter((_, el) => $(el).text().trim().toLowerCase().startsWith("impact"));
        if ($impactSpan.length > 0) {
          const $valSpan = $impactSpan.next("span");
          if ($valSpan.length > 0) {
            impact = $valSpan.text().trim();
          } else {
            impact = $impactSpan.parent().text().replace($impactSpan.text(), "").trim();
          }
        }

        if (title || desc) {
          challenges.push({
            num,
            tag,
            title: title || `Challenge ${cIdx + 1}`,
            desc,
            impact: impact || undefined,
          });
        }
      });
    }

    // Extract solution records (Problem -> Constraint -> Solution -> Result)
    const solutions: ParsedSolutionRecord[] = [];
    if (sectionType === "solutions") {
      const $recContainers = $sec.find(
        "> div.space-y-6 > div, > div.space-y-4 > div, > div > div.p-5, > div > div.p-6, div.space-y-8 > div"
      );
      $recContainers.each((sIdx, recEl) => {
        const $r = $(recEl);
        if ($r.closest("pre").length > 0) return;

        let recTitle = $r.find("h3, h4").first().text().trim();
        if (!recTitle) {
          recTitle = $r
            .find("span.text-white.font-medium, span.text-white.font-semibold, span.font-semibold, div.text-emerald-400 span")
            .first()
            .text()
            .trim();
        }
        
        let num = $r
          .find("span.font-mono, span.text-emerald-400")
          .first()
          .text()
          .trim()
          .replace(/^\/\/\s*/, "");
        if (!num || num.length > 10) num = String(sIdx + 1).padStart(2, "0");

        let problemText = "";
        let constraintText = "";
        let solutionText = "";
        let resultText = "";

        $r.find("div.grid > div, div.space-y-1, div.space-y-1\\.5, div.space-y-3 > div").each((_, blockEl) => {
          const $b = $(blockEl);
          const label = $b.find("span").text().trim().toUpperCase();
          const pText = $b.find("p").text().trim();
          if (label.includes("PROBLEM")) problemText = pText;
          else if (label.includes("CONSTRAINT")) constraintText = pText;
          else if (
            label.includes("SOLUTION") ||
            label.includes("RESPONSE") ||
            label.includes("IMPLEMENTATION") ||
            label.includes("ENGINEERED")
          )
            solutionText = pText;
          else if (label.includes("RESULT") || label.includes("OUTCOME"))
            resultText = pText;
        });

        // Fallback for code-first solution records (like in Signifiya)
        if (!solutionText && !problemText) {
          const descP = $r.find("p").first().text().trim();
          if (descP) solutionText = descP;
        }

        let attachedDiagram: ParsedDiagram | undefined;
        const $pre = $r.find("pre");
        if ($pre.length > 0) {
          attachedDiagram = extractDiagram($, $pre.first(), totalDiagrams);
          totalDiagrams++;
        }

        if (recTitle || attachedDiagram) {
          solutions.push({
            num,
            title: recTitle || `Implementation ${sIdx + 1}`,
            problem: problemText,
            constraint: constraintText,
            solution: solutionText,
            result: resultText,
            diagram: attachedDiagram,
          });
        }
      });
    }

    // Extract decisions
    const decisions: ParsedDecisionRecord[] = [];
    if (sectionType === "decisions") {
      const $decisionCards = $sec.find(
        "div.grid > div.p-5, div.grid > div.rounded-xl, div.space-y-4 > div.p-5, div.space-y-4 > div.rounded-xl, div.space-y-6 > div.rounded-xl, div.grid > div"
      );
      $decisionCards.each((dIdx, cardEl) => {
        const $c = $(cardEl);
        // Exclude inner grid items that belong to a parent decision card
        if ($c.parent().hasClass("grid") && $c.closest(".p-5, .rounded-xl").not($c).length > 0) return;

        const tech = $c
          .find("h3, span.text-white.font-medium, span.text-neutral-200.font-bold, span.text-white, span.font-bold, div.font-semibold")
          .first()
          .text()
          .trim();
        const isFieldLabel = (t: string) =>
          /^(decision|rationale|trade-off|tradeoff|alternative|why|outcome|impact):?/i.test(t.trim());

        let area = $c
          .find("span.font-mono, span.text-emerald-400, span.text-\\[10px\\]")
          .filter((_, el) => !isFieldLabel($(el).text()))
          .first()
          .text()
          .trim();
        
        let why = "";
        let tradeoff = "";
        let outcome = "";

        $c.find("div.space-y-2 > div, div > div, div, p").each((_, blockEl) => {
          const $b = $(blockEl);
          const $labelSpan = $b.find("span").first();
          const label = $labelSpan.text().trim().toUpperCase();
          let text = $b.is("p") ? $b.text().trim() : $b.find("p").text().trim();
          if (!text && $labelSpan.length > 0) {
            const $valSpan = $labelSpan.next("span");
            if ($valSpan.length > 0) {
              text = $valSpan.text().trim();
            } else {
              text = $b.text().replace($labelSpan.text(), "").trim();
            }
          }

          if (label.includes("WHY") || label.includes("RATIONALE")) {
            if (text && !why) why = text;
          } else if (label.includes("TRADE-OFF") || label.includes("TRADEOFF") || label.includes("ALTERNATIVE")) {
            if (text && !tradeoff) tradeoff = text;
          } else if (label.includes("OUTCOME") || label.includes("RESULT") || label.includes("IMPACT") || label.includes("DECISION")) {
            if (text && !outcome) outcome = text;
          }
        });

        // Fallback for paragraph reading if not matched by label
        if (!why) {
          const paragraphs = $c.find("p").map((_, p) => $(p).text().trim()).get();
          if (paragraphs.length > 0) why = paragraphs[0];
          if (paragraphs.length > 1 && !tradeoff) tradeoff = paragraphs[1];
          if (paragraphs.length > 2 && !outcome) outcome = paragraphs[2];
        }

        if (!area || isFieldLabel(area)) {
          const techUpper = tech.toUpperCase();
          if (techUpper.includes("NODEMAILER") || techUpper.includes("SMTP") || techUpper.includes("EMAIL")) {
            area = "TRANSACTIONAL MESSAGING";
          } else if (techUpper.includes("NODE") || techUpper.includes("EXPRESS")) {
            area = "RUNTIME & API FRAMEWORK";
          } else if (techUpper.includes("MONGO") || techUpper.includes("MONGOOSE") || techUpper.includes("DATABASE")) {
            area = "DATA STORAGE & MODELING";
          } else if (techUpper.includes("UPSTASH") || techUpper.includes("WORKFLOW") || techUpper.includes("CRON")) {
            area = "BACKGROUND SCHEDULING";
          } else if (techUpper.includes("ARCJET") || techUpper.includes("SECURITY") || techUpper.includes("SHIELD")) {
            area = "API DEFENSE & RATE LIMITING";
          } else {
            area = "ARCHITECTURE & INFRASTRUCTURE";
          }
        }

        if (tech) {
          decisions.push({
            num: String(dIdx + 1).padStart(2, "0"),
            area: area.replace(/^\/\/\s*/, "").replace(/DECISION\s*\d+\s*[//•:]*/i, "").trim(),
            tech: tech.replace(/^DECISION\s*\d+\s*[//•:]*/i, "").trim(),
            why,
            tradeoff,
            outcome,
          });
        }
      });
    }

    // Extract outcomes / results
    const outcomes: ParsedOutcomeRecord[] = [];
    if (sectionType === "outcomes") {
      const $outCards = $sec.find("div.grid > div, div.space-y-4 > div.rounded-xl, div.space-y-4 > div.p-5");
      $outCards.each((oIdx, cardEl) => {
        const $c = $(cardEl);
        // Exclude inner nested divs
        if ($c.parent().hasClass("grid") && $c.closest(".rounded-xl, .p-5").not($c).length > 0) return;

        const num =
          $c.find("div.text-3xl, div.text-4xl, span.text-2xl, span.text-3xl, span.text-4xl, span.font-bold, div.font-bold").first().text().trim() ||
          String(oIdx + 1).padStart(2, "0");
        const cardTitle =
          $c.find("h3, h4, div.text-\\[11px\\], div.font-semibold, span.font-semibold, div.uppercase").first().text().trim() ||
          `Result ${oIdx + 1}`;
        const desc = $c.find("p").first().text().trim();
        if (cardTitle || desc) {
          outcomes.push({
            num,
            title: cardTitle,
            desc,
          });
        }
      });
    }

    // Extract tables (both standard <table> elements and structured div-based matrix tables)
    const tables: ParsedTable[] = [];
    $sec.find("table").each((_, tblEl) => {
      const $tbl = $(tblEl);
      const $wrap = $tbl.closest(".overflow-x-auto, .rounded-xl, .border");
      let tableTitle = $wrap.prev().find("h3, h4, span.font-semibold, div.font-semibold").first().text().trim();
      if (!tableTitle) {
        tableTitle = $wrap.parent().find("h3, h4").first().text().trim();
      }

      const headers: string[] = [];
      $tbl.find("thead th, tr:first-child th").each((_, th) => {
        headers.push($(th).text().trim());
      });

      const rows: string[][] = [];
      $tbl.find("tbody tr, tr:not(:first-child)").each((_, tr) => {
        const cells: string[] = [];
        $(tr).find("td, th").each((_, td) => {
          cells.push($(td).text().trim());
        });
        if (cells.length > 0) rows.push(cells);
      });

      if (headers.length > 0 || rows.length > 0) {
        tables.push({ title: tableTitle || undefined, headers, rows });
      }
    });

    // Also extract div-based tables (such as Technical Rigor matrices)
    if (tables.length === 0) {
      $sec.find(".rounded-xl.border, .border.overflow-hidden, .rounded-xl").each((_, contEl) => {
        const $cont = $(contEl);
        if ($cont.find("table, pre").length > 0) return;
        const headers = $cont
          .find("> div:first-child[class*=\"border-b\"] > div, .border-b.bg-neutral-950 > div")
          .map((_, el) => $(el).text().trim())
          .get()
          .filter((t) => t.length > 0);

        const rows: string[][] = [];
        $cont.find(".divide-y > div").each((_, rowEl) => {
          const cells = $(rowEl)
            .children("div")
            .map((_, c) => $(c).text().trim())
            .get()
            .filter((t) => t.length > 0);
          if (cells.length > 1) rows.push(cells);
        });

        if (headers.length > 1 && rows.length > 0) {
          const tableTitle = $cont.prev().find("h3, h4, span.font-semibold").first().text().trim();
          tables.push({ title: tableTitle || undefined, headers, rows });
        }
      });
    }

    // Supporting items (e.g. architecture layers, runtime components, subsystem specifications)
    const supportingItems: ParsedSupportingItem[] = [];
    $sec
      .find("div.grid > div.p-4, div.grid > div.p-5, div.grid > div.p-3\\.5, div.grid > div.rounded-xl, div.grid > div.rounded-lg")
      .each((sIdx, el) => {
        const $el = $(el);
        if ($el.closest("pre, table").length > 0) return;
        // Don't duplicate if parent is also matched
        if ($el.closest(".rounded-xl, .p-5").not($el).length > 0) return;
        // Skip if this section is already rendering these as challenges, decisions, or outcomes
        if (
          (sectionType === "challenges" && challenges.length > 0) ||
          (sectionType === "decisions" && decisions.length > 0) ||
          (sectionType === "outcomes" && outcomes.length > 0) ||
          (sectionType === "solutions" && solutions.length > 0)
        ) {
          return;
        }

        const sTitle = $el
          .find("div.text-emerald-400, h3, h4, span.text-neutral-200, div.font-semibold, span.font-bold, div.flex span")
          .last()
          .text()
          .trim();
        const sDesc = $el.find("p").first().text().trim();
        const sNum = $el.find("span.text-emerald-400, span.font-mono").first().text().trim();
        if (sTitle && sDesc && sTitle !== sDesc) {
          supportingItems.push({
            num: sNum.replace(/\/\/$/, "").trim() || String(sIdx + 1).padStart(2, "0"),
            title: sTitle,
            desc: sDesc,
          });
        }
      });

    // Create cleaned HTML for residual content
    const $clone = $sec.clone();
    $clone.find("h2, h3").first().closest(".border-b").remove();
    // Keep internal markup intact for fallback
    const rawContentHtml = $clone.html() || "";

    sections.push({
      id,
      number,
      title,
      badge: badge || undefined,
      sectionType,
      pattern,
      intro,
      readingText,
      constraints,
      diagrams,
      challenges,
      solutions,
      decisions,
      outcomes,
      tables,
      supportingItems,
      quote,
      rawContentHtml,
    });
  });

  return {
    sections,
    totalDiagrams,
  };
}
