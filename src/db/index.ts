/**
 * Database Connection & Configuration
 *
 * Sets up Drizzle ORM with Neon PostgreSQL.
 * Handles connection pooling and query execution.
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Database handle returned by `drizzle`
type Database = ReturnType<typeof drizzle>;

/**
 * Initialize Neon connection
 *
 * Uses DATABASE_URL from environment variables.
 * In development: uses connection pooling to prevent connection exhaustion.
 * In production: Vercel handles pooling through Neon's connection string.
 */
type PostgresClient = ReturnType<typeof neon>;

let client: PostgresClient | null = null;

// Allow skipping DB initialization during Docker/CI builds when a live DB isn't available.
const SKIP_DB_BUILD = process.env.SKIP_DB_BUILD === 'true' || process.env.SKIP_DB === 'true';

function createDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    if (SKIP_DB_BUILD) {
      // Return a lightweight stub for build environments. Consumers should
      // short-circuit DB calls when SKIP_DB_BUILD is enabled.
      client = null;
      // Return a minimal stub that won't be used during build-time static rendering.
      // Use `unknown` first to avoid `any` usage.
      return {} as unknown as Database;
    }

    throw new Error(
      'DATABASE_URL is not set. Add it to .env.local:\n' +
      'DATABASE_URL=postgresql://user:password@host/database?sslmode=require'
    );
  }

  // Create PostgreSQL connection
  // Note: Neon's pooler automatically handles query pipelining for optimal concurrency
  client = neon(databaseUrl);

  return drizzle(client, { schema });
}

// Note: `Database` is defined above as ReturnType<typeof drizzle>

// Singleton instance
let db: Database | null = null;
let bootstrapPromise: Promise<void> | null = null;

async function bootstrapEngineeringNotesTable() {
  if (!client) {
    throw new Error('Database client is not initialized');
  }

  await client`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = 'engineering_notes'
      ) THEN
        CREATE TABLE engineering_notes (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(255) NOT NULL UNIQUE,
          title VARCHAR(255) NOT NULL,
          subtitle TEXT NOT NULL,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          category VARCHAR(50) NOT NULL,
          level VARCHAR(20) NOT NULL,
          read_time INTEGER NOT NULL,
          date TEXT NOT NULL,
          tags JSONB NOT NULL DEFAULT '[]'::jsonb,
          published BOOLEAN NOT NULL DEFAULT TRUE,
          featured BOOLEAN NOT NULL DEFAULT FALSE,
          what_i_learned JSONB NOT NULL DEFAULT '[]'::jsonb,
          improvements JSONB NOT NULL DEFAULT '[]'::jsonb,
          related_note_slugs JSONB,
          related_project_slug VARCHAR(255),
          related_system_design_slug VARCHAR(255),
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      END IF;
    END
    $$;
  `;
}

export function getDb(): Database {
  if (!db) {
    db = createDatabase();
  }
  return db;
}

export async function ensureDatabaseReady(): Promise<void> {
  if (!bootstrapPromise) {
    if (!db) {
      db = createDatabase();
    }

    bootstrapPromise = bootstrapEngineeringNotesTable().catch((error) => {
      bootstrapPromise = null;
      throw error;
    });
  }

  await bootstrapPromise;
}

export { schema };
export type * from './schema';