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
# Build with the agreed image name
docker build -t tushardevx01 .

# Run app on host port 9999 -> container port 3000
docker run --rm --name tushardevx01 -p 9999:3000 --env-file .env.local tushardevx01

# Optional: push to Docker Hub
docker tag tushardevx01 tushardevx01/tushardevx01:latest
docker push tushardevx01/tushardevx01:latest
```

The container listens on port `3000` internally. Use `9999:3000` to expose it on host port `9999`.

For Docker Compose, use:

```bash
docker compose up --build
```

Current compose config maps host `3000` to container `3000`.

## Security Posture

- Security headers and CSP are defined in `next.config.ts`.
- API routes use strict content-type and payload checks.
- Shared rate limiter lives in `src/lib/security/rateLimit.ts` and prefers Redis in production.
- API responses are no-store and excluded from indexing.
- Sensitive env access is centralized in `src/lib/env.server.ts` and validated through `src/instrumentation.ts`.
- Public request origin checks for the contact form are same-origin only.

## Deployment Notes

- The Docker image runs as a non-root user.
- Docker builds force webpack for Next.js stability on Alpine.
- `/api/health` is intentionally minimal and does not expose internal dependency state in production.
- `/api/version` is public but noindex and cache-disabled.

## Threat Model

- Public APIs are rate-limited and size-limited.
- Contact submissions use same-origin validation plus honeypot protection.
- JSON-LD serialization is centralized to avoid unsafe ad hoc script rendering.
- User-facing errors should remain generic; detailed traces stay in logs.

## API Surface

- `POST /api/send` contact workflow
- `POST /api/analyze` SEO analysis
- `GET /api/health` runtime readiness summary
- `GET /api/version` deployment-safe version metadata
