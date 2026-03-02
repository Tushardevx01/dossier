# Tushar Kanti Dey — Portfolio

Production-grade personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js 16                           │
│                       App Router                            │
├─────────────────────────────────────────────────────────────┤
│  Routes          │  Services           │  Infrastructure    │
│  ───────         │  ────────           │  ──────────────    │
│  /               │  contact/           │  errors.ts         │
│  /resume         │    ├─ schema        │  logger.ts         │
│  /engineering-   │    ├─ service       │  env.server.ts     │
│    notes         │    └─ rateLimit     │  rateLimit.ts      │
│  /api/send       │  email/             │                    │
│  /api/health     │    ├─ transport     │                    │
│  /api/version    │    ├─ templates     │                    │
│                  │    └─ verification  │                    │
├─────────────────────────────────────────────────────────────┤
│              Upstash Redis │ Zod │ Nodemailer               │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Animation | Motion (Framer Motion) |
| Validation | Zod v4 |
| Rate Limiting | Upstash Redis (distributed) |
| Email | Nodemailer |
| Syntax Highlighting | Prism.js |

## Features

**Frontend**
- Responsive single-page portfolio with dedicated routes for resume and engineering notes
- Dynamic imports for code splitting
- SEO: metadata, sitemap, robots.txt, structured data (JSON-LD)

**Backend**
- Service layer architecture (business logic isolated from routes)
- Zod schema validation with type inference
- Distributed rate limiting via Upstash Redis (fallback to in-memory)
- Email verification via Quick Email Verification API
- Structured logging with request correlation IDs

**Production**
- Fail-fast startup validation (`instrumentation.ts`)
- Global and route-level error boundaries
- Health check endpoint (`/api/health`)
- Version endpoint (`/api/version`)
- CI/CD pipeline (`.github/workflows/ci.yml`)

## Project Structure

```
src/
├── app/                    # Routes and API endpoints
│   ├── api/
│   │   ├── send/           # Contact form submission
│   │   ├── health/         # Health check endpoint
│   │   └── version/        # Build info endpoint
│   ├── engineering-notes/  # Technical articles
│   ├── resume/             # Resume page
│   ├── error.tsx           # Route error boundary
│   └── global-error.tsx    # Root error boundary
├── components/             # UI components
│   ├── sections/           # Page sections (Hero, About, etc.)
│   ├── Cards/              # Card components
│   ├── common/             # Shared components (Navbar, Footer)
│   └── ui/                 # Primitives (Button, Badge, Card)
├── services/               # Business logic layer
│   ├── contact/            # Contact form processing
│   │   ├── contact.schema.ts
│   │   ├── contact.service.ts
│   │   └── contact.rateLimit.ts
│   └── email/              # Email infrastructure
│       ├── email.transport.ts
│       ├── email.templates.ts
│       ├── email.verification.ts
│       └── templates/
├── lib/                    # Utilities and infrastructure
│   ├── errors.ts           # Error classes and factory
│   ├── logger.ts           # Structured logging
│   ├── env.server.ts       # Environment validation
│   └── rateLimit.ts        # Rate limit utilities
├── constant/               # Static data (projects, skills, etc.)
├── data/                   # Engineering note content
├── hooks/                  # React hooks
├── types/                  # Type definitions
└── instrumentation.ts      # Startup validation
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/send` | POST | Contact form submission |
| `/api/health` | GET | Health check (status, uptime, dependency checks) |
| `/api/version` | GET | Build info (version, environment, git commit) |

### Health Check Response

```json
{
  "status": "healthy",
  "timestamp": "2026-03-02T10:00:00.000Z",
  "uptime": 3600,
  "checks": {
    "env": { "status": "pass" },
    "redis": { "status": "pass" }
  }
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`):

1. **Quality** — TypeScript check, ESLint
2. **Build** — Production build verification
3. **Security** — npm audit
4. **Deploy Preview** — Vercel preview deployment (PRs)
5. **Deploy Production** — Vercel production deployment (main branch)
6. **Health Check** — Post-deployment verification

## Security

- Input validation via Zod schemas
- XSS prevention in email templates (HTML escaping)
- Rate limiting (5 requests/minute per IP)
- Honeypot field for bot detection
- Origin validation (CSRF protection)
- Environment variables validated at startup

## Performance

- Static generation for content pages
- Dynamic imports for code splitting
- Node.js serverless for API endpoints
- Optimized CSS via Critters
- Minimal client-side JavaScript

## License

Private project. Not licensed for public reuse.
