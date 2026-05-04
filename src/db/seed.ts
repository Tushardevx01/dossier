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

/**
 * Report current database state.
 */
export async function seedDatabase() {
  console.log('🌱 Checking database state...');

  try {
    await ensureDatabaseReady();
    const database = getDb();

    const notesResult = await database
      .select({ count: engineeringNotes.id })
      .from(engineeringNotes);

    console.log(`✅ engineering_notes table is available with ${notesResult.length} rows.`);

    // Seed API keys if none exist
    const keysResult = await database
      .select({ count: apiKeys.id })
      .from(apiKeys);

    if (keysResult.length === 0) {
      console.log('🔑 Seeding API keys...');

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

      console.log('✅ API keys seeded');
    } else {
      console.log(`✅ api_keys table is available with ${keysResult.length} keys.`);
    }

    console.log('');
    console.log('ℹ️  The legacy hardcoded article source has been removed.');
    console.log('   Manage notes directly in Neon PostgreSQL.');
  } catch (error) {
    console.error('❌ Database check failed:', error);
    process.exit(1);
  }
}

/**
 * Drop and recreate tables (development only)
 */
export async function resetDatabase() {
  console.log('⚠️  Resetting database (development only)...');
  
  try {
    void getDb();
    
    // Note: In production, use proper migrations instead
    // This is just for quick local development resets
    console.log('📋 This would drop and recreate tables');
    console.log('   Use proper Drizzle migrations in production');
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  }
}

/**
 * Run seed if called directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}
