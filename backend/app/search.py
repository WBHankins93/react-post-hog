from dataclasses import dataclass


@dataclass(frozen=True)
class SearchDocument:
    id: str
    title: str
    snippet: str
    route: str


DOCUMENTS: tuple[SearchDocument, ...] = (
    SearchDocument(
        id="doc-architecture",
        title="Architecture overview",
        snippet="Frontend SPA + FastAPI backend with clear module boundaries.",
        route="/docs#architecture",
    ),
    SearchDocument(
        id="doc-workspace",
        title="Workspace file explorer",
        snippet="Tree selection with content viewer and persisted active file context.",
        route="/workspace",
    ),
    SearchDocument(
        id="doc-command-palette",
        title="Command palette",
        snippet="Keyboard-first command system opened with Cmd/Ctrl + K.",
        route="/",
    ),
)


def search_documents(query: str, *, limit: int = 5) -> list[SearchDocument]:
    normalized = query.strip().lower()
    if not normalized:
        return []

    matches = [
        document
        for document in DOCUMENTS
        if normalized in document.title.lower() or normalized in document.snippet.lower()
    ]

    return matches[:limit]
