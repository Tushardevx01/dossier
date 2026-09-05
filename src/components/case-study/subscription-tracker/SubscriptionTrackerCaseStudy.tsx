"use client";

import { Project } from "@/types/project";
import { SubscriptionTrackerNavigator } from "./SubscriptionTrackerNavigator";
import { SubscriptionTrackerHero } from "./SubscriptionTrackerHero";
import { SubscriptionTrackerProblem } from "./SubscriptionTrackerProblem";
import { SubscriptionTrackerApproach } from "./SubscriptionTrackerApproach";
import { SubscriptionTrackerArchitecture } from "./SubscriptionTrackerArchitecture";
import { SubscriptionTrackerDataModel } from "./SubscriptionTrackerDataModel";
import { SubscriptionTrackerChallenges } from "./SubscriptionTrackerChallenges";
import { SubscriptionTrackerChallengeSolutions } from "./SubscriptionTrackerChallengeSolutions";
import { SubscriptionTrackerTechnicalRigor } from "./SubscriptionTrackerTechnicalRigor";
import { SubscriptionTrackerDecisions } from "./SubscriptionTrackerDecisions";
import { SubscriptionTrackerLifecycle } from "./SubscriptionTrackerLifecycle";
import { SubscriptionTrackerWorkflow } from "./SubscriptionTrackerWorkflow";
import { SubscriptionTrackerAuthFlow } from "./SubscriptionTrackerAuthFlow";
import { SubscriptionTrackerApiSurface } from "./SubscriptionTrackerApiSurface";
import { SubscriptionTrackerServer } from "./SubscriptionTrackerServer";
import { SubscriptionTrackerSecurity } from "./SubscriptionTrackerSecurity";
import { SubscriptionTrackerResults } from "./SubscriptionTrackerResults";
import { SubscriptionTrackerSummary } from "./SubscriptionTrackerSummary";
import { SubscriptionTrackerFooter } from "./SubscriptionTrackerFooter";

interface SubscriptionTrackerCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export const SubscriptionTrackerCaseStudy = ({
  project,
}: SubscriptionTrackerCaseStudyProps) => {
  return (
    <article className="min-h-screen bg-black text-foreground pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Main Container: 1340px width for wide ASCII architecture diagrams */}
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 relative">
          {/* Sticky Technical Document Navigator */}
          <SubscriptionTrackerNavigator />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full space-y-16 sm:space-y-24">
            {/* HERO */}
            <SubscriptionTrackerHero project={project} />

            {/* 01 / THE PROBLEM */}
            <SubscriptionTrackerProblem />

            {/* 02 / THE APPROACH */}
            <SubscriptionTrackerApproach />

            {/* 03 / ARCHITECTURE & DATA FLOW */}
            <SubscriptionTrackerArchitecture />

            {/* 04 / DATA MODEL */}
            <SubscriptionTrackerDataModel />

            {/* 05 / ENGINEERING CHALLENGES */}
            <SubscriptionTrackerChallenges />

            {/* 06 / ENGINEERING CHALLENGES & SOLUTIONS */}
            <SubscriptionTrackerChallengeSolutions />

            {/* 07 / TECHNICAL RIGOR */}
            <SubscriptionTrackerTechnicalRigor />

            {/* 08 / TECHNICAL DECISIONS */}
            <SubscriptionTrackerDecisions />

            {/* 09 / SUBSCRIPTION LIFECYCLE */}
            <SubscriptionTrackerLifecycle />

            {/* 10 / AUTOMATED REMINDER WORKFLOW */}
            <SubscriptionTrackerWorkflow />

            {/* 11 / AUTHENTICATION FLOW */}
            <SubscriptionTrackerAuthFlow />

            {/* 12 / API SURFACE */}
            <SubscriptionTrackerApiSurface />

            {/* 13 / SERVER ENGINEERING */}
            <SubscriptionTrackerServer />

            {/* 14 / SECURITY LAYER */}
            <SubscriptionTrackerSecurity />

            {/* 15 / MEASURABLE RESULTS */}
            <SubscriptionTrackerResults />

            {/* 16 / ENGINEERING SUMMARY */}
            <SubscriptionTrackerSummary />

            {/* 17 / FINAL CTA & NEXT CASE STUDY */}
            <SubscriptionTrackerFooter />
          </main>
        </div>
      </div>
    </article>
  );
};
