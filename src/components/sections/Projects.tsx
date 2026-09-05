"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { mono, nasalization } from "@/app/fonts";
import { projectsData } from "@/constant/projects";
import { ProjectCard } from "@/components/case-study/ProjectCard";

export const Projects = () => {
  const projects = projectsData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px", amount: 0.1 });

  return (
    <section
      id="selected-work"
      ref={ref}
      className="py-24 relative scroll-mt-24"
    >
      <div id="projects" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`${nasalization.className} text-3xl sm:text-4xl md:text-5xl font-bold`}
            style={{ color: "hsl(var(--foreground))" }}
          >
            Selected{" "}
            <span style={{ color: "hsl(var(--primary) / 0.85)" }}>Work.</span>
          </h2>
          <p
            className={`${mono.className} text-sm`}
            style={{ color: "hsl(var(--foreground) / 0.45)" }}
          >
            Systems and products built with long-term scalability in mind.
          </p>
        </motion.div>

        {/* Project Cards */}
        {projects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug || project.name}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
