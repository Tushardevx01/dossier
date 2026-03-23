import type React from "react";

export type TechBadgeSize = "sm" | "md" | "lg";

export interface TechStackItem {
  name: string;
  icon: React.ElementType;
  description: string;
  color?: string;
}
