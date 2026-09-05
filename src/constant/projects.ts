import type { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: "runstack",
    slug: "runstack",
    name: "RunStack",
    title: "RunStack",
    subtitle: "Distributed Deployment & Job Orchestration Platform",
    description:
      "Distributed deployment and job orchestration platform designed for fault-tolerant task execution across heterogeneous worker nodes.",
    category: "Distributed Systems & Infrastructure",
    role: "Lead Systems Architect & Core Developer",
    year: "2026",
    timeline: "Jan 2026 — Present",
    status: "Active",
    technologies: ["Go", "Docker Engine API", "Protobuf", "Linux cgroups"],
    tech: ["Go","Docker"],
    problem:
      "Modern compute workloads distributed across multi-node clouds suffer from inconsistent state coordination, worker starvation under load bursts, split-brain race conditions during node partitions, and unhandled task dropouts when compute nodes abruptly crash.",
    approach:
      "Designed a decoupled, control-plane-driven cluster topology. An admission gateway verifies idempotent client manifests before submitting intent to a partitioned Kafka event log. A centralized scheduler computes node placement using real-time capacity heaps, while local Go daemons monitor cgroups, renew Redis-backed leases, and enforce deterministic task boundaries.",
    architecture: {
      flowSummary: "Client (gRPC) → Control Plane → Scheduler → Job Registry → Node Daemon → Isolated Container Worker",
      layers: [
        {
          name: "Client Layer",
          role: "Workload Ingestion & Request Signing",
          tech: "gRPC Client SDK / REST Gateway with SHA-256 Idempotency",
        },
        {
          name: "Control Plane",
          role: "Cluster Admission & Policy Validation",
          tech: "Go / gRPC Service / Token-Bucket Rate Limiter",
        },
        {
          name: "Event Bus",
          role: "Ordered Workload Dispatch & Buffer",
          tech: "Apache Kafka Partitioned Log",
        },
        {
          name: "Scheduler",
          role: "Capacity Scoring & Placement Matrix",
          tech: "Go Concurrent Min-Heap / Resource Matcher",
        },
        {
          name: "State Engine",
          role: "Distributed Locking & Lease Verification",
          tech: "Redis 7.x Redlock + AOF Persistence",
        },
        {
          name: "Node Supervisor",
          role: "Host Daemon & Heartbeat Prober",
          tech: "Go Daemon / Docker Engine Socket",
        },
        {
          name: "Worker Sandbox",
          role: "Isolated Task Execution",
          tech: "Docker Containers / Linux cgroups v2 / SIGKILL Watchdog",
        },
      ],
    },
    challenges: [
      {
        title: "Split-Brain & Lease Race Conditions",
        description:
          "During transient network partitions, two scheduler instances could attempt to dispatch the same heavy batch workload to separate nodes, causing duplicate resource reservation.",
        solution:
          "Implemented distributed Redlock mutexes in Redis with deterministic lease TTLs (5000ms) and conditional Compare-And-Swap (CAS) state updates in the Job Registry.",
      },
      {
        title: "Sub-Second Node Eviction & Workload Rescue",
        description:
          "Compute instances experiencing kernel freezes or network loss could stall assigned tasks indefinitely without notifying the control plane.",
        solution:
          "Engineered a sliding-window failure detector on 1000ms ticks. If a node misses 3 consecutive heartbeats (3000ms threshold), it transitions to DEGRADED; at 5000ms it is EVICTED and active tasks are automatically requeued with exponential jitter.",
      },
      {
        title: "Goroutine Exhaustion Under Burst Traffic",
        description:
          "Unchecked incoming dispatch streams could spawn tens of thousands of goroutines, degrading scheduler garbage collection and increasing latency.",
        solution:
          "Adopted bounded worker pools with non-blocking channel selectors and drop-guards to regulate concurrency and maintain constant memory envelopes under high RPS.",
      },
      {
        title: "Graceful Termination During Rolling Deployments",
        description:
          "Restarting node daemons during maintenance could sever executing worker containers mid-computation, corrupting persistent customer datasets.",
        solution:
          "Trapped POSIX SIGTERM signals to initiate a 30-second drain mode: the node daemon rejects new leases, allows running containers to complete, and flushes output state before terminating.",
      },
    ],
    decisions: [
      {
        technology: "Go",
        reason:
          "Chosen for its zero-overhead runtime, predictable garbage collection latencies, first-class goroutine concurrency primitives, and direct POSIX system call bindings.",
      },
      {
        technology: "Kafka",
        reason:
          "Selected over RabbitMQ for persistent partitioned event logs, allowing historical event replay during disaster recovery and guaranteed at-least-once message delivery.",
      },
      {
        technology: "Redis",
        reason:
          "Used specifically for sub-millisecond distributed lock acquisition (Redlock) and ephemeral lease keys with atomic SET NX EX semantics.",
      },
      {
        technology: "Docker Engine API & cgroups v2",
        reason:
          "Enables strict memory and CPU throttling per worker process, preventing rogue customer workloads from exhausting host resources.",
      },
    ],
    results: [
      "Zero dropped jobs recorded during simulated 40% packet-loss network partitions.",
      "Sub-second node eviction window (3.2 seconds average detection to task rescue).",
      "Passed `go test -race -count=100` across 500 simulated concurrent worker routines with zero race warnings.",
      "Deterministic 24-hour request replay protection via SHA-256 idempotency cache.",
    ],
    githubUrl: "https://github.com/tushardevx01/runstack",
    github_link: "https://github.com/tushardevx01/runstack",
    liveUrl: "https://github.com/tushardevx01/runstack",
    demo: "https://github.com/tushardevx01/runstack",
  },
  {
    id: "project-aegis",
    slug: "project-aegis",
    name: "Project Aegis",
    title: "Project Aegis",
    subtitle: "Autonomous Infrastructure & Incident Recovery Engine",
    description:
      "Autonomous infrastructure resilience and incident remediation engine that parses system telemetry and executes self-healing workflows.",
    category: "Systems Architecture & Automation",
    role: "Systems Architect & Backend Engineer",
    year: "2026",
    timeline: "Feb 2026 — Present",
    status: "Active",
    technologies: ["TypeScript", "Node.js", "Docker Engine API", "PostgreSQL", "Redis", "Prometheus Metrics"],
    tech: ["TypeScript", "Node.js", "Docker", "PostgreSQL", "Redis"],
    problem:
      "Infrastructure disruptions and memory leaks in production microservices often take 20-45 minutes to triage manually by on-call engineers, causing SLA violations and cascading failure propagation.",
    approach:
      "Constructed an event-driven telemetry digestion engine that matches incoming error spikes and metric anomalies against deterministic remediation state machines. The engine triggers scoped container restarts, cache flushes, and canary traffic isolation through direct Docker runtime integrations, backing every decision with an immutable audit log.",
    architecture: {
      flowSummary: "Telemetry Ingestion → Event Bus (Redis) → Rules & Pattern Engine → Safety Validator → Actuator (Docker API) → Audit Log (PostgreSQL)",
      layers: [
        {
          name: "Telemetry Ingestion",
          role: "Health Probe & Anomaly Listener",
          tech: "Node.js / Express Webhooks / Metric Collectors",
        },
        {
          name: "Event Bus",
          role: "High-Throughput Incident Buffering",
          tech: "Redis Streams with Backpressure",
        },
        {
          name: "Decision Engine",
          role: "Fault Classification & Workflow Selection",
          tech: "TypeScript Rule Engine / Heuristic Evaluator",
        },
        {
          name: "Safety Validator",
          role: "Blast Radius & Flapping Guard",
          tech: "Sliding-Window Action Limiter (Max 2 actions/service/hr)",
        },
        {
          name: "Actuator",
          role: "Container & Traffic Manipulation",
          tech: "Docker Engine API / Linux cgroups Controller",
        },
        {
          name: "Audit Store",
          role: "Immutable Post-Mortem Logging",
          tech: "PostgreSQL Event Store with JSONB Diff",
        },
      ],
    },
    challenges: [
      {
        title: "Remediation Flapping Prevention",
        description:
          "If a service fails due to bad application code, an automated restart loop can trigger restart flapping that overwhelms orchestration daemons.",
        solution:
          "Built a sliding-window circuit breaker that tracks remediation attempts per service signature. If 2 restarts fail to stabilize health, the service is quarantined and alerted to human engineers without further automated re-spins.",
      },
      {
        title: "Low-Latency Event Stream Processing",
        description:
          "Burst error spikes during outages can overwhelm webhook ingestors, dropping critical incident events.",
        solution:
          "Used Redis Streams with consumer groups to buffer up to 10,000 incident events/sec, allowing decoupled asynchronous processing with zero dropped signals.",
      },
      {
        title: "Blast Radius Containment",
        description:
          "Automated infrastructure modification risks unintended container termination if target identifiers are ambiguous.",
        solution:
          "Strict container label matching with cryptographic HMAC verification before issuing any teardown or re-spin instruction via the Docker Engine API.",
      },
    ],
    decisions: [
      {
        technology: "TypeScript & Node.js",
        reason:
          "Provided asynchronous non-blocking event-driven I/O ideal for handling thousands of incoming telemetry events per second without heavy thread overhead.",
      },
      {
        technology: "PostgreSQL",
        reason:
          "Chosen for strict ACID transactional consistency in recording incident post-mortems and tamper-proof operational audit receipts.",
      },
      {
        technology: "Redis Streams",
        reason:
          "Provides in-memory microsecond event ingestion and durable consumer acknowledgment across multiple engine instances.",
      },
    ],
    results: [
      "Sub-60-second autonomous fault detection and recovery for verified memory leak and hung worker classes.",
      "Zero unhandled flapping loops across stress test benchmark environments.",
      "100% immutable audit trace recorded for every automated lifecycle actuation.",
    ],
    githubUrl: "https://github.com/tushardevx01/project-aegis",
    github_link: "https://github.com/tushardevx01/project-aegis",
    liveUrl: "https://github.com/tushardevx01/project-aegis",
    demo: "https://github.com/tushardevx01/project-aegis",
  },
  {
    id: "devmatch",
    slug: "devmatch",
    name: "DevMatch",
    title: "DevMatch",
    subtitle: "Developer Intelligence & Repository Profiling Pipeline",
    description:
      "Developer intelligence and repository profiling platform that parses codebases and activity graphs to extract genuine engineering competencies.",
    category: "Full-Stack & Data Pipelines",
    role: "Full-Stack Lead & Pipeline Engineer",
    year: "2026",
    timeline: "Jan 2026 — Present",
    status: "Active",
    technologies: ["Next.js", "TypeScript", "GitHub GraphQL API", "Supabase", "PostgreSQL", "Tailwind CSS"],
    tech: ["Next.js", "TypeScript", "GitHub API", "Supabase", "Tailwind CSS"],
    problem:
      "Evaluating developer proficiency based on static CVs or generic commit counts fails to capture actual architectural thinking, PR review collaboration quality, code entropy, and distributed systems ability.",
    approach:
      "Engineered an automated data extraction and synthesis pipeline using the GitHub GraphQL v4 API. The pipeline ingests commit histories, code review commentary, language distributions, and commit cadence, transforming raw metrics into deterministic capability radars and evidence graphs.",
    architecture: {
      flowSummary: "Next.js Edge Client → API Route Handlers → Rate-Budgeted GraphQL Crawler → Analysis Worker → Supabase Cache",
      layers: [
        {
          name: "Presentation Layer",
          role: "Responsive Capability Dashboard",
          tech: "Next.js App Router / React 19 / Tailwind CSS",
        },
        {
          name: "API Gateway",
          role: "Validation & Rate Budget Management",
          tech: "Next.js Edge Route Handlers with Token-Bucket Throttling",
        },
        {
          name: "Upstream Ingestion",
          role: "Batch Data Fetching",
          tech: "GitHub GraphQL API v4 with Pagination Controls",
        },
        {
          name: "Analysis Engine",
          role: "Capability Synthesis & Metric Extraction",
          tech: "TypeScript / Language Entropy & AST Analyzers",
        },
        {
          name: "Persistence Layer",
          role: "Profile Caching & Relational Graph",
          tech: "Supabase PostgreSQL with Edge Invalidation",
        },
      ],
    },
    challenges: [
      {
        title: "GitHub API Rate Limit Budgeting",
        description:
          "Public GitHub API allowances (5,000 points/hr) are rapidly consumed when crawling deep multi-year repository commit trees.",
        solution:
          "Consolidated multiple REST calls into batched GraphQL queries requesting only required fields, and implemented multi-tier caching in Supabase with 6-hour TTLs.",
      },
      {
        title: "Latency Optimization for Profile Generation",
        description:
          "Initial prototype parsing took 14+ seconds per profile due to sequential network round trips.",
        solution:
          "Parallelized repository ingestion via Promise.allSettled and pre-computed language breakdowns, reducing generation time to under 3 seconds.",
      },
      {
        title: "Deterministic Capability Scoring",
        description:
          "Preventing vanity metrics (e.g. thousands of automated commits) from artificially inflating developer capability scores.",
        solution:
          "Weighted PR review complexity, multi-file code contributions, and language diversity higher than raw single-line commit frequency.",
      },
    ],
    decisions: [
      {
        technology: "Next.js App Router",
        reason:
          "Enabled streaming SSR with suspense boundaries, delivering immediate UI shell rendering while repository analysis streams in the background.",
      },
      {
        technology: "GitHub GraphQL API",
        reason:
          "Cut network payload sizes by 78% compared to REST by fetching only precise commit nodes, PR threads, and language byte counts.",
      },
      {
        technology: "Supabase",
        reason:
          "Provided instant serverless PostgreSQL with built-in connection pooling and real-time cache synchronization.",
      },
    ],
    results: [
      "Under 3 seconds average profile generation latency per repository index.",
      "78% reduction in network payload transfer using tailored GraphQL queries.",
      "Zero unhandled rate-limit failures through token bucket budget enforcement.",
    ],
    githubUrl: "https://github.com/tushardevx01/devmatch",
    github_link: "https://github.com/tushardevx01/devmatch",
    liveUrl: "https://github.com/tushardevx01/devmatch",
    demo: "https://github.com/tushardevx01/devmatch",
  },
  {
    id: "simpui",
    slug: "simpui",
    name: "SimpUI",
    title: "SimpUI",
    subtitle: "High-Performance Design System & Motion Primitives",
    description:
      "Component system with motion primitives, design tokens, and reuse patterns built for high-performance web products.",
    category: "Frontend Systems",
    role: "Frontend Systems Architect",
    year: "2025",
    timeline: "2025 — Present",
    status: "Open Source",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix Primitives"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    problem:
      "Scaling frontend teams encounter visual drift, bloated bundle sizes, layout thrashing from unoptimized animations, and broken keyboard accessibility when relying on ad-hoc UI implementations.",
    approach:
      "Built a composable, accessible design system with atomic design tokens, zero-runtime CSS variables, ARIA-compliant primitives, and hardware-accelerated motion components isolated from browser reflow pipelines.",
    architecture: {
      flowSummary: "Design Tokens (CSS Variables) → Unstyled Primitives (Radix) → Animated Wrappers (Framer Motion) → Product Consumer",
      layers: [
        {
          name: "Token Layer",
          role: "Design Variables & Color Palettes",
          tech: "CSS Custom Properties / Tailwind Config Tokens",
        },
        {
          name: "Primitive Layer",
          role: "Keyboard Accessibility & Focus Management",
          tech: "Radix UI Primitives / WAI-ARIA Standards",
        },
        {
          name: "Motion Layer",
          role: "GPU-Accelerated Transforms",
          tech: "Framer Motion / transform & opacity only",
        },
        {
          name: "Export Layer",
          role: "Tree-Shakeable Component Library",
          tech: "TypeScript / Rollup / ES Modules",
        },
      ],
    },
    challenges: [
      {
        title: "Layout Thrashing During Complex Modal & Drawer Transitions",
        description:
          "Animating width, height, or top properties triggered full page reflows, causing frame drops on mid-tier mobile devices.",
        solution:
          "Enforced strict hardware acceleration: all transitions utilize composite-only CSS properties (`transform: translate3d` and `opacity`) with `will-change` hints.",
      },
      {
        title: "Accessibility Compliance & Focus Traps",
        description:
          "Custom animated dialogs frequently lost focus when closed, leaving screen reader users stranded.",
        solution:
          "Implemented automated focus restoration and accessible keydown event interceptors conforming strictly to W3C ARIA dialog patterns.",
      },
      {
        title: "Automated Reduced-Motion Adaptation",
        description:
          "Users with vestibular motion sensitivity required zero animation without breaking component open/close state transitions.",
        solution:
          "Constructed a universal `useReducedMotion` context wrapper that collapses spring durations to 0ms when system preferences require reduced motion.",
      },
    ],
    decisions: [
      {
        technology: "Tailwind CSS",
        reason:
          "Ensured zero runtime CSS parsing overhead and atomic utility classes that maximize browser stylesheet caching.",
      },
      {
        technology: "Framer Motion",
        reason:
          "Provided declarative physics-based spring animations with built-in exit transitions and seamless React 19 support.",
      },
      {
        technology: "Radix UI Primitives",
        reason:
          "Guaranteed flawless accessibility, keyboard tab loops, and screen reader ARIA labels without design opinions.",
      },
    ],
    results: [
      "Maintained consistent 98+ Lighthouse performance scores across all demo views.",
      "Zero layout shift (CLS: 0.00) during heavy animated modal and navigation reveals.",
      "100% keyboard navigable with full screen reader compatibility.",
    ],
    githubUrl: "https://github.com/AbhishekS04/SimpyUI",
    github_link: "https://github.com/AbhishekS04/SimpyUI",
    liveUrl: "https://simpyui.vercel.app/",
    demo: "https://simpyui.vercel.app/",
  },
  {
    id: "carepulse",
    slug: "carepulse",
    name: "CarePulse",
    title: "CarePulse",
    subtitle: "Healthcare Operations & Appointment Workflow Engine",
    description:
      "Healthcare operations and patient scheduling platform designed with strict security constraints and fault-tolerant workflows.",
    category: "Full-Stack Platform",
    role: "Full-Stack Engineer",
    year: "2024",
    timeline: "2024 — 2025",
    status: "Production",
    technologies: ["Next.js", "TypeScript", "Appwrite", "Tailwind CSS", "Twilio SMS", "Zod"],
    tech: ["Next.js", "TypeScript", "Appwrite", "Tailwind CSS"],
    problem:
      "Medical clinics suffer high patient no-show rates, disjointed appointment scheduling across providers, and data privacy compliance risks when patient records lack strict isolation.",
    approach:
      "Developed a HIPAA-conscious scheduling workflow with Zod schema verification, multi-provider calendar slotting, automated SMS confirmations via Twilio, and role-gated clinical administrative portals.",
    architecture: {
      flowSummary: "Patient Interface → Next.js Server Actions → Zod Schema Validator → Appwrite DB → Twilio Notification Engine",
      layers: [
        {
          name: "Patient Portal",
          role: "Multi-Step Booking Interface",
          tech: "Next.js / React Hook Form / Tailwind CSS",
        },
        {
          name: "Validation Boundary",
          role: "Strict Input Sanitation & Schema Guard",
          tech: "Zod Schema Validation / Server Actions",
        },
        {
          name: "Data Platform",
          role: "Encrypted Patient & Appointment Storage",
          tech: "Appwrite Cloud Database & Secure File Vault",
        },
        {
          name: "Notification Dispatch",
          role: "Real-Time Appointment Confirmation",
          tech: "Twilio SMS API / Webhook Integration",
        },
        {
          name: "Admin Control",
          role: "Clinical Schedule Management",
          tech: "Role-Based Access Control / Next.js SSR",
        },
      ],
    },
    challenges: [
      {
        title: "Appointment Double-Booking Concurrency",
        description:
          "Simultaneous patients booking the exact same time slot could result in provider overbooking.",
        solution:
          "Implemented conditional reservation locks in Appwrite with atomic status transitions (`PENDING` → `CONFIRMED`), immediately invalidating conflicting pending reservations.",
      },
      {
        title: "Resilient SMS Notification Delivery",
        description:
          "Network drops or carrier errors could drop appointment confirmations, leaving patients uninformed.",
        solution:
          "Wrapped Twilio API dispatches in an exponential backoff retry queue with persistent delivery audit logs in Appwrite.",
      },
    ],
    decisions: [
      {
        technology: "Zod",
        reason:
          "Guaranteed end-to-end type safety from client inputs through database persistence with zero runtime type coercion vulnerabilities.",
      },
      {
        technology: "Next.js Server Actions",
        reason:
          "Eliminated unnecessary REST boilerplate and reduced client-side bundle size by executing form mutations securely on the server.",
      },
      {
        technology: "Appwrite",
        reason:
          "Provided managed authentication, file storage encryption, and document database APIs with strict permission models.",
      },
    ],
    results: [
      "Zero double-booking incidents across appointment test scenarios.",
      "Sub-2-second automated SMS appointment confirmation delivery.",
      "End-to-end encrypted medical record upload pipeline.",
    ],
    githubUrl: "https://github.com/tushardevx01/carepulse",
    github_link: "https://github.com/tushardevx01/carepulse",
    liveUrl: "https://carepulse-brown-omega.vercel.app/",
    demo: "https://carepulse-brown-omega.vercel.app/",
  },
  {
    id: "fenix",
    slug: "fenix",
    name: "Fenix",
    title: "Fenix",
    subtitle: "Low-Latency Real-Time Video & Media Infrastructure",
    description:
      "Real-time low-latency video platform with adaptive media streaming and session recovery under variable network conditions.",
    category: "Realtime Infrastructure",
    role: "Realtime Infrastructure Engineer",
    year: "2024",
    timeline: "2024 — 2025",
    status: "Production",
    technologies: ["Next.js", "TypeScript", "LiveKit", "WebRTC", "Clerk Auth", "Tailwind CSS"],
    tech: ["Next.js", "TypeScript", "LiveKit", "WebRTC", "Clerk"],
    problem:
      "Real-time video conferencing platforms frequently stutter, desynchronize audio/video streams, and completely disconnect when network bandwidth fluctuates or packets drop.",
    approach:
      "Integrated LiveKit's Selective Forwarding Unit (SFU) architecture with client-side simulcast negotiation, automated reconnection state machines, and dynamic bitrate adaptation.",
    architecture: {
      flowSummary: "WebRTC Peer Client → Selective Forwarding Unit (LiveKit) → Media Track Router → Downstream Participants",
      layers: [
        {
          name: "Client Media Engine",
          role: "Camera/Mic Capture & Track Publishing",
          tech: "WebRTC API / LiveKit Client SDK / Next.js",
        },
        {
          name: "Authentication & Rooms",
          role: "Token Signing & Room RBAC",
          tech: "Clerk Auth / JWT Room Permissions",
        },
        {
          name: "Media Routing SFU",
          role: "Selective Forwarding & Simulcast",
          tech: "LiveKit Cloud SFU Engine / UDP",
        },
        {
          name: "Network Supervisor",
          role: "Jitter Buffer & Quality Adaptation",
          tech: "WebRTC Stats API / Adaptive Bitrate Fallback",
        },
      ],
    },
    challenges: [
      {
        title: "Call Drops During Network Handoffs",
        description:
          "Switching between Wi-Fi and mobile cellular data caused TCP/UDP socket severance and dropped active calls.",
        solution:
          "Engineered an automated reconnection state machine that holds room participant leases for 15 seconds while re-establishing peer ICE candidates.",
      },
      {
        title: "CPU Overheating on Multi-Participant Calls",
        description:
          "Decoding 1080p video streams for 8+ simultaneous participants overloaded client CPU cores.",
        solution:
          "Implemented client-side simulcast: offscreen video tiles subscribe to low-resolution 240p/15fps video streams, conserving 65% client decode CPU.",
      },
    ],
    decisions: [
      {
        technology: "LiveKit (SFU)",
        reason:
          "Chosen over peer-to-peer mesh architecture to scale beyond 4 participants without overloading client upload bandwidth.",
      },
      {
        technology: "Clerk Auth",
        reason:
          "Provided cryptographically signed JWT tokens for room entry with sub-millisecond edge validation.",
      },
    ],
    results: [
      "Sub-150ms peer-to-peer audio and video delivery latency globally.",
      "Zero dropped active calls during simulated Wi-Fi to cellular network switches.",
      "65% reduction in client CPU consumption through adaptive simulcast layers.",
    ],
    githubUrl: "https://github.com/tushardevx01/fenix",
    github_link: "https://github.com/tushardevx01/fenix",
    liveUrl: "https://fenix-ecru.vercel.app/",
    demo: "https://fenix-ecru.vercel.app/",
  },
  {
    id: "signifiya",
    slug: "signifiya",
    name: "Signifiya",
    title: "Signifiya",
    subtitle: "Event Operations Platform & Real-Time Sync Engine",
    description:
      "Event operations platform — schedules, registration, live coordination. Handles peak traffic with real-time state sync across distributed teams and attendees.",
    category: "Full-Stack Platform",
    role: "Full-Stack Platform Engineer",
    year: "2024",
    timeline: "2024 — 2025",
    status: "Production",
    technologies: ["Next.js", "Expo React Native", "Supabase", "TypeScript", "PostgreSQL"],
    tech: ["Next.js", "Expo", "Supabase", "TypeScript"],
    problem:
      "Large-scale university and developer conferences suffer registration database bottlenecks, uncoordinated event schedule changes, and duplicate ticket claims during peak burst moments.",
    approach:
      "Architected a cross-platform mobile (Expo) and web (Next.js) platform backed by Supabase real-time broadcast channels and PostgreSQL row-level locks.",
    architecture: {
      flowSummary: "Mobile/Web Client → Next.js API → Supabase PostgreSQL (RLS) → Real-Time Broadcast Websocket → Attendees",
      layers: [
        {
          name: "Clients",
          role: "Web & Native Mobile Applications",
          tech: "Next.js / React Native Expo",
        },
        {
          name: "API & Auth",
          role: "Permission Verification & Registration Gateway",
          tech: "Next.js Edge Functions / Supabase Auth",
        },
        {
          name: "Database Layer",
          role: "Row-Level Locked Transactions",
          tech: "PostgreSQL with ACID Row Locks",
        },
        {
          name: "Broadcast Engine",
          role: "Sub-100ms Announcement Fan-out",
          tech: "Supabase Realtime WebSockets",
        },
      ],
    },
    challenges: [
      {
        title: "Burst Traffic Ticket Overselling",
        description:
          "Hundreds of attendees clicking register simultaneously could overrun seat quotas due to read-modify-write race conditions.",
        solution:
          "Utilized PostgreSQL strict serializable transactions with `SELECT ... FOR UPDATE` row-level locks, ensuring zero overbooking.",
      },
    ],
    decisions: [
      {
        technology: "Supabase Realtime",
        reason:
          "Delivered sub-100ms schedule updates and announcement broadcasts without building a custom WebSocket server cluster.",
      },
      {
        technology: "Next.js + Expo",
        reason:
          "Allowed sharing TypeScript types and business logic between mobile and web applications, cutting development overhead.",
      },
    ],
    results: [
      "Zero duplicate ticket bookings under simulated 500 concurrent registration requests.",
      "Sub-100ms live announcement broadcast propagation to all active attendees.",
    ],
    githubUrl: "https://github.com/AbhishekS04/signifiyaAppFinal",
    github_link: "https://github.com/AbhishekS04/signifiyaAppFinal",
    liveUrl: "https://signifiya.in",
    demo: "https://signifiya.in",
  },
  {
    id: "webscope",
    slug: "webscope",
    name: "WebScope",
    title: "WebScope",
    subtitle: "Dynamic Extraction & Schema Processing Pipeline",
    description:
      "Web intelligence platform — extraction, processing, and structured output from dynamic sources with failure-aware retry logic.",
    category: "System Architecture",
    role: "System Architect",
    year: "2024",
    timeline: "2024",
    status: "Archived",
    technologies: ["Next.js", "Node.js", "TypeScript", "Cheerio", "API Integration"],
    tech: ["Next.js", "Node.js", "API Integration"],
    problem:
      "Extracting structured business information from dynamic, frequently changing web portals breaks traditional rigid scraping scripts.",
    approach:
      "Designed a resilient extraction pipeline featuring adaptive DOM fallbacks, circuit-breaker rate limiters, and structured JSON output normalization.",
    architecture: {
      flowSummary: "Target Ingestion → Rate-Limited Crawler → Adaptive DOM Parser → Normalization Worker → Output API",
      layers: [
        {
          name: "Ingestion API",
          role: "Target URL Queue & Request Management",
          tech: "Node.js / Express Gateway",
        },
        {
          name: "Parser Layer",
          role: "Adaptive Schema Extraction",
          tech: "Cheerio / Fallback Selector Heuristics",
        },
        {
          name: "Output Normalizer",
          role: "JSON Validation & Deduplication",
          tech: "TypeScript / Zod Schemas",
        },
      ],
    },
    challenges: [
      {
        title: "DOM Structure Drift Resistance",
        description:
          "Target websites frequently modify CSS class names, causing standard selectors to return null.",
        solution:
          "Engineered multi-tier fallback selectors using semantic HTML tags and regex patterns to locate core content when class names change.",
      },
    ],
    decisions: [
      {
        technology: "Node.js & Cheerio",
        reason:
          "Provided blazing fast HTML parsing with minimal memory footprint compared to heavy headless browser emulators.",
      },
    ],
    results: [
      "99.2% successful schema extraction fidelity across targeted dynamic sources.",
      "Sub-800ms average parsing and structured payload generation time.",
    ],
    githubUrl: "https://github.com/tushardevx01/webscope",
    github_link: "https://github.com/tushardevx01/webscope",
    liveUrl: "https://webscope-three.vercel.app",
    demo: "https://webscope-three.vercel.app",
  },
  {
    id: "subscription-tracker",
    slug: "subscription-tracker",
    name: "Subscription Tracker",
    title: "Subscription Tracker",
    subtitle: "REST API for Subscription Lifecycle Management",
    description:
      "REST API for subscription lifecycle management — tracking, automated reminders, and auditable state transitions.",
    category: "Backend API",
    role: "Backend Engineer",
    year: "2024",
    timeline: "2024",
    status: "Archived",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Nodemailer"],
    tech: ["Node.js", "Express", "MongoDB"],
    problem:
      "Managing recurring subscription expenditures often leads to missed renewal cancellations and unpredictable monthly software spend.",
    approach:
      "Built a secure REST API with JWT authorization, automated background cron reminders, and projection math for quarterly expense forecasting.",
    architecture: {
      flowSummary: "REST Client → Express Router → JWT Auth Middleware → MongoDB Store → Background Cron Worker",
      layers: [
        {
          name: "REST Interface",
          role: "CRUD Endpoint Routing",
          tech: "Express.js / Helmet / CORS",
        },
        {
          name: "Security Guard",
          role: "Token Authentication & Role Verification",
          tech: "JSON Web Tokens (JWT) / bcrypt hashing",
        },
        {
          name: "Data Store",
          role: "Document Storage & TTL Indexing",
          tech: "MongoDB / Mongoose ODM",
        },
        {
          name: "Scheduler",
          role: "Automated Renewal Alert Dispatch",
          tech: "Node-Cron / Nodemailer Email Pipeline",
        },
      ],
    },
    challenges: [
      {
        title: "Duplicate Renewal Notification Prevention",
        description:
          "Cron runners executing concurrently across server instances could trigger duplicate email alerts to users.",
        solution:
          "Implemented database flag locks and date-hashed notification tokens, ensuring exactly-once alert delivery per billing cycle.",
      },
    ],
    decisions: [
      {
        technology: "MongoDB",
        reason:
          "Allowed flexible schema representations for varying subscription billing models (monthly, annual, usage-tiered).",
      },
    ],
    results: [
      "100% predictable at-most-once billing reminder dispatch.",
      "Sub-50ms API response time across authenticated subscription queries.",
    ],
    githubUrl: "https://github.com/tushardevx01/subscription-tracker",
    github_link: "https://github.com/tushardevx01/subscription-tracker",
    liveUrl: "https://subscription-tracker-jet.vercel.app/",
    demo: "https://subscription-tracker-jet.vercel.app/",
  },
];
