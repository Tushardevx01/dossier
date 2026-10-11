import { techDefinitions } from "./tech-definitions";
import { techIcons } from "./tech-icons";
import type { Skill } from "./skillsTiers";
import type { TechVisual } from "@/types/tech";

export const resolveTechStackItem = (skill: Skill): TechVisual => {
  const definition = techDefinitions[skill.techKey];
  const icon = techIcons[skill.techKey];

  return {
    name: definition?.name ?? skill.techKey,
    description: definition?.description ?? `${skill.techKey} for modern engineering workflows`,
    color: definition?.color,
    icon: icon ?? techIcons.TypeScript,
  };
};
