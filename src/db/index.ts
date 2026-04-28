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
function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL is not set. Add it to .env.local:\n' +
      'DATABASE_URL=postgresql://user:password@host/database?sslmode=require'
    );
  }

  // Create PostgreSQL connection
  const client = postgres(databaseUrl, {
    max: 10, // Connection pool size (adjust based on load)
  });

  return drizzle(client, { schema });
}

// Singleton instance
let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!db) {
    db = getDatabase();
  }
  return db;
}

export { schema };
export type * from './schema';
