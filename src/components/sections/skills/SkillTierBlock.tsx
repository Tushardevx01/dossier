"use client";

import { motion } from "motion/react";

import { nasalization } from "@/app/fonts";
import { SkillCategoryCard } from "@/components/sections/skills/SkillCategoryCard";
import type { SkillsCategory } from "@/constant/skillsTiers";
import type { TechBadgeSize } from "@/types/tech";

interface SkillTierBlockProps {
  label: string;
  description: string;
  categories: SkillsCategory[];
  badgeSize?: TechBadgeSize;
  tierDelay?: number;
}

export const SkillTierBlock = ({
  label,
  description,
  categories,
  badgeSize = "md",
  tierDelay = 0,
}: SkillTierBlockProps) => {
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
        <p className="text-sm md:text-base" style={{ color: "hsl(var(--foreground) / 0.65)" }}>
          {description}
        </p>
      </div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5" layout>
        {categories.map((category, idx) => (
          <SkillCategoryCard
            key={category.title}
            title={category.title}
            skills={category.skills}
            categoryDelay={tierDelay + idx * 0.08}
            size={badgeSize}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
