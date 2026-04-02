# Tushar Kanti Dey Portfolio

Production-focused Next.js portfolio with hardened API routes, centralized security utilities, and deployment-ready defaults.

## Project Structure

- `src/app/` route segments, metadata handlers, API endpoints
- `src/components/` UI sections, shared components, primitives
- `src/lib/` platform helpers (security, logging, analyzer, env, utils)
- `src/services/` server-side business services (contact, email)
- `src/constant/` curated content and metadata maps
- `public/` static assets and downloadable documents

## Local Setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

## Environment Variables

See `.env.example` for all keys.

Required:

- `QEV_API_KEY`
- `EMAIL_FROM`
- `EMAIL_PASSWORD`

Optional:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `LOG_LEVEL`
- `SENTRY_DSN`
- `ERROR_WEBHOOK_URL`
- `SERVICE_NAME`
- `BUILD_TIME`

## Production Commands

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## Docker

```bash
docker build -t tushardevx01-portfolio .
docker run --rm -p 3000:3000 --env-file .env.local tushardevx01-portfolio
```

## Security Posture

- Security headers and CSP are defined in `next.config.ts`.
- API routes use strict content-type and payload checks.
- Shared rate limiter lives in `src/lib/security/rateLimit.ts`.
- API responses are no-store and excluded from indexing.
- Sensitive env access is centralized in `src/lib/env.server.ts`.

## API Surface

- `POST /api/send` contact workflow
- `POST /api/analyze` SEO analysis
- `GET /api/health` runtime health summary
- `GET /api/version` deployment-safe version metadata
