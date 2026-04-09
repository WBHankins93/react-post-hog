# Post-MVP Roadmap (after PR-010)

Date: 2026-04-08

## Guiding goals

1. Raise product UX quality toward a more analytics-workbench feel.
2. Expand core workflows without breaking keyboard-first and docs-quality principles.
3. Improve confidence via stronger testing and release operations.

## Proposed milestone sequence

### PR-011 — Design system and layout refinement 🚧 In progress

- establish tokens (colors, spacing, typography) and reusable primitives
- improve shell hierarchy, density, and interaction states
- align docs + app chrome visual language

### PR-012 — Search and result UX depth

- richer result cards/snippets
- keyboard navigation and selection improvements
- empty/loading/error state clarity

### PR-013 — Navigation and workspace ergonomics

- faster context switching patterns
- recents/history affordances
- improved information scent in file tree and tabs

### PR-014 — Quality hardening

- focused component/integration tests for key UI/state flows
- backend API tests for search behavior and failure modes
- lightweight end-to-end smoke validation in preview

### PR-015 — Productization pass

- release notes discipline and changelog automation
- baseline analytics/telemetry hooks
- stability/performance sweep

## Scope guardrails

- Keep PRs capability-scoped; avoid large mixed concerns.
- Require screenshot + test evidence for any visible UX change.
- Maintain preview-first validation before merges to `main`.
