<div align="center">

<img src="public/images/logo.png" alt="Tushar Kanti Dey Logo" width="80" height="80" />

# Dossier — Engineering Portfolio & Technical Archive

A production-grade full-stack engineering portfolio and technical archive built with **Next.js 16**, **React 19**, **Drizzle ORM**, **Neon PostgreSQL**, and **Cloudflare R2**.  
Engineered with strict type safety, zero-leak server boundaries, automated defense-in-depth security, and sub-second page performance.

[**Explore Live Demo »**](https://www.tushardevx01.tech)

[![Live Site](https://img.shields.io/badge/Production-tushardevx01.tech-0A84FF?style=flat-square&logo=vercel&logoColor=white)](https://www.tushardevx01.tech)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232a?style=flat-square&logo=react&logoColor=61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x_Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-1.0-C5F74F?style=flat-square&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![Neon Postgres](https://img.shields.io/badge/Neon-Serverless_Postgres-00E599?style=flat-square&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare_R2-Object_Storage-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/r2/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0_Passing-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>



## 📑 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Environment Configuration](#-environment-configuration)
- [Database Management](#-database-management)
- [Development & Quality Scripts](#-development--quality-scripts)
- [API Reference](#-api-reference)
- [Security & Production Hardening](#-security--production-hardening)
- [Testing Suite](#-testing-suite)
- [Author & Connect](#-author--connect)
- [License](#-license)



## 🏛️ Overview & Architecture

Dossier is designed as an architectural showcase of production full-stack engineering standards:

- **Strict Server/Client Boundary**: Server logic (database pools, repositories, storage clients, email transport) lives strictly under `src/server/*` guarded by `import "server-only";` to eliminate bundle contamination.
- **Isomorphic Security Layer**: Edge and client CSRF validation (`src/lib/security/`), timing-safe API authorization (`src/server/security/auth.ts`), and distributed Redis sliding-window rate limiting.
- **Serverless PostgreSQL & Drizzle ORM**: Direct connection pooling via `@neondatabase/serverless` over HTTP, schema version control with Drizzle Kit, and automated idempotent migrations.
- **Resilient Request Deduplication**: All repository accessors use `React.cache()` to share state between dynamic metadata generation (`generateMetadata()`) and page component trees without duplicate database hits.
- **SSRF Hardened SEO Analyzer**: Ingests external target pages with custom Undici agents pinning DNS resolutions to prevent loopback/LAN rebinding attacks and enforce strict content-length caps.
- **Cloudflare R2 Object Storage**: S3-compatible cloud storage for immutable verification assets, digital documents, and credential files with dynamic MIME validation.
- **Comprehensive Metadata & Structured Data**: Built-in JSON-LD schemas (`Person`, `WebSite`, `Organization`, `TechArticle`, `SoftwareApplication`, `BreadcrumbList`) adhering to Schema.org standards.



## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Hybrid SSR/SSG/ISR with Turbopack bundler |
| **UI & Runtime** | [React 19](https://react.dev/) | React Server Components, Actions, and Hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking with zero compiler bypass |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) | Accessible design tokens, dark luxury theme, fluid typography |
| **Animations** | [Motion](https://motion.dev/) | Hardware-accelerated transitions & scroll interactions |
| **Database & ORM** | [Neon PostgreSQL](https://neon.tech/) + [Drizzle ORM](https://orm.drizzle.team/) | Serverless database with typed schema migrations |
| **Asset Storage** | [Cloudflare R2](https://developers.cloudflare.com/r2/) (`@aws-sdk/client-s3`) | S3-compatible global object storage |
| **Caching & Limiting** | [Upstash Redis](https://upstash.com/) (`@upstash/redis`) | Atomic Lua-script sliding-window rate limiting |
| **Email Service** | [Nodemailer](https://nodemailer.com/) | Transactional delivery with CRLF sanitization |
| **Validation** | [Zod 4](https://zod.dev/) | Runtime schema validation on API contracts |
| **Testing** | [Vitest 5](https://vitest.dev/) + [Testing Library](https://testing-library.com/) | 100+ co-located unit and integration tests |



## 📂 Project Directory Structure

```text
dossier/
├── public/                     # Static public assets (icons, manifest, docs)
│   ├── docs/                   # Verifiable documents & Resume PDF
│   ├── images/                 # Optimized brand marks and profile graphics
│   └── manifest.json           # Web app manifest for PWA compliance
├── migrations/                 # Drizzle SQL migrations and snapshot metadata
├── scripts/                    # Database seeds, migration runners, and scripts
│   └── db/seed.ts              # Idempotent Neon DB seeder
├── src/
│   ├── app/                    # Next.js App Router (Routes, Layouts, APIs)
│   │   ├── (main)/             # Portfolio landing page
│   │   ├── api/                # Protected and public REST Route Handlers
│   │   ├── credentials/        # Certification archives and dynamic slug routes
│   │   ├── engineering-notes/  # Technical publications and articles
│   │   ├── projects/           # Showcase work index & project deep-dives
│   │   ├── resume/             # Interactive PDF viewer route
│   │   ├── work/               # Architectural case studies with diagram renderers
│   │   ├── globals.css         # Theme design tokens and Tailwind utility layers
│   │   ├── sitemap.ts          # Automated dynamic XML sitemap
│   │   └── robots.ts           # Dynamic robots.txt configuration
│   ├── assets/                 # Embedded fonts (Nasalization, Quentin)
│   ├── components/             # Modular React UI components
│   │   ├── cards/              # Contact and experience cards
│   │   ├── case-study/         # Technical case study diagrams and metrics
│   │   ├── common/             # Layout primitives (Navbar, Footer, Background)
│   │   ├── credentials/        # Credential badges, verify links, and previews
│   │   ├── notes/              # Engineering notes listing and badges
│   │   ├── resume/             # PDF viewer controls and document viewport
│   │   ├── sections/           # Landing page sections (Hero, About, DevOps, Skills)
│   │   ├── shared/             # Reusable icons, JSON-LD, and tech badges
│   │   └── ui/                 # Accessible button, card, and badge primitives
│   ├── config/                 # Application config and contact constants
│   ├── constants/              # Static profile data, project manifests, keywords
│   ├── hooks/                  # Custom React client hooks
│   ├── lib/                    # Shared isomorphic & client utilities
│   │   ├── security/           # Client & Edge CSRF tokens and CORS headers
│   │   ├── logger.ts           # Structured PII-masked JSON logger
│   │   ├── sanitize.ts         # XSS sanitization and text filters
│   │   └── structured-data.ts  # Schema.org JSON-LD generation
│   ├── schemas/                # Shared Zod runtime validation schemas
│   ├── server/                 # Server-only isolated backend layer
│   │   ├── db/                 # Neon PostgreSQL client pool & Drizzle schema
│   │   ├── http/               # HTTP streaming body readers & byte limits
│   │   ├── repositories/       # Cached data loaders (articles, case studies, credentials)
│   │   ├── security/           # Timing-safe auth, server CSRF, Redis rate limits
│   │   ├── seo-analyzer/       # SSRF-protected webpage content parser
│   │   ├── services/           # Business domain services (contact, email, credentials)
│   │   └── storage/            # Cloudflare R2 client & file upload validations
│   ├── tests/                  # Test suites (Vitest unit and integration)
│   └── types/                  # Domain TypeScript interfaces and type definitions
├── drizzle.config.ts           # Drizzle Kit migration configuration
├── next.config.ts              # Next.js compiler, CSP headers, and redirects
├── tailwind.config.js          # Tailwind CSS theme extension
├── vitest.config.mts           # Vitest configuration and path alias mapping
└── tsconfig.json               # TypeScript strict configuration
```



## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or later (LTS recommended)
- **Package Manager**: `npm` (v10+), `pnpm`, or `yarn`
- **Database**: Active [Neon PostgreSQL](https://neon.tech/) instance or local PostgreSQL 15+

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tushardevx01/dossier.git
   cd dossier
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` with your database URL, email credentials, and API secrets.*

4. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

5. **Seed initial data:**
   ```bash
   npm run db:seed
   npm run db:seed:case-studies
   ```

6. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application with Turbopack hot reloading.



## 🔐 Environment Configuration

All required and optional environment variables are documented in [`.env.example`](.env.example):

| Variable | Required | Description |
|---|:---:|---|
| `DATABASE_URL` | **Yes** | Neon PostgreSQL connection string (`postgresql://...`) |
| `NODE_ENV` | Optional | Set to `development`, `test`, or `production` |
| `LOG_LEVEL` | Optional | Structured logger threshold (`debug`, `info`, `warn`, `error`) |
| `EMAIL_FROM` | **Yes** | Sender email address for contact form notifications |
| `EMAIL_PASSWORD` | **Yes** | App password / SMTP token for email transport |
| `R2_ACCOUNT_ID` | Optional | Cloudflare R2 Account Identifier for document uploads |
| `R2_ACCESS_KEY_ID` | Optional | Cloudflare R2 S3 Access Key ID |
| `R2_SECRET_ACCESS_KEY`| Optional | Cloudflare R2 S3 Secret Access Key |
| `R2_BUCKET_NAME` | Optional | Target Cloudflare R2 bucket name |
| `R2_PUBLIC_URL` | Optional | Public CDN origin for verified credential assets |
| `UPSTASH_REDIS_REST_URL` | Optional | Upstash Redis REST URL for distributed rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Optional | Upstash Redis REST Token |
| `ADMIN_API_KEY` | Optional | Cryptographic hex key for administrative mutation APIs |
| `TRUST_PROXY_HEADERS` | Optional | Enable `true` only behind trusted reverse proxies (e.g. Vercel) |

> [!TIP]
> In local development, if Upstash Redis credentials are not provided, rate limiting automatically falls back to an in-memory sliding window cache.



## 🗄️ Database Management

Database schemas and migrations are handled via **Drizzle ORM**:

```bash
# Generate SQL migration files from schema changes
npm run db:generate

# Apply pending migrations to the PostgreSQL database
npm run db:migrate

# Seed administrative keys and default credentials
npm run db:seed

# Populate architectural case studies
npm run db:seed:case-studies

# Launch Drizzle Studio GUI for live database inspection
npm run db:studio
```



## ⚡ Development & Quality Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Next.js development server with Turbopack |
| `npm run build` | Compiles optimized static & dynamic production bundles |
| `npm run start` | Boots the compiled Next.js standalone server |
| `npm run lint` | Runs ESLint across all TypeScript and JavaScript files |
| `npm run typecheck` | Executes TypeScript strict type verification (`tsc --noEmit`) |
| `npm test` | Runs the full Vitest suite in single-run mode |
| `npm run test:watch` | Runs Vitest in interactive watch mode for TDD |
| `npm run check` | Executes **linting + typechecking + unit test suite** in sequence |



## 📡 API Reference

All API routes are served under `/api` with strict HTTP method guards and rate limiting:

| Method | Endpoint | Description | Security / Guard |
|---|---|---|---|
| `POST` | `/api/send` | Submits contact messages with SMTP delivery | CSRF Token, Rate Limit, Input Sanitization |
| `POST` | `/api/analyze` | Evaluates URL SEO health & heading taxonomy | SSRF DNS-Pinning, Byte-capped |
| `GET` | `/api/credentials` | Retrieves paginated verified credential registry | Edge Cached, Public |
| `POST` | `/api/credentials` | Creates a verified credential record & uploads to R2 | `ADMIN_API_KEY` Required (Timing-Safe) |
| `GET` | `/api/credentials/:id` | Fetches single credential details by identifier | Public |
| `PATCH` | `/api/credentials/:id` | Updates credential metadata or asset object | `ADMIN_API_KEY` Required |
| `DELETE` | `/api/credentials/:id` | Removes credential record and Purges R2 object | `ADMIN_API_KEY` Required |
| `GET` | `/api/credentials/:id/download` | Streams credential PDF/image directly with MIME type | Rate Limited |
| `GET` | `/api/credentials/count` | Lightweight count endpoint for badge counts | Cached |
| `GET` | `/api/github` | Real-time GitHub commit history and activity metrics | Stale-While-Revalidate |
| `GET` | `/api/health` | Liveness & database connection health probe | Public |
| `GET` | `/api/version` | Returns Git SHA and deployment environment info | Public |



## 🛡️ Security & Production Hardening

- **Content Security Policy (CSP)**: Fine-grained CSP configured in `next.config.ts` enforcing `base-uri 'self'`, `frame-ancestors 'none'`, and explicit script/connect origins.
- **Double-Submit Cookie CSRF Defense**: Cryptographically random 32-byte tokens verified via timing-safe byte equality.
- **SSRF Attack Prevention**: External fetches in `src/server/seo-analyzer/fetchHTML.ts` validate requested hostnames against private IP blocks (RFC 1918, loopbacks, link-local, AWS/cloud metadata services `169.254.169.254`) before making connections.
- **Atomic Sliding Window Rate Limiting**: Powered by Upstash Redis Lua scripts executing atomic `INCR` + `EXPIRE` transactions, preventing race conditions.
- **PII-Masked Structured Logging**: Logger automatically masks email addresses, auth tokens, passwords, and API keys before writing to console/stdout.
- **Timing Attack Mitigation**: Secret comparisons use Node's `crypto.timingSafeEqual` with SHA-256 pre-hashing to protect variable-length token leaks.



## 🧪 Testing Suite

Tests are built using **Vitest** with `@testing-library/react` and `jsdom`:

```bash
# Run all unit and integration tests
npm test

# Run tests with live watch mode
npm run test:watch
```

Test coverage encompasses:
- ✅ **SSRF Protection**: Verifies loopback, link-local, private range, and redirect bypass rejections.
- ✅ **Rate Limiting**: Tests fail-closed behavior, distributed Redis evaluation, and in-memory fallback.
- ✅ **Security Utilities**: Timing-safe equality, CORS header builders, CSRF token generation, and PII masking.
- ✅ **Storage Validation**: R2 key sanitization, path traversal blocking, and upload payload validation.
- ✅ **Input Sanitization**: HTML tag stripping, script injection defenses, and attribute allowlists.



## 👨‍💻 Author & Connect

**Tushar Kanti Dey**  
*Full-Stack Developer & DevOps Engineer* — Kolkata, India

- 🌐 **Portfolio**: [tushardevx01.tech](https://www.tushardevx01.tech)
- 🐙 **GitHub**: [@tushardevx01](https://github.com/tushardevx01)
- 💼 **LinkedIn**: [/in/tushardevx01](https://www.linkedin.com/in/tushardevx01)
- 📧 **Email**: [thetushardev0@gmail.com](mailto:thetushardev0@gmail.com)



## 📄 License

This repository is licensed under the [MIT License](LICENSE).
