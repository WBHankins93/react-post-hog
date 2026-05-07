# MVP2 Readiness Brief

Date: 2026-05-06

## Product posture

MVP2 should turn Personal HQ from a polished static workbench into a guided operating workspace. The product should answer three questions on every surface:

1. What context am I in?
2. What should I do next?
3. How confident are we that this is ready to ship?

## MVP2 pillars

### 1. Guided workspace

- Add recents, lightweight tabs, and next-action prompts to the workspace.
- Make selected files feel like product artifacts instead of raw text previews.
- Keep keyboard-first navigation and persisted context as non-negotiables.

### 2. Search as command layer

- Blend files, docs, and route actions in the same search result stack.
- Add stronger result metadata, active-result affordances, and empty state coaching.
- Preserve the backend API boundary so search can grow without rewriting the shell.

### 3. Launch readiness

- Surface runbook status, release notes, and test confidence in the app chrome.
- Treat the changelog as a product surface, not only a repository artifact.
- Make the next deploy checkpoint visible to non-technical reviewers.

## Definition of ready

MVP2 planning is ready when:

- The homepage states the MVP2 runway clearly.
- The workspace includes at least one guided next-action pattern.
- Search has a defined upgrade path from query results to command discovery.
- Docs describe readiness, acceptance criteria, and non-goals.

## Build phases

Implementation now includes all three focused phases in [`mvp2-build-phases.md`](mvp2-build-phases.md): guided workspace artifacts, search-as-command, and launch readiness.

## Design acceptance criteria

- The hero avoids placeholder install commands and instead explains current product readiness.
- Module cards connect each surface to an outcome reviewers can validate.
- MVP2 tracks include evidence statements, not just theme names.
- The workspace viewer previews how artifacts will become guided launch objects.
- Visual polish supports hierarchy, readability, and state clarity before adding new features.

## Non-goals for MVP2

- Authentication and team permissions.
- Collaborative editing.
- AI-generated workflow automation.
- Complex drag-and-drop windowing.
