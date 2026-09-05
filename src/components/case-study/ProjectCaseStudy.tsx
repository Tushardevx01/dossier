"use client";

import { Project } from "@/types/project";
import { AegisCaseStudy } from "./aegis";
import { CaseStudyNavigator } from "./CaseStudyNavigator";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyProblem } from "./CaseStudyProblem";
import { CaseStudyApproach } from "./CaseStudyApproach";
import { CaseStudyArchitecture } from "./CaseStudyArchitecture";
import { CaseStudyJobExecution } from "./CaseStudyJobExecution";
import { CaseStudyExecutionOwnership } from "./CaseStudyExecutionOwnership";
import { CaseStudyChallenges } from "./CaseStudyChallenges";
import { CaseStudyTechnicalRigor } from "./CaseStudyTechnicalRigor";
import { CaseStudyChallengeSolutions } from "./CaseStudyChallengeSolutions";
import { CaseStudyNodeLifecycle } from "./CaseStudyNodeLifecycle";
import { CaseStudyAppModel } from "./CaseStudyAppModel";
import { CaseStudyInstanceHealth } from "./CaseStudyInstanceHealth";
import { CaseStudyDecisions } from "./CaseStudyDecisions";
import { CaseStudyInteraction } from "./CaseStudyInteraction";
import { CaseStudyContainerLifecycle } from "./CaseStudyContainerLifecycle";
import { CaseStudySecurity } from "./CaseStudySecurity";
import { CaseStudyResults } from "./CaseStudyResults";
import { CaseStudyTradeoffs } from "./CaseStudyTradeoffs";
import { CaseStudyValidation } from "./CaseStudyValidation";
import { CaseStudyEngineeringFlow } from "./CaseStudyEngineeringFlow";
import { CaseStudyFooter } from "./CaseStudyFooter";

interface ProjectCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export const ProjectCaseStudy = ({ project, nextProject }: ProjectCaseStudyProps) => {
  if (project.id === "project-aegis" || project.slug === "project-aegis") {
    return <AegisCaseStudy project={project} nextProject={nextProject} />;
  }

  return (
    <article className="min-h-screen bg-black text-foreground pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-300">
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

            {/* 04 JOB EXECUTION FLOW */}
            <CaseStudyJobExecution />

            {/* 05 EXECUTION OWNERSHIP */}
            <CaseStudyExecutionOwnership />

            {/* 06 ENGINEERING CHALLENGES */}
            <CaseStudyChallenges />

            {/* 07 TECHNICAL RIGOR */}
            <CaseStudyTechnicalRigor />

            {/* 08 ENGINEERING CHALLENGES & SOLUTIONS */}
            <CaseStudyChallengeSolutions />

            {/* 09 NODE LIFECYCLE */}
            <CaseStudyNodeLifecycle />

            {/* 10 DECLARATIVE APPLICATION MODEL */}
            <CaseStudyAppModel />

            {/* 11 INSTANCE HEALTH & RECOVERY */}
            <CaseStudyInstanceHealth />

            {/* 12 TECHNICAL DECISIONS */}
            <CaseStudyDecisions />

            {/* 13 SYSTEM INTERACTION STATES */}
            <CaseStudyInteraction />

            {/* 14 CONTAINER LIFECYCLE */}
            <CaseStudyContainerLifecycle />

            {/* 15 SECURITY BOUNDARIES */}
            <CaseStudySecurity />

            {/* 16 MEASURABLE ENGINEERING OUTCOMES */}
            <CaseStudyResults />

            {/* 17 KNOWN TRADE-OFFS */}
            <CaseStudyTradeoffs />

            {/* 18 ENGINEERING VALIDATION */}
            <CaseStudyValidation />

            {/* 19 FROM JOB TO RESULT */}
            <CaseStudyEngineeringFlow />

            {/* 20 SOURCE CODE CTA & NEXT CASE STUDY */}
            <CaseStudyFooter project={project} nextProject={nextProject} />
          </main>
        </div>
      </div>
    </article>
  );
};
