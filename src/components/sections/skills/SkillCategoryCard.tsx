"use client";

import { motion } from "motion/react";

import { mono } from "@/app/fonts";
import { resolveTechStackItem } from "@/constants/tech";
import { TechBadge } from "@/components/shared/TechBadge";
import type { Skill } from "@/constant/skillsTiers";
import type { TechBadgeSize } from "@/types/tech";

interface SkillCategoryCardProps {
  title: string;
  skills: Skill[];
  categoryDelay?: number;
  size?: TechBadgeSize;
}

export const SkillCategoryCard = ({
  title,
  skills,
  categoryDelay = 0,
  size = "md",
}: SkillCategoryCardProps) => {
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
            tech={resolveTechStackItem(skill)}
            size={size}
            delay={categoryDelay + idx * 0.02}
          />
        ))}
      </div>
    </motion.div>
  );
};
