"use client";

import { Project } from "@/types/project";
import { FenixNavigator } from "./FenixNavigator";
import { FenixHero } from "./FenixHero";
import { FenixProblem } from "./FenixProblem";
import { FenixApproach } from "./FenixApproach";
import { FenixArchitecture } from "./FenixArchitecture";
import { FenixMeetingLifecycle } from "./FenixMeetingLifecycle";
import { FenixChallenges } from "./FenixChallenges";
import { FenixTechnicalRigor } from "./FenixTechnicalRigor";
import { FenixChallengeSolutions } from "./FenixChallengeSolutions";
import { FenixDecisions } from "./FenixDecisions";
import { FenixInteractionStates } from "./FenixInteractionStates";
import { FenixFeatures } from "./FenixFeatures";
import { FenixResults } from "./FenixResults";
import { FenixCodeStructure } from "./FenixCodeStructure";
import { FenixFinalSummary } from "./FenixFinalSummary";
import { FenixFooter } from "./FenixFooter";

interface FenixCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export const FenixCaseStudy = ({ project, nextProject }: FenixCaseStudyProps) => {
  return (
    <article className="min-h-screen bg-black text-foreground pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Main Container: 1340px width for wide ASCII architecture diagrams */}
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 relative">
          {/* Sticky Technical Document Navigator */}
          <FenixNavigator />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full space-y-16 sm:space-y-24">
            {/* HERO */}
            <FenixHero project={project} />

            {/* 01 THE PROBLEM */}
            <FenixProblem />

            {/* 02 THE APPROACH */}
            <FenixApproach />

            {/* 03 ARCHITECTURE & DATA FLOW */}
            <FenixArchitecture />

            {/* 04 MEETING LIFECYCLE */}
            <FenixMeetingLifecycle />

            {/* 05 ENGINEERING CHALLENGES */}
            <FenixChallenges />

            {/* 06 TECHNICAL RIGOR */}
            <FenixTechnicalRigor />

            {/* 07 CHALLENGES & SOLUTIONS */}
            <FenixChallengeSolutions />

            {/* 08 TECHNICAL DECISIONS */}
            <FenixDecisions />

            {/* 09 SYSTEM INTERACTION STATES */}
            <FenixInteractionStates />

            {/* 10 WHAT THE SYSTEM ACTUALLY DOES */}
            <FenixFeatures />

            {/* 11 MEASURABLE RESULTS */}
            <FenixResults />

            {/* 12 ENGINEERING STRUCTURE */}
            <FenixCodeStructure />

            {/* 13 FROM IDENTITY TO REAL-TIME CALL */}
            <FenixFinalSummary />

            {/* 14 OPEN IMPLEMENTATION & NEXT CASE STUDY */}
            <FenixFooter project={project} nextProject={nextProject} />
          </main>
        </div>
      </div>
    </article>
  );
};
