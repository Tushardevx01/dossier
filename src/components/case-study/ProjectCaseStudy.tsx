"use client";

import { Project } from "@/types/project";
import { CaseStudyProgress } from "./CaseStudyProgress";
import { CaseStudyNavigator } from "./CaseStudyNavigator";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyProblem } from "./CaseStudyProblem";
import { CaseStudyApproach } from "./CaseStudyApproach";
import { CaseStudyArchitecture } from "./CaseStudyArchitecture";
import { CaseStudyChallenges } from "./CaseStudyChallenges";
import { CaseStudyTechnicalRigor } from "./CaseStudyTechnicalRigor";
import { CaseStudyChallengeSolutions } from "./CaseStudyChallengeSolutions";
import { CaseStudyDecisions } from "./CaseStudyDecisions";
import { CaseStudyInteraction } from "./CaseStudyInteraction";
import { CaseStudyResults } from "./CaseStudyResults";
import { CaseStudyEngineeringFlow } from "./CaseStudyEngineeringFlow";
import { CaseStudyFooter } from "./CaseStudyFooter";

interface ProjectCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export const ProjectCaseStudy = ({ project, nextProject }: ProjectCaseStudyProps) => {
  return (
    <article className="min-h-screen bg-black text-foreground pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Viewport Scroll Progress Line */}
      <CaseStudyProgress />

      {/* Main Container: 1340px width for wide ASCII architecture diagrams */}
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 relative">
          {/* Sticky Technical Document Navigator */}
          <CaseStudyNavigator />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full space-y-16 sm:space-y-24">
            {/* HERO */}
            <CaseStudyHero project={project} />

            {/* 01 THE PROBLEM */}
            <CaseStudyProblem />

            {/* 02 THE APPROACH */}
            <CaseStudyApproach />

            {/* 03 ARCHITECTURE & DATA FLOW */}
            <CaseStudyArchitecture />

            {/* 04 ENGINEERING CHALLENGES */}
            <CaseStudyChallenges />

            {/* 05 TECHNICAL RIGOR */}
            <CaseStudyTechnicalRigor />

            {/* 06 ENGINEERING CHALLENGES & SOLUTIONS */}
            <CaseStudyChallengeSolutions />

            {/* 07 TECHNICAL DECISIONS */}
            <CaseStudyDecisions />

            {/* 08 SYSTEM INTERACTION STATES */}
            <CaseStudyInteraction />

            {/* 09 MEASURABLE RESULTS */}
            <CaseStudyResults metrics={project.metrics} />

            {/* 10 FROM JOB TO RESULT */}
            <CaseStudyEngineeringFlow />

            {/* 11 & 12 SOURCE CODE & NEXT PROJECT */}
            <CaseStudyFooter project={project} nextProject={nextProject} />
          </main>
        </div>
      </div>
    </article>
  );
};
