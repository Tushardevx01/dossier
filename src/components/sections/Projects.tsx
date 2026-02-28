"use client";

import { motion } from "motion/react";

import { nasalization } from "@/app/fonts";
import { projectsData } from "@/constant/";

type Project = {
  name: string;
  description: string;
  github_link: string;
  demo?: string;
  tech: string[];
  role: string;
};

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -6 },
};

const titleVariants = {
  rest: { opacity: 0.92 },
  hover: { opacity: 1 },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 3 },
};

export const Projects = () => {
  const projects = projectsData as Project[];

  return (
    <section
      id="projects"
      className="py-28 sm:py-32 max-w-6xl mx-auto relative"
    >
      <div className="mx-auto px-4 lg:px-8">
        <div className="mb-14 sm:mb-16">
          <h2
            className={`${nasalization.className} text-4xl md:text-5xl font-semibold text-white tracking-tight`}
          >
            Selected Work
          </h2>
          <p className="mt-4 text-lg text-neutral-400 leading-relaxed max-w-2xl">
            Systems and products built with long-term scalability in mind.
          </p>
        </div>

        {projects.length > 0 && (
          <div className="mt-10 sm:mt-14 grid gap-8 lg:gap-10 md:grid-cols-2">
            {projects.map((project) => (
              <motion.article
                key={project.name}
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={cardVariants}
                transition={{ duration: 0.3 }}
                className="group border border-neutral-800/60 hover:border-neutral-700/80 rounded-2xl p-6 sm:p-7 transition-colors duration-300 bg-neutral-950/20"
              >
                <div className="flex flex-col gap-4 sm:gap-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    {project.role}
                  </div>

                  <motion.h3
                    variants={titleVariants}
                    className="text-2xl font-semibold text-white tracking-tight leading-tight"
                  >
                    {project.name}
                  </motion.h3>

                  <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((techItem) => (
                      <span
                        key={techItem}
                        className="px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wide text-neutral-400 border border-neutral-800/80"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 items-center pt-2">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live preview for ${project.name}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-white border border-neutral-700 px-4 py-2 rounded-full hover:border-neutral-500 hover:bg-white/[0.03] transition-colors"
                      >
                        View Case Study
                        <motion.span variants={arrowVariants} className="inline-block">
                          →
                        </motion.span>
                      </a>
                    )}
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open source code for ${project.name}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
                    >
                      Source Code
                      <motion.span variants={arrowVariants} className="inline-block">
                        →
                      </motion.span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
