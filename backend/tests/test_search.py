from fastapi.testclient import TestClient

from app.main import app
from app.search import search_documents


client = TestClient(app)


def test_search_endpoint_returns_matches() -> None:
    response = client.get("/search", params={"q": "workspace"})

    assert response.status_code == 200
    payload = response.json()
    assert payload["query"] == "workspace"
    assert payload["count"] >= 1
    assert any(result["route"] == "/workspace" for result in payload["results"])
    assert all("type" in result and "category" in result for result in payload["results"])
    assert all("intent" in result and "actionLabel" in result for result in payload["results"])


def test_search_endpoint_rejects_blank_query() -> None:
    response = client.get("/search", params={"q": ""})

    assert response.status_code == 422


def test_search_documents_limits_results() -> None:
    results = search_documents(" ", limit=2)

    assert results == []


def test_search_documents_matches_metadata() -> None:
    results = search_documents("module")

    assert any(result.category == "Homepage" for result in results)


def test_search_documents_matches_command_intent() -> None:
    results = search_documents("readiness")

    assert any(result.intent == "Check readiness" for result in results)
