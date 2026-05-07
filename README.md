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
3. Handbook-quality docs and launch readiness surfaces

The product proves whether a personal operating workspace can combine docs, files, search, and release confidence in one keyboard-first interface.

## Status after MVP2

MVP2 is considered finalized for this checkpoint. It ships the three planned MVP2 phases together:

1. **Guided workspace artifacts** — selected files now explain their role, owner, readiness state, and next action.
2. **Search as command layer** — search results combine docs, files, modules, routes, and command-style intents.
3. **Launch readiness** — the homepage and workspace expose readiness counts, checklist items, and deliberately deferred scope.

The detailed MVP2 scope, acceptance criteria, and shipped phases live in [`docs/mvp2-readiness.md`](docs/mvp2-readiness.md) and [`docs/mvp2-build-phases.md`](docs/mvp2-build-phases.md).

## What is next? Is MVP3 planned?

There is **not yet a committed MVP3 scope** in this repository. The planned next work is a post-MVP2 productization sequence rather than a named MVP3 milestone.

Recommended next sequence:

1. **Design-system and layout refinement** — finish the visual foundation, app chrome hierarchy, density, interaction states, and reusable primitives.
2. **Search/result UX depth** — add richer result cards, snippets, keyboard selection, and clearer empty/loading/error states.
3. **Workspace ergonomics** — improve recents/history, faster context switching, tree information scent, and optional pinned/tabs patterns.
4. **Quality hardening** — expand frontend component/integration tests, backend API tests, and preview smoke validation.
5. **Productization pass** — add release-note discipline, baseline telemetry hooks, and performance/stability review.

An MVP3 should only be created after the post-MVP2 pass answers which product bet is strongest: a public marketing/docs site, a deeper personal workspace, or a launch/readiness operating system. Until then, use [`docs/roadmap-post-mvp.md`](docs/roadmap-post-mvp.md) and [`docs/future-feature-ideas.md`](docs/future-feature-ideas.md) as the source of truth for upcoming work.

## Current implementation status

Repository now includes:

- Vite + React + TypeScript scaffold
- baseline ESLint configuration
- CI workflow for lint/typecheck/test/build
- app shell with route scaffolding (overview/workspace/docs)
- keyboard-first command palette foundation (⌘/Ctrl + K)
- website/workspace display mode toggle
- workspace file tree + guided artifact viewer
- recently opened files and local workspace persistence for route, selected file, display mode, and sidebar layout
- markdown docs rendering baseline with typography and code block styling
- FastAPI backend scaffold with `/health` and `/search` endpoints
- frontend command-search UI integrated with backend query results
- MVP2 launch readiness checklist and summary surfaces
- deployment blueprints for Vercel (frontend) and Render (backend)
- environment variable templates for local/preview/production parity

## Stack

### Frontend

- React + TypeScript + Vite
- React Router
- CSS design tokens and component classes in `src/styles.css`

### Backend

- Python FastAPI
- Mock indexed search corpus behind `/search`
- CORS configuration through `BACKEND_CORS_ORIGINS`

## Build and run instructions

### Prerequisites

- Node.js 20+ recommended
- npm 10+ recommended
- Python 3.11+ recommended

### 1. Configure local environment

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

The frontend uses `VITE_API_BASE_URL` to call the API. The default local value is:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

The backend can optionally set browser CORS origins:

```bash
BACKEND_CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..
```

### 4. Run the backend API

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000` by default. Useful endpoints:

- `GET http://localhost:8000/health`
- `GET http://localhost:8000/search?q=readiness`

### 5. Run the frontend app

In a second terminal:

```bash
npm run dev
```

Open the Vite URL printed in the terminal, usually `http://localhost:5173`.

### 6. Build for production

```bash
npm run build
```

The frontend production bundle is emitted to `dist/`.

### 7. Preview the production build

```bash
npm run preview
```

## Quality checks

Run the frontend checks from the repository root:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Run the backend tests from the backend directory:

```bash
cd backend
source .venv/bin/activate
PYTHONPATH=. pytest
```

## Expected user experience (UX)

Personal HQ is designed as a keyboard-friendly product OS/workbench. A typical user should interact with it like this:

### 1. Land on `home.mdx`

- Start on the homepage/overview route.
- Read the MVP2 runway, module cards, launch notes, and readiness summary.
- Use the primary calls to action to open the guided workspace or documentation surface.
- Review the "next build queue" to understand which launch/readiness items deserve attention next.

### 2. Navigate through the OS-like shell

- Use the sidebar file-style navigation:
  - `home.mdx` for the marketing/product overview.
  - `workspace.app` for the guided file workbench.
  - `docs.mdx` for rendered handbook documentation.
- Use the shell controls to switch between website mode and workspace mode.
- Collapse the sidebar when more reading or review space is needed.
- Expect route, display mode, selected file, recent files, and sidebar state to persist locally between visits.

### 3. Use the command deck

- Press `Cmd + K` on macOS or `Ctrl + K` on Windows/Linux to open the command palette.
- Type a command such as `workspace`, `docs`, `sidebar`, or `mode`.
- Press Enter to run the first matching command, or click a command directly.
- Press Escape or the close control to dismiss the palette.

### 4. Search as a command layer

- Use the homepage search panel for broader discovery across files, docs, modules, routes, and launch commands.
- Try queries like `readiness`, `launch`, `command`, `workspace`, or `docs`.
- Use arrow keys to move the active result and Enter to run its navigation action.
- Read each result's type, category, intent, snippet, and action label before opening it.

### 5. Work in `workspace.app`

- Select a file from the tree to preview its content.
- Treat the selected file as a guided artifact, not just raw text: review its phase, summary, owner, readiness state, and next action.
- Use the Recents row to jump back to recently opened artifacts.
- Review the launch readiness checklist below the viewer to see what is ready and what is intentionally deferred.

### 6. Read `docs.mdx`

- Open the docs surface to validate the markdown rendering baseline.
- Use docs for architecture, runbook, testing, roadmap, and launch context rather than overloading the app UI with implementation details.

### 7. Understand MVP boundaries

- MVP2 intentionally does not include authentication, collaboration, real-time editing, complex drag-and-drop windowing, or AI automation.
- The platform should feel reviewable and launch-aware before it becomes a full multi-user workspace.

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
- MVP2 readiness brief: [`docs/mvp2-readiness.md`](docs/mvp2-readiness.md)
- MVP2 build phases: [`docs/mvp2-build-phases.md`](docs/mvp2-build-phases.md)
- Runbook: [`docs/runbook.md`](docs/runbook.md)
- Testing strategy: [`docs/testing-strategy.md`](docs/testing-strategy.md)
- v0.1 retrospective: [`docs/retrospective-v0.1.md`](docs/retrospective-v0.1.md)
- Post-MVP roadmap: [`docs/roadmap-post-mvp.md`](docs/roadmap-post-mvp.md)
- Future feature ideas: [`docs/future-feature-ideas.md`](docs/future-feature-ideas.md)

## Public portfolio description

> A 0→1 personal HQ platform inspired by OS metaphors and modern product docs UX, built with React + Vite and Python FastAPI, developed through production-style PR workflows and progressive deployment.
