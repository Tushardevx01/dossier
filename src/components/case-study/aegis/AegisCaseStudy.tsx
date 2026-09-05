"use client";

import { Project } from "@/types/project";
import { AegisNavigator } from "./AegisNavigator";
import { AegisHero } from "./AegisHero";
import { AegisProblem } from "./AegisProblem";
import { AegisApproach } from "./AegisApproach";
import { AegisArchitecture } from "./AegisArchitecture";
import { AegisEventFlow } from "./AegisEventFlow";
import { AegisTechnicalRigor } from "./AegisTechnicalRigor";
import { AegisAiPipeline } from "./AegisAiPipeline";
import { AegisChallenges } from "./AegisChallenges";
import { AegisChallengeSolutions } from "./AegisChallengeSolutions";
import { AegisDecisions } from "./AegisDecisions";
import { AegisSafetyModel } from "./AegisSafetyModel";
import { AegisSecurity } from "./AegisSecurity";
import { AegisInteractionStates } from "./AegisInteractionStates";
import { AegisAuditModel } from "./AegisAuditModel";
import { AegisOfflineRl } from "./AegisOfflineRl";
import { AegisChaosTesting } from "./AegisChaosTesting";
import { AegisResults } from "./AegisResults";
import { AegisClosedLoop } from "./AegisClosedLoop";
import { AegisPhilosophy } from "./AegisPhilosophy";
import { AegisFooter } from "./AegisFooter";

interface AegisCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export const AegisCaseStudy = ({ project, nextProject }: AegisCaseStudyProps) => {
  return (
    <article className="min-h-screen bg-black text-foreground pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Main Container: 1340px width for wide ASCII architecture diagrams */}
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 relative">
          {/* Sticky Technical Document Navigator */}
          <AegisNavigator />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full space-y-16 sm:space-y-24">
            {/* HERO */}
            <AegisHero project={project} />

            {/* 01 THE PROBLEM */}
            <AegisProblem />

            {/* 02 THE APPROACH */}
            <AegisApproach />

            {/* 03 ARCHITECTURE & DATA FLOW */}
            <AegisArchitecture />

            {/* 04 EVENT FLOW */}
            <AegisEventFlow />

            {/* 05 TECHNICAL RIGOR */}
            <AegisTechnicalRigor />

            {/* 06 AI DIAGNOSIS PIPELINE */}
            <AegisAiPipeline />

            {/* 07 ENGINEERING CHALLENGES */}
            <AegisChallenges />

            {/* 08 CHALLENGES & SOLUTIONS */}
            <AegisChallengeSolutions />

            {/* 09 TECHNICAL DECISIONS */}
            <AegisDecisions />

            {/* 10 AUTOMATION WITH GUARDRAILS */}
            <AegisSafetyModel />

            {/* 11 SECURITY BOUNDARIES */}
            <AegisSecurity />

            {/* 12 SYSTEM INTERACTION STATES */}
            <AegisInteractionStates />

            {/* 13 THE AUDIT TRAIL */}
            <AegisAuditModel />

            {/* 14 OFFLINE LEARNING LOOP */}
            <AegisOfflineRl />

            {/* 15 CHAOS TESTING */}
            <AegisChaosTesting />

            {/* 16 MEASURABLE RESULTS */}
            <AegisResults />

            {/* 17 THE CLOSED LOOP */}
            <AegisClosedLoop />

            {/* 18 WHAT I WAS SOLVING */}
            <AegisPhilosophy />

            {/* 19 EXPLORE IMPLEMENTATION & NEXT CASE STUDY */}
            <AegisFooter project={project} nextProject={nextProject} />
          </main>
        </div>
      </div>
    </article>
  );
};
