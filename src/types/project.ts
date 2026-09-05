export interface ProjectArchitectureLayer {
  name: string;
  role: string;
  tech: string;
}

export interface ProjectChallenge {
  title: string;
  description: string;
  solution: string;
}

export interface ProjectDecision {
  technology: string;
  reason: string;
}

export interface Project {
  id: string;
  slug: string;
  index?: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  role: string;
  year: string;
  timeline: string;
  status: "Production" | "Active" | "Archived" | "Open Source";
  technologies: string[];
  tech: string[]; // alias for backward compatibility
  problem: string;
  approach: string;
  architecture: {
    flowSummary: string;
    layers: ProjectArchitectureLayer[];
  };
  challenges: ProjectChallenge[];
  decisions: ProjectDecision[];
  results: string[];
  images?: string[];
  liveUrl?: string;
  demo?: string; // alias for backward compatibility
  githubUrl: string;
  github_link: string; // alias for backward compatibility
  docsUrl?: string;
}

export type ProjectCaseStudy = Project;