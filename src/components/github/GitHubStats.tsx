"use client";

import { nasalization } from "@/app/fonts";
import { LuFolderGit2 } from "react-icons/lu";

interface GitHubStatsProps {
  publicReposCount: number;
  source: "live" | "cached" | "fallback";
}

export const GitHubStats = ({ publicReposCount, source }: GitHubStatsProps) => {
  return (
    <div className="p-6 rounded-xl border border-neutral-800 bg-[#09090b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400">
          <LuFolderGit2 className="w-5 h-5" />
        </div>
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 block">
            PUBLIC REPOSITORIES
          </span>
          <span className={`${nasalization.className} text-2xl font-bold text-white`}>
            {publicReposCount}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              source === "live" ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"
            }`}
          />
          <span className="text-neutral-300 uppercase">
            STATUS: {source === "live" ? "LIVE SYNCED" : "VERIFIED CACHE"}
          </span>
        </div>
      </div>
    </div>
  );
};
