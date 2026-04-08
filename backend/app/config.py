from __future__ import annotations

import os


def _parse_csv(value: str | None) -> list[str]:
    if value is None:
        return []
    return [item.strip() for item in value.split(",") if item.strip()]


_DEFAULT_CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
]


def get_cors_origins() -> list[str]:
    configured = _parse_csv(os.getenv("BACKEND_CORS_ORIGINS"))
    return configured if configured else _DEFAULT_CORS_ORIGINS
