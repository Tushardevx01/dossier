/**
 * Database Migration & Seed Script
 *
 * Verifies the engineering_notes table exists and reports the current
 * database state. The legacy hardcoded article source has been removed.
 *
 * Usage:
 *   npm run db:seed     # Seed from hardcoded data
 *   npm run db:migrate  # Run migrations
 *
 * This script:
 * 1. Connects to Neon PostgreSQL via DATABASE_URL
 * 2. Creates the engineering_notes table if it doesn't exist
 * 3. Inserts all articles from the hardcoded data source
 * 4. Marks them as published
 */

import { createHash } from 'crypto';

import { ensureDatabaseReady, getDb } from '@/db';
import { engineeringNotes, apiKeys } from '@/db/schema';
import { logger } from '@/lib/logger';

/**
 * Report current database state.
 */
export async function seedDatabase() {
  logger.info('Checking database state');

  try {
    await ensureDatabaseReady();
    const database = getDb();

    const notesResult = await database
      .select({ count: engineeringNotes.id })
      .from(engineeringNotes);

    logger.info('engineering_notes table is available', { rows: notesResult.length });

    // Seed API keys if none exist
    const keysResult = await database
      .select({ count: apiKeys.id })
      .from(apiKeys);

    if (keysResult.length === 0) {
      logger.info('Seeding API keys');

      const testKey = 'test-api-key-12345';
      const hashedKey = createHash('sha256').update(testKey).digest('hex');

      await database.insert(apiKeys).values({
        keyHash: hashedKey,
        name: 'Test API Key',
        permissions: {
          analyze: true,
          rateLimit: 10,
        },
        active: true,
      });

      logger.info('API keys seeded');
    } else {
      logger.info('api_keys table is available', { rows: keysResult.length });
    }

    logger.info('The legacy hardcoded article source has been removed');
  } catch (error) {
    logger.error('Database check failed', { error });
    process.exit(1);
  }
}

/**
 * Drop and recreate tables (development only)
 */
export async function resetDatabase() {
  logger.warn('Resetting database (development only)');
  
  try {
    void getDb();
    
    // Note: In production, use proper migrations instead
    // This is just for quick local development resets
    logger.info('This would drop and recreate tables');
    logger.info('Use proper Drizzle migrations in production');
  } catch (error) {
    logger.error('Reset failed', { error });
    process.exit(1);
  }
}

/**
 * Run seed if called directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch((error) => logger.error('Seed script failed', { error }));
}
