# Runbook

## Local development

### Frontend

```bash
npm install
cp .env.example .env
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Verify backend health:

```bash
curl http://localhost:8000/health
```

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



## Deployment playbook

### Frontend (Vercel)

1. Import repository in Vercel.
2. Keep defaults for Vite build (`npm run build`, output `dist`).
3. Configure environment variable `VITE_API_BASE_URL` per environment:
   - preview: preview backend URL
   - production: production backend URL
4. Ensure `vercel.json` rewrite is committed so SPA routes resolve.

### Backend (Render)

1. Create a new Web Service from `render.yaml` (Blueprint deploy).
2. Set `BACKEND_CORS_ORIGINS` for each environment to frontend URL(s).
3. Confirm `/health` and `/search?q=test` respond after deploy.
