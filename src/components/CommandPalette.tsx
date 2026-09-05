"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { selfData } from "@/constant";
import { siteConfig } from "@/lib/site";
import {
  LuSearch,
  LuFolderGit2,
  LuLayers,
  LuFileText,
  LuCopy,
  LuArrowUpRight,
  LuX,
  LuCompass,
  LuCpu,
  LuTerminal,
  LuCheck,
  LuSmartphone,
  LuGlobe,
} from "react-icons/lu";

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Case Studies" | "Actions";
  description?: string;
  shortcut?: string;
  icon: typeof LuCompass;
  action: () => void;
  keywords: string[];
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
    // Restore focus
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, []);

  const openPalette = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  }, []);

  // Keyboard shortcut listener (Cmd/Ctrl + K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) previousFocusRef.current = document.activeElement as HTMLElement;
          return !prev;
        });
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closePalette]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Auto focus input
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        document.body.style.overflow = "";
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(selfData.email);
      setCopiedNotification(true);
      setTimeout(() => {
        setCopiedNotification(false);
        closePalette();
      }, 900);
    } catch {
      // Fallback
      closePalette();
    }
  }, [closePalette]);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      label: "Home",
      category: "Navigation",
      description: "Jump to overview & editorial hero",
      icon: LuCompass,
      action: () => {
        router.push("/");
        closePalette();
      },
      keywords: ["home", "main", "start", "landing"],
    },
    {
      id: "nav-system",
      label: "Featured System: RunStack",
      category: "Navigation",
      description: "Distributed job orchestrator architecture",
      icon: LuCpu,
      action: () => {
        router.push("/#featured-system");
        closePalette();
      },
      keywords: ["runstack", "system", "flagship", "distributed", "orchestrator", "go"],
    },
    {
      id: "nav-lab",
      label: "Architecture Lab",
      category: "Navigation",
      description: "Interactive system topologies & data flow",
      icon: LuLayers,
      action: () => {
        router.push("/#architecture-lab");
        closePalette();
      },
      keywords: ["lab", "architecture", "flow", "topology", "aegis"],
    },
    {
      id: "nav-work",
      label: "Selected Work",
      category: "Navigation",
      description: "Production case studies & outcomes",
      icon: LuFolderGit2,
      action: () => {
        router.push("/#selected-work");
        closePalette();
      },
      keywords: ["work", "projects", "case studies", "selected"],
    },
    {
      id: "nav-proof",
      label: "Engineering Proof",
      category: "Navigation",
      description: "Concurrency, reliability, idempotency & testing",
      icon: LuTerminal,
      action: () => {
        router.push("/#engineering-proof");
        closePalette();
      },
      keywords: ["proof", "concurrency", "reliability", "idempotency", "testing", "race"],
    },
    {
      id: "nav-build-log",
      label: "Build Log",
      category: "Navigation",
      description: "Engineering ledger of changes and optimizations",
      icon: LuFileText,
      action: () => {
        router.push("/#build-log");
        closePalette();
      },
      keywords: ["build", "log", "changelog", "timeline", "updates"],
    },
    {
      id: "nav-stack",
      label: "Technology Matrix",
      category: "Navigation",
      description: "Purpose-organized languages, backend, infra & tooling",
      icon: LuCpu,
      action: () => {
        router.push("/#tech");
        closePalette();
      },
      keywords: ["stack", "technology", "tech", "matrix", "skills", "languages", "tools"],
    },
    {
      id: "nav-principles",
      label: "Engineering Principles",
      category: "Navigation",
      description: "How I engineer: failure, observability, clarity",
      icon: LuCompass,
      action: () => {
        router.push("/#principles");
        closePalette();
      },
      keywords: ["principles", "philosophy", "how i engineer", "rules"],
    },
    {
      id: "nav-experience",
      label: "Engineering Track Record",
      category: "Navigation",
      description: "Full-time roles, platform leadership & impact",
      icon: LuFileText,
      action: () => {
        router.push("/#experience");
        closePalette();
      },
      keywords: ["experience", "roles", "jobs", "azmth", "cycoders", "namespace"],
    },
    {
      id: "nav-github",
      label: "GitHub & Open Source",
      category: "Navigation",
      description: "Public repositories, languages & commits",
      icon: LuFolderGit2,
      action: () => {
        router.push("/#open-source");
        closePalette();
      },
      keywords: ["github", "repos", "open source", "code"],
    },
    {
      id: "nav-contact",
      label: "Open Channel / Contact",
      category: "Navigation",
      description: "Direct email and professional channels",
      icon: LuCompass,
      action: () => {
        router.push("/#contact");
        closePalette();
      },
      keywords: ["contact", "email", "collaborate", "hire", "message"],
    },
    {
      id: "nav-notes",
      label: "Engineering Notes",
      category: "Navigation",
      description: "Technical writing and architecture deep-dives",
      icon: LuFileText,
      action: () => {
        router.push("/engineering-notes");
        closePalette();
      },
      keywords: ["notes", "blog", "articles", "writings"],
    },
    {
      id: "nav-resume",
      label: "Resume / CV",
      category: "Navigation",
      description: "Verified engineering CV and experience sheet",
      icon: LuFileText,
      action: () => {
        router.push("/resume");
        closePalette();
      },
      keywords: ["resume", "cv", "pdf", "qualifications"],
    },

    // Case Studies
    {
      id: "cs-runstack",
      label: "Case Study: RunStack",
      category: "Case Studies",
      description: "Distributed deployment and job orchestration in Go",
      icon: LuCpu,
      action: () => {
        router.push("/work/runstack");
        closePalette();
      },
      keywords: ["runstack", "orchestrator", "kafka", "redis", "docker", "go"],
    },
    {
      id: "cs-aegis",
      label: "Case Study: Aegis",
      category: "Case Studies",
      description: "Air-gapped AIOps & self-healing infrastructure",
      icon: LuLayers,
      action: () => {
        router.push("/work/aegis");
        closePalette();
      },
      keywords: ["aegis", "aiops", "sre", "incident", "remediation", "docker", "kafka", "nestjs", "python"],
    },
    {
      id: "cs-carepulse",
      label: "Case Study: CarePulse",
      category: "Case Studies",
      description: "Full-stack healthcare appointment & patient onboarding engine",
      icon: LuFileText,
      action: () => {
        router.push("/work/carepulse");
        closePalette();
      },
      keywords: ["carepulse", "healthcare", "appointments", "appwrite", "sms", "twilio", "nextjs", "zod", "server-actions"],
    },
    {
      id: "cs-fenix",
      label: "Case Study: Fenix",
      category: "Case Studies",
      description: "Real-time meeting platform with Stream Video SDK & Clerk",
      icon: LuLayers,
      action: () => {
        router.push("/work/fenix");
        closePalette();
      },
      keywords: ["fenix", "stream", "video", "clerk", "meetings", "realtime", "nextjs"],
    },
    {
      id: "cs-signifiya",
      label: "Case Study: Signifiya",
      category: "Case Studies",
      description: "Mobile event infrastructure, native payments & 120Hz engine",
      icon: LuSmartphone,
      action: () => {
        router.push("/work/signifiya");
        closePalette();
      },
      keywords: ["signifiya", "expo", "react-native", "supabase", "razorpay", "better-auth", "mobile"],
    },
    {
      id: "cs-webscope",
      label: "Case Study: WebScope Pro",
      category: "Case Studies",
      description: "Website intelligence platform with Axios, Cheerio & Prisma",
      icon: LuGlobe,
      action: () => {
        router.push("/work/webscope");
        closePalette();
      },
      keywords: ["webscope", "seo", "cheerio", "axios", "prisma", "scraper", "monitoring"],
    },

    // Actions
    {
      id: "action-copy-email",
      label: "Copy Email Address",
      category: "Actions",
      description: selfData.email,
      shortcut: "↵",
      icon: LuCopy,
      action: copyEmail,
      keywords: ["copy", "email", "clipboard", "contact", "address"],
    },
    {
      id: "action-open-github",
      label: "Open GitHub Profile",
      category: "Actions",
      description: "github.com/tushardevx01",
      shortcut: "↗",
      icon: LuFolderGit2,
      action: () => {
        window.open(siteConfig.social.github, "_blank", "noopener,noreferrer");
        closePalette();
      },
      keywords: ["github", "profile", "open", "source"],
    },
    {
      id: "action-open-linkedin",
      label: "Open LinkedIn Profile",
      category: "Actions",
      description: "linkedin.com/in/tushardevx01",
      shortcut: "↗",
      icon: LuArrowUpRight,
      action: () => {
        window.open(siteConfig.social.linkedin, "_blank", "noopener,noreferrer");
        closePalette();
      },
      keywords: ["linkedin", "profile", "connect", "network"],
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(query) ||
      (cmd.description && cmd.description.toLowerCase().includes(query)) ||
      cmd.keywords.some((k) => k.toLowerCase().includes(query))
    );
  });

  // Handle keyboard navigation within the list
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredCommands.length - 1) : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  // Keep selected item in view
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Desktop visible search trigger */}
      <button
        onClick={openPalette}
        aria-label="Open Command Palette (Cmd + K)"
        className="hidden sm:inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/20 hover:border-white/45 bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white font-mono text-xs transition-colors duration-200"
      >
        <LuSearch className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-[11px] font-medium tracking-wider text-neutral-300">SEARCH</span>
        <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/15 text-[10px] text-neutral-400 font-mono">
          ⌘K
        </kbd>
      </button>

      {/* Mobile visible search trigger */}
      <button
        onClick={openPalette}
        aria-label="Search"
        className="sm:hidden p-2 rounded-xl border border-white/20 hover:border-white/45 bg-transparent text-neutral-300 hover:text-white transition-colors duration-200"
      >
        <LuSearch className="w-4 h-4" />
      </button>

      {/* Modal Backdrop & Command Palette */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm"
            onClick={closePalette}
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#09090b] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              {/* Input Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-800 bg-[#0c0c10]">
                <span className="font-mono text-emerald-400 font-bold text-sm select-none">
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search or run a command... (work, system, stack, github, email)"
                  className="flex-1 bg-transparent border-none outline-none text-neutral-100 placeholder:text-neutral-500 font-mono text-xs sm:text-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-neutral-500 hover:text-white text-xs"
                    aria-label="Clear query"
                  >
                    <LuX className="w-3.5 h-3.5" />
                  </button>
                )}
                <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-500">
                  ESC
                </kbd>
              </div>

              {/* Notification Toast for Actions */}
              {copiedNotification && (
                <div className="px-4 py-2 bg-emerald-950/40 border-b border-emerald-900/50 flex items-center gap-2 font-mono text-xs text-emerald-400">
                  <LuCheck className="w-3.5 h-3.5" />
                  <span>Email copied to clipboard (thetushardev0@gmail.com)</span>
                </div>
              )}

              {/* Command List */}
              <div
                ref={listRef}
                className="overflow-y-auto p-2 space-y-1 flex-1 text-xs font-mono"
              >
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500">
                    No matching commands found for &quot;{search}&quot;.
                  </div>
                ) : (
                  filteredCommands.map((cmd, index) => {
                    const isSelected = selectedIndex === index;
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                          isSelected
                            ? "bg-neutral-800 text-white font-medium"
                            : "text-neutral-300 hover:bg-neutral-900"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              isSelected ? "text-emerald-400" : "text-neutral-500"
                            }`}
                          />
                          <div className="truncate">
                            <span className="text-white block truncate">{cmd.label}</span>
                            {cmd.description && (
                              <span className="text-[11px] text-neutral-500 block truncate">
                                {cmd.description}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] text-neutral-500 uppercase">
                            {cmd.category}
                          </span>
                          {isSelected && (
                            <span className="text-[10px] text-emerald-400 font-mono">
                              ↵
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer Helper */}
              <div className="px-4 py-2.5 border-t border-neutral-900 bg-[#0c0c10] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <div className="flex items-center gap-4">
                  <span>
                    <kbd className="text-neutral-400">↑↓</kbd> to navigate
                  </span>
                  <span>
                    <kbd className="text-neutral-400">↵</kbd> to select
                  </span>
                  <span>
                    <kbd className="text-neutral-400">esc</kbd> to close
                  </span>
                </div>
                <span className="text-neutral-600">ENGINEERING PALETTE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
