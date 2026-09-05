import type { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: "runstack",
    slug: "runstack",
    name: "RunStack",
    title: "RunStack",
    subtitle: "Distributed Job Execution & Application Orchestration Platform",
    description:
      "Lightweight distributed job execution and application orchestration platform built in Go, designed for deterministic scheduling, container isolation, and execution-fenced failure recovery.",
    category: "Distributed Systems & Infrastructure",
    role: "Lead Systems Architect & Core Developer",
    year: "2026",
    timeline: "Jan 2026 — Present",
    status: "Active Development",
    technologies: ["Go", "Docker / Podman", "HTTP", "PostgreSQL", "Linux"],
    tech: ["Go", "Docker"],
    problem:
      "Running work across multiple machines introduces critical distributed coordination challenges: node dropouts during execution, worker starvation, stale workers reporting outdated results after recovery, and state desynchronization between desired application state and physical runtime state.",
    approach:
      "Designed a decoupled, control-plane-driven cluster topology. A trusted Control Plane owns authoritative state, deterministic round-robin scheduling, and reconciliation. Thin Go agents discover host nodes, claim tasks, isolate executions within Docker or Podman, and enforce ExecutionID fencing to reject stale results.",
    architecture: {
      flowSummary: "CLI / HTTP → Control Plane (Registries & Schedulers) → Agent (Heartbeat & Poll) → Docker / Podman",
      layers: [
        {
          name: "Client / Operator Layer",
          role: "Workload Ingestion & Application Specs",
          tech: "CLI / HTTP Client REST API",
        },
        {
          name: "Control Plane API",
          role: "Admission, Request Routing & Validation",
          tech: "Go HTTP Server / net/http Router",
        },
        {
          name: "Authoritative Registries",
          role: "Centralized State Management",
          tech: "In-Memory sync.RWMutex (V1) / PostgreSQL V2 Foundation",
        },
        {
          name: "Job & Instance Schedulers",
          role: "Deterministic Work Placement",
          tech: "Sorted Online Node Ring / Persistent Round-Robin Cursor",
        },
        {
          name: "Application Reconciler",
          role: "Desired vs Actual State Convergence",
          tech: "Go Reconciler Loop / Instance Replacement Watchdog",
        },
        {
          name: "Node Agent",
          role: "Host Daemon, Heartbeat & Polling Worker",
          tech: "Go Daemon / Registration & Claim Loop",
        },
        {
          name: "Container Runtime",
          role: "Isolated Task & Instance Execution",
          tech: "Docker / Podman CLI & Container API",
        },
      ],
    },
    challenges: [
      {
        title: "Node Failure & Recovery",
        description:
          "Compute instances can disappear while jobs are assigned or actively running, risking stalled tasks or duplicate concurrent execution.",
        solution:
          "Engineered heartbeat monitoring (1000ms loop) with offline detection. Stalled jobs transition through a grace period back to PENDING for rescheduling.",
      },
      {
        title: "Stale Execution Results",
        description:
          "A recovered job reassigned to a new worker must strictly reject late-arriving results from an older partitioned execution attempt.",
        solution:
          "Separated logical JobID from attempt ExecutionID. The Control Plane verifies the active ExecutionID and rejects stale submissions.",
      },
      {
        title: "Concurrent State Mutation",
        description:
          "Claims, results, heartbeat updates, and scheduler operations must remain consistent without race conditions under parallel agent traffic.",
        solution:
          "Protected registry transitions with explicit state validation and sync.RWMutex read/write locking, verified with `go test -race`.",
      },
      {
        title: "Bounded Retries",
        description:
          "Persistent infrastructure failures or failing application binaries could trigger infinite reschedule and retry loops.",
        solution:
          "Enforced a strict retry budget (`Attempts <= MaxRetries ? PENDING : FAILED`), bounding total lifetime executions to MaxRetries + 1.",
      },
    ],
    decisions: [
      {
        technology: "Go",
        reason:
          "Chosen for its first-class concurrency primitives, zero-dependency single binary deployment, and low memory overhead.",
        tradeoff:
          "Requires manual lifecycle management, goroutine budgeting, and explicit state synchronization.",
        outcome:
          "Predictable microsecond state coordination and clean portable agent binaries across heterogeneous Linux hosts.",
      },
      {
        technology: "In-Memory Registries (V1)",
        reason:
          "Keeps initial runtime architecture lightweight, fast, and completely free of external database dependencies.",
        tradeoff:
          "Control Plane restarts forfeit active in-memory state, requiring node and agent re-registration.",
        outcome:
          "Clean deterministic state machine foundations that map cleanly to durable PostgreSQL storage in V2.",
      },
      {
        technology: "HTTP Polling Architecture",
        reason:
          "Allows agents to operate behind NAT firewalls without requiring inbound listening ports or public IP addresses.",
        tradeoff:
          "Execution dispatch latency is bounded by polling intervals rather than immediate push notifications.",
        outcome:
          "Simple, resilient network boundary requiring only outbound egress from worker agents to the Control Plane.",
      },
      {
        technology: "ExecutionID Fencing",
        reason:
          "Distinguishes the permanent logical job definition from individual physical execution attempts.",
        tradeoff:
          "Demands per-attempt execution tracking, state generation counters, and rigorous fencing checks on completion.",
        outcome:
          "Eliminates split-brain result corruption without requiring complex distributed consensus protocols.",
      },
      {
        technology: "Deterministic Round-Robin",
        reason:
          "Ensures predictable, reproducible work distribution across all healthy ONLINE nodes via sorted IDs and persistent cursor.",
        tradeoff:
          "V1 does not factor in dynamic CPU/RAM utilization when choosing the target worker node.",
        outcome:
          "Deterministic testability and zero starvation across heterogeneous worker nodes.",
      },
      {
        technology: "PostgreSQL V2 Foundation",
        reason:
          "Provides ACID transactions, row-level locking (`SELECT FOR UPDATE`), and SQL-level execution fencing for durable state.",
        tradeoff:
          "Introduces an external database dependency and connection pool lifecycle management.",
        outcome:
          "Durable persistence and rock-solid concurrent locking for production cluster state.",
      },
    ],
    results: [
      "Authoritative Control Plane: all job and instance state transitions are centrally validated and controlled.",
      "Execution-Aware Fencing: stale results from orphaned or delayed executions are deterministically rejected.",
      "Deterministic Scheduling: online nodes are sorted and assigned via a persistent round-robin cursor.",
      "Bounded Failure Recovery: node heartbeats and execution timeouts return orphaned work to the scheduling pool.",
      "Race-Safe Registries: synchronized state machines verified clean with Go race detector (`go test -race`).",
    ],
    metrics: [
      {
        value: "01",
        label: "CONTROL PLANE",
        description: "Authoritative central state engine with explicit state transition validation and rejection of invalid states.",
      },
      {
        value: "02",
        label: "EXECUTION FENCING",
        description: "Unique ExecutionID per attempt guarantees stale results from severed workers are rejected upon node recovery.",
      },
      {
        value: "03",
        label: "BOUNDED RETRIES",
        description: "Strict Attempts <= MaxRetries budget prevents infinite failure retry loops across partitioned workers.",
      },
      {
        value: "04",
        label: "DETERMINISTIC",
        description: "Sorted online node ring with persistent cursor prevents starvation and provides predictable assignment.",
      },
    ],
    learnings: [
      {
        index: "01",
        insight: "Execution identity must be decoupled from job identity.",
        description:
          "In distributed environments, assuming JobID == Execution leads directly to result corruption when nodes stall. Execution fencing is essential.",
      },
      {
        index: "02",
        insight: "Deterministic scheduling simplifies failure reasoning.",
        description:
          "Sorting online node keys and maintaining a persistent cursor eliminates non-deterministic scheduling bugs during automated cluster recovery.",
      },
      {
        index: "03",
        insight: "Explicit trade-offs create durable architectures.",
        description:
          "Prototyping state transitions in-memory with strict mutexes established the exact transactional boundaries needed for PostgreSQL V2.",
      },
    ],
    githubUrl: "https://github.com/Tushardevx01/Runstack",
    github_link: "https://github.com/Tushardevx01/Runstack",
    liveUrl: "https://github.com/Tushardevx01/Runstack",
    demo: "https://github.com/Tushardevx01/Runstack",
  },
  {
    id: "project-aegis",
    slug: "project-aegis",
    name: "Aegis",
    title: "Aegis",
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
