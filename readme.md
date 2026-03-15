# Tushar Kanti Dey Portfolio

Production-ready personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS.

[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://tushardevx01.tech)
[![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)](./Dockerfile)

## Overview

- Portfolio frontend: `/`, `/resume`, `/engineering-notes`
- APIs: contact form, SEO analyzer, health, and version
- Deployment: Vercel and Docker

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

## Features

- Contact form validation + anti-spam + email delivery
- Security headers (CSP, HSTS, COOP, CORP)
- Health and version endpoints
- CI pipeline for lint, type-check, build, audit, and deploy

## Local Development

1. Install dependencies:

```bash
npm ci
```

2. Create `/.env.local`:

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

Note: Docker build sets `DOCKER_BUILD=true` for standalone output.

## API Endpoints

| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| `/api/send` | POST | Contact form submission |
| `/api/analyze` | POST | SEO analysis for a provided HTTPS URL |
| `/api/health` | GET | Runtime health status and dependency checks |
| `/api/version` | GET | App version, environment, and build metadata |

## CI/CD

Workflow: `.github/workflows/ci.yml` with quality checks, build, security audit, Vercel deploy, and health verification.

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
