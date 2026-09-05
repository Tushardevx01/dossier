/**
 * Case Study Database Migration & Seed Script
 *
 * Idempotently seeds / upserts all 7 case studies into Neon PostgreSQL
 * from the consolidated technical content source.
 */

import { caseStudiesData } from "../src/lib/case-studies-data";
import { ensureDatabaseReady, getDb } from "../src/db";
import { caseStudies } from "../src/db/schema";
import { sql } from "drizzle-orm";

export async function main() {
  console.log("Connecting to database and verifying case studies schema...");
  await ensureDatabaseReady();
  const db = getDb();

  console.log(`Upserting ${caseStudiesData.length} case studies into Neon PostgreSQL...`);

  for (const record of caseStudiesData) {
    await db
      .insert(caseStudies)
      .values({
        slug: record.slug,
        title: record.title,
        subtitle: record.subtitle,
        excerpt: record.excerpt,
        content: record.content,
        category: record.category,
        level: record.level,
        readTime: record.readTime,
        date: record.date,
        tags: record.tags,
        published: record.published,
        featured: record.featured,
        whatILearned: record.whatILearned,
        improvements: record.improvements,
        relatedNoteSlugs: record.relatedNoteSlugs,
        relatedProjectSlug: record.relatedProjectSlug,
        relatedSystemDesignSlug: record.relatedSystemDesignSlug,
      })
      .onConflictDoUpdate({
        target: caseStudies.slug,
        set: {
          title: record.title,
          subtitle: record.subtitle,
          excerpt: record.excerpt,
          content: record.content,
          category: record.category,
          level: record.level,
          readTime: record.readTime,
          date: record.date,
          tags: record.tags,
          published: record.published,
          featured: record.featured,
          whatILearned: record.whatILearned,
          improvements: record.improvements,
          relatedNoteSlugs: record.relatedNoteSlugs,
          relatedProjectSlug: record.relatedProjectSlug,
          relatedSystemDesignSlug: record.relatedSystemDesignSlug,
          updatedAt: sql`now()`,
        },
      });
    console.log(`  ✓ Upserted case study: [${record.slug}] "${record.title}"`);
  }

  console.log("All case studies successfully synced to Neon PostgreSQL!");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
}
