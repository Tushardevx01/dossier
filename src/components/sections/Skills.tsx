"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { mono, nasalization } from "@/app/fonts";
import { primaryStack, supportingStack, additionalStack } from "@/constant";
import React from "react";

interface SkillBadgeProps {
  title: string;
  logoComponent: React.ElementType;
  color?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

/**
 * SkillBadge Component
 * Reusable badge for individual skills with hover effects
 */
const SkillBadge = ({
  title,
  logoComponent: Icon,
  color = "currentColor",
  size = "md",
  delay = 0,
}: SkillBadgeProps) => {
  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base",
  };

  const iconSizes = {
    sm: "0.75rem",
    md: "0.9rem",
    lg: "1.1rem",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay,
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <div
        className={`inline-flex items-center gap-2 skill-badge ${sizeClasses[size]} group-hover:shadow-lg transition-all`}
      >
        {Icon && (
          <Icon
            style={{
              color: color,
              fontSize: iconSizes[size],
              flexShrink: 0,
            }}
          />
        )}
        <span className="font-medium">{title}</span>
      </div>
    </motion.div>
  );
};

/**
 * SkillCategory Component
 * Groups related skills under a category heading
 */
const SkillCategory = ({
  title,
  skills,
  categoryDelay = 0,
  size = "md",
}: {
  title: string;
  skills: any[];
  categoryDelay?: number;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: categoryDelay }}
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-3"
    >
      <p
        className={`${mono.className} text-xs font-semibold uppercase tracking-wider`}
        style={{ color: "hsl(var(--primary) / 0.6)" }}
      >
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <SkillBadge
            key={skill.title}
            {...skill}
            size={size}
            delay={categoryDelay + idx * 0.02}
          />
        ))}
      </div>
    </motion.div>
  );
};

/**
 * SkillTier Component
 * Renders a complete skill tier section
 */
const SkillTier = ({
  label,
  description,
  categories,
  badgeSize = "md",
  isExpanded,
  tierDelay = 0,
}: {
  label: string;
  description: string;
  categories: any[];
  badgeSize?: "sm" | "md" | "lg";
  isExpanded?: boolean;
  tierDelay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: tierDelay, duration: 0.5 }}
      viewport={{ once: true, margin: "-80px" }}
      className="space-y-4"
    >
      <div>
        <h3
          className={`${nasalization.className} text-xl md:text-2xl font-semibold mb-2`}
          style={{ color: "hsl(var(--foreground))" }}
        >
          {label}
        </h3>
        <p
          className="text-sm md:text-base"
          style={{ color: "hsl(var(--foreground) / 0.65)" }}
        >
          {description}
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        layout
      >
        {categories.map((category, idx) => (
          <SkillCategory
            key={category.title}
            {...category}
            categoryDelay={tierDelay + idx * 0.08}
            size={badgeSize}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

/**
 * Skills Component
 * 3-tier skill hierarchy: Primary → Supporting → Additional (collapsible)
 */
export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px", amount: 0.1 });
  const [showAdditional, setShowAdditional] = useState(false);

  const tierVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="tech" ref={ref} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
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
            Built with the{" "}
            <span style={{ color: "hsl(var(--primary) / 0.85)" }}>
              right tools.
            </span>
          </h2>
          <p
            className="text-base text-muted-foreground max-w-2xl"
            style={{ color: "hsl(var(--foreground) / 0.6)" }}
          >
            A focused full-stack engineer with devops ownership, specializing in modern web
            infrastructure.
          </p>
        </motion.div>

        {/* Skills Content */}
        <div className="space-y-20">
          {/* PRIMARY STACK */}
          <SkillTier
            label="Primary Stack"
            description="Core production-level technologies I actively build systems with"
            categories={primaryStack}
            badgeSize="lg"
            tierDelay={0.1}
          />

          {/* SUPPORTING TOOLS */}
          <SkillTier
            label="Supporting Tools"
            description="Regular operational tools for deployment, architecture, and workflow"
            categories={supportingStack}
            badgeSize="md"
            tierDelay={0.3}
          />

          {/* ADDITIONAL TECHNOLOGIES - COLLAPSIBLE */}
          <motion.div
            className="space-y-6"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Toggle Button */}
            <motion.button
              onClick={() => setShowAdditional(!showAdditional)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg transition-all"
              style={{
                background: "hsl(245 30% 8% / 0.8)",
                border: "1px solid hsl(275 30% 25% / 0.5)",
                color: "hsl(var(--foreground) / 0.8)",
              }}
            >
              <span className="text-sm font-medium">
                {showAdditional ? "Hide" : "View"} Additional Technologies
              </span>
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
              >
                <polyline points="6 10 8 12 10 10" />
              </motion.svg>
            </motion.button>

            {/* Additional Stack - Animated Container */}
            <AnimatePresence>
              {showAdditional && (
                <motion.div
                  key="additional-stack"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <SkillTier
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

      {/* Ambient background effects */}
      <div
        className="absolute top-32 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{ transform: "translateX(-50%)" }}
      />
      <div
        className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{ transform: "translateX(50%)" }}
      />
    </section>
  );
};
