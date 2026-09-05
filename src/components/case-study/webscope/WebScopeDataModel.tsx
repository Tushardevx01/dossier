"use client";

interface EntitySummary {
  name: string;
  role: string;
  keyFields: string[];
  relations: string;
}

const ENTITIES: EntitySummary[] = [
  {
    name: "User",
    role: "Tenant identity & authentication owner",
    keyFields: ["id", "email", "password (bcrypt)", "createdAt"],
    relations: "1-to-many with ScanHistory, Monitor, Alert, RequestLog, Comparison",
  },
  {
    name: "ScanHistory",
    role: "Immutable website scan record with scoring snapshot",
    keyFields: ["id", "url", "normalizedUrl", "seoScore", "performanceScore", "responseTime", "animalSpirit"],
    relations: "Belongs to User; 1-to-many with ScrapedData, PageMetadata",
  },
  {
    name: "ScrapedData",
    role: "Parsed DOM content & extracted technical attributes",
    keyFields: ["id", "title", "headings[]", "meta", "bodyText", "wordCount", "h1Count", "scriptCount", "imageCount"],
    relations: "Belongs to User & ScanHistory (onDelete: Cascade)",
  },
  {
    name: "PageMetadata",
    role: "Granular structural inspection & accessibility breakdown",
    keyFields: ["id", "siteUrl", "canonicalTag", "h1-h6 counts", "contentSizeKb", "imagesWithoutAlt", "internal/external links"],
    relations: "Belongs to User & ScanHistory (onDelete: Cascade)",
  },
  {
    name: "Monitor",
    role: "Continuous domain health tracking configuration",
    keyFields: ["id", "url", "seoThreshold (70)", "responseTimeThreshold (1500ms)", "checkIntervalMinutes", "lastCheckedAt"],
    relations: "Belongs to User; 1-to-many with Alert (onDelete: Cascade)",
  },
  {
    name: "Alert",
    role: "Threshold breach event & resolution state",
    keyFields: ["id", "url", "type", "severity", "message", "resolved", "triggeredAt"],
    relations: "Belongs to User & Monitor (onDelete: SetNull)",
  },
  {
    name: "Comparison",
    role: "Side-by-side performance & SEO competitive analysis",
    keyFields: ["id", "urlA", "urlB", "createdAt"],
    relations: "Belongs to User",
  },
  {
    name: "RequestLog",
    role: "HTTP audit log for monitoring queue seed and rate checks",
    keyFields: ["id", "url", "method", "statusCode", "responseTime", "createdAt"],
    relations: "Belongs to User; indexed by URL & createdAt",
  },
];

export const WebScopeDataModel = () => {
  return (
    <section id="data-model" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Relational Database Architecture (Prisma + PostgreSQL)
        </h2>
        <p className="text-neutral-400 max-w-3xl leading-relaxed text-sm sm:text-base">
          Rather than storing raw unindexed blobs, WebScope models scans, audits, monitors,
          and comparisons as structured relational entities in PostgreSQL.
        </p>
      </div>

      {/* ASCII Relational Entity Diagram */}
      <div className="p-4 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 overflow-x-auto">
        <pre className="leading-relaxed">
{`                     USER
                       │
        ┌──────────────┼───────────────┐
        │              │               │
        ▼              ▼               ▼
  SCAN HISTORY      MONITORS       COMPARISONS
        │              │
        ▼              ▼
   SCRAPED DATA      ALERTS
        │
        ▼
  PAGE METADATA`}
        </pre>
      </div>

      {/* Entity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ENTITIES.map((entity) => (
          <div
            key={entity.name}
            className="p-4 sm:p-5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 space-y-2.5 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
              <span className="text-white font-bold">{entity.name}</span>
              <span className="text-[10px] text-emerald-400 font-normal">MODEL</span>
            </div>
            <p className="text-neutral-400 font-sans text-xs">{entity.role}</p>

            <div className="space-y-1 pt-1">
              <div className="text-[10px] text-neutral-400 uppercase">ARCHITECTURAL FIELDS</div>
              <div className="text-neutral-300 text-[11px]">
                {entity.keyFields.join(", ")}
              </div>
            </div>

            <div className="pt-1 text-[11px] text-neutral-400 border-t border-neutral-900">
              <span className="text-emerald-500/80">RELATION: </span>
              <span className="text-neutral-400">{entity.relations}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
