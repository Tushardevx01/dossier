"use client";

import React from "react";
import { CaseStudyShell } from "./CaseStudyShell";
import { CaseStudyHeader } from "./CaseStudyHeader";
import { CaseStudySection } from "./CaseStudySection";
import { AsciiDiagram } from "./AsciiDiagram";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { WorkflowDiagram } from "./WorkflowDiagram";
import { ChallengeRecord } from "./ChallengeRecord";
import { DecisionRecord } from "./DecisionRecord";
import { MetricGrid } from "./MetricGrid";
import { TechnicalMatrix } from "./TechnicalMatrix";
import { RelatedProjects } from "./RelatedProjects";
import type { ParsedCaseStudy, ParsedSection } from "@/lib/case-study-parser";
import type { Project } from "@/types/project";
import { mono } from "@/app/fonts";

export interface CaseStudyRendererProps {
  parsed: ParsedCaseStudy;
  meta: {
    slug: string;
    title: string;
    subtitle: string;
    excerpt: string;
    category: string;
    level: string;
    readTime: number;
    date: string;
    tags: string[];
  };
  project?: Project | null;
  nextCaseStudy?: {
    slug: string;
    title: string;
    subtitle: string;
  } | null;
}

export const CaseStudyRenderer: React.FC<CaseStudyRendererProps> = ({
  parsed,
  meta,
  project,
  nextCaseStudy,
}) => {
  const sections = parsed.sections;

  // Build nav sections for CaseStudyIndex
  const navSections = sections.map((sec) => ({
    id: sec.id,
    number: sec.number,
    label:
      sec.title.length > 25 ? sec.title.slice(0, 23) + "..." : sec.title,
  }));

  // Render individual sections based on type and pattern
  const renderSectionContent = (sec: ParsedSection) => {
    switch (sec.sectionType) {
      case "problem": {
        return (
          <div className="space-y-8">
            {/* Pattern A: Two-Column Layout (Problem Narrative Left, Key Constraints Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                {sec.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {sec.readingText.map((p, i) => (
                  <p key={i} className="text-neutral-400 text-xs sm:text-sm font-light">
                    {p}
                  </p>
                ))}
              </div>

              {sec.constraints.length > 0 && (
                <div className="lg:col-span-6 rounded-lg border border-neutral-800/80 bg-[#07070a] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                    <span
                      className={`${mono.className} text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold`}
                    >
                      KEY CONSTRAINTS &amp; COORDINATION PROBLEMS
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {sec.constraints.length} VECTORS
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs font-mono text-neutral-300">
                    {sec.constraints.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 py-1.5 border-b border-neutral-900/60 last:border-0"
                      >
                        <span className="text-emerald-400 font-bold shrink-0 select-none">
                          ▸
                        </span>
                        <span className="leading-snug text-neutral-300 font-sans text-xs">
                          {c}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Primary Technical Diagram */}
            {sec.diagrams.map((diag, i) => (
              <AsciiDiagram
                key={diag.id || i}
                title={diag.title}
                badge={diag.badge}
                caption={diag.caption}
                ascii={diag.ascii}
                rawHtml={diag.rawHtml}
              />
            ))}
          </div>
        );
      }

      case "approach": {
        return (
          <div className="space-y-8">
            <div className="max-w-[760px] text-sm sm:text-base text-neutral-300 font-sans leading-relaxed space-y-4">
              {sec.intro.map((p, i) => (
                <p key={i} className="text-base sm:text-lg text-neutral-200 font-light">
                  {p}
                </p>
              ))}
              {sec.readingText.map((p, i) => (
                <p key={i} className="text-neutral-400 text-xs sm:text-sm font-light">
                  {p}
                </p>
              ))}
            </div>

            {/* Diagram */}
            {sec.diagrams.map((diag, i) => (
              <AsciiDiagram
                key={diag.id || i}
                title={diag.title}
                badge={diag.badge}
                caption={diag.caption}
                ascii={diag.ascii}
                rawHtml={diag.rawHtml}
              />
            ))}

            {/* Architecture / Subsystem Breakdown (editorial spec breakdown without boxed cards) */}
            {sec.supportingItems.length > 0 && (
              <div className="border-t border-neutral-800/80 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {sec.supportingItems.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        {item.num && (
                          <span className="font-mono text-xs text-emerald-400 font-bold select-none">
                            {item.num} //
                          </span>
                        )}
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-400 font-sans leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      case "architecture": {
        return (
          <div className="space-y-8">
            <div className="max-w-[760px] text-sm sm:text-base text-neutral-300 font-sans leading-relaxed space-y-4">
              {sec.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {sec.readingText.map((p, i) => (
                <p key={i} className="text-neutral-400 text-xs sm:text-sm font-light">
                  {p}
                </p>
              ))}
            </div>

            {/* Full-width Breakout Architecture Diagram */}
            {sec.diagrams.map((diag, i) => (
              <ArchitectureDiagram
                key={diag.id || i}
                title={diag.title}
                badge={diag.badge}
                caption={diag.caption}
                ascii={diag.ascii}
                rawHtml={diag.rawHtml}
                layers={sec.supportingItems}
              />
            ))}
          </div>
        );
      }

      case "challenges": {
        return (
          <div className="space-y-8">
            <div className="max-w-[760px] text-sm sm:text-base text-neutral-300 font-sans leading-relaxed space-y-4">
              {sec.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Compact Engineering Records Log */}
            <div className="space-y-6 pt-2">
              {sec.challenges.map((ch, i) => (
                <ChallengeRecord
                  key={i}
                  number={ch.num}
                  title={ch.title}
                  category={ch.tag}
                  problem={ch.desc}
                />
              ))}
            </div>
          </div>
        );
      }

      case "solutions": {
        return (
          <div className="space-y-8">
            <div className="max-w-[760px] text-sm sm:text-base text-neutral-300 font-sans leading-relaxed space-y-4">
              {sec.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Engineering Challenge Solutions with Attached Diagrams */}
            <div className="space-y-10 pt-2">
              {sec.solutions.map((sol, i) => (
                <ChallengeRecord
                  key={i}
                  number={sol.num}
                  title={sol.title}
                  problem={sol.problem}
                  constraint={sol.constraint}
                  solution={sol.solution}
                  result={sol.result}
                  diagram={
                    sol.diagram ? (
                      <AsciiDiagram
                        title={sol.diagram.title}
                        badge={sol.diagram.badge}
                        caption={sol.diagram.caption}
                        ascii={sol.diagram.ascii}
                        rawHtml={sol.diagram.rawHtml}
                        variant="compact"
                      />
                    ) : undefined
                  }
                />
              ))}
            </div>
          </div>
        );
      }

      case "decisions": {
        return (
          <div className="space-y-8">
            <div className="max-w-[760px] text-sm sm:text-base text-neutral-300 font-sans leading-relaxed space-y-4">
              {sec.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {sec.readingText.map((p, i) => (
                <p key={i} className="text-neutral-400 text-xs sm:text-sm font-light">
                  {p}
                </p>
              ))}
            </div>

            {/* Technical Decisions Matrix / Records */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {sec.decisions.map((dec, i) => (
                <DecisionRecord
                  key={i}
                  number={dec.num}
                  area={dec.area}
                  technology={dec.tech}
                  why={dec.why}
                  tradeoff={dec.tradeoff}
                  outcome={dec.outcome}
                />
              ))}
            </div>
          </div>
        );
      }

      case "outcomes": {
        const metrics = sec.outcomes.map((o) => ({
          value: o.num,
          label: o.title,
          description: o.desc,
        }));

        return (
          <div className="space-y-8">
            <div className="max-w-[760px] text-sm sm:text-base text-neutral-300 font-sans leading-relaxed space-y-4">
              {sec.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Strong Visual Emphasis MetricGrid */}
            <MetricGrid metrics={metrics} />
          </div>
        );
      }

      case "states":
      case "workflow": {
        return (
          <div className="space-y-8">
            <div className="max-w-[760px] text-sm sm:text-base text-neutral-300 font-sans leading-relaxed space-y-4">
              {sec.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {sec.readingText.map((p, i) => (
                <p key={i} className="text-neutral-400 text-xs sm:text-sm font-light">
                  {p}
                </p>
              ))}
            </div>

            {/* Pattern D: If 2 diagrams, render side-by-side on lg screens */}
            {sec.diagrams.length === 2 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sec.diagrams.map((diag, i) => (
                  <WorkflowDiagram
                    key={diag.id || i}
                    title={diag.title}
                    badge={diag.badge}
                    caption={diag.caption}
                    ascii={diag.ascii}
                    rawHtml={diag.rawHtml}
                  />
                ))}
              </div>
            ) : (
              sec.diagrams.map((diag, i) => (
                <WorkflowDiagram
                  key={diag.id || i}
                  title={diag.title}
                  badge={diag.badge}
                  caption={diag.caption}
                  ascii={diag.ascii}
                  rawHtml={diag.rawHtml}
                />
              ))
            )}

            {/* Tables if any */}
            {sec.tables.map((tbl, i) => (
              <TechnicalMatrix
                key={i}
                headers={tbl.headers}
                rows={tbl.rows}
              />
            ))}
          </div>
        );
      }

      default: {
        return (
          <div className="space-y-8">
            {sec.quote && (
              <div className="p-6 sm:p-8 rounded-lg border border-neutral-800/80 bg-[#07070a] space-y-3 max-w-[760px]">
                {sec.quote.role && (
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-500 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{sec.quote.role}</span>
                  </div>
                )}
                <blockquote className="text-lg sm:text-2xl text-white font-sans font-light leading-snug tracking-tight">
                  {sec.quote.text}
                </blockquote>
              </div>
            )}

            {sec.intro.length > 0 && (
              <div className="max-w-[760px] text-sm sm:text-base text-neutral-300 font-sans leading-relaxed space-y-4">
                {sec.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {sec.readingText.map((p, i) => (
                  <p key={i} className="text-neutral-400 text-xs sm:text-sm font-light">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Tables if any */}
            {sec.tables.map((tbl, i) => (
              <TechnicalMatrix
                key={i}
                headers={tbl.headers}
                rows={tbl.rows}
              />
            ))}

            {/* Diagrams if any */}
            {sec.diagrams.length === 2 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sec.diagrams.map((diag, i) => (
                  <AsciiDiagram
                    key={diag.id || i}
                    title={diag.title}
                    badge={diag.badge}
                    caption={diag.caption}
                    ascii={diag.ascii}
                    rawHtml={diag.rawHtml}
                  />
                ))}
              </div>
            ) : (
              sec.diagrams.map((diag, i) => (
                <AsciiDiagram
                  key={diag.id || i}
                  title={diag.title}
                  badge={diag.badge}
                  caption={diag.caption}
                  ascii={diag.ascii}
                  rawHtml={diag.rawHtml}
                />
              ))
            )}

            {/* If section has neither diagram nor tables nor challenges nor decisions, render cleaned raw content */}
            {sec.diagrams.length === 0 &&
              sec.tables.length === 0 &&
              sec.challenges.length === 0 &&
              sec.decisions.length === 0 &&
              sec.rawContentHtml && (
                <div
                  className="case-study-content text-neutral-300 max-w-[760px] leading-relaxed text-sm sm:text-base space-y-4"
                  dangerouslySetInnerHTML={{ __html: sec.rawContentHtml }}
                />
              )}
          </div>
        );
      }
    }
  };

  return (
    <CaseStudyShell
      sections={navSections}
      readTime={meta.readTime}
      header={<CaseStudyHeader meta={meta} project={project} />}
      footer={<RelatedProjects nextCaseStudy={nextCaseStudy} />}
    >
      {sections.map((sec) => (
        <CaseStudySection
          key={sec.id}
          id={sec.id}
          number={sec.number}
          title={sec.title}
          badge={sec.badge}
          pattern={sec.pattern}
        >
          {renderSectionContent(sec)}
        </CaseStudySection>
      ))}
    </CaseStudyShell>
  );
};
