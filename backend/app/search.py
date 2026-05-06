from dataclasses import dataclass


@dataclass(frozen=True)
class SearchDocument:
    id: str
    title: str
    snippet: str
    route: str
    type: str
    category: str


DOCUMENTS: tuple[SearchDocument, ...] = (
    SearchDocument(
        id="doc-architecture",
        title="Architecture overview",
        snippet="Frontend SPA + FastAPI backend with clear module boundaries.",
        route="/docs#architecture",
        type="Docs",
        category="Architecture",
    ),
    SearchDocument(
        id="doc-workspace",
        title="Workspace file explorer",
        snippet="Tree selection with content viewer and persisted active file context.",
        route="/workspace",
        type="Workbench",
        category="Files",
    ),
    SearchDocument(
        id="doc-command-palette",
        title="Command palette",
        snippet="Keyboard-first command system opened with Cmd/Ctrl + K.",
        route="/",
        type="Command",
        category="Navigation",
    ),
    SearchDocument(
        id="doc-product-os",
        title="Product OS modules",
        snippet="Original HQ modules for notes, launches, decisions, research, metrics, and changelog workflows.",
        route="/",
        type="Module",
        category="Homepage",
    ),
    SearchDocument(
        id="doc-handbook",
        title="Handbook surface",
        snippet="Process docs become a public operating manual for how Personal HQ is built and reviewed.",
        route="/docs",
        type="Docs",
        category="Handbook",
    ),
    SearchDocument(
        id="doc-changelog",
        title="Changelog surface",
        snippet="Launch notes and release rhythm become part of the product website experience.",
        route="/docs",
        type="Docs",
        category="Changelog",
    ),
)


def search_documents(query: str, *, limit: int = 5) -> list[SearchDocument]:
    normalized = query.strip().lower()
    if not normalized:
        return []

    matches = [
        document
        for document in DOCUMENTS
        if normalized in document.title.lower()
        or normalized in document.snippet.lower()
        or normalized in document.type.lower()
        or normalized in document.category.lower()
    ]

    return matches[:limit]
