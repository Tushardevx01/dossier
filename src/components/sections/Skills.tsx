"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { mono, nasalization } from "@/app/fonts";
import { skillsData } from "@/constant";
import React from "react";

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px", amount: 0.1 });

  return (
    <section id="tech" ref={ref} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          className="mb-14 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* <p className="section-label">// Tech Stack</p> */}
          <h2
            className={`${nasalization.className} text-4xl md:text-5xl font-bold`}
            style={{ color: "hsl(var(--foreground))" }}
          >
            Built with the{" "}
            <span style={{ color: "hsl(var(--primary) / 0.85)" }}>
              right tools.
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.map((category, catIdx) => (
            <motion.div
              key={category.title}
              className="tech-grid-card"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: catIdx * 0.07 }}
            >
              {/* Card header */}
              <p
                className={`${mono.className} text-xs font-medium mb-4`}
                style={{ color: "hsl(var(--primary) / 0.55)" }}
              >
                {category.title}
              </p>

              {/* Pill tags */}
              <div className="flex flex-wrap gap-2">
                {category.data.map((skill) => {
                  const Icon = skill.logoComponent as React.ElementType | null;
                  return (
                    <span
                      key={skill.title}
                      className="pill-tag"
                      title={skill.title}
                    >
                      {Icon && (
                        <Icon
                          style={{
                            color: skill.color || "currentColor",
                            fontSize: "0.8rem",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {skill.title}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
