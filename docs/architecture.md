# Architecture

## System overview

A decoupled frontend/backend architecture:

- **Frontend SPA**: React + Vite, owns interaction model and client state
- **Backend API**: FastAPI, owns search/index and future server concerns

## Frontend modules (planned)

- `app-shell`: layout chrome, nav zones, responsive behavior
- `command-system`: shortcut registry + command palette
- `workspace-store`: persisted UI/work context
- `file-explorer`: tree + viewer
- `docs-renderer`: markdown/MDX rendering pipeline

## Backend modules (planned)

- `health`: health and readiness endpoints
- `search`: indexed lookup across docs/file metadata
- `indexer`: ingestion + normalization routines

## Data boundaries

- UI session state (frontend-local at MVP)
- searchable corpus metadata (backend-owned)
- future user-specific persistence (post-MVP)

## Deployment topology

- frontend deploy target: Vercel
- backend deploy target: Render (or equivalent)
- separate environment variables per stage
- preview deployments enabled for pull requests

## Why this architecture

- maximizes React learning focus
- cleanly introduces Python without frontend coupling
- keeps migration path open (including possible Next.js adoption later)

