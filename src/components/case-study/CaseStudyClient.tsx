"use client";

import React, { useMemo } from "react";
import { CaseStudyRenderer } from "./CaseStudyRenderer";
import { parseCaseStudyContent, type ParsedCaseStudy } from "@/lib/case-study-parser";
import type { Project } from "@/types/project";

export interface CaseStudyClientProps {
  /** Pre-parsed structured case study from Server Component */
  parsed?: ParsedCaseStudy;
  /** Pre-sanitized article HTML fallback if parsed not provided */
  contentHtml?: string;
  /** Serializable case-study metadata */
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

/**
 * Case Study Client Island
 *
 * Provides smooth rendering of the technical editorial case study.
 * Transforms database content into designed UI components without hardcoded
 * per-project boilerplate.
 */
export const CaseStudyClient: React.FC<CaseStudyClientProps> = ({
  parsed,
  contentHtml,
  meta,
  project,
  nextCaseStudy,
}) => {
  const parsedData = useMemo(() => {
    if (parsed && parsed.sections.length > 0) {
      return parsed;
    }
    return parseCaseStudyContent(contentHtml || "");
  }, [parsed, contentHtml]);

  return (
    <CaseStudyRenderer
      parsed={parsedData}
      meta={meta}
      project={project}
      nextCaseStudy={nextCaseStudy}
    />
  );
};
