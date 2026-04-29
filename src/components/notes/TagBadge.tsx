import type { ArticleCategory, ArticleDifficulty } from "@/types/article";

type TagBadgeType = "category" | "level";

interface TagBadgeProps {
  type: TagBadgeType;
  label: ArticleCategory | ArticleDifficulty | string;
}

const categoryClasses: Record<ArticleCategory, string> = {
  Architecture: "bg-zinc-800 text-zinc-200 border-zinc-700",
  DevOps: "bg-zinc-800 text-zinc-200 border-zinc-700",
  Performance: "bg-zinc-800 text-zinc-200 border-zinc-700",
  "Full-Stack": "bg-zinc-800 text-zinc-200 border-zinc-700",
  Infrastructure: "bg-zinc-800 text-zinc-200 border-zinc-700",
  Data: "bg-zinc-800 text-zinc-200 border-zinc-700",
  Engineering: "bg-zinc-800 text-zinc-200 border-zinc-700",
  Systems: "bg-zinc-800 text-zinc-200 border-zinc-700",
};

const levelClasses: Record<ArticleDifficulty, string> = {
  Beginner: "bg-zinc-800 text-emerald-400 border-zinc-700",
  Intermediate: "bg-zinc-800 text-blue-400 border-zinc-700",
  Advanced: "bg-zinc-800 text-amber-400 border-zinc-700",
};

export function TagBadge({ type, label }: TagBadgeProps) {
  const toneClass =
    type === "category"
      ? categoryClasses[label as ArticleCategory] ?? "bg-zinc-800 text-zinc-200 border-zinc-700"
      : levelClasses[label as ArticleDifficulty] ?? "bg-zinc-800 text-zinc-200 border-zinc-700";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md border px-2.5 py-1 text-xs font-medium uppercase tracking-wide leading-none whitespace-nowrap transition-opacity duration-200 hover:opacity-80 ${toneClass}`}
    >
      {label}
    </span>
  );
}