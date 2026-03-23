"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { mono, nasalization } from "@/app/fonts";
import { primaryStack, supportingStack, additionalStack } from "@/constant";
import type { Skill, SkillsCategory } from "@/constant/skillsTiers";
import React from "react";

const techDescriptions: Record<string, string> = {
  "TypeScript": "Typed JavaScript for scalable applications",
  "React": "Component-driven UI library for interactive frontends",
  "Next.js": "React framework optimized for production and SEO",
  "Node.js": "Backend runtime for building APIs and services",
  "Express.js": "Minimal web framework for backend routing and APIs",
  "Supabase": "Backend-as-a-service with real-time features",
  "Docker": "Containerization for consistent environments",
  "Git": "Version control for collaborative development",
  "Tailwind CSS": "Utility-first CSS framework for rapid UI styling",
  "JavaScript": "Core language for modern web application logic",
  "HTML5": "Semantic markup standard for structured web content",
  "CSS3": "Styling language for responsive visual presentation",
  "SASS": "CSS preprocessor for maintainable design systems",
  "React Native": "Framework for cross-platform native mobile apps",
  "Radix UI": "Accessible unstyled primitives for custom UI systems",
  "Framer Motion": "Animation library for fluid React interactions",
  "Webpack": "Module bundler for optimized frontend assets",
  "NestJS": "Scalable Node.js framework for enterprise backends",
  "JWT / OAuth": "Authentication and authorization standards for secure access",
  "WebSockets": "Real-time bidirectional communication for live systems",
  "NPM": "Package manager for JavaScript ecosystem tooling",
  "Nodemon": "Development utility for automatic server restarts",
  "MySQL": "Relational database for structured transactional data",
  "MongoDB": "Document database for flexible schema design",
  "Appwrite": "Open-source backend platform for app services",
  "Redis": "In-memory store for caching and performance",
  "Prisma": "Type-safe ORM and schema tooling for databases",
  "Google Cloud": "Cloud platform for compute, storage, and services",
  "Netlify": "Frontend deployment and hosting for web projects",
  "Vercel": "Deployment platform for frontend apps",
  "Render": "Cloud hosting platform for full-stack services",
  "GitHub": "Code collaboration platform for repositories and CI",
  "Postman": "API testing and collaboration workspace",
  "ESLint": "Static analysis tool for consistent JavaScript quality",
  "Linux(Fedora)": "Linux development environment for engineering workflows",
  "OpenAPI": "Specification standard for documented REST APIs",
  "C": "Low-level systems programming language",
  "C++": "Performance-oriented language for complex systems",
  "Java": "Object-oriented language for enterprise-scale software",
  "Shell (Bash)": "Command-line scripting for automation workflows",
  "Python": "General-purpose language for scripting and data workflows",
  "Figma": "Collaborative interface design and prototyping platform",
  "Canva": "Fast visual design tool for branded assets",
  "Photoshop": "Raster editing tool for advanced visual composition",
  "Illustrator": "Vector graphics tool for scalable design assets",
  "XD": "UI/UX prototyping tool for interactive design flows",
};

type TechStackItem = {
  name: string;
  icon: React.ElementType;
  description: string;
  color?: string;
};

const techStack: TechStackItem[] = [...primaryStack, ...supportingStack, ...additionalStack]
  .flatMap((category) => category.skills)
  .map((skill) => ({
    name: skill.title,
    icon: skill.logoComponent,
    color: skill.color,
    description: techDescriptions[skill.title] ?? `${skill.title} for modern engineering workflows`,
  }));

const techStackMap = new Map(techStack.map((tech) => [tech.name, tech]));

const toTechItem = (skill: Skill): TechStackItem => {
  return (
    techStackMap.get(skill.title) ?? {
      name: skill.title,
      icon: skill.logoComponent,
      color: skill.color,
      description: `${skill.title} for modern engineering workflows`,
    }
  );
};

interface TechBadgeProps {
  tech: TechStackItem;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

/**
 * TechBadge Component
 * Reusable badge for individual skills with hover effects
 */
export const TechBadge = ({
  tech,
  size = "md",
  delay = 0,
}: TechBadgeProps) => {
  const Icon = tech.icon;
  const iconColor = tech.color ?? "currentColor";
  const description = tech.description;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-1.5 text-sm",
    lg: "px-3.5 py-2 text-sm",
  };

  const iconSizes = {
    sm: "0.9rem",
    md: "0.95rem",
    lg: "1rem",
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
      <button
        type="button"
        aria-label={`${tech.name}: ${description}`}
        className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 ${sizeClasses[size]} text-white/75 transition-all duration-150 ease-out hover:bg-white/10 hover:border-primary/40 focus-visible:bg-white/10 focus-visible:border-primary/40 focus-visible:outline-none`}
      >
        {Icon && (
          <Icon
            style={{
              color: iconColor,
              fontSize: iconSizes[size],
              flexShrink: 0,
            }}
            className="opacity-80"
            aria-label={`${tech.name} icon`}
            role="img"
          />
        )}
        <span className="font-medium">{tech.name}</span>
      </button>
      <div
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[240px] -translate-x-1/2 rounded-md border border-white/10 bg-black/90 px-2 py-1 text-xs text-white/80 shadow-[0_6px_18px_rgba(0,0,0,0.45),0_0_14px_rgba(255,255,255,0.06)] opacity-0 translate-y-1 transition-all duration-150 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
        role="tooltip"
        aria-hidden="true"
      >
        {description}
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
  skills: Skill[];
  categoryDelay?: number;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: categoryDelay }}
      viewport={{ once: true, margin: "-50px" }}
      className="panel-shell space-y-3 p-4 sm:p-5"
    >
      <p
        className={`${mono.className} text-xs font-semibold uppercase tracking-wider`}
        style={{ color: "hsl(var(--primary) / 0.6)" }}
      >
        {title}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, idx) => (
          <TechBadge
            key={skill.title}
            tech={toTechItem(skill)}
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
  categories: SkillsCategory[];
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
        className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5"
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

  return (
    <section id="tech" ref={ref} className="py-24 relative overflow-hidden control-grid">
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
            Technology{" "}
            <span style={{ color: "hsl(var(--primary) / 0.85)" }}>
              Matrix.
            </span>
          </h2>
          <p
            className="text-base text-muted-foreground max-w-2xl"
            style={{ color: "hsl(var(--foreground) / 0.6)" }}
          >
            Grouped system modules for modern web infrastructure and production operations.
          </p>
        </motion.div>

        {/* Skills Content */}
        <div className="space-y-16">
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
                background: "hsl(240 25% 8% / 0.78)",
                border: "1px solid hsl(var(--glass-border))",
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

    </section>
  );
};
