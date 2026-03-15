# Tushar Kanti Dey Portfolio

Production-ready personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS.

[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://tushardevx01.tech)
[![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)](./Dockerfile)

## Overview

This project includes:

- A modern portfolio frontend (`/`, `/resume`, `/engineering-notes`)
- Contact form backend with validation, rate limiting, email verification, and email delivery
- SEO analyzer API (`/api/analyze`) that audits HTTPS pages
- Production-focused operations: health/version endpoints, structured logging, CI/CD, and Docker support

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Motion |
| Validation | Zod |
| Email | Nodemailer + React Email |
| Rate Limiting | Upstash Redis (with fallback paths in code) |
| HTML Parsing | Cheerio |
| Deployment | Vercel, Docker |

## Key Features

- Responsive portfolio UI with dedicated resume and notes routes
- SEO foundations: sitemap, robots, Open Graph image routes, structured data
- Contact API with schema validation, anti-spam checks, and request tracing
- Health endpoint (`/api/health`) with env/redis/monitoring checks
- Version endpoint (`/api/version`) with build and git metadata
- Security headers via `next.config.ts` (CSP, HSTS, COOP, CORP, permissions policy)
- CI pipeline for lint, type-check, build, audit, deploy, and post-deploy health checks

## Project Structure

```text
src/
  app/
    api/
      analyze/
      health/
      send/
      version/
    engineering-notes/
    resume/
    (main)/
  components/
    Cards/
    common/
    sections/
    ui/
  services/
    contact/
    email/
  lib/
    seo-analyzer/
    env.server.ts
    logger.ts
    monitoring.ts
    rateLimit.ts
  hooks/
  data/
  constant/
  types/
  instrumentation.ts
```

## Local Development

1. Install dependencies:

```bash
npm ci
```

2. Create `/.env.local` with required keys:

```env
QEV_API_KEY=your_quickemailverification_api_key
email_from=your_sender_email
email_password=your_email_password
```

Optional:

```env
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
LOG_LEVEL=info
```

3. Start dev server:

```bash
npm run dev
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Docker

Build and run:

```bash
docker build -t tushardevx01 .
docker run -p 3000:3000 --env-file .env.local tushardevx01
```

Or use Compose:

```bash
docker-compose up -d
```

Notes:

- Docker build sets `DOCKER_BUILD=true` and enables Next.js standalone output.
- If Open Graph image builds fail in containers, avoid emoji in `ImageResponse` JSX and use local badges/shapes.

## API Endpoints

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/api/send` | POST | Contact form submission |
| `/api/analyze` | POST | SEO analysis for a provided HTTPS URL |
| `/api/health` | GET | Runtime health status and dependency checks |
| `/api/version` | GET | App version, environment, and build metadata |

## CI/CD

Workflow: `.github/workflows/ci.yml`

1. Code quality checks (`npm run lint`, `tsc --noEmit`)
2. Production build (`npm run build`)
3. Security audit (`npm audit --audit-level=high`)
4. Vercel preview deploy for pull requests
5. Vercel production deploy on `main`
6. Post-deploy checks for `/api/health` and `/api/version`

## Environment Variables

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `QEV_API_KEY` | Yes | QuickEmailVerification API key |
| `email_from` | Yes | Sender email used by contact flow |
| `email_password` | Yes | SMTP app password or email password |
| `UPSTASH_REDIS_REST_URL` | No | Upstash REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash REST token |
| `LOG_LEVEL` | No | Logger level (`debug`, `info`, `warn`, `error`) |
| `DOCKER_BUILD` | Build only | Enables standalone output in Docker builds |

## License

Private project. Not licensed for public reuse.
