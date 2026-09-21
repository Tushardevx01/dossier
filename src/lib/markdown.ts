/**
 * Safe, Zero-Dependency Markdown-to-HTML Renderer
 *
 * Converts long-form Markdown documents into semantic, structured HTML
 * styled with the Engineering Notes design system (typography, tables,
 * lists, code blocks, callouts, and borders).
 *
 * Security: Every rendered HTML output is passed through sanitizeHtml()
 * to prevent XSS attacks while allowing safe formatting elements and links.
 */

import { sanitizeHtml } from "@/lib/sanitize";

/**
 * Escapes characters that have special meaning in HTML.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Parses inline Markdown syntax:
 * - Code: `code`
 * - Bold: **text** or __text__
 * - Italic: *text* or _text_
 * - Links: [label](url)
 */
function parseInlineMarkdown(text: string): string {
  let result = text;

  // 1. Inline code (extract first to prevent parsing markdown within code)
  const codePlaceholders: string[] = [];
  result = result.replace(/`([^`]+)`/g, (_match, codeContent) => {
    const idx = codePlaceholders.length;
    codePlaceholders.push(
      `<code class="rounded bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 font-mono text-xs text-neutral-200">${escapeHtml(
        codeContent
      )}</code>`
    );
    return `@@CODE_PLACEHOLDER_${idx}@@`;
  });

  // 2. Links: [label](url)
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label, url) => {
      const trimmedUrl = url.trim();
      const safeUrl =
        trimmedUrl.startsWith("http://") ||
        trimmedUrl.startsWith("https://") ||
        trimmedUrl.startsWith("/") ||
        trimmedUrl.startsWith("#")
          ? escapeHtml(trimmedUrl)
          : "#";

      const isExternal = safeUrl.startsWith("http://") || safeUrl.startsWith("https://");
      const targetRel = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";

      return `<a href="${safeUrl}"${targetRel} class="text-white underline underline-offset-4 decoration-neutral-600 hover:decoration-white transition-colors">${parseInlineMarkdown(
        label
      )}</a>`;
    }
  );

  // 3. Bold: **text** or __text__
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
  result = result.replace(/__(.*?)__/g, '<strong class="font-semibold text-white">$1</strong>');

  // 4. Italic: *text* or _text_ (excluding inside words)
  result = result.replace(/(^|[^\w*])\*([^*\n]+)\*([^\w*]|$)/g, '$1<em class="italic text-neutral-200">$2</em>$3');
  result = result.replace(/(^|[^\w_])_([^_\n]+)_([^\w_]|$)/g, '$1<em class="italic text-neutral-200">$2</em>$3');

  // 5. Restore code placeholders safely (using function replacer to prevent $1, $& pattern expansions)
  codePlaceholders.forEach((codeHtml, idx) => {
    result = result.replace(`@@CODE_PLACEHOLDER_${idx}@@`, () => codeHtml);
  });

  return result;
}

/**
 * Checks if a string line is a GFM table row separator (e.g. |---|---| or |--|:--:|--:|)
 */
function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") && !trimmed.includes("|")) return false;
  const parts = trimmed.split("|").map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return false;
  return parts.every((p) => /^:?-+:?$/.test(p));
}

/**
 * Parses table cells from a markdown table row line.
 */
function parseTableRow(line: string): string[] {
  let trimmed = line.trim();
  if (trimmed.startsWith("|")) trimmed = trimmed.substring(1);
  if (trimmed.endsWith("|")) trimmed = trimmed.substring(0, trimmed.length - 1);
  return trimmed.split("|").map((cell) => cell.trim());
}

/**
 * Converts a full Markdown string into semantic HTML matching the Engineering Notes aesthetic.
 *
 * @param markdown - Long-form markdown content
 * @returns Sanitized HTML string safe for innerHTML
 */
export function renderMarkdownToHtml(markdown: string | null | undefined): string {
  if (!markdown || typeof markdown !== "string") {
    return "";
  }

  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const htmlBlocks: string[] = [];

  let i = 0;
  while (i < lines.length) {
    const prevI = i;
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Fenced Code Block
    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        i++; // skip closing ```
      }
      const rawCode = codeLines.join("\n");
      htmlBlocks.push(
        `<pre class="my-6 overflow-x-auto rounded-lg border border-neutral-800 bg-[#0d1117] p-4 font-mono text-xs text-neutral-300 leading-relaxed"><code>${escapeHtml(
          rawCode
        )}</code></pre>`
      );
      continue;
    }

    // 2. Horizontal Rule (--- or *** or ___)
    if (/^(?:---|\*\*\*|___)$/.test(trimmed)) {
      htmlBlocks.push('<hr class="my-8 border-neutral-800/80" />');
      i++;
      continue;
    }

    // 3. Headings (# h1, ## h2, ### h3, #### h4)
    if (/^#{1,6}\s+/.test(trimmed)) {
      const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const innerHtml = parseInlineMarkdown(text);

        if (level === 1) {
          htmlBlocks.push(
            `<h1 class="text-2xl sm:text-3xl font-serif text-white tracking-tight mt-10 mb-4">${innerHtml}</h1>`
          );
        } else if (level === 2) {
          htmlBlocks.push(
            `<h2 class="text-lg sm:text-xl font-mono text-white tracking-wide uppercase mt-10 mb-4 pb-2 border-b border-neutral-800/80">${innerHtml}</h2>`
          );
        } else if (level === 3) {
          htmlBlocks.push(
            `<h3 class="text-base sm:text-lg font-mono text-neutral-200 font-semibold mt-6 mb-3">${innerHtml}</h3>`
          );
        } else {
          htmlBlocks.push(
            `<h4 class="text-sm sm:text-base font-mono text-neutral-300 font-medium mt-4 mb-2">${innerHtml}</h4>`
          );
        }
        i++;
        continue;
      }
    }

    // 4. Blockquotes (> quote)
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      const quoteText = quoteLines.join("<br />");
      htmlBlocks.push(
        `<blockquote class="my-6 border-l-2 border-neutral-700 pl-4 py-1 italic text-neutral-400 text-sm sm:text-base leading-relaxed">${parseInlineMarkdown(
          quoteText
        )}</blockquote>`
      );
      continue;
    }

    // 5. GFM Tables (starts with | and followed by separator row)
    if (trimmed.includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headerCells = parseTableRow(line);
      i += 2; // skip header and separator

      const bodyRows: string[][] = [];
      while (i < lines.length && lines[i].trim().includes("|")) {
        bodyRows.push(parseTableRow(lines[i]));
        i++;
      }

      const theadHtml = `<tr>${headerCells
        .map(
          (cell) =>
            `<th class="px-5 py-3 text-left font-semibold text-white">${parseInlineMarkdown(
              cell
            )}</th>`
        )
        .join("")}</tr>`;

      const tbodyHtml = bodyRows
        .map(
          (row) =>
            `<tr>${row
              .map(
                (cell, cellIdx) =>
                  `<td class="px-5 py-3 ${
                    cellIdx === 0 ? "text-neutral-400" : "text-neutral-200"
                  }">${parseInlineMarkdown(cell)}</td>`
              )
              .join("")}</tr>`
        )
        .join("");

      htmlBlocks.push(
        `<div class="my-6 overflow-x-auto rounded-lg border border-neutral-800"><table class="w-full text-left border-collapse"><thead class="bg-neutral-900 border-b border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400">${theadHtml}</thead><tbody class="divide-y divide-neutral-800/80 bg-neutral-950/40 text-neutral-300 font-mono text-xs">${tbodyHtml}</tbody></table></div>`
      );
      continue;
    }

    // 6. Unordered Lists (- or *)
    if (/^[-*]\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^[-*]\s+/, "");
        listItems.push(itemText);
        i++;
      }
      const itemsHtml = listItems
        .map((item) => `<li>${parseInlineMarkdown(item)}</li>`)
        .join("");
      htmlBlocks.push(
        `<ul class="my-4 space-y-2 text-sm sm:text-base text-neutral-300 list-disc list-inside">${itemsHtml}</ul>`
      );
      continue;
    }

    // 7. Ordered Lists (1., 2., etc.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^\d+\.\s+/, "");
        listItems.push(itemText);
        i++;
      }
      const itemsHtml = listItems
        .map((item) => `<li>${parseInlineMarkdown(item)}</li>`)
        .join("");
      htmlBlocks.push(
        `<ol class="my-4 space-y-2 text-sm sm:text-base text-neutral-300 list-decimal list-inside">${itemsHtml}</ol>`
      );
      continue;
    }

    // 8. Regular Paragraphs (collect contiguous lines)
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("```") &&
      !/^#{1,6}\s+/.test(lines[i].trim()) &&
      !/^(?:---|\*\*\*|___)$/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith(">") &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !(lines[i].trim().includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    if (paragraphLines.length > 0) {
      const pText = paragraphLines.join(" ");
      htmlBlocks.push(
        `<p class="text-sm sm:text-base text-neutral-300 leading-relaxed my-4">${parseInlineMarkdown(
          pText
        )}</p>`
      );
    }

    // Failsafe: guarantee loop progress if an unexpected or malformed line was not consumed
    if (i === prevI) {
      htmlBlocks.push(
        `<p class="text-sm sm:text-base text-neutral-300 leading-relaxed my-4">${parseInlineMarkdown(
          trimmed
        )}</p>`
      );
      i++;
    }
  }

  const combinedHtml = htmlBlocks.join("\n");

  // Run through sanitizer for guaranteed security and XSS immunity
  return sanitizeHtml(combinedHtml);
}

/**
 * Strips markdown formatting syntax to produce a clean plain-text string,
 * suitable for preview cards, tooltips, and search summaries.
 */
export function stripMarkdown(markdown: string | null | undefined): string {
  if (!markdown || typeof markdown !== "string") return "";

  return markdown
    .replace(/```[\s\S]*?```/g, "") // remove code blocks
    .replace(/^#{1,6}\s+/gm, "") // remove headings
    .replace(/\|[^\n]+\|/g, "") // remove table rows
    .replace(/^>\s+/gm, "") // remove blockquote markers
    .replace(/^[-*]\s+/gm, "") // remove unordered list markers
    .replace(/^\d+\.\s+/gm, "") // remove ordered list markers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // replace links with anchor text
    .replace(/[*_`~]/g, "") // remove bold, italic, inline code markers
    .replace(/\s+/g, " ") // normalize whitespace
    .trim();
}
