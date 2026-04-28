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

import { ensureDatabaseReady, getDb } from '@/db';
import { engineeringNotes } from '@/db/schema';

/**
 * Report current database state.
 */
export async function seedDatabase() {
  console.log('🌱 Checking database state...');

  try {
    await ensureDatabaseReady();
    const db = getDb();

    const result = await db
      .select({ count: engineeringNotes.id })
      .from(engineeringNotes);

    console.log(`✅ engineering_notes table is available with ${result.length} rows.`);
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
    const db = getDb();
    
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
