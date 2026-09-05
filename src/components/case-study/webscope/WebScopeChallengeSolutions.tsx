"use client";

interface ChallengeSolutionItem {
  number: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
}

const SOLUTIONS: ChallengeSolutionItem[] = [
  {
    number: "01",
    title: "UNRELIABLE EXTERNAL TARGETS",
    problem: "A remote website may be slow, enter infinite redirects, or be unreachable.",
    solution:
      "Bound requests with 5-second AbortController timeout protection and classify failures into meaningful error categories (TIMEOUT, NETWORK, DISALLOWED_BY_ROBOTS, UNKNOWN).",
    result:
      "The analysis pipeline fails predictably instead of hanging indefinitely or exhausting server sockets.",
  },
  {
    number: "02",
    title: "ANALYSIS CONCURRENCY",
    problem: "Multiple URL analyses can run simultaneously across interactive users and batch cron jobs.",
    solution:
      "Implement an in-memory bounded analysis queue with a strict maximum of four active parallel analyses (MAX_CONCURRENT_ANALYSIS = 4).",
    result:
      "Concurrent analysis work is explicitly controlled, preventing serverless function throttling and target server bans.",
  },
  {
    number: "03",
    title: "ROBOTS COMPLIANCE",
    problem: "Not every target website permits automated crawling or indexation.",
    solution:
      "Fetch and parse target robots.txt prior to scraping; immediately abort and return a classified error if path or agent is restricted.",
    result:
      "Disallowed targets are rejected cleanly before scraping execution begins, respecting target webmaster rules.",
  },
  {
    number: "04",
    title: "AI FAILURE",
    problem: "The AI insight layer can encounter rate limits, model outages, or slow generation times.",
    solution:
      "Generate a deterministic fallback insight locally first and attempt AI generation with a strict 6-second timeout, falling back on error.",
    result:
      "The core SEO, performance, and comparison pipeline remains 100% functional without hard dependency on external AI services.",
  },
];

export const WebScopeChallengeSolutions = () => {
  return (
    <section id="solutions" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Direct Problem-Solution-Outcome Records
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Examining how key operational constraints were addressed within the WebScope codebase.
        </p>
      </div>

      <div className="space-y-4">
        {SOLUTIONS.map((item) => (
          <div
            key={item.number}
            className="p-5 sm:p-6 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-4 font-mono"
          >
            <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
              <span className="text-xs text-emerald-400 font-semibold tracking-wider">
                {item.number} // {item.title}
              </span>
              <span className="text-[10px] text-neutral-400">RESOLVED</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-red-400 tracking-wider uppercase block">
                  PROBLEM
                </span>
                <p className="text-neutral-300 font-sans leading-relaxed">{item.problem}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-emerald-400 tracking-wider uppercase block">
                  SOLUTION
                </span>
                <p className="text-neutral-300 font-sans leading-relaxed">{item.solution}</p>
              </div>

              <div className="space-y-1 pt-1 border-t border-neutral-900">
                <span className="text-[10px] text-neutral-400 tracking-wider uppercase block">
                  RESULT
                </span>
                <p className="text-emerald-300 font-sans leading-relaxed">{item.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
