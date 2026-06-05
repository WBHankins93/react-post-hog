from dataclasses import dataclass


@dataclass(frozen=True)
class SearchDocument:
    id: str
    title: str
    snippet: str
    route: str
    type: str
    category: str
    intent: str
    action_label: str


DOCUMENTS: tuple[SearchDocument, ...] = (
    SearchDocument(
        id="doc-architecture",
        title="Architecture overview",
        snippet="Frontend SPA + FastAPI backend with clear module boundaries.",
        route="/docs#architecture",
        type="Docs",
        category="Architecture",
        intent="Open reference",
        action_label="Read architecture",
    ),
    SearchDocument(
        id="doc-workspace",
        title="Workspace file explorer",
        snippet="Tree selection with content viewer and persisted active file context.",
        route="/workspace",
        type="Workbench",
        category="Files",
        intent="Resume context",
        action_label="Open workspace",
    ),
    SearchDocument(
        id="doc-command-palette",
        title="Command palette",
        snippet="Keyboard-first command system opened with Cmd/Ctrl + K.",
        route="/",
        type="Command",
        category="Navigation",
        intent="Run command",
        action_label="Open command deck",
    ),
    SearchDocument(
        id="doc-product-os",
        title="Product OS modules",
        snippet="Original HQ modules for notes, launches, decisions, research, metrics, and changelog workflows.",
        route="/",
        type="Module",
        category="Homepage",
        intent="Inspect module",
        action_label="Review modules",
    ),
    SearchDocument(
        id="doc-handbook",
        title="Handbook surface",
        snippet="Process docs become a public operating manual for how Personal HQ is built and reviewed.",
        route="/docs",
        type="Docs",
        category="Handbook",
        intent="Open handbook",
        action_label="Read handbook",
    ),
    SearchDocument(
        id="doc-changelog",
        title="Changelog surface",
        snippet="Launch notes and release rhythm become part of the product website experience.",
        route="/docs",
        type="Docs",
        category="Changelog",
        intent="Check readiness",
        action_label="Review changelog",
    ),
    SearchDocument(
        id="command-launch-readiness",
        title="Launch readiness checklist",
        snippet="Review guided artifacts, command search, release confidence, and deferred editing scope before MVP2 launch.",
        route="/workspace",
        type="Command",
        category="Launch readiness",
        intent="Check readiness",
        action_label="Open readiness checklist",
    ),
    SearchDocument(
        id="command-mvp2-phases",
        title="MVP2 build phases",
        snippet="Phase 1 guided workspace, Phase 2 command search, and Phase 3 launch readiness ship together for MVP2.",
        route="/docs",
        type="Command",
        category="MVP2",
        intent="Open plan",
        action_label="Read MVP2 phases",
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
        or normalized in document.intent.lower()
        or normalized in document.action_label.lower()
    ]

    return matches[:limit]
