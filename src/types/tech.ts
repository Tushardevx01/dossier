import type { IconType } from "react-icons";

export type TechBadgeSize = "sm" | "md" | "lg";

export interface TechVisual {
  name: string;
  icon: IconType;
  description: string;
  color?: string;
}
