# Backend (FastAPI scaffold)

This folder contains the initial FastAPI service scaffold for the Personal HQ MVP.

## Endpoints

- `GET /health` — simple liveness endpoint returning `{"status": "ok"}`.
- `GET /search?q=<query>` — mock indexed search endpoint returning route-aware matches.

## Local setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Run tests

```bash
cd backend
PYTHONPATH=. pytest
```
