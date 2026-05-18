# Tushar Kanti Dey — Personal Portfolio

A production-grade portfolio built with Next.js, demonstrating clean architecture, performance optimization, and solid engineering practices.

---

## About This Project

This isn't a template or showcase site—it's a real engineering portfolio that doubles as a living example of scalable, maintainable architecture. It handles contact workflows, content management, and deployment with the same rigor as production applications.

The goal is straightforward: present work thoughtfully, share engineering insights through structured content, and ensure every layer of the stack reflects quality craftsmanship.

---

## Key Highlights

- **Scalable Architecture** — Modular separation of concerns across app routing, components, services, and utilities
- **TypeScript First** — Strict typing throughout, eliminating entire categories of runtime bugs
- **Performance Optimized** — App Router caching strategies, optimized images, minimal JavaScript shipped to clients
- **Production Security** — Hardened API routes, rate limiting, input sanitization, and secure contact workflows
- **Responsive & Animated** — Clean UI with thoughtful micro-interactions powered by Framer Motion
- **Docker Ready** — Containerized deployment for consistency across environments
- **Observability** — Structured logging, error tracking, and health check endpoints

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Next.js Route Handlers |
| **Infrastructure** | Docker, Alpine Linux, Redis (optional) |
| **Monitoring** | Structured Logging, Sentry (optional), Health Probes |

---

## Project Structure

```
src/
├── app/                 # Next.js App Router segments & API routes
├── components/          # Reusable UI components & layout sections
├── services/            # Business logic (contact, email workflows)
├── lib/                 # Core utilities (security, logging, env validation)
├── constant/            # Structured portfolio content & metadata
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── instrumentation.ts   # Runtime validation & bootstrapping
```

---

## Engineering Approach

**Clean Architecture**
- Strict separation between presentation, business logic, and infrastructure
- Single responsibility at every layer
- Dependency inversion where it matters

**Type Safety**
- Full TypeScript coverage
- Strict mode enabled
- Centralized type definitions for domain models

**Performance**
- Route-level caching strategies
- Server components by default
- Minimal client-side JavaScript
- Optimized image delivery

**Security**
- Environment validation on startup
- Centralized secret management (server-only)
- Content Security Policy headers
- Rate limiting on public APIs
- Input sanitization and honeypot protection

**Developer Experience**
- Clear error messages for troubleshooting
- Structured logging for debugging
- Health check endpoints for deployment validation

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

**1. Install dependencies:**
```bash
npm ci
```

**2. Configure environment:**
```bash
cp .env.example .env.local
```
Required variables: `QEV_API_KEY`, `EMAIL_FROM`, `EMAIL_PASSWORD`

Optional variables for production features: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `SENTRY_DSN`

**3. Start development server:**
```bash
npm run dev
```
Application will be available at `http://localhost:3000`

---

## Production Commands

**Lint & Type Check:**
```bash
npm run lint
npm run typecheck
```

**Build for Production:**
```bash
npm run build
```

**Run Production Server:**
```bash
npm run start
```

---

## Docker Deployment

**Build the image:**
```bash
docker build -t tushardevx01 .
```

**Run the container:**
```bash
docker run \
  --rm \
  --name tushardevx01 \
  -p 3000:3000 \
  --env-file .env.local \
  tushardevx01
```

**Using Docker Compose:**
```bash
docker compose up --build
```

The container is built on Alpine Linux and runs as a non-root user for security.

---

## Security & Performance

**API Hardening**
- Strict content-type validation
- Payload size limits
- Same-origin verification for sensitive operations
- Automatic rejection of malformed requests

**Rate Limiting**
- Distributed rate limiting with Redis backend in production
- Fallback to in-memory throttling in development
- Protects against abuse and DoS

**Response Optimization**
- API responses are intentionally minimal
- Production endpoints don't leak implementation details
- Health checks are fast and lightweight

**Observability**
- Structured error logging
- Optional Sentry integration for error tracking
- Health readiness endpoints for container orchestration

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/send` | Secure contact form submission |
| `POST` | `/api/analyze` | SEO analysis for content |
| `GET` | `/api/health` | Deployment readiness check |
| `GET` | `/api/version` | Deployment metadata |

All endpoints enforce request validation and rate limiting.

---

## Author

**Tushar Kanti Dey**  
Full-Stack Software Engineer focused on scalable systems, platform engineering, and production infrastructure.

- 📧 Email: [t.k.d.dey2033929837@gmail.com](mailto:t.k.d.dey2033929837@gmail.com)
- 🔗 GitHub: [@Tusharxhub](https://github.com/Tusharxhub)
- 📸 Instagram: [@tushardevx01](https://www.instagram.com/tushardevx01/)
- 🌐 Portfolio: [tushardevx01.tech](https://www.tushardevx01.tech)