export interface CaseStudyRecord {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  level: string;
  readTime: number;
  date: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  whatILearned: string[];
  improvements: string[];
  relatedNoteSlugs: string[];
  relatedProjectSlug: string | null;
  relatedSystemDesignSlug: string | null;
  createdAt: string;
  updatedAt: string;
}

export const caseStudiesMeta: CaseStudyRecord[] = [
  {
    "id": 1,
    "slug": "runstack",
    "title": "RunStack",
    "subtitle": "Distributed Job Execution & Application Orchestration Platform",
    "excerpt": "Lightweight distributed job execution and application orchestration platform built in Go, designed for deterministic scheduling, container isolation, and execution-fenced failure recovery.",
    "category": "Distributed Systems & Infrastructure",
    "level": "Advanced",
    "readTime": 68,
    "date": "Jan 2026 — Present",
    "tags": [
      "Go",
      "Docker / Podman",
      "HTTP",
      "PostgreSQL",
      "Linux",
      "Docker"
    ],
    "published": true,
    "featured": true,
    "whatILearned": [
      "Node Failure & Recovery: Engineered heartbeat monitoring (1000ms loop) with offline detection. Stalled jobs transition through a grace period back to PENDING for rescheduling.",
      "Stale Execution Results: Separated logical JobID from attempt ExecutionID. The Control Plane verifies the active ExecutionID and rejects stale submissions.",
      "Concurrent State Mutation: Protected registry transitions with explicit state validation and sync.RWMutex read/write locking, verified with `go test -race`.",
      "Bounded Retries: Enforced a strict retry budget (`Attempts <= MaxRetries ? PENDING : FAILED`), bounding total lifetime executions to MaxRetries + 1."
    ],
    "improvements": [
      "Go: Predictable microsecond state coordination and clean portable agent binaries across heterogeneous Linux hosts.",
      "In-Memory Registries (V1): Clean deterministic state machine foundations that map cleanly to durable PostgreSQL storage in V2.",
      "HTTP Polling Architecture: Simple, resilient network boundary requiring only outbound egress from worker agents to the Control Plane.",
      "ExecutionID Fencing: Eliminates split-brain result corruption without requiring complex distributed consensus protocols.",
      "Deterministic Round-Robin: Deterministic testability and zero starvation across heterogeneous worker nodes.",
      "PostgreSQL V2 Foundation: Durable persistence and rock-solid concurrent locking for production cluster state."
    ],
    "relatedNoteSlugs": [],
    "relatedProjectSlug": "aegis",
    "relatedSystemDesignSlug": null,
    "createdAt": "2026-09-05T22:19:12.448Z",
    "updatedAt": "2026-09-05T22:19:12.448Z",
    "content": ""
  },
  {
    "id": 2,
    "slug": "aegis",
    "title": "Aegis",
    "subtitle": "Air-Gapped AIOps & Self-Healing Infrastructure",
    "excerpt": "Closed-loop, local-first SRE platform for detecting container failures, diagnosing incidents, and executing policy-controlled remediation.",
    "category": "Distributed SRE / AIOps Platform",
    "level": "Advanced",
    "readTime": 59,
    "date": "Feb 2026 — Present",
    "tags": [
      "TypeScript",
      "Python",
      "NestJS",
      "Kafka",
      "Docker",
      "MongoDB"
    ],
    "published": true,
    "featured": true,
    "whatILearned": [
      "Automated Remediation Without RCE: Constrained actions to a strict enum-only registry (RESTART_CONTAINER, STOP_CONTAINER, IGNORE) mapped directly to explicit Dockerode API calls.",
      "AI Uncertainty & False Diagnoses: Enforced a deterministic safety gate: requires confidence >= 0.85, risk == LOW, and action == RESTART_CONTAINER; otherwise defaults to human review.",
      "Event Decoupling & Latency Skew: Decoupled event capture from diagnosis via Kafka KRaft topics, buffering incidents asynchronously with durable consumer groups.",
      "Complete System Auditability: Persisted raw crash logs, 384-dimensional embeddings, AI diagnosis records, safety gate outcomes, and Docker execution receipts in MongoDB."
    ],
    "improvements": [
      "Kafka KRaft: Zero event loss during burst container failures and reliable asynchronous incident queues.",
      "MongoDB: High-speed write throughput for raw crash logs and structured JSON remediation plans.",
      "Dockerode: Deterministic, injection-free container lifecycle actuation with zero shell execution.",
      "SentenceTransformers + FAISS: Completely air-gapped, zero-cloud semantic matching against known infrastructure incident patterns.",
      "PyTorch MLP Classifier: Calibrated probabilistic confidence metrics that directly drive the safety gate policy.",
      "NestJS: Highly testable, maintainable SRE control plane with clear domain boundaries."
    ],
    "relatedNoteSlugs": [],
    "relatedProjectSlug": "carepulse",
    "relatedSystemDesignSlug": null,
    "createdAt": "2026-09-05T22:19:12.495Z",
    "updatedAt": "2026-09-05T22:19:12.495Z",
    "content": ""
  },
  {
    "id": 3,
    "slug": "carepulse",
    "title": "CarePulse",
    "subtitle": "Healthcare Operations & Appointment Workflow Engine",
    "excerpt": "Healthcare appointment and patient onboarding platform engineered with Next.js 14 App Router, server-side data operations, Appwrite backend services, centralized Zod validation, and Twilio SMS dispatch.",
    "category": "Full-Stack Product Engineering",
    "level": "Advanced",
    "readTime": 52,
    "date": "2024 — 2025",
    "tags": [
      "Next.js 14",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Appwrite",
      "Twilio",
      "Sentry",
      "Vercel"
    ],
    "published": true,
    "featured": true,
    "whatILearned": [
      "Multi-Step Patient Onboarding: Coordinated initial user creation via Appwrite Users, transferring the generated userId to `/patients/[userId]/register` for full medical history and consent capture.",
      "Complex Healthcare Form Validation: Centralized all runtime validation in `lib/validation.ts` using Zod schemas, enforcing strict client-side validation before server action invocation.",
      "Polymorphic Appointment State Management: Dynamically generated validation schemas via `getAppointmentSchema(type)` to conditionally require cancellation justification or schedule date fields.",
      "External Service Coordination: Encapsulated third-party operations within typed server actions with try/catch exception routing to Sentry and instant cache revalidation."
    ],
    "improvements": [
      "Next.js 14 App Router: Streamlined full-stack architecture with zero REST API boilerplate.",
      "Server Actions: Secure mutation pipeline keeping Appwrite API keys and Twilio credentials isolated from the browser.",
      "Appwrite BaaS: Rapid, reliable full-stack execution covering authentication, database, storage, and notifications.",
      "Zod: Zero runtime type coercion vulnerabilities and instantaneous inline form validation feedback.",
      "React Hook Form: Highly responsive form interfaces with accessible keyboard navigation and state isolation."
    ],
    "relatedNoteSlugs": [],
    "relatedProjectSlug": "fenix",
    "relatedSystemDesignSlug": null,
    "createdAt": "2026-09-05T22:19:12.534Z",
    "updatedAt": "2026-09-05T22:19:12.534Z",
    "content": ""
  },
  {
    "id": 4,
    "slug": "fenix",
    "title": "Fenix",
    "subtitle": "Real-Time Video Collaboration Platform",
    "excerpt": "Real-time video calling platform engineered around authenticated meeting lifecycle management, room access, device state, participant presence, media controls, and responsive call layouts using Next.js, Clerk, and Stream Video SDK.",
    "category": "Real-Time Systems",
    "level": "Advanced",
    "readTime": 38,
    "date": "2024 — 2025",
    "tags": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Clerk",
      "Stream Video SDK",
      "Stream Node SDK",
      "Radix UI",
      "Lucide",
      "Framer Motion",
      "Vercel",
      "Stream Video"
    ],
    "published": true,
    "featured": false,
    "whatILearned": [
      "Authenticated Real-Time Access: Evaluated Clerk authentication before initializing the Stream Video client and enforced invited-member access checks before call admission.",
      "Device State Before Join: Provided a dedicated pre-join MeetingSetup stage featuring live VideoPreview, DeviceSettings dialogs, and Stream camera/mic toggles.",
      "Real-Time Call State Synchronization: Inspected call state hooks to handle loading states, future scheduled meetings, already-ended calls, and unauthorized access gracefully.",
      "Multiple Dynamic Call Layouts: Integrated in-flight layout switching between Paginated Grid, Speaker Left, and Speaker Right layouts with responsive participant drawers."
    ],
    "improvements": [
      "Clerk Authentication: Robust, multi-provider authentication with instant session resolution across meeting routes.",
      "Stream Video SDK: Rapid delivery of high-reliability video calls, speaking indicators, and call diagnostics.",
      "Next.js App Router: Modular codebase with isolated secret keys and zero REST boilerplate.",
      "Componentized Call UI: Clean separation between device preview, active media controls, and call diagnostic panels."
    ],
    "relatedNoteSlugs": [],
    "relatedProjectSlug": "signifiya",
    "relatedSystemDesignSlug": null,
    "createdAt": "2026-09-05T22:19:12.564Z",
    "updatedAt": "2026-09-05T22:19:12.564Z",
    "content": ""
  },
  {
    "id": 5,
    "slug": "signifiya",
    "title": "Signifiya",
    "subtitle": "Mobile Event Infrastructure, Native Payments & 120Hz Engine",
    "excerpt": "Official event management and registration platform for Signifiya 2026. Engineered with React Native, Expo SDK 54, Better Auth, Supabase PostgreSQL with strict RLS, Razorpay payments, and a custom Kotlin 120Hz display plugin.",
    "category": "Mobile Platform",
    "level": "Advanced",
    "readTime": 38,
    "date": "2026",
    "tags": [
      "React Native",
      "Expo SDK 54",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Better Auth",
      "Razorpay",
      "NativeWind",
      "Expo"
    ],
    "published": true,
    "featured": false,
    "whatILearned": [
      "Android 60Hz Display Throttling on 120Hz Hardware: Authored custom Expo config plugin injecting Kotlin display mode logic into MainActivity.kt to lock maximum refresh rate (90/120/144Hz).",
      "Client-Side Array Crashes from Schema Deviations: Implemented defensive data parser (defensiveHandler.ts) with safeArrayParse, runtime type guards, and atomic state fallbacks."
    ],
    "improvements": [
      "Custom Kotlin Config Plugin: undefined",
      "Supabase PostgreSQL RLS Policies: undefined"
    ],
    "relatedNoteSlugs": [],
    "relatedProjectSlug": "webscope",
    "relatedSystemDesignSlug": null,
    "createdAt": "2026-09-05T22:19:12.605Z",
    "updatedAt": "2026-09-05T22:19:12.605Z",
    "content": ""
  },
  {
    "id": 6,
    "slug": "webscope",
    "title": "WebScope Pro",
    "subtitle": "Website Intelligence Platform & Bounded Analysis Pipeline",
    "excerpt": "Website intelligence and analysis platform that accepts a URL, safely fetches and analyzes the site, calculates SEO and performance signals, persists scan history, supports comparisons and monitoring, and produces structured insights.",
    "category": "Full-Stack Intelligence Platform",
    "level": "Advanced",
    "readTime": 25,
    "date": "2024",
    "tags": [
      "Next.js 14 App Router",
      "TypeScript",
      "Axios",
      "Cheerio",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Tailwind CSS",
      "Next.js"
    ],
    "published": true,
    "featured": false,
    "whatILearned": [
      "Bounded Analysis Concurrency: Implemented in-memory slot queue (MAX_CONCURRENT_ANALYSIS = 4) with FIFO waiting buffers.",
      "Decoupled AI Resilience: Pre-computes deterministic heuristic insights locally with strict 6s AI timeout fallbacks."
    ],
    "improvements": [
      "Axios + Cheerio: undefined",
      "Prisma + PostgreSQL: undefined"
    ],
    "relatedNoteSlugs": [],
    "relatedProjectSlug": "subscription-tracker",
    "relatedSystemDesignSlug": null,
    "createdAt": "2026-09-05T22:19:12.624Z",
    "updatedAt": "2026-09-05T22:19:12.624Z",
    "content": ""
  },
  {
    "id": 7,
    "slug": "subscription-tracker",
    "title": "Subscription Tracker",
    "subtitle": "API Architecture, Upstash Workflow Scheduling & Arcjet Security",
    "excerpt": "Production-ready REST API for subscription lifecycle management engineered with Express 4, MongoDB Mongoose session transactions, Arcjet bot defense, Upstash Workflow durable step functions, and Nodemailer dispatch.",
    "category": "Backend Engineering & Systems",
    "level": "Advanced",
    "readTime": 52,
    "date": "2024 — 2025",
    "tags": [
      "Node.js",
      "Express 4",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcryptjs",
      "Arcjet",
      "Upstash Workflow",
      "Nodemailer",
      "Day.js",
      "Express"
    ],
    "published": true,
    "featured": false,
    "whatILearned": [
      "Durable Multi-Day Scheduling: Integrated Upstash Workflow step functions to offload sleep states (7d, 5d, 2d, 1d) durably to QStash without keeping server threads occupied.",
      "Atomic User Registration: Enforced Mongoose session transactions with explicit commit and abort rollback handling on errors.",
      "Deterministic Renewal Math: Centralized renewal calculation and expired status transitions in a Mongoose pre-save lifecycle hook.",
      "Edge Rate & Bot Mitigation: Mounted Arcjet middleware globally to reject bots (403) and rate limits (429) prior to database execution."
    ],
    "improvements": [
      "Upstash Workflow: undefined",
      "Mongoose Pre-Save Hooks: undefined",
      "Mongoose Session Transactions: undefined",
      "Arcjet Middleware: undefined"
    ],
    "relatedNoteSlugs": [],
    "relatedProjectSlug": "runstack",
    "relatedSystemDesignSlug": null,
    "createdAt": "2026-09-05T22:19:12.669Z",
    "updatedAt": "2026-09-05T22:19:12.669Z",
    "content": ""
  }
];
