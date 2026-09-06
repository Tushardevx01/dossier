"use client";

import React from "react";
import { CaseStudyRenderer } from "./CaseStudyRenderer";
import type { ParsedCaseStudy } from "@/lib/case-study-parser";
import type { Project } from "@/types/project";

export interface CaseStudyClientProps {
  /** Pre-parsed structured case study from Server Component */
  parsed?: ParsedCaseStudy;
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
  meta,
  project,
  nextCaseStudy,
}) => {
  return (
    <CaseStudyRenderer
      parsed={parsed!}
      meta={meta}
      project={project}
      nextCaseStudy={nextCaseStudy}
    />
  );
};
