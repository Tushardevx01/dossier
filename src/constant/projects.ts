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
    id: "aegis",
    slug: "aegis",
    name: "Aegis",
    title: "Aegis",
    subtitle: "Air-Gapped AIOps & Self-Healing Infrastructure",
    description:
      "Closed-loop, local-first SRE platform for detecting container failures, diagnosing incidents, and executing policy-controlled remediation.",
    category: "Distributed SRE / AIOps Platform",
    role: "Lead Systems Architect & Core Developer",
    year: "2026",
    timeline: "Feb 2026 — Present",
    status: "Active",
    technologies: ["TypeScript", "Python", "NestJS", "Kafka", "Docker", "MongoDB"],
    tech: ["TypeScript", "Python", "NestJS", "Kafka", "Docker"],
    problem:
      "Modern containerized systems fail through OOM conditions, timeouts, crash loops, port collisions, memory leaks, and permission errors. SRE teams require a closed-loop platform that detects, diagnoses, evaluates safety, remediates, and audits without external cloud dependencies.",
    approach:
      "Engineered an air-gapped, closed-loop pipeline. Docker Watchman captures death events and extracts recent logs into Kafka KRaft. A NestJS orchestrator invokes local Python embedding (all-MiniLM-L6-v2), FAISS similarity search, and an MLP classifier. Remediation passes a deterministic safety gate before bounded Dockerode execution and complete MongoDB audit logging.",
    architecture: {
      flowSummary: "Docker Event → Watchman → Kafka KRaft → NestJS Orchestrator → AI Engine (FAISS/MLP) → Safety Gate → Dockerode → MongoDB Audit",
      layers: [
        {
          name: "Docker Watchman",
          role: "Container Death Detection & Log Tailing",
          tech: "NestJS / Dockerode Events API",
        },
        {
          name: "Kafka KRaft",
          role: "Decoupled Event Streaming & Buffering",
          tech: "KafkaJS / KRaft Broker (ZooKeeper-Free)",
        },
        {
          name: "Control Plane Orchestrator",
          role: "Workflow Coordination & Safety Gate",
          tech: "NestJS 11 / TypeScript Modular Architecture",
        },
        {
          name: "Local AI Engine",
          role: "Log Embedding & Incident Classification",
          tech: "Python / SentenceTransformers (all-MiniLM-L6-v2) / FAISS / MLP",
        },
        {
          name: "Remediation Actuator",
          role: "Enum-Only Container Remediation",
          tech: "Dockerode / Docker Engine Unix Socket",
        },
        {
          name: "Audit & State Store",
          role: "Durable Event & Replay Dataset Persistence",
          tech: "MongoDB 7.x / Mongoose",
        },
      ],
    },
    challenges: [
      {
        title: "Automated Remediation Without RCE",
        description:
          "Giving an AI system unrestricted shell access creates a catastrophic vulnerability if arbitrary commands enter the execution path.",
        solution:
          "Constrained actions to a strict enum-only registry (RESTART_CONTAINER, STOP_CONTAINER, IGNORE) mapped directly to explicit Dockerode API calls.",
      },
      {
        title: "AI Uncertainty & False Diagnoses",
        description:
          "Probabilistic AI models can emit inaccurate failure diagnoses or low-confidence classifications on novel crash patterns.",
        solution:
          "Enforced a deterministic safety gate: requires confidence >= 0.85, risk == LOW, and action == RESTART_CONTAINER; otherwise defaults to human review.",
      },
      {
        title: "Event Decoupling & Latency Skew",
        description:
          "Burst container death spikes must not block on neural network inference or fail during transient compute pauses.",
        solution:
          "Decoupled event capture from diagnosis via Kafka KRaft topics, buffering incidents asynchronously with durable consumer groups.",
      },
      {
        title: "Complete System Auditability",
        description:
          "Automated remediation in production infrastructure requires absolute post-incident traceability for post-mortems.",
        solution:
          "Persisted raw crash logs, 384-dimensional embeddings, AI diagnosis records, safety gate outcomes, and Docker execution receipts in MongoDB.",
      },
    ],
    decisions: [
      {
        technology: "Kafka KRaft",
        reason:
          "Provides durable event streaming and decouples event capture from AI inference without requiring ZooKeeper.",
        tradeoff:
          "Higher operational footprint than in-memory message brokers, requiring structured broker configuration.",
        outcome:
          "Zero event loss during burst container failures and reliable asynchronous incident queues.",
      },
      {
        technology: "MongoDB",
        reason:
          "Flexible document persistence well-suited for varying incident schemas, embedding arrays, audit logs, and replay buffers.",
        tradeoff:
          "Lacks cross-document multi-table relational joins.",
        outcome:
          "High-speed write throughput for raw crash logs and structured JSON remediation plans.",
      },
      {
        technology: "Dockerode",
        reason:
          "Direct Unix socket communication with the Docker daemon without invoking shell subprocesses.",
        tradeoff:
          "Restricted to local host Docker socket permissions.",
        outcome:
          "Deterministic, injection-free container lifecycle actuation with zero shell execution.",
      },
      {
        technology: "SentenceTransformers + FAISS",
        reason:
          "Generates compact 384-dimensional vector embeddings locally and executes sub-millisecond similarity search over historical incidents.",
        tradeoff:
          "Requires local model weight storage and Python runtime sidecar.",
        outcome:
          "Completely air-gapped, zero-cloud semantic matching against known infrastructure incident patterns.",
      },
      {
        technology: "PyTorch MLP Classifier",
        reason:
          "Predicts deterministic failure classes (OOM, Timeout, Crash Loop, Port Collision, Permission, Memory Leak) with explicit confidence scores.",
        tradeoff:
          "Requires curated training dataset and offline model retraining on new failure modes.",
        outcome:
          "Calibrated probabilistic confidence metrics that directly drive the safety gate policy.",
      },
      {
        technology: "NestJS",
        reason:
          "Provides enterprise-grade TypeScript modularity, dependency injection, and clean separation between watchers, orchestrators, and actuators.",
        tradeoff:
          "Framework boilerplate and lifecycle structure compared to minimalist Express scripts.",
        outcome:
          "Highly testable, maintainable SRE control plane with clear domain boundaries.",
      },
    ],
    results: [
      "Local-First Architecture: 100% offline inference with zero runtime dependency on cloud AI or external LLM endpoints.",
      "Air-Gapped Operation: All detection, streaming, and model inference execute inside the local private Docker environment.",
      "Deterministic Guardrails: Remediation gated by confidence (>= 0.85), risk (LOW), and explicit enum bounds.",
      "Complete Audit Trail: Incidents, raw crash logs, 384-dim embeddings, and execution receipts persisted in MongoDB.",
      "Built-in Chaos Testing: Automated failure injection harness covering OOM, timeout, crash loop, and permission scenarios.",
    ],
    metrics: [
      {
        value: "01",
        label: "LOCAL-FIRST",
        description: "Zero runtime dependency on cloud AI or external APIs; all models run locally.",
      },
      {
        value: "02",
        label: "AIR-GAPPED",
        description: "Services operate inside a private Docker bridge with zero external egress.",
      },
      {
        value: "03",
        label: "POLICY-GATED",
        description: "Automatic remediation gated by confidence >= 0.85 and LOW risk thresholds.",
      },
      {
        value: "04",
        label: "AUDITABLE",
        description: "Immutable incident records, raw log tails, embeddings, and execution plans in MongoDB.",
      },
    ],
    learnings: [
      {
        index: "01",
        insight: "AI in infrastructure must be policy-bounded.",
        description:
          "AI should recommend actions, but deterministic code must decide whether the action executes. Unbounded AI is an operational risk.",
      },
      {
        index: "02",
        insight: "Decoupling is essential for resilient remediation.",
        description:
          "Docker event loops must never block on model inference. Streaming events through Kafka KRaft isolates failures between capture and compute.",
      },
      {
        index: "03",
        insight: "Air-gapped operation builds better systems.",
        description:
          "Relying solely on local embeddings (all-MiniLM-L6-v2) and FAISS eliminated cloud latency, external API costs, and data leakage concerns.",
      },
    ],
    githubUrl: "https://github.com/Tushardevx01/aegis",
    github_link: "https://github.com/Tushardevx01/aegis",
    liveUrl: "https://github.com/Tushardevx01/aegis",
    demo: "https://github.com/Tushardevx01/aegis",
  },
  {
    id: "carepulse",
    slug: "carepulse",
    name: "CarePulse",
    title: "CarePulse",
    subtitle: "Healthcare Operations & Appointment Workflow Engine",
    description:
      "Healthcare appointment and patient onboarding platform engineered with Next.js 14 App Router, server-side data operations, Appwrite backend services, centralized Zod validation, and Twilio SMS dispatch.",
    category: "Full-Stack Product Engineering",
    role: "Full-Stack Product Engineer",
    year: "2024",
    timeline: "2024 — 2025",
    status: "Production",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Appwrite",
      "Twilio",
      "Sentry",
      "Vercel",
    ],
    tech: ["Next.js 14", "TypeScript", "Appwrite", "Tailwind CSS", "Twilio"],
    problem:
      "Healthcare appointment systems involve distinct actors and complex state transitions. The engineering challenge was not simply displaying forms, but coordinating patient registration, clinical data, doctor selection, appointment requests, status transitions (Pending, Scheduled, Cancelled), SMS notifications, document storage, and administrative workflows in a unified, reliable product lifecycle.",
    approach:
      "Built a server-centric Next.js 14 application keeping the client experience simple while moving data operations into server actions. Structured the codebase with clean separation between UI forms, server actions, centralized Zod validation, Appwrite backend service configuration, and typed data models.",
    architecture: {
      flowSummary:
        "Patient UI / Admin Dashboard → Next.js 14 Server Actions → Zod Schema Validator → Appwrite BaaS (Users, DB, Storage) → Twilio SMS",
      layers: [
        {
          name: "Client Interface Layer",
          role: "Patient Onboarding & Admin Dashboard",
          tech: "Next.js 14 / React Hook Form / shadcn/ui / Tailwind CSS",
        },
        {
          name: "Validation Boundary",
          role: "Centralized Input Integrity & Schema Resolvers",
          tech: "Zod Schemas (User, Patient, Appointment)",
        },
        {
          name: "Server Action Engine",
          role: "Privileged Server-Side Mutations & Cache Invalidation",
          tech: "Next.js Server Actions (appointment.actions.ts, patient.actions.ts)",
        },
        {
          name: "Backend Service Platform",
          role: "Document DB, User Identity & Identification Vault",
          tech: "Appwrite BaaS (Users, Databases, Storage)",
        },
        {
          name: "Notification Bridge",
          role: "Automated SMS Updates for Schedule & Cancellation",
          tech: "Twilio SMS via Appwrite Messaging",
        },
      ],
    },
    challenges: [
      {
        title: "Multi-Step Patient Onboarding",
        description:
          "Patient creation cannot be completed in a single flat form due to identity separation.",
        solution:
          "Coordinated initial user creation via Appwrite Users, transferring the generated userId to `/patients/[userId]/register` for full medical history and consent capture.",
      },
      {
        title: "Complex Healthcare Form Validation",
        description:
          "Intake forms collect varied clinical data types: E.164 phone formats, date-of-birth constraints, insurance policies, and legal consent checkboxes.",
        solution:
          "Centralized all runtime validation in `lib/validation.ts` using Zod schemas, enforcing strict client-side validation before server action invocation.",
      },
      {
        title: "Polymorphic Appointment State Management",
        description:
          "A single appointment form modal services create, schedule, and cancel workflows with differing input requirements.",
        solution:
          "Dynamically generated validation schemas via `getAppointmentSchema(type)` to conditionally require cancellation justification or schedule date fields.",
      },
      {
        title: "External Service Coordination",
        description:
          "Synchronizing Next.js App Router, Appwrite document collections, file storage buckets, Twilio SMS messaging, and Sentry telemetry.",
        solution:
          "Encapsulated third-party operations within typed server actions with try/catch exception routing to Sentry and instant cache revalidation.",
      },
    ],
    decisions: [
      {
        technology: "Next.js 14 App Router",
        reason:
          "Provides modern React component architecture with explicit server and client boundaries, native layout nesting, and file-based routing.",
        tradeoff:
          "Requires disciplined demarcation between server-side data loaders and interactive client components.",
        outcome:
          "Streamlined full-stack architecture with zero REST API boilerplate.",
      },
      {
        technology: "Server Actions",
        reason:
          "Executes Appwrite SDK mutations and administrative API calls server-side, eliminating custom endpoint routes and securing credentials.",
        tradeoff:
          "Client components require structured state management during asynchronous mutations.",
        outcome:
          "Secure mutation pipeline keeping Appwrite API keys and Twilio credentials isolated from the browser.",
      },
      {
        technology: "Appwrite BaaS",
        reason:
          "Delivers managed user authentication, document collections, encrypted document file storage, and SMS messaging without custom database operations.",
        tradeoff:
          "Coupled to Appwrite's document modeling conventions and SDK interfaces.",
        outcome:
          "Rapid, reliable full-stack execution covering authentication, database, storage, and notifications.",
      },
      {
        technology: "Zod",
        reason:
          "Single source of truth for runtime input validation and automatic TypeScript type inference across client forms and server actions.",
        tradeoff:
          "Schemas must be maintained alongside changing product requirements.",
        outcome:
          "Zero runtime type coercion vulnerabilities and instantaneous inline form validation feedback.",
      },
      {
        technology: "React Hook Form",
        reason:
          "Handles 20+ clinical inputs and masked fields without triggering unnecessary global re-renders.",
        tradeoff:
          "Requires controlled component wrappers and integration adapters with the Zod resolver.",
        outcome:
          "Highly responsive form interfaces with accessible keyboard navigation and state isolation.",
      },
    ],
    results: [
      "8+ Core Technologies integrated across full-stack Next.js, Appwrite, Twilio, and Sentry.",
      "3 Strict Appointment States: PENDING, SCHEDULED, and CANCELLED with zero ambiguous statuses.",
      "2 Primary User Flows: Patient onboarding portal and passkey-gated admin management dashboard.",
      "Fully responsive multi-device execution spanning desktop, tablet, and mobile viewports.",
    ],
    githubUrl: "https://github.com/Tushardevx01/carepulse",
    github_link: "https://github.com/Tushardevx01/carepulse",
    liveUrl: "https://carepulse-brown-omega.vercel.app/",
    demo: "https://carepulse-brown-omega.vercel.app/",
  },
  {
    id: "fenix",
    slug: "fenix",
    name: "Fenix",
    title: "Fenix",
    subtitle: "Real-Time Video Collaboration Platform",
    description:
      "Real-time video calling platform engineered around authenticated meeting lifecycle management, room access, device state, participant presence, media controls, and responsive call layouts using Next.js, Clerk, and Stream Video SDK.",
    category: "Real-Time Systems",
    role: "Real-Time Systems Architect & Frontend Engineer",
    year: "2024",
    timeline: "2024 — 2025",
    status: "Production",
    technologies: [
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
    ],
    tech: ["Next.js", "TypeScript", "Stream Video", "Clerk", "Tailwind CSS"],
    problem:
      "Building a video calling interface is not only about rendering a video grid. The application must coordinate authentication, meeting creation, room access, device state, participant presence, call lifecycle, and real-time media while remaining responsive across devices.",
    approach:
      "Engineered a decoupled real-time architecture integrating Clerk for session identity, Next.js App Router for application structure, Stream Node SDK for server-side token generation, and Stream Video React SDK for real-time media and participant state.",
    architecture: {
      flowSummary:
        "User Browser → Clerk Auth → Next.js App Router → Server Action (Stream Node SDK Token Provider) → Stream Video Client → Active Meeting Room",
      layers: [
        {
          name: "Identity & Authentication",
          role: "User Session Verification & Auth Routing",
          tech: "Clerk Authentication / Next.js Middleware",
        },
        {
          name: "Application & Interface",
          role: "Meeting Dashboard, Schedule & Room UI",
          tech: "Next.js App Router / React / Tailwind CSS / Radix UI",
        },
        {
          name: "Server Token Issuance",
          role: "Cryptographic Stream Token Generation",
          tech: "Stream Node SDK / Next.js Server Actions",
        },
        {
          name: "Real-Time Media Engine",
          role: "Call Transport, Device Control & Participant State",
          tech: "@stream-io/video-react-sdk / WebRTC Managed SFU",
        },
      ],
    },
    challenges: [
      {
        title: "Authenticated Real-Time Access",
        description:
          "Meeting URLs must not automatically expose video streams or grant unverified room entry.",
        solution:
          "Evaluated Clerk authentication before initializing the Stream Video client and enforced invited-member access checks before call admission.",
      },
      {
        title: "Device State Before Join",
        description:
          "Entering calls without previewing camera or microphone state causes immediate disruption.",
        solution:
          "Provided a dedicated pre-join MeetingSetup stage featuring live VideoPreview, DeviceSettings dialogs, and Stream camera/mic toggles.",
      },
      {
        title: "Real-Time Call State Synchronization",
        description:
          "The client cannot assume a meeting room is immediately ready or accessible.",
        solution:
          "Inspected call state hooks to handle loading states, future scheduled meetings, already-ended calls, and unauthorized access gracefully.",
      },
      {
        title: "Multiple Dynamic Call Layouts",
        description:
          "Different collaboration contexts require distinct presentation modes without dropping active media connections.",
        solution:
          "Integrated in-flight layout switching between Paginated Grid, Speaker Left, and Speaker Right layouts with responsive participant drawers.",
      },
    ],
    decisions: [
      {
        technology: "Clerk Authentication",
        reason:
          "Delegates user identity and session management rather than maintaining custom credential stores and token refresh routines.",
        tradeoff:
          "Application access is coupled to an external identity provider and its availability.",
        outcome:
          "Robust, multi-provider authentication with instant session resolution across meeting routes.",
      },
      {
        technology: "Stream Video SDK",
        reason:
          "Provides production-grade real-time video infrastructure without building custom WebRTC signaling and SFU servers.",
        tradeoff:
          "Meeting models and call parameters conform to Stream Video SDK contracts.",
        outcome:
          "Rapid delivery of high-reliability video calls, speaking indicators, and call diagnostics.",
      },
      {
        technology: "Next.js App Router",
        reason:
          "Consolidates application routes, dynamic meeting parameters, and server actions for token generation into a single framework.",
        tradeoff:
          "Requires strict separation between server-side token generation and client-side real-time media hooks.",
        outcome:
          "Modular codebase with isolated secret keys and zero REST boilerplate.",
      },
      {
        technology: "Componentized Call UI",
        reason:
          "Isolates setup, active room orchestration, controls, participant drawers, and modals into distinct components.",
        tradeoff:
          "Requires coordinated state management across multiple nested components and SDK hooks.",
        outcome:
          "Clean separation between device preview, active media controls, and call diagnostic panels.",
      },
    ],
    results: [
      "3 Call Modes supported: Instant meetings, meeting link joins, and scheduled calendar calls.",
      "3 Call Layouts: In-call switching between Paginated Grid, Speaker Left, and Speaker Right.",
      "100% Authenticated Access: Enforcing Clerk sessions and server-signed Stream tokens.",
      "Pre-Join Device Control: Live camera preview and microphone toggles verified before entering.",
    ],
    githubUrl: "https://github.com/Tushardevx01/Fenix",
    github_link: "https://github.com/Tushardevx01/Fenix",
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
