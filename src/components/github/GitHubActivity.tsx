"use client";

import { useEffect, useState } from "react";
import { mono, nasalization } from "@/app/fonts";
import { GitHubStats } from "./GitHubStats";
import { GitHubRepositories } from "./GitHubRepositories";
import { GitHubTimeline } from "./GitHubTimeline";
import { LuArrowUpRight, LuCircleAlert } from "react-icons/lu";

interface GitHubDataState {
  user: {
    username: string;
    publicReposCount: number;
    profileUrl: string;
  };
  repos: Array<{
    name: string;
    description: string;
    language: string;
    url: string;
    stars?: number;
    forks?: number;
  }>;
  recentActivity: Array<{
    id: string;
    repo: string;
    message: string;
    date: string;
    url: string;
  }>;
  source: "live" | "cached" | "fallback";
}

export const GitHubActivity = () => {
  const [data, setData] = useState<GitHubDataState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchGitHubData() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (isMounted && json.success) {
          setData(json);
        }
      } catch {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="open-source"
      aria-label="GitHub and Open Source Activity"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-neutral-800/60 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800/50">
          <div>
            <span className={`${mono.className} text-[11px] tracking-[0.24em] text-neutral-500 uppercase font-semibold block mb-2`}>
              REAL-TIME ACTIVITY // 011
            </span>
            <h2 className={`${nasalization.className} text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase`}>
              GITHUB ACTIVITY
            </h2>
          </div>
          <a
            href="https://github.com/tushardevx01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-xs font-mono text-neutral-200 transition-all"
          >
            <span>@tushardevx01 ON GITHUB</span>
            <LuArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Loading State Skeletons */}
        {loading && (
          <div className="space-y-6">
            <div className="h-20 rounded-xl bg-[#09090b] border border-neutral-800/60 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 rounded-xl bg-[#09090b] border border-neutral-800/60 animate-pulse" />
              <div className="h-32 rounded-xl bg-[#09090b] border border-neutral-800/60 animate-pulse" />
              <div className="h-32 rounded-xl bg-[#09090b] border border-neutral-800/60 animate-pulse" />
            </div>
          </div>
        )}

        {/* Error Fallback */}
        {error && !data && (
          <div className="p-8 rounded-xl border border-neutral-800 bg-[#09090b] text-center space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900 text-neutral-400">
              <LuCircleAlert className="w-5 h-5" />
            </div>
            <p className="font-mono text-sm text-neutral-400">
              Unable to load live activity at this moment.
            </p>
            <a
              href="https://github.com/tushardevx01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 text-black font-mono text-xs font-medium"
            >
              <span>View GitHub Profile</span>
              <LuArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Content */}
        {data && (
          <div className="space-y-10">
            <GitHubStats
              publicReposCount={data.user.publicReposCount}
              source={data.source}
            />

            <GitHubRepositories repos={data.repos} />

            {data.recentActivity && data.recentActivity.length > 0 && (
              <GitHubTimeline activity={data.recentActivity} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
