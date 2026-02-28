import React from "react";
import type { Article } from "@/types/article";

export const articlesData: Record<string, Article> = {
  "structuring-scalable-fullstack": {
    title: "Structuring a Scalable Full-Stack Project",
    subtitle: "From Next.js to Deployment",
    date: "Feb 20, 2026",
    readTime: 12,
    category: "Full-Stack",
    description:
      "Learn how to organize a modern full-stack application with clear separation of concerns, proper folder structure, and production-ready deployment patterns.",
    content: (
      <>
        <p>
          Scalability is rarely a framework issue. It is usually structural.
          Systems break at boundaries.
        </p>

        <h3 id="system-overview">System Overview</h3>
        <p>
          A scalable architecture separates concerns into distinct layers. Each
          layer has a single responsibility, making testing and debugging
          straightforward.
        </p>
        <pre>
          <code className="language-text">{`Client → API Gateway → Service Layer → Data Layer → Database
  ↓                                                      ↓
Cache                                            Replication`}</code>
        </pre>

        <h3 id="architectural-boundaries">Architectural Boundaries</h3>
        <p>
          Your folder structure encodes responsibility. When developers open
          your repository, the organization should communicate intent. Here is a
          production-ready structure:
        </p>
        <pre>
          <code className="language-typescript">{`src/
├── app/                      # Next.js App Router
├── api/                       # Route handlers
├── components/               # UI components (reusable)
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities, helpers
├── services/                 # Business logic
├── types/                    # TypeScript interfaces
├── middleware.ts             # Request middleware
└── env.ts                    # Environment validation`}</code>
        </pre>

        <h3 id="request-flow">Request Flow Architecture</h3>
        <p>
          Understanding the flow of a request helps identify where to add logic:
        </p>
        <pre>
          <code className="language-typescript">{`// Flow: Request → Middleware → Handler → Service → Database
// Each layer validates its input and handles its error case

// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.headers.get("authorization");
  if (!token) return NextResponse.json({}, { status: 401 });
}

// api/users/route.ts
export async function GET(request: NextRequest) {
  try {
    const users = await userService.getAll();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}`}</code>
        </pre>

        <h3 id="failure-scenarios">Real-World Failure Scenarios</h3>
        <p>
          Systems fail in predictable ways. Design for them from the start:
        </p>
        <ul>
          <li>
            <strong>Missing environment variables:</strong> Application crashes
            on startup. Solution: Validate env at server startup time, not
            runtime.
          </li>
          <li>
            <strong>Connection pool exhaustion:</strong> Under load, all
            connections are consumed. Requests queue and timeout. Solution:
            Connection pooling with defined limits.
          </li>
          <li>
            <strong>Mixed transport and domain logic:</strong> Business logic
            scattered in route handlers. Difficult to test and reason about.
            Solution: Services own all business logic.
          </li>
          <li>
            <strong>No request validation:</strong> Invalid data reaches your
            service layer. Solution: Validate at the API boundary.
          </li>
        </ul>

        <h3 id="environment-validation">Environment Validation</h3>
        <p>
          Never trust environment variables. Validate them explicitly at
          startup:
        </p>
        <pre>
          <code className="language-typescript">{`// src/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production"]),
  LOG_LEVEL: z.enum(["debug", "info", "error"]).default("info"),
});

export const env = envSchema.parse(process.env);

// main.ts - This fails loudly if env is invalid
import { env } from "./env";
console.log("✓ Environment validated successfully");`}</code>
        </pre>

        <h3 id="service-layer">Service Layer Pattern</h3>
        <p>
          Services encapsulate business logic. They are independent of
          frameworks and easy to test:
        </p>
        <pre>
          <code className="language-typescript">{`// src/services/UserService.ts
export class UserService {
  constructor(private db: Database) {}

  async getById(id: string) {
    if (!id) throw new Error("Invalid user ID");
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async create(data: CreateUserInput) {
    this.validateInput(data);
    return await this.db.user.create({ data });
  }

  private validateInput(data: unknown) {
    // Validation logic
  }
}`}</code>
        </pre>

        <h3 id="trade-offs">Trade-offs and Decisions</h3>
        <p>
          Structure increases initial effort but reduces entropy over time.
          Here are typical decisions:
        </p>
        <ul>
          <li>
            <strong>Monolith vs Microservices:</strong> Start with a monolith.
            Microservices solve organizational problems, not technical ones.
          </li>
          <li>
            <strong>Database per service:</strong> Only if you need independent
            scaling. Usually premature optimization.
          </li>
          <li>
            <strong>Logging strategy:</strong> Structured logging from day one.
            Parse logs into JSON. Future you will thank present you.
          </li>
        </ul>
      </>
    ),
    whatILearned: [
      "Structure prevents architectural debt from compounding",
      "Boundaries improve debugging speed exponentially",
      "Environment validation prevents entire classes of runtime errors",
      "Service layer makes testing trivial",
      "Documentation through folder structure is underrated",
    ],
    improvements: [
      "Implement structured JSON logging across all services",
      "Add feature flags for safe deployments",
      "Build observability dashboard for key metrics",
      "Create database migration strategy documentation",
    ],
  },

  "contact-email-pipeline-nodemailer": {
    title: "Designing a Contact Email Pipeline",
    subtitle: "Reliability in Form Submissions",
    date: "Feb 18, 2026",
    readTime: 10,
    category: "Full-Stack",
    description:
      "Building a reliable, production-grade email system for form submissions. Includes error handling, rate limiting, and monitoring strategies.",
    content: (
      <>
        <p>
          Email systems fail silently without proper monitoring. A form
          submission disappears into the void. The user never knows. You never
          know. This is unacceptable in production.
        </p>

        <h3 id="architecture">Architecture</h3>
        <p>
          The flow is simple but each step matters. Let me break down why:
        </p>
        <pre>
          <code className="language-text">{`Validation → Rate Limit → Queue → Send → Log & Retry`}</code>
        </pre>

        <h3 id="validation">Input Validation</h3>
        <p>
          Validate at the boundary. Never trust client data. Reject invalid
          requests before they consume resources:
        </p>
        <pre>
          <code className="language-typescript">{`// api/send/route.ts
import { z } from "zod";

const contactSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1).max(256),
  message: z.string().min(10).max(5000),
  name: z.string().min(1).max(100),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const validated = contactSchema.parse(data);
    return handleValidatedContact(validated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    throw error;
  }
}`}</code>
        </pre>

        <h3 id="rate-limiting">Rate Limiting</h3>
        <p>
          Prevent abuse. A single IP should not be able to send 1000 emails in
          one second. Use Redis for distributed rate limiting:
        </p>
        <pre>
          <code className="language-typescript">{`// lib/rateLimit.ts
import { Redis } from "@upstash/redis";

const redis = new Redis({ url: process.env.REDIS_URL });

export async function rateLimit(key: string, limit: number, window: number) {
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, window);
  }
  
  return current <= limit;
}

// In your handler
const clientIp = request.headers.get("x-forwarded-for") || "unknown";
const allowed = await rateLimit(\`contact:\${clientIp}\`, 5, 3600);

if (!allowed) {
  return NextResponse.json(
    { error: "Too many requests. Try again in 1 hour." },
    { status: 429 }
  );
}`}</code>
        </pre>

        <h3 id="queuing">Queuing Pattern</h3>
        <p>
          Never send email synchronously. Queue it. Let a background worker
          handle retries and failures:
        </p>
        <pre>
          <code className="language-typescript">{`// api/send/route.ts
export async function POST(request: NextRequest) {
  // ... validation and rate limiting ...

  // Queue the email, don't send synchronously
  await emailQueue.enqueue({
    to: validated.email,
    subject: validated.subject,
    body: validated.message,
    metadata: { ip: clientIp, timestamp: Date.now() },
  });

  // Return immediately
  return NextResponse.json(
    { message: "Message received. We'll be in touch soon." },
    { status: 202 } // 202 Accepted
  );
}`}</code>
        </pre>

        <h3 id="monitoring">Monitoring and Alerts</h3>
        <p>
          Track failures, retries, and delivery status. Alert when something
          breaks:
        </p>
        <pre>
          <code className="language-typescript">{`// lib/emailQueue.ts
async function processQueue() {
  const batch = await queue.getBatch(10);

  for (const job of batch) {
    try {
      await sendEmail(job);
      await job.complete();
      metrics.increment("email.sent");
    } catch (error) {
      job.incrementRetries();
      
      if (job.retries >= 3) {
        await job.deadLetter();
        await alerting.send(\`Email failed: \${job.to}\`);
        metrics.increment("email.failed");
      } else {
        await job.retry();
        metrics.increment("email.retry");
      }
    }
  }
}`}</code>
        </pre>
      </>
    ),
    whatILearned: [
      "Queueing separates concerns and enables retries",
      "Rate limiting prevents abuse and protects infrastructure",
      "Status codes matter: 202 Accepted is correct here, not 200",
      "Monitoring failures prevents silent data loss",
      "Dead letter queues catch problems for later investigation",
    ],
    improvements: [
      "Add dead-letter queue for investigating failures",
      "Implement exponential backoff for retries",
      "Send user-facing confirmation emails",
      "Collect metrics for SLA monitoring",
    ],
  },

  "nextjs-production-deployment": {
    title: "Deploying Next.js to Production",
    subtitle: "What Actually Matters",
    date: "Feb 15, 2026",
    readTime: 15,
    category: "DevOps",
    description:
      "Moving beyond local development. Environment configuration, database connections, error monitoring, and performance optimization in production.",
    content: (
      <>
        <p>
          Production is not a larger localhost. It is a different beast. Your
          code runs on unknown hardware, at scale, with real people depending on
          it. Treat it differently.
        </p>

        <h3 id="deployment-checklist">Pre-deployment Checklist</h3>
        <p>
          Before moving anything to production, ensure these are done:
        </p>
        <ul>
          <li>
            <strong>Environment validation:</strong> Your app should crash on
            startup if env vars are missing or invalid.
          </li>
          <li>
            <strong>Database migrations:</strong> Automate them. Never run
            migrations manually.
          </li>
          <li>
            <strong>Error tracking:</strong> Sentry, Rollbar, or similar.
            Silent errors kill businesses.
          </li>
          <li>
            <strong>Health checks:</strong> Implement /health endpoints that
            verify database connectivity.
          </li>
        </ul>

        <h3 id="environment">Environment Configuration</h3>
        <p>
          Validate all environment variables at startup. Fail loudly if
          anything is missing:
        </p>
        <pre>
          <code className="language-typescript">{`// next.config.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_API_URL: z.string().url(),
});

const env = envSchema.parse(process.env);

export default {
  // ... rest of config
};`}</code>
        </pre>

        <h3 id="connection-pooling">Connection Pooling</h3>
        <p>
          Never create a new database connection per request. Connection pools
          manage reuse efficiently:
        </p>
        <pre>
          <code className="language-typescript">{`// src/lib/db.ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on("error", (error) => {
  console.error("Unexpected error on idle client", error);
  process.exit(-1);
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    if (duration > 1000) {
      console.warn(
        \`Slow query (\${duration}ms): \${text}\`
      );
    }
    
    return result.rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}`}</code>
        </pre>

        <h3 id="graceful-shutdown">Graceful Shutdown</h3>
        <p>
          When SIGTERM arrives, finish in-flight requests before exiting:
        </p>
        <pre>
          <code className="language-typescript">{`// main.ts
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  
  // Stop accepting new requests
  server.close(() => {
    console.log("HTTP server closed");
  });

  // Close database connections
  await pool.end();
  console.log("Database pool closed");

  // Close any other resources
  await redis.quit();
  console.log("Redis connection closed");

  // Exit
  process.exit(0);
});`}</code>
        </pre>

        <h3 id="monitoring">Monitoring in Production</h3>
        <p>
          You cannot fix what you cannot see. Implement monitoring from day one:
        </p>
        <pre>
          <code className="language-typescript">{`// lib/monitor.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
  ],
});

export function captureException(error: unknown) {
  Sentry.captureException(error);
}

// In your API routes
export async function GET(request: NextRequest) {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    captureException(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}`}</code>
        </pre>
      </>
    ),
    whatILearned: [
      "Production requires explicit monitoring and alerting",
      "Connection pooling is non-negotiable at scale",
      "Graceful shutdown prevents data corruption",
      "Slow query logging catches performance regressions early",
      "Environment validation catches configuration errors before users see them",
    ],
    improvements: [
      "Implement load testing to find bottlenecks",
      "Create deployment checklist automation",
      "Set up performance monitoring dashboards",
      "Document runbooks for common incidents",
    ],
  },

  "database-schema-design": {
    title: "Database Schema Design",
    subtitle: "Performance Lessons from Production",
    date: "Feb 12, 2026",
    readTime: 14,
    category: "Architecture",
    description:
      "Lessons learned from optimizing queries. Indexing strategies, query patterns, and how bad schema design manifests as production incidents.",
    content: (
      <>
        <p>
          Schema mistakes echo for years. A denormalized table chosen for
          convenience becomes a bottleneck. A missing index slows queries by
          100x. Your schema is your foundation. Build it carefully.
        </p>

        <h3 id="normalization">Normalization vs Denormalization</h3>
        <p>
          Start normalized. Only denormalize after measuring and confirming
          performance problems:
        </p>
        <pre>
          <code className="language-sql">{`-- Normalized (start here)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Only denormalize if measurement shows a problem
-- For example: SELECT users.*, COUNT(posts.id) FROM users...
-- becomes slow. Then add post_count to users table.
-- But maintain it with a trigger to prevent inconsistency.`}</code>
        </pre>

        <h3 id="indexing">Indexing Strategy</h3>
        <p>
          Index what you query, not everything. Every index has a cost: slower
          writes, more storage. Index deliberately:
        </p>
        <pre>
          <code className="language-sql">{`-- Primary key index (automatic)
CREATE TABLE users (
  id SERIAL PRIMARY KEY
);

-- Unique constraint index
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Foreign key index (frequent joins)
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Composite index for common queries
-- "SELECT * FROM orders WHERE user_id = ? AND created_at > ?"
CREATE INDEX idx_orders_user_date 
  ON orders(user_id, created_at DESC);

-- Measure before and after
EXPLAIN ANALYZE SELECT * FROM posts WHERE user_id = 1;`}</code>
        </pre>

        <h3 id="slow-queries">Finding Slow Queries</h3>
        <p>
          Enable query logging. Find problems before production:
        </p>
        <pre>
          <code className="language-sql">{`-- PostgreSQL: Enable slow query log
ALTER SYSTEM SET log_min_duration_statement = 1000; -- 1 second

-- Then restart
SELECT pg_reload_conf();

-- Query the log
SELECT * FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;`}</code>
        </pre>

        <h3 id="query-patterns">Common Query Patterns</h3>
        <p>
          Optimize for your access patterns. Different patterns need different
          structures:
        </p>
        <pre>
          <code className="language-sql">{`-- Pattern 1: Frequent point lookups
-- Solution: Primary key + unique constraints
SELECT * FROM users WHERE id = 1;

-- Pattern 2: Range queries
-- Solution: B-tree index on range column
SELECT * FROM posts WHERE created_at > NOW() - INTERVAL '7 days';

-- Pattern 3: Text search
-- Solution: GIN index for full-text search
CREATE INDEX idx_posts_search ON posts USING GIN(
  to_tsvector('english', title || ' ' || content)
);

-- Pattern 4: Aggregations
-- Solution: Materialized views or denormalization
CREATE MATERIALIZED VIEW user_stats AS
SELECT user_id, COUNT(*) as post_count, MAX(created_at) as last_post
FROM posts
GROUP BY user_id;`}</code>
        </pre>

        <h3 id="real-world">Real-World Incident</h3>
        <p>
          A system I worked on had a slow reporting feature. Every query took
          2+ seconds. Investigation revealed the schema had timestamps stored
          incorrectly, queries couldn&apos;t use indexes, and all 10 million
          rows were scanned. The fix:
        </p>
        <ul>
          <li>
            <strong>Fix timestamp type:</strong> Use TIMESTAMP, not TEXT
          </li>
          <li>
            <strong>Add index:</strong> Index the timestamp column used in
            WHERE clause
          </li>
          <li>
            <strong>Query rewrite:</strong> Use date ranges instead of string
            matching
          </li>
        </ul>
        <p>
          Result: Query dropped from 2 seconds to 50ms. Index a single column.
          2000% improvement. This is why schema design matters.
        </p>
      </>
    ),
    whatILearned: [
      "Bad indexes hurt performance more than no indexes",
      "Schema design impacts scalability at 10x and 100x data growth",
      "Measurement beats intuition every time",
      "Denormalization is a performance optimization, not a design pattern",
      "Type choice (TIMESTAMP vs TEXT) affects query speed dramatically",
    ],
    improvements: [
      "Implement query monitoring in staging environment",
      "Create schema review checklist for schema changes",
      "Document all non-obvious indexes with their use cases",
      "Set up performance regression tests",
    ],
  },

  "react-performance-optimization": {
    title: "Optimizing React Performance",
    subtitle: "Beyond the Obvious",
    date: "Feb 8, 2026",
    readTime: 13,
    category: "Performance",
    description:
      "Deep dive into bundle splitting, lazy loading, memoization patterns, and when micro-optimizations actually matter in production.",
    content: (
      <>
        <p>
          Most React performance problems are not React problems. They are
          network, bundle size, or layout problems. Profile first. Optimize
          second. Guess never.
        </p>

        <h3 id="profiling">Profiling Your Application</h3>
        <p>
          Use React DevTools Profiler and Lighthouse. Measure real-world
          performance, not local performance:
        </p>
        <pre>
          <code className="language-typescript">{`// Enable React Profiler
import { Profiler } from "react";

function onRenderCallback(
  id: string,
  phase: "mount" | "update",
  actualDuration: number
) {
  console.log(\`\${id} (\${phase}) took \${actualDuration}ms\`);
}

export default function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <YourApp />
    </Profiler>
  );
}`}</code>
        </pre>

        <h3 id="bundle-splitting">Code Splitting and Lazy Loading</h3>
        <p>
          Split your bundle. Load non-critical code later. Most applications
          can cut initial bundle size by 50%:
        </p>
        <pre>
          <code className="language-typescript">{`// Dynamic import for page components
import dynamic from "next/dynamic";

const AdminPanel = dynamic(
  () => import("@/components/AdminPanel"),
  { loading: () => <div>Loading...</div> }
);

export default function Dashboard() {
  return (
    <>
      <Header />
      <AdminPanel /> {/* Only loads when needed */}
    </>
  );
}`}</code>
        </pre>

        <h3 id="memoization">Memoization Patterns</h3>
        <p>
          Use memoization strategically. Avoid premature optimization:
        </p>
        <pre>
          <code className="language-typescript">{`// Memoize expensive computations
import { useMemo } from "react";

function ExpensiveList({ items }: { items: Item[] }) {
  const sortedItems = useMemo(
    () => items.sort((a, b) => b.date - a.date),
    [items] // Only recompute when items changes
  );

  return (
    <ul>
      {sortedItems.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

// Memoize callbacks passed to children
export function Parent() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <Child onClick={handleClick} />;
}`}</code>
        </pre>

        <h3 id="images">Optimize Images</h3>
        <p>
          Images are usually the bottleneck. Optimize aggressively:
        </p>
        <pre>
          <code className="language-typescript">{`import Image from "next/image";

export function OptimizedImage() {
  return (
    <Image
      src="/image.jpg"
      alt="Description"
      width={800}
      height={600}
      placeholder="blur" // Show blurred placeholder while loading
      quality={75} // Reduce quality for web (75-80 is usually fine)
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
    />
  );
}`}</code>
        </pre>

        <h3 id="network-bottleneck">Network Is Usually the Bottleneck</h3>
        <p>
          JavaScript optimizations usually don't matter if your API calls take
          5 seconds. Fix the network first:
        </p>
        <ul>
          <li>
            <strong>API response time:</strong> Profile your backend. Slow
            queries? Slow APIs? Fix that first.
          </li>
          <li>
            <strong>Bundle size:</strong> Check your initial JavaScript. Over
            100KB? Code split aggressively.
          </li>
          <li>
            <strong>Image optimization:</strong> Serve WebP. Resize for device.
            Use CDN.
          </li>
          <li>
            <strong>Caching:</strong> Cache API responses. Cache static assets
            for years.
          </li>
        </ul>
      </>
    ),
    whatILearned: [
      "Measurement beats intuition in performance optimization",
      "Network is almost always the bottleneck, not rendering",
      "Image optimization matters more than JavaScript micro-optimizations",
      "Lazy loading hidden routes can cut initial bundle by 50%+",
      "Small memoization wins compound across the application",
    ],
    improvements: [
      "Implement automatic performance budgets in CI",
      "Set up Lighthouse CI for every deployment",
      "Create performance monitoring dashboard",
      "Profile and optimize API endpoints",
    ],
  },

  "infrastructure-as-code-terraform": {
    title: "Infrastructure as Code: Managing Your Stack",
    subtitle: "Terraform for Reliable Deployments",
    date: "Feb 10, 2026",
    readTime: 16,
    category: "Infrastructure",
    description:
      "Automating infrastructure provisioning, version control, and disaster recovery using Terraform. Why IaC matters and common pitfalls to avoid.",
    content: (
      <>
        <p>
          Infrastructure as code eliminates manual deployment steps. No more
          &quot;click this button then that button.&quot; Your infrastructure is
          version controlled, reviewable, and reproducible.
        </p>

        <h3 id="why-iac">Why Infrastructure as Code Matters</h3>
        <p>
          Manual infrastructure is:
        </p>
        <ul>
          <li>
            <strong>Unreproducible:</strong> Disaster recovery requires
            remembering steps. People forget. Systems break.
          </li>
          <li>
            <strong>Undocumented:</strong> Your infrastructure lives in
            someone's head. That person leaves. Knowledge walks out the door.
          </li>
          <li>
            <strong>Unmaintainable:</strong> Changes are ad-hoc. No audit
            trail. No rollback.
          </li>
        </ul>

        <h3 id="terraform-basics">Terraform Basics</h3>
        <p>
          Terraform describes your infrastructure as code. You define what you
          want. Terraform figures out what to create, update, or destroy:
        </p>
        <pre>
          <code className="language-hcl">{`# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Define your infrastructure
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  
  tags = {
    Name = "web-server"
  }
}

resource "aws_security_group" "web" {
  name = "web-security-group"
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`}</code>
        </pre>

        <h3 id="state-management">State Management</h3>
        <p>
          Terraform tracks state. State is critical. Lose it, lose control of
          your infrastructure:
        </p>
        <pre>
          <code className="language-hcl">{`# terraform.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

# CRITICAL: Enable state locking
# This prevents concurrent modifications
# that could corrupt state`}</code>
        </pre>

        <h3 id="variables-outputs">Variables and Outputs</h3>
        <p>
          Extract values into variables. Make your code reusable:
        </p>
        <pre>
          <code className="language-hcl">{`# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_count" {
  description = "Number of instances"
  type        = number
  default     = 2
  
  validation {
    condition     = var.instance_count > 0 && var.instance_count <= 10
    error_message = "Instance count must be between 1 and 10."
  }
}

# outputs.tf
output "instance_ids" {
  value       = aws_instance.web[*].id
  description = "IDs of the instances"
}

output "api_endpoint" {
  value       = aws_api_gateway_deployment.api.invoke_url
  description = "API Gateway endpoint"
}`}</code>
        </pre>

        <h3 id="modules">Organizing with Modules</h3>
        <p>
          Modules allow you to package and reuse infrastructure components:
        </p>
        <pre>
          <code className="language-hcl">{`# modules/database/main.tf
resource "aws_db_instance" "default" {
  allocated_storage    = var.storage_size
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "14"
  instance_class       = var.instance_class
  database_name        = var.db_name
  username             = var.db_user
  password             = var.db_password
  parameter_group_name = "default.postgres14"
  skip_final_snapshot  = false
  final_snapshot_identifier = "\${var.environment}-snapshot"
}

# main.tf - Using the module
module "database" {
  source = "./modules/database"
  
  environment     = "production"
  storage_size    = 100
  instance_class  = "db.t3.micro"
  db_name         = "myapp"
  db_user         = "admin"
  db_password     = var.db_password
}`}</code>
        </pre>

        <h3 id="common-mistakes">Common Pitfalls</h3>
        <ul>
          <li>
            <strong>Hardcoding values:</strong> Use variables. Don't hardcode
            passwords or IPs.
          </li>
          <li>
            <strong>Ignoring state:</strong> Treat state like your database.
            Back it up. Lock it.
          </li>
          <li>
            <strong>No destruction testing:</strong> Test your terraform
            destroy. You'll need it in disaster recovery.
          </li>
          <li>
            <strong>Skipping version control:</strong> All Terraform goes in
            git. Every change is reviewed.
          </li>
        </ul>

        <h3 id="workflow">Recommended Workflow</h3>
        <pre>
          <code className="language-bash">{`# 1. Plan changes (always review first)
terraform plan -out=tfplan

# 2. Review the plan carefully
cat tfplan

# 3. Apply only if it looks right
terraform apply tfplan

# 4. Commit to git
git add terraform.tf variables.tf
git commit -m "Infrastructure: Add RDS database"`}</code>
        </pre>
      </>
    ),
    whatILearned: [
      "Infrastructure as code prevents configuration drift",
      "State is critical: secure it, backup it, lock it",
      "Modules make infrastructure reusable and maintainable",
      "Always test terraform destroy before you need it",
      "Code review for infrastructure is as important as code review for application code",
    ],
    improvements: [
      "Implement Terraform testing with Terratest",
      "Create policy-as-code with OPA/Sentinel",
      "Set up infrastructure change notifications",
      "Document disaster recovery procedures",
    ],
  },
};
