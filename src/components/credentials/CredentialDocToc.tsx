"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
}

const SECTIONS: TocItem[] = [
  { id: "overview", label: "01. Overview" },
  { id: "specifications", label: "02. Specifications" },
  { id: "infrastructure", label: "03. Storage Architecture" },
  { id: "verification", label: "04. Verification Audit" },
  { id: "retrieval", label: "05. Asset Retrieval" },
];

export function CredentialDocToc() {
  const [activeId, setActiveId] = useState<string>("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0px -65% 0px" }
    );

    for (const item of SECTIONS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden xl:block fixed right-6 2xl:right-16 top-32 w-60 font-mono select-none">
      <nav aria-label="Credential document navigation">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-zinc-500 mb-4 px-3">
            On This Record
          </p>
          <ul className="space-y-1">
            {SECTIONS.map((section) => {
              const isActive = activeId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`block px-3 py-1.5 rounded-md text-xs transition-colors border-l-2 ${
                      isActive
                        ? "text-white border-white bg-zinc-900/60 font-medium"
                        : "text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900/30"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
