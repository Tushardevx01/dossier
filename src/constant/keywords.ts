const names = [
  "Tushar Kanti Dey",
  "Tushar Kanti Dey Portfolio",
  "Tushar",
  "Tushar Kanti Dey Adamas University",
  "Tushar Kanti Dey Kolkata",
];

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "Next.js Developer",
  "Frontend Engineer",
  "Backend Developer",
  "Generative AI Engineer",
  "Technical Content Engineer",
  "Problem Setter",
  "Student Developer",
  "Creative Developer",
  "UI/UX Engineer"
];

const skills = [
  // Web Frameworks & Libraries
  "Next.js 15",
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

  // AI & Systems
  "Machine Learning",
  "LLM Integration",
  "Ollama",
  "RAG Pipelines",
  "LangChain",
  "Vector Databases",
  "C++ Optimization",
  "Python Automation",
  "Docker",
  "Kubernetes",
  "CI/CD Pipelines",
  "Git & GitHub"
];

const projects = [
  "CppTestGenAI",
  "Orphia Music Generator",
  "Algo Visualizer Next.js",
  "Bhagavad Gita API",
  "Sorting Algorithm Visualizer",
  "Portfolio Website Next.js",
  "AI Powered Application"
];

const locations = [
  "India",
  "Delhi",
  "NCR",
  "Delhi",
  "Kolkata",
  "Bangalore",
  "Remote",
  "Worldwide"
];

const longTail = [
  "Hire Next.js Developer in India",
  "Best Full Stack Developer Portfolio",
  "React Developer for startup",
  "Software Engineer Intern opportunities",
  "Next.js 15 Portfolio Template",
  "Generative AI Projects Showcase",
  "Frontend Developer with AI skills",
  "Freelance Web Developer India",
  "Collaborate on Open Source",
  "Technical Writer and Developer",
];

export const Keywords = [
  ...names,
  ...roles,
  ...skills,
  ...projects,
  ...locations,
  ...longTail,

  ...roles.flatMap((role) => locations.map((loc) => `${role} in ${loc}`)),
  ...skills.map((skill) => `${skill} Developer`),
  ...skills.map((skill) => `${skill} Expert`),
  ...skills.map((skill) => `Hire ${skill} Developer`),
];
