import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 300; // Cache for 5 minutes

interface GitHubRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubEventResponse {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: {
    commits?: Array<{ sha: string; message: string }>;
  };
  created_at: string;
}

const verifiedStaticRepos = [
  {
    name: "runstack",
    description: "Distributed deployment and job orchestration platform in Go with Kafka, Redis, and Docker.",
    language: "Go",
    url: "https://github.com/tushardevx01/runstack",
    stars: 0,
    forks: 0,
    updatedAt: "2026-09-01T12:00:00Z",
  },
  {
    name: "project-aegis",
    description: "Autonomous infrastructure resilience and self-healing incident remediation engine.",
    language: "TypeScript",
    url: "https://github.com/tushardevx01/project-aegis",
    stars: 0,
    forks: 0,
    updatedAt: "2026-08-28T14:30:00Z",
  },
  {
    name: "dossier",
    description: "High-performance personal engineering portfolio built with Next.js 16 App Router and Framer Motion.",
    language: "TypeScript",
    url: "https://github.com/tushardevx01/dossier",
    stars: 0,
    forks: 0,
    updatedAt: "2026-09-05T18:00:00Z",
  },
  {
    name: "SimpyUI",
    description: "Component system with motion primitives, design tokens, and layout patterns.",
    language: "TypeScript",
    url: "https://github.com/AbhishekS04/SimpyUI",
    stars: 0,
    forks: 0,
    updatedAt: "2026-07-15T09:00:00Z",
  },
];

const verifiedStaticActivity = [
  {
    id: "act-1",
    repo: "runstack",
    message: "feat: scheduler shutdown and graceful worker termination",
    date: "Sep 2026",
    url: "https://github.com/tushardevx01/runstack",
  },
  {
    id: "act-2",
    repo: "project-aegis",
    message: "feat: autonomous infrastructure recovery workflow",
    date: "Aug 2026",
    url: "https://github.com/tushardevx01/project-aegis",
  },
  {
    id: "act-3",
    repo: "dossier",
    message: "refactor: structured case study data architecture & command palette",
    date: "Sep 2026",
    url: "https://github.com/tushardevx01/dossier",
  },
];

export async function GET() {
  const username = "tushardevx01";
  const headers = {
    "User-Agent": "dossier-portfolio-agent",
    Accept: "application/vnd.github.v3+json",
  };

  try {
    const [userRes, reposRes, eventsRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 300 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
        headers,
        next: { revalidate: 300 },
      }),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
        headers,
        next: { revalidate: 300 },
      }),
    ]);

    let publicReposCount = 18;
    let repos = verifiedStaticRepos;
    let recentActivity = verifiedStaticActivity;
    let isLive = false;

    // Process user info if OK
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      const userData = await userRes.value.json();
      if (typeof userData.public_repos === "number") {
        publicReposCount = userData.public_repos;
        isLive = true;
      }
    }

    // Process repos if OK
    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      const reposData = (await reposRes.value.json()) as GitHubRepoResponse[];
      if (Array.isArray(reposData) && reposData.length > 0) {
        repos = reposData.map((r) => ({
          name: r.name,
          description: r.description || "Public repository",
          language: r.language || "TypeScript",
          url: r.html_url,
          stars: r.stargazers_count,
          forks: r.forks_count,
          updatedAt: r.updated_at,
        }));
        isLive = true;
      }
    }

    // Process events if OK
    if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
      const eventsData = (await eventsRes.value.json()) as GitHubEventResponse[];
      if (Array.isArray(eventsData) && eventsData.length > 0) {
        const pushEvents = eventsData
          .filter((e) => e.type === "PushEvent" && e.payload?.commits && e.payload.commits.length > 0)
          .slice(0, 4)
          .map((e) => {
            const commit = e.payload.commits![0];
            const repoCleanName = e.repo.name.split("/")[1] || e.repo.name;
            return {
              id: e.id,
              repo: repoCleanName,
              message: commit.message.split("\n")[0],
              date: new Date(e.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              }),
              url: `https://github.com/${e.repo.name}`,
            };
          });

        if (pushEvents.length > 0) {
          recentActivity = pushEvents;
          isLive = true;
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        source: isLive ? "live" : "cached",
        user: {
          username,
          publicReposCount,
          profileUrl: `https://github.com/${username}`,
        },
        repos,
        recentActivity,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch {
    // Graceful fallback: return verified static data
    return NextResponse.json(
      {
        success: true,
        source: "fallback",
        user: {
          username,
          publicReposCount: 18,
          profileUrl: `https://github.com/${username}`,
        },
        repos: verifiedStaticRepos,
        recentActivity: verifiedStaticActivity,
      },
      { status: 200 }
    );
  }
}
