<div align="center">

<img src="public/images/logo.png" alt="Tushar Kanti Dey Logo" width="76" height="76" />

# Tushar Kanti Dey

### Technical Portfolio & Engineering Dossier

A production-grade engineering portfolio and technical dossier built with **Next.js 16**, **React 19**, **Drizzle ORM**, and **Cloudflare R2**.  
Designed with clean architecture, strict type safety, defensive security practices, and high-performance server-side data fetching.

<p align="center">
  <a href="https://www.tushardevx01.tech"><strong>Explore Live Website »</strong></a>
  <br />
  <br />
  <a href="https://www.tushardevx01.tech">Live Website</a>
  ·
  <a href="https://www.tushardevx01.tech/resume">Interactive Resume</a>
  ·
  <a href="https://www.tushardevx01.tech/engineering-notes">Engineering Notes</a>
  ·
  <a href="https://www.tushardevx01.tech/credentials">Credentials</a>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Neon Postgres](https://img.shields.io/badge/Neon_Postgres-Serverless-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare_R2-Storage-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/r2/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

</div>

---

<div align="center">

## Architecture & Engineering Highlights

</div>

- **Next.js 16 & React 19**: App Router architecture utilizing Turbopack, Server Components, Route Handlers, and Edge Proxy middleware (`src/proxy.ts`).
- **Serverless PostgreSQL & Drizzle ORM**: Neon Serverless Postgres database integration with automated parallelized table bootstrapping, migrations, and Drizzle Studio support.
- **Request Deduplication**: `React.cache()` wrapping across all server data loaders (`getArticle`, `getAllCaseStudies`, `getCredentialBySlug`), eliminating duplicate queries between `generateMetadata()` and page component rendering.
- **Cloudflare R2 Object Storage**: S3-compatible asset management for verified certificates, degrees, and documents with dynamic MIME-type detection and streaming downloads.
- **Defensive Security & Rate Limiting**:
  - Sliding-window rate limiting backed by Upstash Redis with graceful in-memory fallback.
  - Timing-safe cryptographic comparison for API keys via `crypto.timingSafeEqual`.
  - Proxy-aware IP extraction prioritizing edge headers (`cf-connecting-ip`, `x-vercel-forwarded-for`).
  - SMTP CRLF header injection protection and strict Markdown HTML sanitization.
  - Strict Content Security Policy (CSP), frame denial, and nosniff headers.
- **Interactive UI & Observability**:
  - Interactive terminal emulator with command history and shell navigation.
  - Interactive PDF resume viewer powered by `react-pdf` and custom worker streaming.
  - Dynamic OpenGraph image generation (`@vercel/og`) for case studies and articles.
  - Structured application logging and health check probes.

---

<div align="center">

## Technology Stack

| Layer | Technologies |
|---|---|
| **Framework & Core** | Next.js 16 (App Router, Turbopack), React 19, TypeScript 5 |
| **Styling & Animation** | Tailwind CSS 3, Motion (`motion`), Lucide & React Icons |
| **Database & ORM** | Neon Serverless PostgreSQL (`@neondatabase/serverless`), Drizzle ORM |
| **Storage & Caching** | Cloudflare R2 (`@aws-sdk/client-s3`), Upstash Redis (`@upstash/redis`) |
| **Email & Delivery** | Nodemailer, QuickEmailVerification API |
| **Testing & Quality** | Vitest 5, React Testing Library, ESLint 10, TypeScript Strict Mode |

</div>

---

<div align="center">

## Project Structure

</div>

```text
src/
├── app/                     # Next.js App Router routes, layouts, and API handlers
│   ├── api/                 # Secure Route Handlers (contact, credentials, health, SEO)
│   ├── credentials/         # Verifiable credentials listing and detail pages
│   ├── engineering-notes/   # Technical articles and engineering deep dives
│   ├── projects/            # Canonical work & project showcases
│   ├── resume/              # Interactive PDF resume viewer
│   ├── work/                # Detailed system architecture case studies
│   ├── robots.ts            # Dynamic robots.txt generation
│   └── sitemap.ts           # Dynamic XML sitemap generator
├── components/              # Reusable UI sections, layouts, and interactive terminal
│   ├── common/              # Navbar, Footer, Background, and shared shells
│   ├── home/                # Hero, Terminal, Experience, Contact, Tech Stack
│   ├── resume/              # PDF document renderer and toolbar controls
│   └── ui/                  # Accessible UI primitives and animations
├── constant/                # Structured static data, project specs, and case study manifests
├── content/                 # Markdown engineering articles and technical notes
├── db/                      # Drizzle ORM schemas, DB client pool, and seed data
├── hooks/                   # Custom React hooks (keyboard shortcuts, media queries)
├── lib/                     # Core utilities: security, R2 storage, sanitization, cache loaders
├── services/                # Business logic services (contact email, verification)
├── tests/                   # Vitest unit & integration test suites
└── types/                   # Domain TypeScript definitions and Zod schemas
```

---

<div align="center">

## Getting Started

<p><strong>Prerequisites:</strong> Node.js 18+ (Node.js 20+ recommended) &nbsp;•&nbsp; npm / pnpm / yarn</p>

</div>

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tushardevx01/dossier.git
   cd dossier
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your PostgreSQL `DATABASE_URL`, email SMTP credentials, and optional Upstash Redis / Cloudflare R2 credentials.

4. **Initialize Database:**
   ```bash
   npm run db:generate           # Generate Drizzle migration files
   npm run db:migrate            # Apply migrations to database
   npm run db:seed               # Seed initial database credentials
   npm run db:seed:case-studies  # Seed architectural case studies
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

<div align="center">

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js development server with Turbopack |
| `npm run build` | Compile and generate optimized production bundle |
| `npm run start` | Start Next.js production server |
| `npm test` | Run Vitest test suite (`vitest --run`) |
| `npm run lint` | Run ESLint across codebase |
| `npm run typecheck` | Run TypeScript compiler check (`tsc --noEmit`) |
| `npm run db:generate` | Generate database migrations via Drizzle Kit |
| `npm run db:migrate` | Execute pending database migrations |
| `npm run db:seed` | Seed database with initial credentials |
| `npm run db:studio` | Launch Drizzle Studio database UI |

<p><em><strong>Tip for CI/Offline Builds:</strong> Set <code>SKIP_DB_BUILD=true npm run build</code> to compile the static application when a live database connection is unavailable.</em></p>

</div>

---

<div align="center">

## API Endpoints

| Method | Endpoint | Description | Auth / Security |
|---|---|---|---|
| `POST` | `/api/send` | Contact form submission with SMTP delivery | Rate limited (5/min), QEV validated, CRLF sanitized |
| `POST` | `/api/analyze` | Real-time content SEO and readability analysis | Rate limited, JSON schema validated |
| `GET` | `/api/credentials` | Fetch paginated, verified credentials list | Rate limited, public cache headers |
| `POST` | `/api/credentials` | Create credential & upload asset to Cloudflare R2 | Rate limited, `ADMIN_API_KEY` protected |
| `GET` | `/api/credentials/:id` | Fetch detailed credential information | Public |
| `PATCH` | `/api/credentials/:id` | Update credential fields or replace R2 asset | Rate limited, `ADMIN_API_KEY` protected |
| `DELETE` | `/api/credentials/:id` | Delete credential and remove R2 objects | Rate limited, `ADMIN_API_KEY` protected |
| `GET` | `/api/credentials/:id/download` | Stream certificate asset with dynamic MIME detection | Rate limited |
| `GET` | `/api/credentials/count` | Lightweight badge count query | Cached |
| `GET` | `/api/github` | Edge-cached GitHub activity and profile stats | Stale-while-revalidate cached |
| `GET` | `/api/health` | Service readiness probe and DB health check | Public |
| `GET` | `/api/version` | Deployment version and environment metadata | Public |
| `GET` | `/api/pdf-worker` | Dedicated asset server for `react-pdf` worker | Cached |

</div>

---

<div align="center">

## Security Practices

</div>

- **Strict CSP & Headers**: Mitigates XSS, clickjacking, and MIME-sniffing through comprehensive security headers configured in `next.config.ts`.
- **IP Spoofing Protection**: Validates reverse-proxy headers (`cf-connecting-ip`, `x-vercel-forwarded-for`) before falling back to untrusted client headers.
- **Timing-Safe Auth**: Admin API key verification utilizes `crypto.timingSafeEqual` with SHA-256 hashed buffers to defeat side-channel timing attacks.
- **Sanitized User Input**: Contact form inputs and markdown renderings are sanitized against CRLF header injections and malicious HTML tags using `sanitize-html`.
- **Sliding Window Rate Limiting**: Distributed rate-limiting powered by Upstash Redis prevents denial-of-service and brute-force attempts on mutation endpoints.

---

<div align="center">

## Author

### **Tushar Kanti Dey**
*Full-Stack & Cloud Infrastructure Engineer*

[🌐 Portfolio](https://www.tushardevx01.tech) &nbsp;•&nbsp; [🐙 GitHub](https://github.com/Tushardevx01) &nbsp;•&nbsp; [💼 LinkedIn](https://www.linkedin.com/in/tushardevx01/) &nbsp;•&nbsp; [📧 Email](mailto:thetushardev0@gmail.com)

---

## License

This project is open-source under the [MIT License](LICENSE).

</div>
