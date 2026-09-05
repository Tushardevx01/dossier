"use client";

import Link from "next/link";
import { LuArrowRight, LuArrowUpRight, LuFolderGit2, LuLayers } from "react-icons/lu";

export const SubscriptionTrackerFooter = () => {
  return (
    <footer id="source" className="scroll-mt-24 pt-16 pb-12 border-t border-neutral-800 space-y-12">
      {/* Project Banner CTA */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            Backend Engineering Portfolio
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Explore the Subscription Tracker Codebase
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Inspect the Express routes, Mongoose lifecycle hooks, Upstash Workflow step functions, and
            Arcjet security layers directly on GitHub.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/Tushardevx01/subscription-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-medium text-xs transition-colors"
          >
            <LuFolderGit2 className="w-4 h-4" />
            <span>GitHub Repository</span>
            <LuArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://sub-track-api.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-medium text-xs transition-colors"
          >
            <span>Live API Endpoint</span>
            <LuArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </div>

      {/* Next Case Study & Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/work"
          className="group p-6 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="font-mono text-[11px] text-neutral-400">All Case Studies</span>
            <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
              Return to Works Archive
            </h4>
          </div>
          <LuLayers className="w-5 h-5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
        </Link>

        <Link
          href="/work/runstack"
          className="group p-6 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="font-mono text-[11px] text-neutral-400">Next Case Study</span>
            <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
              RunStack: Distributed Job Orchestration
            </h4>
          </div>
          <LuArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </footer>
  );
};
