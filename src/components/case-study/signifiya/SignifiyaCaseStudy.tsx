"use client";

import { Project } from "@/types/project";
import { SignifiyaNavigator } from "./SignifiyaNavigator";
import { SignifiyaHero } from "./SignifiyaHero";
import { SignifiyaProblem } from "./SignifiyaProblem";
import { SignifiyaApproach } from "./SignifiyaApproach";
import { SignifiyaArchitecture } from "./SignifiyaArchitecture";
import { SignifiyaRegistrationLifecycle } from "./SignifiyaRegistrationLifecycle";
import { SignifiyaChallenges } from "./SignifiyaChallenges";
import { SignifiyaTechnicalRigor } from "./SignifiyaTechnicalRigor";
import { SignifiyaChallengeSolutions } from "./SignifiyaChallengeSolutions";
import { SignifiyaDecisions } from "./SignifiyaDecisions";
import { SignifiyaInteractionStates } from "./SignifiyaInteractionStates";
import { SignifiyaFeatures } from "./SignifiyaFeatures";
import { SignifiyaResults } from "./SignifiyaResults";
import { SignifiyaCodeStructure } from "./SignifiyaCodeStructure";
import { SignifiyaFinalSummary } from "./SignifiyaFinalSummary";
import { SignifiyaFooter } from "./SignifiyaFooter";

interface SignifiyaCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export const SignifiyaCaseStudy = ({ project, nextProject }: SignifiyaCaseStudyProps) => {
  return (
    <article className="min-h-screen bg-black text-foreground pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Main Container: 1340px width for wide ASCII architecture diagrams */}
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 relative">
          {/* Sticky Technical Document Navigator */}
          <SignifiyaNavigator />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full space-y-16 sm:space-y-24">
            {/* HERO */}
            <SignifiyaHero project={project} />

            {/* 01 THE PROBLEM */}
            <SignifiyaProblem />

            {/* 02 THE APPROACH */}
            <SignifiyaApproach />

            {/* 03 ARCHITECTURE & TOPOLOGY */}
            <SignifiyaArchitecture />

            {/* 04 REGISTRATION & PASS LIFECYCLE */}
            <SignifiyaRegistrationLifecycle />

            {/* 05 ENGINEERING CHALLENGES */}
            <SignifiyaChallenges />

            {/* 06 TECHNICAL RIGOR & SECURITY */}
            <SignifiyaTechnicalRigor />

            {/* 07 DEEP DIVE SOLUTIONS */}
            <SignifiyaChallengeSolutions />

            {/* 08 ARCHITECTURAL DECISIONS */}
            <SignifiyaDecisions />

            {/* 09 STATE & INTERACTION MODELS */}
            <SignifiyaInteractionStates />

            {/* 10 CAPABILITIES MATRIX */}
            <SignifiyaFeatures />

            {/* 11 MEASURABLE OUTCOMES */}
            <SignifiyaResults />

            {/* 12 CODEBASE TOPOLOGY */}
            <SignifiyaCodeStructure />

            {/* 13 ENGINEERING RETROSPECTIVE */}
            <SignifiyaFinalSummary />

            {/* 14 FOOTER & NEXT CASE STUDY */}
            <SignifiyaFooter project={project} nextProject={nextProject} />
          </main>
        </div>
      </div>
    </article>
  );
};
