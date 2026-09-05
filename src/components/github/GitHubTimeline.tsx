"use client";

import { LuGitCommitHorizontal, LuArrowUpRight } from "react-icons/lu";

interface ActivityItem {
  id: string;
  repo: string;
  message: string;
  date: string;
  url: string;
}

interface GitHubTimelineProps {
  activity: ActivityItem[];
}

export const GitHubTimeline = ({ activity }: GitHubTimelineProps) => {
  return (
    <div className="rounded-xl border border-neutral-800 bg-[#09090b] p-6 sm:p-7 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold">
          RECENT REPOSITORY COMMITS & ACTIVITY
        </span>
        <span className="font-mono text-[11px] text-neutral-500">
          COMMIT STREAM
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {activity.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-neutral-800/80 bg-[#0d0d12] hover:border-neutral-700 hover:bg-[#101015] flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors group"
          >
            <div className="flex items-start sm:items-center gap-2.5 min-w-0">
              <LuGitCommitHorizontal className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="text-white font-bold tracking-wider group-hover:text-emerald-400 transition-colors">
                {item.repo}
              </span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <span className="text-neutral-300 truncate font-sans text-xs">
                {item.message}
              </span>
            </div>

            <div className="flex items-center gap-2 text-neutral-500 text-[11px] pl-5 sm:pl-0 flex-shrink-0">
              <span>{item.date}</span>
              <LuArrowUpRight className="w-3 h-3 text-neutral-600 group-hover:text-white transition-colors" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
