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
  
  let title = $container.find("span.text-\\[11px\\], span.font-semibold").first().text().trim();
  if (!title) {
    title = $container.find(".border-b span").filter((_, el) => $(el).text().trim().length > 2).first().text().trim();
  }
  if (!title) title = `SYSTEM FLOW ${index + 1}`;

  const badge = $container.find("span.text-\\[10px\\]").first().text().trim();
  
  // Caption in bottom border
  let caption = "";
  const $bottomBar = $container.find(".border-t");
  if ($bottomBar.length > 0) {
    const $firstSpan = $bottomBar.find("span").first();
    caption = $firstSpan.text().trim();
  }

  const ascii = $pre.text();
  const rawHtml = $pre.html() || "";

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

    // Determine section type
    const lowerId = id.toLowerCase();
    const lowerTitle = title.toLowerCase();
    let sectionType: ParsedSection["sectionType"] = "default";

    if (lowerId === "problem" || lowerTitle.includes("problem")) {
      sectionType = "problem";
    } else if (lowerId === "approach" || lowerTitle.includes("approach")) {
      sectionType = "approach";
    } else if (lowerId === "architecture" || lowerTitle.includes("architecture") || lowerTitle.includes("topology")) {
      sectionType = "architecture";
    } else if (lowerId === "challenges" || lowerTitle === "engineering challenges") {
      sectionType = "challenges";
    } else if (lowerId === "solutions" || lowerTitle.includes("solutions") || lowerTitle.includes("deep-dives")) {
      sectionType = "solutions";
    } else if (lowerId === "decisions" || lowerTitle.includes("decisions") || lowerTitle.includes("trade-offs")) {
      sectionType = "decisions";
    } else if (lowerId === "outcomes" || lowerId === "results" || lowerTitle.includes("results") || lowerTitle.includes("outcomes")) {
      sectionType = "outcomes";
    } else if (lowerId.includes("state") || lowerId.includes("interaction") || lowerTitle.includes("state machine")) {
      sectionType = "states";
    } else if (lowerId.includes("flow") || lowerId.includes("lifecycle") || lowerId.includes("workflow") || lowerId.includes("execution")) {
      sectionType = "workflow";
    } else if (lowerId.includes("security") || lowerTitle.includes("security")) {
      sectionType = "security";
    } else if (lowerId.includes("validation") || lowerId.includes("rigor")) {
      sectionType = "validation";
    }

    // Assign varied editorial pattern
    let pattern: SectionPattern = "B";
    if (sectionType === "problem" || sectionType === "approach") {
      pattern = "A"; // Split layout
    } else if (sectionType === "architecture") {
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
        $p.closest(".grid > div, div.space-y-6 > div").length > 0
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
      $sec.find("div.grid > div").each((cIdx, cardEl) => {
        const $c = $(cardEl);
        const num = $c.find("span.text-emerald-400, span.font-mono").first().text().trim() || `0${cIdx + 1}`;
        const tag = $c.find("span.text-neutral-500, span.text-emerald-400\\/90").first().text().trim();
        const cardTitle = $c.find("h3, h4").first().text().trim();
        const desc = $c.find("p").first().text().trim();
        if (cardTitle || desc) {
          challenges.push({
            num: num.replace(/^\/\/\s*/, ""),
            tag,
            title: cardTitle,
            desc,
          });
        }
      });
    }

    // Extract solution records (Problem -> Constraint -> Solution -> Result)
    const solutions: ParsedSolutionRecord[] = [];
    if (sectionType === "solutions") {
      $sec.find("> div.space-y-6 > div, > div > div.p-5, > div > div.p-6").each((sIdx, recEl) => {
        const $r = $(recEl);
        const recTitle = $r.find("h3").first().text().trim();
        const num = $r.find("span.font-mono").first().text().trim().replace(/^\/\/\s*/, "") || `0${sIdx + 1}`;
        
        let problemText = "";
        let constraintText = "";
        let solutionText = "";
        let resultText = "";

        $r.find("div.grid > div, div.space-y-1, div.space-y-1\\.5").each((_, blockEl) => {
          const $b = $(blockEl);
          const label = $b.find("span").text().trim().toUpperCase();
          const pText = $b.find("p").text().trim();
          if (label.includes("PROBLEM")) problemText = pText;
          else if (label.includes("CONSTRAINT")) constraintText = pText;
          else if (label.includes("SOLUTION")) solutionText = pText;
          else if (label.includes("RESULT") || label.includes("OUTCOME")) resultText = pText;
        });

        let attachedDiagram: ParsedDiagram | undefined;
        const $pre = $r.find("pre");
        if ($pre.length > 0) {
          attachedDiagram = extractDiagram($, $pre.first(), totalDiagrams);
          totalDiagrams++;
        }

        if (recTitle) {
          solutions.push({
            num,
            title: recTitle,
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
      $sec.find("div.grid > div").each((dIdx, cardEl) => {
        const $c = $(cardEl);
        const tech = $c.find("h3").first().text().trim();
        const area = $c.find("span.font-mono").first().text().trim();
        let why = "";
        let tradeoff = "";
        let outcome = "";

        $c.find("div").each((_, blockEl) => {
          const $b = $(blockEl);
          const label = $b.find("span").text().trim().toUpperCase();
          const pText = $b.find("p").text().trim();
          if (label.includes("WHY") || label.includes("RATIONALE")) why = pText;
          else if (label.includes("TRADE-OFF") || label.includes("TRADEOFF")) tradeoff = pText;
          else if (label.includes("OUTCOME") || label.includes("RESULT")) outcome = pText;
        });

        if (tech) {
          decisions.push({
            num: String(dIdx + 1).padStart(2, "0"),
            area,
            tech,
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
      $sec.find("div.grid > div").each((oIdx, cardEl) => {
        const $c = $(cardEl);
        const num = $c.find("span.text-2xl, span.text-3xl, span.font-bold").first().text().trim() || `0${oIdx + 1}`;
        const cardTitle = $c.find("h3, h4").first().text().trim();
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

    // Extract tables
    const tables: ParsedTable[] = [];
    $sec.find("table").each((_, tblEl) => {
      const $tbl = $(tblEl);
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
        tables.push({ headers, rows });
      }
    });

    // Supporting items (e.g. architecture layers, runtime components)
    const supportingItems: ParsedSupportingItem[] = [];
    if (sectionType === "architecture" || sectionType === "approach" || sectionType === "security") {
      $sec.find("div.grid > div.p-4, div.grid > div.p-3\\.5").each((_, el) => {
        const $el = $(el);
        const sTitle = $el.find("div.text-emerald-400, h3, span.text-neutral-200, div.flex span").last().text().trim();
        const sDesc = $el.find("p").first().text().trim();
        const sNum = $el.find("span.text-emerald-400").first().text().trim();
        if (sTitle && sDesc) {
          supportingItems.push({
            num: sNum.replace(/\/\/$/, "").trim(),
            title: sTitle,
            desc: sDesc,
          });
        }
      });
    }

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
