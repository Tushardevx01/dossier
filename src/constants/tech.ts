import { additionalStack, primaryStack, supportingStack } from "@/constant";
import type { Skill } from "@/constant/skillsTiers";
import type { TechStackItem } from "@/types/tech";

export const techDescriptions: Record<string, string> = {
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

export const buildTechStackItem = (skill: Skill): TechStackItem => ({
  name: skill.title,
  icon: skill.logoComponent,
  color: skill.color,
  description: techDescriptions[skill.title] ?? `${skill.title} for modern engineering workflows`,
});

export const techStack: TechStackItem[] = [...primaryStack, ...supportingStack, ...additionalStack]
  .flatMap((category) => category.skills)
  .map(buildTechStackItem);

const techStackMap = new Map(techStack.map((tech) => [tech.name, tech]));

export const resolveTechStackItem = (skill: Skill): TechStackItem => {
  return techStackMap.get(skill.title) ?? buildTechStackItem(skill);
};
