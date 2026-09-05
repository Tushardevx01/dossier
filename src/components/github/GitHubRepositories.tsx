"use client";

import { mono } from "@/app/fonts";
import { LuFolderGit2, LuArrowUpRight, LuStar } from "react-icons/lu";

interface RepoItem {
  name: string;
  description: string;
  language: string;
  url: string;
  stars?: number;
  forks?: number;
}

interface GitHubRepositoriesProps {
  repos: RepoItem[];
}

export const GitHubRepositories = ({ repos }: GitHubRepositoriesProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
          ACTIVE & PINNED REPOSITORIES
        </span>
        <span className="font-mono text-[11px] text-neutral-500">
          SOURCE CODE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-xl border border-neutral-800 bg-[#09090b] hover:border-neutral-700 hover:bg-[#0d0d12] transition-all flex flex-col justify-between group shadow-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <LuFolderGit2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <h4 className={`${mono.className} text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate`}>
                    {repo.name}
                  </h4>
                </div>
                <LuArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors flex-shrink-0" />
              </div>

              <p className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-2 mb-4">
                {repo.description}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-900 flex items-center justify-between font-mono text-[10px] text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{repo.language || "TypeScript"}</span>
              </div>
              {typeof repo.stars === "number" && repo.stars > 0 && (
                <div className="flex items-center gap-1 text-neutral-500">
                  <LuStar className="w-3 h-3" />
                  <span>{repo.stars}</span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
