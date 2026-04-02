"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { mono, nasalization } from "@/app/fonts";
import { projectsData } from "@/constant/projects";

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
  const projects = projectsData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px", amount: 0.1 });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24"
    >
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
              <motion.article
                key={project.name}
                initial="rest"
                whileHover="hover"
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.08 * index }}
                variants={cardVariants}
                className="rounded-xl border border-neutral-800/50 bg-[#0c0c0c] p-6 sm:p-8 transition-all duration-300 hover:border-neutral-700 hover:bg-[#111111] hover:shadow-lg hover:shadow-neutral-900/50"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className={`${mono.className} text-[11px] uppercase tracking-widest text-neutral-500`}>
                      {project.role}
                    </p>
                    <motion.h3 
                      variants={titleVariants}
                      className="mt-2 text-xl font-semibold text-white"
                    >
                      {project.name}
                    </motion.h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className={`${mono.className} text-[11px] text-emerald-400`}>Live</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2.5 mb-8">
                  {project.tech.map((techItem) => (
                    <span
                      key={techItem}
                      className={`${mono.className} px-3 py-1.5 rounded-full text-[11px] text-neutral-400 border border-neutral-700/60`}
                    >
                      {techItem.toUpperCase()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${mono.className} text-xs text-white border border-neutral-600 px-4 py-2 rounded-full hover:border-neutral-400 transition-colors`}
                    >
                      View Live Deployment <motion.span variants={arrowVariants} className="inline-block">→</motion.span>
                    </a>
                  )}
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${mono.className} text-xs text-neutral-400 hover:text-white transition-colors`}
                  >
                    View Architecture <motion.span variants={arrowVariants} className="inline-block">→</motion.span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
