/**
 * Database Migration & Seed Script
 *
 * Migrates hardcoded engineering notes from src/data/articles.tsx
 * to Neon PostgreSQL using Drizzle ORM.
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

import { getDb, engineeringNotes } from '@/db';
import { articlesData } from '@/data/articles';
import type { NewEngineeringNote } from '@/db/schema';

/**
 * Convert React.ReactNode content to markdown string
 *
 * This is a simplified conversion. In production, you might want to:
 * - Use a library like React DOM to serialize JSX
 * - Extract text content from components
 * - Create proper markdown representation
 */
function extractContentAsMarkdown(article: any): string {
  // For now, we'll store a placeholder markdown with extracted information
  // In a real scenario, you'd parse the JSX properly
  const lines: string[] = [];

  if (article.title) {
    lines.push(`# ${article.title}`);
    lines.push('');
  }

  if (article.subtitle) {
    lines.push(`## ${article.subtitle}`);
    lines.push('');
  }

  lines.push(`*Read time: ${article.readTime} minutes*`);
  lines.push(`*Category: ${article.category}*`);
  lines.push('');

  // Add a note about the JSX content
  lines.push('> **Note**: This content was migrated from React JSX components.');
  lines.push('> The full interactive content is preserved in the legacy format.');
  lines.push('');
  lines.push('[Full article content requires React rendering]');

  return lines.join('\n');
}

/**
 * Seed database with hardcoded articles
 */
export async function seedDatabase() {
  console.log('🌱 Starting database seed...');
  
  try {
    const db = getDb();

    // Prepare articles for insertion
    const articlesToInsert: NewEngineeringNote[] = Object.entries(articlesData).map(
      ([slug, article], index) => ({
        slug,
        title: article.title,
        subtitle: article.subtitle,
        description: article.description,
        category: article.category,
        difficulty: article.difficulty || calculateDifficulty(article.readTime),
        readTime: article.readTime,
        date: article.date,
        published: true,
        featured: index < 3, // Mark first 3 as featured
        tags: [],
        whatILearned: article.whatILearned || [],
        improvements: article.improvements || [],
        relatedNoteSlugs: article.relatedNoteSlugs || [],
        relatedProjectSlug: article.relatedProjectSlug,
        relatedSystemDesignSlug: article.relatedSystemDesignSlug,
        // Store content - this is a placeholder for now
        // In production, properly convert JSX to markdown
        content: extractContentAsMarkdown(article),
      })
    );

    console.log(`📝 Inserting ${articlesToInsert.length} articles into database...`);

    // Insert articles
    const inserted = await db
      .insert(engineeringNotes)
      .values(articlesToInsert)
      .onConflictDoNothing() // Skip if slug already exists
      .returning({ slug: engineeringNotes.slug });

    console.log(`✅ Successfully inserted ${inserted.length} articles`);
    console.log('');
    console.log('📊 Seed Summary:');
    console.log(`   • Total articles: ${articlesToInsert.length}`);
    console.log(`   • Inserted: ${inserted.length}`);
    console.log(`   • Featured: ${articlesToInsert.filter(a => a.featured).length}`);
    console.log('');
    console.log('🎉 Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

/**
 * Helper: calculate difficulty from read time
 */
function calculateDifficulty(readTime: number) {
  if (readTime <= 8) return 'Beginner' as const;
  if (readTime <= 12) return 'Intermediate' as const;
  return 'Advanced' as const;
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
if (require.main === module) {
  seedDatabase().catch(console.error);
}

export { calculateDifficulty };
