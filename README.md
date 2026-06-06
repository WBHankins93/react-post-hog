# Personal HQ

A personal operating system platform with a marketing home surface and an OS-like workspace, built with React + Vite and Python FastAPI.

## Quick Start

**Prerequisites:** Node.js (v18+), Python 3.11+

```bash
# Frontend
npm install
cp .env.example .env
npm run dev
```

```bash
# Backend
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:8000`.

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, React Router, custom CSS with design tokens

**Backend:** Python FastAPI, Uvicorn

**Infra:** Vercel (frontend), Render (backend), GitHub Actions CI

## Project Structure

```
src/
  app/           # App shell layout, workspace state persistence
  components/    # Command palette
  pages/         # Overview, Workspace, Docs, and shared HQ app pages
  features/
    files/       # File tree component + mock data
    docs/        # Custom markdown renderer
    search/      # Search API client
  content/       # Markdown content files and structured HQ app data
backend/
  app/           # FastAPI app, search endpoint, config
  tests/         # Health + search endpoint tests
docs/            # Architecture decisions, runbook, vision, roadmap
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run Vitest tests |
| `npm run test:e2e` | Run browser smoke flow against a local Vite server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler check |

## Features

- **App shell** -- sidebar navigation, collapsible layout, window chrome, mode toggle
- **Command palette** -- `Cmd/Ctrl + K` keyboard-first command search and execution
- **File tree + viewer** -- recursive folder/file explorer with content preview
- **Workspace persistence** -- restores route, sidebar state, selected file, and display mode via localStorage
- **Docs rendering** -- custom markdown-to-HTML renderer with typography and code block styling
- **Search** -- frontend search UI integrated with backend `/search` endpoint (mock index)
- **CI pipeline** -- lint, typecheck, test, and build on every PR

## Documentation

| Document | Description |
|---|---|
| [Vision](docs/vision.md) | Product strategy and goals |
| [MVP Scope](docs/mvp-scope.md) | What's in and out of scope |
| [MVP Process](docs/mvp-process.md) | Phase plan, hosting readiness, and Personal HQ product framing |
| [Architecture](docs/architecture.md) | System design and module boundaries |
| [Decision Log](docs/decision-log.md) | Trade-off decisions and ADRs |
| [Testing Strategy](docs/testing-strategy.md) | Quality gates and test approach |
| [Milestones](docs/milestones.md) | Release tracking |
| [Runbook](docs/runbook.md) | Local setup, deployment, and operations |
| [Retrospective](docs/retrospective-v0.1.md) | v0.1 lessons learned |
| [Post-MVP Roadmap](docs/roadmap-post-mvp.md) | Future direction |
| [Future Ideas](docs/future-feature-ideas.md) | Feature brainstorm |
