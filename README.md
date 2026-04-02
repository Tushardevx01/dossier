# Tushar Kanti Dey

Portfolio and engineering showcase built with Next.js, TypeScript, Tailwind CSS, and a server-first architecture.

## Architecture

The project is structured as a Next.js App Router application with clear separation between UI, server routes, shared utilities, and data/constants.

- `src/app/` contains route segments, metadata, and API routes.
- `src/components/` contains reusable UI, shared primitives, and section-level composition.
- `src/lib/` contains utilities, validation, structured logging, SEO analysis, and security-sensitive helpers.
- `src/services/` contains server-side business logic for contact, email, and supporting workflows.
- `src/constant/` contains content and stack metadata used across the site.
- `public/` contains static assets, docs, and media.

## Setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

## Environment Variables

Required server-only variables:

- `QEV_API_KEY` - QuickEmailVerification API key
- `EMAIL_FROM` - sender mailbox used for contact mail delivery
- `EMAIL_PASSWORD` - app password or SMTP password for the sender mailbox

Optional variables:

- `UPSTASH_REDIS_REST_URL` - distributed rate limiting backend
- `UPSTASH_REDIS_REST_TOKEN` - distributed rate limiting backend token
- `LOG_LEVEL` - logging verbosity (`debug`, `info`, `warn`, `error`)
- `SENTRY_DSN` - optional error tracking endpoint
- `ERROR_WEBHOOK_URL` - optional webhook sink for error events
- `SERVICE_NAME` - monitoring service label

## Production Run

Local production-style run:

```bash
npm run build
npm run start
```

Docker build and run:

```bash
docker build -t tushardevx01-portfolio .
docker run --rm -p 3000:3000 --env-file .env.local tushardevx01-portfolio
```

## Security Notes

- Server-only secrets are validated on startup.
- Public API routes use input validation, payload limits, and no-store caching.
- Contact submission uses origin checks, content-type validation, honeypot protection, and rate limiting.
- SEO analysis blocks localhost and private network targets and now validates redirect targets before following them.
- Public API responses are marked `noindex`.

## Deployment Notes

- Docker uses standalone output and a non-root runtime user.
- Vercel compatibility is preserved through the standard Next.js App Router build.
- Security headers are configured in `next.config.ts`.
- Health and version endpoints are available for orchestration and deployment checks.

## Available Endpoints

- `GET /api/health`
- `GET /api/version`
- `POST /api/send`
- `POST /api/analyze`
