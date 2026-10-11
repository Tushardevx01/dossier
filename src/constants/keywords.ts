const names = [
  "Tushar Kanti Dey",
  "Tushar Kanti Dey Portfolio",
  "Tushar Kanti Dey Engineer",
  "Tushar Kanti Dey Adamas University",
  "Tushar Kanti Dey Kolkata",
];

const roles = [
  "Full Stack Engineer",
  "Infrastructure Engineer",
  "Systems Engineer",
  "Next.js Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "DevOps Engineer",
  "Platform Engineer",
  "Software Engineer",
  "Product Engineer",
];

const skills = [
  // Web Frameworks & Libraries
  "Next.js",
  "React.js",
  "React Server Components",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Express.js",
  "Redux Toolkit",
  "Zustand",

  // Database & Backend
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "Prisma ORM",
  "GraphQL",
  "REST API",
  "Serverless Functions",
  "Edge Runtime",

  // Infrastructure & Systems
  "Docker",
  "Kubernetes",
  "CI/CD Pipelines",
  "Git",
  "GitHub Actions",
  "Cloud Infrastructure",
  "Production Systems",
  "System Architecture",
];

const projects = [
  "RunStack",
  "Aegis",
  "WebScope",
  "Signifiya",
  "CarePulse",
  "Fenix",
  "Subscription Tracker",
];

const locations = [
  "India",
  "Kolkata",
  "Bangalore",
  "Remote",
  "Worldwide"
];

const longTail = [
  "Hire Full Stack Engineer India",
  "Infrastructure Engineer Portfolio",
  "Production Systems Engineer",
  "Next.js Engineer for hire",
  "DevOps Engineer Portfolio",
  "Systems Engineer India",
  "Full Stack Developer with DevOps",
  "TypeScript Engineer India",
  "Node.js Infrastructure Engineer",
  "React Engineer with Systems Background",
];

export const Keywords = [
  ...names,
  ...roles,
  ...skills,
  ...projects,
  ...locations,
  ...longTail,

  ...roles.flatMap((role) => locations.map((loc) => `${role} in ${loc}`)),
  ...skills.map((skill) => `${skill} Engineer`),
  ...skills.map((skill) => `Hire ${skill} Engineer`),
];
