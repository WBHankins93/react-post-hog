from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_cors_origins
from app.search import search_documents

app = FastAPI(title="Personal HQ API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/search")
def search(q: str = Query(min_length=1, max_length=120)) -> dict[str, object]:
    results = search_documents(q)
    return {
        "query": q,
        "count": len(results),
        "results": [
            {
                "id": result.id,
                "title": result.title,
                "snippet": result.snippet,
                "route": result.route,
            }
            for result in results
        ],
    }
