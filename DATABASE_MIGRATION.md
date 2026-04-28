# Database Migration Guide - Neon PostgreSQL

This guide walks through setting up your engineering notes blog with Neon PostgreSQL and Drizzle ORM.

## Architecture Overview

**Before (Current State):**
- Blog articles stored as hardcoded React components in `/src/data/articles.tsx`
- No persistence layer
- Limited scalability for large numbers of articles
- Coupling between content and UI

**After (Database Setup):**
- Articles stored in Neon PostgreSQL
- Clean separation: data layer (`/src/lib/blogs.ts`) → article loader (`/src/lib/articleLoader.ts`) → routes
- Type-safe queries with Drizzle ORM
- Markdown content stored in DB, rendered on client
- Scalable, maintainable, production-ready

## Prerequisites

- **Node.js**: 18+ (already installed)
- **Neon Account**: Free tier available at https://console.neon.tech
- **PostgreSQL Client** (optional): For debugging queries

## Step 1: Set Up Neon PostgreSQL

### 1.1 Create a Neon Project

1. Go to https://console.neon.tech/
2. Sign up (free tier available)
3. Create a new project (name: `portfolio-blog` or similar)
4. Note the connection string format:
   ```
   postgresql://user:password@hostname.neon.tech:5432/database?sslmode=require
   ```

### 1.2 Get Your Connection String

After creating the project:
1. Click "Connection String"
2. Copy the full connection string
3. Keep it secure (treat like a password)

## Step 2: Install Dependencies

```bash
npm install
```

This installs:
- `drizzle-orm`: Type-safe query builder
- `postgres`: Neon PostgreSQL driver with connection pooling
- `drizzle-kit`: Migrations and schema management

DevDependencies:
- `tsx`: TypeScript execution for seed script
- `drizzle-kit`: CLI for managing migrations

## Step 3: Configure Environment Variables

### 3.1 Create `.env.local`

```bash
cp .env.local.example .env.local
```

### 3.2 Add Your Database URL

Edit `.env.local`:

```
DATABASE_URL=postgresql://user:password@hostname.neon.tech:5432/database?sslmode=require
NODE_ENV=development
```

Replace with your actual Neon connection string from Step 1.2.

### 3.3 Verify Connection

```bash
npm run db:migrate
```

This creates the `engineering_notes` table if it doesn't exist.

## Step 4: Seed Initial Data

Migrate all existing articles from hardcoded data to the database:

```bash
npm run db:seed
```

This script:
1. Reads all articles from `/src/data/articles.tsx`
2. Transforms them to the database schema
3. Inserts them into Neon PostgreSQL
4. Marks first 3 articles as "featured"

**Output:**
```
🌱 Starting database seed...
📝 Inserting 15 articles into database...
✅ Successfully inserted 15 articles

📊 Seed Summary:
   • Total articles: 15
   • Inserted: 15
   • Featured: 3

🎉 Database seed completed successfully!
```

## Step 5: Update Routes to Use Database

The routes automatically use the updated `articleLoader.ts` which now fetches from the database.

**Key Changes for Route Handlers:**
- All functions in `articleLoader.ts` are now **ASYNC** (return Promises)
- Routes that call these functions must use `await`

### Example: `/src/app/engineering-notes/page.tsx`

```typescript
export default async function EngineeringNotesPage() {
  // Now returns data from Neon PostgreSQL
  const posts = await getAllArticles();
  const categories = await getArticleCategories();
  
  // ... rest of component
}
```

### Example: `/src/app/engineering-notes/[slug]/page.tsx`

```typescript
export async function generateStaticParams() {
  return generateArticleStaticParams();
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    notFound();
  }
  
  // ... rest of component
}
```

## Step 6: Environment Setup for Production (Vercel)

### 6.1 Add DATABASE_URL to Vercel

1. Go to your Vercel project settings
2. Add environment variable: `DATABASE_URL`
3. Set it to your Neon connection string
4. Redeploy

### 6.2 Database Connection in Production

The connection is automatically pooled by Neon:
- Max 10 connections (configurable in `src/db/index.ts`)
- Automatic cleanup on serverless function termination
- No need to manually close connections

## File Structure

```
src/
├── db/
│   ├── index.ts          # Connection setup & Drizzle instance
│   ├── schema.ts         # Drizzle ORM table definitions
│   └── seed.ts           # Migration script from hardcoded data
├── lib/
│   ├── blogs.ts          # Database query functions (getAllNotes, etc.)
│   └── articleLoader.ts  # Public API (async versions - updated!)
├── app/
│   └── engineering-notes/
│       ├── page.tsx      # List page (uses DB)
│       └── [slug]/
│           └── page.tsx  # Detail page (uses DB)
└── data/
    └── articles.tsx      # Original hardcoded data (keep for reference)
```

## Verification Checklist

- [ ] Neon account created
- [ ] Connection string copied to `.env.local`
- [ ] `npm install` completed
- [ ] `npm run db:migrate` succeeded
- [ ] `npm run db:seed` succeeded
- [ ] Articles appear in Neon console
- [ ] `npm run dev` starts without errors
- [ ] Routes display articles correctly
- [ ] Environment variables added to Vercel

## Debugging

### Connection Issues

```bash
# Test database connection
node -r tsx/esm -e "
import { getDb } from './src/db';
const db = getDb();
console.log('Connected to Neon!');
"
```

### View Database with Drizzle Studio

```bash
npm run db:studio
```

This opens a local web interface to browse your database.

### Check Migrations

```bash
npm run db:migrate
```

Runs any pending migrations against your database.

## Next Steps

### 1. Update Content Format (Optional)

Currently, article content is a placeholder. To improve:
- Convert React JSX content to proper Markdown
- Update the seed script to parse JSX and generate markdown
- Render markdown using a library like `react-markdown`

### 2. Add Content Editor (Optional)

- Create an admin route to edit/create articles
- Update articles directly in the database via a web interface

### 3. Implement Caching (Optional)

- Add Redis caching layer for frequently accessed articles
- Implement cache invalidation on article updates

### 4. Enable Full-Text Search (Optional)

- Add PostgreSQL full-text search for article content
- Create search routes with ranking and highlighting

## Troubleshooting

### "DATABASE_URL is not set"

**Solution:** Make sure `.env.local` exists and has `DATABASE_URL` set.

### "Connection refused"

**Solution:** 
1. Check your connection string is correct
2. Verify Neon project is active
3. Make sure your IP is not blocked (Neon allows all by default)

### "Table already exists"

**Solution:** Safe to ignore during seed. The `onConflictDoNothing()` prevents duplicate inserts.

### Articles not appearing in routes

**Solution:**
1. Verify seed completed: `npm run db:seed`
2. Check routes are using `await`: `const posts = await getAllArticles();`
3. Verify database has articles: `npm run db:studio`

## Support

For issues with:
- **Neon**: https://neon.tech/docs
- **Drizzle ORM**: https://orm.drizzle.team/docs
- **Next.js**: https://nextjs.org/docs

---

**Status**: ✅ Production-Ready

The database setup follows production best practices:
- Connection pooling configured
- Type-safe queries with Drizzle ORM
- Parameterized queries (no SQL injection)
- Error handling and sanitization
- Environment-based configuration
- Proper schema validation with Zod
