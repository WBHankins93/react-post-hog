# Runbook

## Local development (target state)

### Frontend

- install dependencies
- run local dev server
- verify routes + command interactions

### Backend

- create Python virtual environment
- install dependencies
- run FastAPI app
- verify `/health`

## Environment variables

Maintain separate env files/variables for each environment:

- local/development
- preview
- production

Recommended naming convention:

- `FRONTEND_*` for client-exposed build-time values
- `BACKEND_*` for API/service configuration

## CI/CD process

1. Pull request created
2. CI checks run (lint/typecheck/tests/build)
3. Preview deploys generated
4. Manual smoke test on preview
5. Merge to `main`
6. Production deploy triggered

## Smoke test checklist

- app shell loads
- keyboard shortcut opens command palette
- file tree renders and selection updates content pane
- state persists across reload
- docs pages render with readable formatting
- backend health endpoint returns success
- search endpoint returns expected sample results

## Incident basics

If production issues occur:

1. identify blast radius
2. rollback to prior deployment
3. capture root cause in decision log/retrospective
4. add preventive check/test if feasible

