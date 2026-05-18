# Tushar Kanti Dey Portfolio

Enterprise-grade personal platform engineered with Next.js, focused on performance, security, scalability, observability, and production reliability.

Built as a hardened full-stack portfolio infrastructure rather than a traditional static developer website.

---

# Architecture Overview

The platform follows a modular layered architecture with isolated concerns across presentation, business logic, infrastructure, and security domains.

```bash
src/
├── app/              # App Router, route handlers, metadata, API surface
├── components/       # Atomic UI system and feature sections
├── services/         # Business workflows and domain services
├── lib/              # Core platform utilities and infrastructure modules
├── constant/         # Structured portfolio content and metadata registries
├── styles/           # Global styling system
└── instrumentation/  # Runtime validation and observability bootstrap
```

---

# Core Engineering Principles

* Production-first architecture
* Defense-in-depth security model
* Strict server/client separation
* Typed infrastructure boundaries
* Centralized runtime validation
* Immutable deployment workflows
* API hardening and abuse prevention
* Deployment portability
* Observability-driven debugging
* Minimal public attack surface

---

# Technology Stack

## Frontend

* Next.js App Router
* React
* TypeScript
* Tailwind CSS
* Framer Motion

## Backend & Infrastructure

* Node.js
* Route Handlers
* Redis, optional
* Upstash Rate Limiting
* Docker
* Alpine Linux Containers

## Monitoring & Reliability

* Sentry, optional
* Structured Logging
* Runtime Instrumentation
* Health Probes
* Error Webhooks

---

# Security Architecture

The application is designed around a hardened security posture.

## Implemented Controls

### API Protection

* Strict request content-type enforcement
* Payload size limiting
* Centralized request sanitization
* Generic client-facing error responses
* Cache-disabled sensitive routes
* Public endpoint isolation

### Abuse Prevention

* Distributed rate limiting
* Redis-backed throttling in production
* Honeypot anti-spam validation
* Same-origin request verification
* Automated request rejection for malformed payloads

### Platform Security

* Centralized environment validation
* Server-only secret access patterns
* Hardened Content Security Policy
* Strict HTTP security headers
* No client-side secret exposure
* JSON-LD serialization controls

### Deployment Hardening

* Non-root container execution
* Minimal runtime footprint
* Production-safe health endpoints
* Isolated build/runtime stages
* Controlled metadata exposure

---

# API Surface

| Method | Endpoint       | Responsibility                   |
| ------ | -------------- | -------------------------------- |
| `POST` | `/api/send`    | Secure contact workflow          |
| `POST` | `/api/analyze` | SEO analysis engine              |
| `GET`  | `/api/health`  | Runtime readiness validation     |
| `GET`  | `/api/version` | Deployment-safe release metadata |

---

# Environment Configuration

## Required Variables

```env
QEV_API_KEY=
EMAIL_FROM=
EMAIL_PASSWORD=
```

## Optional Infrastructure Variables

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
LOG_LEVEL=
SENTRY_DSN=
ERROR_WEBHOOK_URL=
SERVICE_NAME=
BUILD_TIME=
```

---

# Local Development

## Install Dependencies

```bash
npm ci
```

## Configure Environment

```bash
cp .env.example .env.local
```

## Start Development Server

```bash
npm run dev
```

Application runtime:

```bash
http://localhost:3000
```

---

# Production Pipeline

## Static Analysis

```bash
npm run lint
npm run typecheck
```

## Production Build

```bash
npm run build
```

## Runtime Startup

```bash
npm run start
```

---

# Containerization

## Build Image

```bash
docker build -t tushardevx01 .
```

## Run Container

```bash
docker run \
  --rm \
  --name tushardevx01 \
  -p 9999:3000 \
  --env-file .env.local \
  tushardevx01
```

## Push to Docker Hub

```bash
docker tag tushardevx01 tushardevx01/tushardevx01:latest
docker push tushardevx01/tushardevx01:latest
```

---

# Docker Compose

```bash
docker compose up --build
```

Current port mapping:

```bash
3000:3000
```

---

# Observability & Reliability

The platform includes production-oriented observability mechanisms.

## Features

* Runtime instrumentation
* Centralized logging
* Structured error handling
* Environment validation bootstrapping
* Health readiness endpoints
* External webhook integration
* Optional Sentry integration

---

# Threat Model

The system is designed to mitigate:

* API abuse attacks
* Automated spam submissions
* Payload flooding
* Header injection
* Environment leakage
* Cross-origin abuse
* Excessive request amplification
* Unsafe structured data rendering
* Deployment metadata exposure

---

# Performance Strategy

* App Router optimization
* Route-level caching controls
* Minimal API response surfaces
* Optimized asset delivery
* Containerized deployment efficiency
* Server/client execution isolation

---

# Deployment Philosophy

This platform is designed for:

* Cloud-native deployment
* Horizontal scalability
* Immutable infrastructure
* Secure CI/CD pipelines
* Production observability
* Minimal operational overhead

---

# Author

## Tushar Kanti Dey

Full-Stack Software Engineer focused on scalable systems, secure platform engineering, developer tooling, and production infrastructure.

📧 [Email](mailto:t.k.d.dey2033929837@gmail.com)
🔗 [GitHub](https://github.com/Tusharxhub)
📸 [Instagram](https://www.instagram.com/tushardevx01/)
🌐 [Portfolio](https://www.tushardevx01.tech)