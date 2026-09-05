"use client";

import { Project } from "@/types/project";
import { CarePulseNavigator } from "./CarePulseNavigator";
import { CarePulseHero } from "./CarePulseHero";
import { CarePulseProblem } from "./CarePulseProblem";
import { CarePulseApproach } from "./CarePulseApproach";
import { CarePulseArchitecture } from "./CarePulseArchitecture";
import { CarePulsePatientFlow } from "./CarePulsePatientFlow";
import { CarePulseAppointmentWorkflow } from "./CarePulseAppointmentWorkflow";
import { CarePulseChallenges } from "./CarePulseChallenges";
import { CarePulseTechnicalRigor } from "./CarePulseTechnicalRigor";
import { CarePulseValidation } from "./CarePulseValidation";
import { CarePulseDecisions } from "./CarePulseDecisions";
import { CarePulseDataFlow } from "./CarePulseDataFlow";
import { CarePulseAppointmentDataFlow } from "./CarePulseAppointmentDataFlow";
import { CarePulseInteractionStates } from "./CarePulseInteractionStates";
import { CarePulseAdminFlow } from "./CarePulseAdminFlow";
import { CarePulseObservability } from "./CarePulseObservability";
import { CarePulseResults } from "./CarePulseResults";
import { CarePulseEvidence } from "./CarePulseEvidence";
import { CarePulseFinalSystem } from "./CarePulseFinalSystem";
import { CarePulseFooter } from "./CarePulseFooter";

interface CarePulseCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export const CarePulseCaseStudy = ({ project, nextProject }: CarePulseCaseStudyProps) => {
  return (
    <article className="min-h-screen bg-black text-foreground pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Main Container: 1340px width for wide ASCII architecture diagrams */}
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 relative">
          {/* Sticky Technical Document Navigator */}
          <CarePulseNavigator />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full space-y-16 sm:space-y-24">
            {/* HERO */}
            <CarePulseHero project={project} />

            {/* 01 THE PROBLEM */}
            <CarePulseProblem />

            {/* 02 THE APPROACH */}
            <CarePulseApproach />

            {/* 03 ARCHITECTURE & DATA FLOW */}
            <CarePulseArchitecture />

            {/* 04 PATIENT ONBOARDING FLOW */}
            <CarePulsePatientFlow />

            {/* 05 APPOINTMENT LIFECYCLE */}
            <CarePulseAppointmentWorkflow />

            {/* 06 ENGINEERING CHALLENGES */}
            <CarePulseChallenges />

            {/* 07 TECHNICAL RIGOR */}
            <CarePulseTechnicalRigor />

            {/* 08 VALIDATION BOUNDARIES */}
            <CarePulseValidation />

            {/* 09 TECHNICAL DECISIONS */}
            <CarePulseDecisions />

            {/* 10 FROM INPUT TO PERSISTED DATA */}
            <CarePulseDataFlow />

            {/* 11 APPOINTMENT DATA FLOW */}
            <CarePulseAppointmentDataFlow />

            {/* 12 SYSTEM INTERACTION STATES */}
            <CarePulseInteractionStates />

            {/* 13 ADMIN CONTROL FLOW */}
            <CarePulseAdminFlow />

            {/* 14 ERROR OBSERVABILITY */}
            <CarePulseObservability />

            {/* 15 MEASURABLE RESULTS */}
            <CarePulseResults />

            {/* 16 ENGINEERING EVIDENCE */}
            <CarePulseEvidence />

            {/* 17 SYSTEM INTEGRATION */}
            <CarePulseFinalSystem />

            {/* 18 OPEN IMPLEMENTATION CTA & NEXT CASE STUDY */}
            <CarePulseFooter project={project} nextProject={nextProject} />
          </main>
        </div>
      </div>
    </article>
  );
};
