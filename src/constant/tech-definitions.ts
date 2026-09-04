import type { TechIconKey } from "./tech-icons";

export interface TechDefinition {
  name: string;
  description: string;
  color?: string;
  iconKey: TechIconKey;
}

export const techDefinitions: Record<TechIconKey, TechDefinition> = {
  TypeScript: {
    name: "TypeScript",
    description: "Typed JavaScript for scalable applications",
    color: "#3178C6",
    iconKey: "TypeScript",
  },
  React: {
    name: "React",
    description: "Component-driven UI library for interactive frontends",
    color: "#61DAFB",
    iconKey: "React",
  },
  "Next.js": {
    name: "Next.js",
    description: "React framework optimized for production and SEO",
    color: "#000000",
    iconKey: "Next.js",
  },
  "Tailwind CSS": {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI styling",
    color: "#06B6D4",
    iconKey: "Tailwind CSS",
  },
  JavaScript: {
    name: "JavaScript",
    description: "Core language for modern web application logic",
    color: "#F7DF1E",
    iconKey: "JavaScript",
  },
  "Node.js": {
    name: "Node.js",
    description: "Backend runtime for building APIs and services",
    color: "#339933",
    iconKey: "Node.js",
  },
  "Express.js": {
    name: "Express.js",
    description: "Minimal web framework for backend routing and APIs",
    color: "#000000",
    iconKey: "Express.js",
  },
  NestJS: {
    name: "NestJS",
    description: "Scalable Node.js framework for enterprise backends",
    color: "#E0234E",
    iconKey: "NestJS",
  },
  "JWT / OAuth": {
    name: "JWT / OAuth",
    description: "Authentication and authorization standards for secure access",
    color: "#000000",
    iconKey: "JWT / OAuth",
  },
  WebSockets: {
    name: "WebSockets",
    description: "Real-time bidirectional communication for live systems",
    color: "#010101",
    iconKey: "WebSockets",
  },
  Supabase: {
    name: "Supabase",
    description: "Backend-as-a-service with real-time features",
    color: "#3ECF8E",
    iconKey: "Supabase",
  },
  MySQL: {
    name: "MySQL",
    description: "Relational database for structured transactional data",
    color: "#4479A1",
    iconKey: "MySQL",
  },
  Prisma: {
    name: "Prisma",
    description: "Type-safe ORM and schema tooling for databases",
    color: "#2D3748",
    iconKey: "Prisma",
  },
  MongoDB: {
    name: "MongoDB",
    description: "Document database for flexible schema design",
    color: "#47A248",
    iconKey: "MongoDB",
  },
  Docker: {
    name: "Docker",
    description: "Containerization for consistent environments",
    color: "#2496ED",
    iconKey: "Docker",
  },
  "Google Cloud": {
    name: "Google Cloud",
    description: "Cloud platform for compute, storage, and services",
    color: "#4285F4",
    iconKey: "Google Cloud",
  },
  Vercel: {
    name: "Vercel",
    description: "Deployment platform for frontend apps",
    color: "#000000",
    iconKey: "Vercel",
  },
  Render: {
    name: "Render",
    description: "Cloud hosting platform for full-stack services",
    color: "#46E3B7",
    iconKey: "Render",
  },
  Git: {
    name: "Git",
    description: "Version control for collaborative development",
    color: "#F05032",
    iconKey: "Git",
  },
  GitHub: {
    name: "GitHub",
    description: "Code collaboration platform for repositories and CI",
    color: "#181717",
    iconKey: "GitHub",
  },
  Postman: {
    name: "Postman",
    description: "API testing and collaboration workspace",
    color: "#FF6C37",
    iconKey: "Postman",
  },
  ESLint: {
    name: "ESLint",
    description: "Static analysis tool for consistent JavaScript quality",
    color: "#4B32C3",
    iconKey: "ESLint",
  },
  HTML5: {
    name: "HTML5",
    description: "Semantic markup standard for structured web content",
    color: "#E34F26",
    iconKey: "HTML5",
  },
  CSS3: {
    name: "CSS3",
    description: "Styling language for responsive visual presentation",
    color: "#1572B6",
    iconKey: "CSS3",
  },
  SASS: {
    name: "SASS",
    description: "CSS preprocessor for maintainable design systems",
    color: "#CC6699",
    iconKey: "SASS",
  },
  "React Native": {
    name: "React Native",
    description: "Framework for cross-platform native mobile apps",
    color: "#61DAFB",
    iconKey: "React Native",
  },
  "Radix UI": {
    name: "Radix UI",
    description: "Accessible unstyled primitives for custom UI systems",
    color: "#161618",
    iconKey: "Radix UI",
  },
  "Framer Motion": {
    name: "Framer Motion",
    description: "Animation library for fluid React interactions",
    color: "#0055FF",
    iconKey: "Framer Motion",
  },
  Webpack: {
    name: "Webpack",
    description: "Module bundler for optimized frontend assets",
    color: "#8DD6F9",
    iconKey: "Webpack",
  },
  NPM: {
    name: "NPM",
    description: "Package manager for JavaScript ecosystem tooling",
    color: "#CB3837",
    iconKey: "NPM",
  },
  Nodemon: {
    name: "Nodemon",
    description: "Development utility for automatic server restarts",
    color: "#76D04B",
    iconKey: "Nodemon",
  },
  Appwrite: {
    name: "Appwrite",
    description: "Open-source backend platform for app services",
    color: "#F02E65",
    iconKey: "Appwrite",
  },
  Redis: {
    name: "Redis",
    description: "In-memory store for caching and performance",
    color: "#DC382D",
    iconKey: "Redis",
  },
  "Linux(Fedora)": {
    name: "Linux(Fedora)",
    description: "Linux development environment for engineering workflows",
    color: "#51A2DA",
    iconKey: "Linux(Fedora)",
  },
  C: {
    name: "C",
    description: "Low-level systems programming language",
    color: "#A8B9CC",
    iconKey: "C",
  },
  "C++": {
    name: "C++",
    description: "Performance-oriented language for complex systems",
    color: "#00599C",
    iconKey: "C++",
  },
  Java: {
    name: "Java",
    description: "Object-oriented language for enterprise-scale software",
    color: "#007396",
    iconKey: "Java",
  },
  "Shell (Bash)": {
    name: "Shell (Bash)",
    description: "Command-line scripting for automation workflows",
    color: "#4EAA25",
    iconKey: "Shell (Bash)",
  },
  Python: {
    name: "Python",
    description: "General-purpose language for scripting and data workflows",
    color: "#3776AB",
    iconKey: "Python",
  },
  Figma: {
    name: "Figma",
    description: "Collaborative interface design and prototyping platform",
    color: "#F24E1E",
    iconKey: "Figma",
  },
  Photoshop: {
    name: "Photoshop",
    description: "Raster editing tool for advanced visual composition",
    color: "#31A8FF",
    iconKey: "Photoshop",
  },
  Illustrator: {
    name: "Illustrator",
    description: "Vector graphics tool for scalable design assets",
    color: "#FF9A00",
    iconKey: "Illustrator",
  },
  XD: {
    name: "XD",
    description: "UI/UX prototyping tool for interactive design flows",
    color: "#FF61F6",
    iconKey: "XD",
  },
  Netlify: {
    name: "Netlify",
    description: "Frontend deployment and hosting for web projects",
    color: "#00C7B7",
    iconKey: "Netlify",
  },
};