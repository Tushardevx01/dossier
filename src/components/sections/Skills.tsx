"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { nasalization } from "@/app/fonts";
import { additionalStack, primaryStack, supportingStack } from "@/constant";
import { SkillTierBlock } from "@/components/sections/skills/SkillTierBlock";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Skills = () => {
  const { ref, isInView } = useScrollAnimation({ once: true, margin: "-80px", amount: 0.1 });
  const [showAdditional, setShowAdditional] = useState(false);

  return (
    <section id="tech" ref={ref} className="py-24 relative overflow-hidden control-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-16 space-y-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className={`${nasalization.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
            style={{ color: "hsl(var(--foreground))" }}
          >
            Technology <span style={{ color: "hsl(var(--primary) / 0.85)" }}>Matrix.</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl" style={{ color: "hsl(var(--foreground) / 0.6)" }}>
            Technologies grouped by architecture layer, with each tool tied to an operational use case.
          </p>
        </motion.div>

        <div className="space-y-16">
          <SkillTierBlock
            label="Primary Stack"
            description="Core production-level technologies I actively build systems with"
            categories={primaryStack}
            badgeSize="lg"
            tierDelay={0.1}
          />

          <SkillTierBlock
            label="Supporting Tools"
            description="Regular operational tools for deployment, architecture, and workflow"
            categories={supportingStack}
            badgeSize="md"
            tierDelay={0.3}
          />

          <motion.div className="space-y-6" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <motion.button
              onClick={() => setShowAdditional((prev) => !prev)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg transition-all"
              style={{
                background: "hsl(240 25% 8% / 0.78)",
                border: "1px solid hsl(var(--glass-border))",
                color: "hsl(var(--foreground) / 0.8)",
              }}
              aria-expanded={showAdditional}
              aria-controls="additional-tech-stack"
            >
              <span className="text-sm font-medium">{showAdditional ? "Hide" : "View"} Additional Technologies</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: showAdditional ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <polyline points="6 10 8 12 10 10" />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {showAdditional && (
                <motion.div
                  id="additional-tech-stack"
                  key="additional-stack"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <SkillTierBlock
                    label="Broader Experience"
                    description="Additional technologies from exploration and specialized domains"
                    categories={additionalStack}
                    badgeSize="sm"
                    tierDelay={0}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
