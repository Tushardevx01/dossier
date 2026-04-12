# Security

## Security Model

This application is designed to be safe by default and deployment-friendly.

- Public browser-facing routes are same-origin restricted where applicable.
- Public APIs are validated at the edge of the request handler.
- Server-only secrets are never read in client code.
- Runtime startup validates required production credentials.
- Public health and version endpoints avoid leaking internal detail.

## Secrets

- Required secrets: `QEV_API_KEY`, `EMAIL_FROM`, `EMAIL_PASSWORD`.
- Optional production dependencies: Upstash Redis, logging, and monitoring vars.
- Secrets must live in the platform environment or local `.env.local` files.
- Do not commit real secrets to git.

## Headers

Security headers are configured in `next.config.ts`.

- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Strict-Transport-Security`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `X-DNS-Prefetch-Control`

## Validation Strategy

- Contact submissions use schema validation, honeypot detection, same-origin checks, and rate limiting.
- SEO analysis requests are size-limited, content-type checked, schema validated, and rate limited.
- Email rendering escapes user-controlled text before template interpolation.

## Deployment Checklist

- Set all required secrets in the target platform.
- Confirm `/api/health` returns `200` only when the app is ready.
- Verify Docker and Vercel builds in CI before release.
- Review CSP compatibility after adding any new third-party scripts.
- Keep Redis available if distributed rate limiting is required in production.

## Incident Response

- Rotate secrets immediately if a secret file is ever committed.
- Keep production logs structured and free of secret material.
- Treat repeated rate-limit failures or origin failures as abuse signals.