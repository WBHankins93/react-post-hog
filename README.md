# Personal HQ (PostHog-inspired) — 0 → 1 Build

A 0→1 personal HQ platform inspired by OS metaphors and modern product docs UX, built with React + Vite and Python FastAPI, developed through production-style PR workflows and progressive deployment.

## Why this project exists

This repository is intentionally structured as a **Founding Engineer style build log**:

- tight MVP scope before expansion
- small, reviewable PRs on feature branches
- clear architecture and deployment trade-offs
- explicit decision logs
- "prod-ish" quality gates from day one

## Product direction

We are building a **hybrid experience**:

1. Marketing/home surface
2. Logged-in "OS-like" app workspace

The MVP is intentionally constrained to prove speed + quality.

## MVP (strict)

The MVP ships when these 5 capabilities are complete:

1. App shell (sidebar + main pane + command area)
2. Keyboard command palette (`Cmd/Ctrl + K`)
3. File tree + viewer (local/mock data)
4. Stateful workspace persistence (restore layout + active context)
5. Beautiful docs rendering (markdown/MDX quality baseline)

Non-goals are documented in [`docs/mvp-scope.md`](docs/mvp-scope.md).


## Current implementation status

Repository now includes:

- Vite + React + TypeScript scaffold
- baseline ESLint configuration
- CI workflow for lint/typecheck/test/build
- app shell with route scaffolding (overview/workspace/docs)
- keyboard-first command palette foundation (⌘/Ctrl + K)
- workspace file tree + file viewer baseline
- local workspace persistence for route, selected file, and sidebar layout

## Stack (target)

### Frontend

- React + TypeScript + Vite
- React Router
- Zustand
- Tailwind CSS

### Backend

- Python FastAPI
- SQLite (initial)
- Search index endpoint (`/search`)

## Deployment strategy

### Recommended initial split

- Frontend: Vercel
- Backend: Render (or Fly/Railway)

This is a valid production path, and keeps operational complexity low.

### About Render free tier

Render has historically offered free options, but tiers and limits change over time. Treat free tier use as **best-effort for demos**, not production reliability. Before final infra decisions, always verify current pricing/limits directly on vendor pricing pages.

### Should we use Next.js instead?

- **Vite path**: best for focused React skill refresh and explicit architecture control.
- **Next.js path**: best when SSR/SSG/ISR and integrated full-stack features are mandatory.

This repo starts with Vite for learning velocity and can later migrate/expand to Next.js if product needs demand it.

## Environments + pipeline

Use separate environments for frontend and backend, with consistent naming:

- `development` (local)
- `preview` (per-PR deploys)
- `production`

Recommended CI/CD model:

1. PR opened → lint/typecheck/tests/build
2. Preview deploy frontend + backend
3. Smoke test against preview URLs
4. Merge to `main`
5. Production deploy auto-triggered with protected branch checks

See [`docs/runbook.md`](docs/runbook.md) for operational guidance.

## Branching and PR workflow

- `main` is always deployable
- one feature per branch (`feat/*`, `chore/*`, `docs/*`)
- one capability per PR
- include test evidence and screenshots where UI changes are visible

See:

- [`.github/pull_request_template.md`](.github/pull_request_template.md)
- [`docs/milestones.md`](docs/milestones.md)

## Testing strategy (phased)

### MVP quality gates

- lint
- typecheck
- unit tests for critical UI/state logic
- build

### After MVP

- component/integration tests (React Testing Library)
- API tests for FastAPI endpoints
- lightweight end-to-end smoke tests

Detailed strategy: [`docs/testing-strategy.md`](docs/testing-strategy.md)

## Documentation map

- Vision: [`docs/vision.md`](docs/vision.md)
- Scope: [`docs/mvp-scope.md`](docs/mvp-scope.md)
- Architecture: [`docs/architecture.md`](docs/architecture.md)
- Decision log: [`docs/decision-log.md`](docs/decision-log.md)
- Milestones: [`docs/milestones.md`](docs/milestones.md)
- Runbook: [`docs/runbook.md`](docs/runbook.md)
- Testing strategy: [`docs/testing-strategy.md`](docs/testing-strategy.md)

## Public portfolio description

> A 0→1 personal HQ platform inspired by OS metaphors and modern product docs UX, built with React + Vite and Python FastAPI, developed through production-style PR workflows and progressive deployment.

