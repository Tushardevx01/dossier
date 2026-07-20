# Tushar Kanti Dey — Personal Portfolio

A production-grade portfolio built with Next.js, showcasing clean architecture, strong engineering practices, and a focus on performance, security, and maintainability.



## Overview

This project is more than a portfolio website; it is a practical demonstration of scalable software design in a real-world application. It combines content delivery, contact workflows, deployment readiness, and observability in a single, well-structured codebase.

The objective is to present professional work clearly, share engineering insights through structured content, and maintain a high standard of quality across every layer of the stack.



## Highlights

- **Scalable architecture** with clear separation of concerns across routing, components, services, and utilities
- **TypeScript-first development** for improved reliability and reduced runtime errors
- **Performance-oriented implementation** with optimized rendering, caching strategies, and minimal client-side overhead
- **Production-ready security** through input validation, rate limiting, sanitization, and hardened API routes
- **Responsive and polished UI** with subtle animations and a modern user experience
- **Containerized deployment** for consistent environments and streamlined delivery
- **Observability built in** through structured logging, health checks, and error handling

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Next.js Route Handlers |
| **Database** | Neon Serverless Postgres, Drizzle ORM |
| **Infrastructure** | Docker, Alpine Linux, Upstash Redis |
| **Testing** | Vitest, React Testing Library |
| **Monitoring** | Structured logging, Sentry (optional), health probes |

---

## Project Structure

```text
src/
├── app/                 # App Router segments and API routes
├── components/          # Reusable UI components and page sections
├── services/            # Business logic for contact and email workflows
├── lib/                 # Shared utilities, security, logging, and env validation
├── constant/            # Structured content, metadata, and portfolio data
├── hooks/               # Custom React hooks
└── types/               # TypeScript interfaces and domain models
```

---

## Engineering Approach

### Clean Architecture
- Clear separation between presentation, business logic, and infrastructure
- Single responsibility across components and services
- Consistent design boundaries for long-term maintainability

### Type Safety
- Full TypeScript coverage with strict configuration enabled
- Centralized domain types to reduce ambiguity and runtime failures

### Performance
- Route-level caching where appropriate
- Server-first rendering with minimal client-side JavaScript
- Optimized image delivery and efficient asset handling

### Security
- Startup-time environment validation
- Server-only secret handling
- CSP headers, request validation, rate limiting, and input sanitization

### Developer Experience
- Clear troubleshooting paths and actionable error messages
- Structured logging for debugging and diagnostics
- Health endpoints for deployment verification

---

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm or yarn

### Local Development

1. Install dependencies:
   ```bash
   npm ci
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Required variables include `DATABASE_URL`, `QEV_API_KEY`, `EMAIL_FROM`, and `EMAIL_PASSWORD`.

   Optional production variables include `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `SENTRY_DSN`.

3. Set up the database:
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

---

## Production Commands

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

---

## Database Management

The project uses Drizzle ORM with Neon Serverless Postgres for type-safe database interactions.

```bash
npm run db:generate   # Generate migration files based on schema changes
npm run db:migrate    # Run pending migrations against the database
npm run db:seed       # Seed the database with initial data
npm run db:studio     # Open Drizzle Studio to view and manage data
```

---

## Docker Deployment

Build the image:
```bash
docker build -t tushardevx01 .
```

Run the container:
```bash
docker run \
  --rm \
  --name tushardevx01 \
  -p 3000:3000 \
  --env-file .env.local \
  tushardevx01
```

Or use Docker Compose:
```bash
docker compose up --build
```

The container is built on Alpine Linux and runs as a non-root user to improve security.

---

## Security and Performance

### API Hardening
- Strict content-type validation
- Payload size limits
- Same-origin verification for sensitive operations
- Automatic rejection of malformed requests

### Rate Limiting
- Distributed rate limiting with Redis in production
- In-memory fallback during development
- Protection against misuse and denial-of-service attempts

### Response Optimization
- Minimal API response payloads
- Reduced implementation detail exposure in production
- Fast, lightweight health checks

### Observability
- Structured error logging
- Optional Sentry integration for monitoring
- Readiness endpoints for container orchestration

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

## About the Author

**Tushar Kanti Dey**  
Full-Stack Software Engineer focused on scalable systems, platform engineering, and production infrastructure.

- 📧 Email: [thetushardev0@gmail.com](mailto:thetushardev0@gmail.com)
- 🔗 GitHub: [@](https://github.com/)
- 📸 Instagram: [@tushardevx01](https://www.instagram.com/tushardevx01/)
- 🌐 Portfolio: [tushardevx01.tech](https://www.tushardevx01.tech)

