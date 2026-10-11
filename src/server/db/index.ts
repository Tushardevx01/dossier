import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

type Database = ReturnType<typeof drizzle>;
let database: Database | null = null;

/** Connection creation never changes schema. Apply migrations as an explicit deploy step. */
export function getDb(): Database {
  if (database) return database;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is required for database access");
  database = drizzle({ client: neon(databaseUrl) });
  return database;
}

/** Kept as the repository initialization entry point; no request-time DDL. */
export async function ensureDatabaseReady(): Promise<void> {
  if (process.env.SKIP_DB_BUILD === "true" || process.env.SKIP_DB === "true") return;
  getDb();
}

export * as schema from "./schema";
export type * from "./schema";
