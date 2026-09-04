"use client";

import { useRef } from "react";
import { experienceData } from "@/constant/experience";
import { ExperienceCard } from "../Cards";
import { nasalization } from "@/app/fonts";

export function Experience() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id="experience"
      className="py-24 max-w-6xl mx-auto relative overflow-hidden"
    >
      {/* Background decoration */}



      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h2
            className={`${nasalization.className} text-4xl md:text-5xl font-bold text-primary`}
          >
            Engineering{" "}
            <span className="text-primary/85">Track Record.</span>
          </h2>
          <p
            className="text-xs text-muted-foreground max-w-2xl mx-auto mt-4"
          >
            Roles where I owned delivery from architecture to deployment.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="hidden sm:block absolute left-6 top-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent"
            style={{ height: `${experienceData.length * 300}px` }}
          />

          <div className="space-y-12">
            {experienceData.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${index}`}
                role={exp.role}
                year={exp.year}
                impactSummary={exp.impactSummary}
                description={exp.description}
                company={exp.company}
                technologies={exp.technologies}
                url={exp.url}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
