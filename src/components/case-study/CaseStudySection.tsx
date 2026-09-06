import React from "react";
import { SectionHeading } from "./SectionHeading";

export interface CaseStudySectionProps {
  id: string;
  number?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  pattern?: "A" | "B" | "C" | "D" | "default";
  className?: string;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({
  id,
  number,
  title,
  subtitle,
  badge,
  intro,
  children,
  className = "",
}) => {
  return (
    <section
      id={id}
      data-section-id={id}
      className={`scroll-mt-28 mb-20 sm:mb-28 lg:mb-32 space-y-7 ${className}`}
    >
      {/* Section Header */}
      {title && (
        <SectionHeading
          id={id}
          number={number}
          title={title}
          subtitle={subtitle}
          badge={badge}
        />
      )}

      {/* Intro Narrative (Reading Column: max 760px) */}
      {intro && (
        <div className="max-w-[760px] text-sm sm:text-base text-neutral-300 font-sans leading-relaxed space-y-4">
          {typeof intro === "string" ? <p>{intro}</p> : intro}
        </div>
      )}

      {/* Primary Visual & Supporting Details */}
      <div className="w-full space-y-6">{children}</div>
    </section>
  );
};
