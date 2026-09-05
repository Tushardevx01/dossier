"use client";

import { Project } from "@/types/project";
import { WebScopeNavigator } from "./WebScopeNavigator";
import { WebScopeHero } from "./WebScopeHero";
import { WebScopeProblem } from "./WebScopeProblem";
import { WebScopeApproach } from "./WebScopeApproach";
import { WebScopeArchitecture } from "./WebScopeArchitecture";
import { WebScopeDataFlow } from "./WebScopeDataFlow";
import { WebScopeChallenges } from "./WebScopeChallenges";
import { WebScopeTechnicalRigor } from "./WebScopeTechnicalRigor";
import { WebScopeChallengeSolutions } from "./WebScopeChallengeSolutions";
import { WebScopeDecisions } from "./WebScopeDecisions";
import { WebScopeInteractionStates } from "./WebScopeInteractionStates";
import { WebScopeDataModel } from "./WebScopeDataModel";
import { WebScopeResults } from "./WebScopeResults";
import { WebScopeTakeaway } from "./WebScopeTakeaway";
import { WebScopeSummary } from "./WebScopeSummary";
import { WebScopeFooter } from "./WebScopeFooter";

interface WebScopeCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export const WebScopeCaseStudy = ({ project, nextProject }: WebScopeCaseStudyProps) => {
  return (
    <article className="min-h-screen bg-black text-foreground pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Main Container: 1340px width for wide ASCII architecture diagrams */}
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 relative">
          {/* Sticky Technical Document Navigator */}
          <WebScopeNavigator />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full space-y-16 sm:space-y-24">
            {/* HERO */}
            <WebScopeHero project={project} />

            {/* 01 THE PROBLEM */}
            <WebScopeProblem />

            {/* 02 THE APPROACH */}
            <WebScopeApproach />

            {/* 03 SYSTEM ARCHITECTURE */}
            <WebScopeArchitecture />

            {/* 04 DATA FLOW */}
            <WebScopeDataFlow />

            {/* 05 ENGINEERING CHALLENGES */}
            <WebScopeChallenges />

            {/* 06 TECHNICAL RIGOR */}
            <WebScopeTechnicalRigor />

            {/* 07 CHALLENGES & SOLUTIONS */}
            <WebScopeChallengeSolutions />

            {/* 08 TECHNICAL DECISIONS */}
            <WebScopeDecisions />

            {/* 09 SYSTEM INTERACTION STATES */}
            <WebScopeInteractionStates />

            {/* 10 DATA MODEL */}
            <WebScopeDataModel />

            {/* 11 MEASURABLE RESULTS */}
            <WebScopeResults />

            {/* 12 ENGINEERING TAKEAWAY */}
            <WebScopeTakeaway />

            {/* 13 FINAL TECHNICAL SUMMARY */}
            <WebScopeSummary />

            {/* 14 FOOTER & NEXT CASE STUDY */}
            <WebScopeFooter project={project} nextProject={nextProject} />
          </main>
        </div>
      </div>
    </article>
  );
};
