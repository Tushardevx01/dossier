/**
 * Database Connection & Configuration
 *
 * Sets up Drizzle ORM with Neon PostgreSQL.
 * Handles connection pooling and query execution.
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

/**
 * Initialize Neon connection
 *
 * Uses DATABASE_URL from environment variables.
 * In development: uses connection pooling to prevent connection exhaustion.
 * In production: Vercel handles pooling through Neon's connection string.
 */
type PostgresClient = ReturnType<typeof postgres>;

let client: PostgresClient | null = null;

function createDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL is not set. Add it to .env.local:\n' +
      'DATABASE_URL=postgresql://user:password@host/database?sslmode=require'
    );
  }

  // Create PostgreSQL connection
  client = postgres(databaseUrl, {
    max: 10, // Connection pool size (adjust based on load)
  });

  return drizzle(client, { schema });
}

type Database = ReturnType<typeof createDatabase>;

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