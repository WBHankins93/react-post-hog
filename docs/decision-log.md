# Decision Log

This file records significant technical/product decisions (lightweight ADR style).

## 2026-04-03 — ADR-001: Hybrid product direction (marketing + OS-like app)

- **Status**: Accepted
- **Context**: Need portfolio-grade project that demonstrates both UX quality and application complexity.
- **Decision**: Build a hybrid experience rather than marketing-only or app-only.
- **Consequences**: Requires careful scope control; improves real-world product narrative.

## 2026-04-03 — ADR-002: Start with React + Vite instead of Next.js

- **Status**: Accepted
- **Context**: Primary objective is React skill refresh and fast iteration.
- **Decision**: Use Vite-based React SPA for MVP.
- **Consequences**: SSR/SSG are deferred; architecture remains migration-friendly if Next.js becomes valuable later.

## 2026-04-03 — ADR-003: Introduce Python via FastAPI search service

- **Status**: Accepted
- **Context**: Project should develop both frontend and Python backend fluency.
- **Decision**: Add FastAPI service with narrow initial scope (`/health`, `/search`).
- **Consequences**: Adds deploy complexity but improves full-stack realism and extensibility.

## 2026-04-03 — ADR-004: Small-PR 0→1 workflow

- **Status**: Accepted
- **Context**: Need demonstrable engineering process maturity.
- **Decision**: Capability-scoped PRs on feature branches with mandatory template + evidence.
- **Consequences**: Higher process discipline; better external storytelling and reviewability.



## 2026-04-08 — ADR-005: Deployment split with environment parity

- **Status**: Accepted
- **Context**: MVP requires deployed frontend/backend with repeatable preview + production promotion.
- **Decision**: Standardize on Vercel for frontend and Render for backend, with explicit env templates and manifest files (`vercel.json`, `render.yaml`).
- **Consequences**: Faster initial delivery and PR preview workflows; introduces cross-platform environment management discipline.
