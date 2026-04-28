/**
 * Drizzle ORM Configuration
 *
 * Configuration file for database migrations and schema generation.
 */

import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './src/db/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || '',
  },
  // Print all SQL statements to console during development
  verbose: process.env.NODE_ENV === 'development',
  // Strict mode: warn about potentially destructive changes
  strict: true,
};

export default config;
