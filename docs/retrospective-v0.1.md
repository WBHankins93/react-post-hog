# v0.1 Retrospective (PR-010)

Date: 2026-04-08

## Release summary

`v0.1` marks completion of the planned MVP sequence (PR-001 through PR-010), delivering:

- React + TypeScript + Vite frontend foundation
- keyboard-first command palette
- file tree + viewer + persisted workspace state
- docs rendering baseline
- FastAPI backend scaffold and search endpoint integration
- deployment strategy and environment parity for preview/production

## What went well

1. **Small PR workflow stayed effective**
   - Capability-scoped milestones made it easier to reason about scope and keep momentum.
2. **Frontend and backend integration remained incremental**
   - `/health` and `/search` progression reduced integration risk.
3. **Operational maturity improved before release**
   - Environment templates and deployment manifests clarified promotion flow.

## What was challenging

1. **Scope pressure between UX polish and shipping velocity**
   - UI quality goals competed with backend/deployment work during MVP.
2. **Cross-surface consistency**
   - Docs, app shell, and search experience need a stronger shared design language.
3. **Evidence discipline**
   - PR-level screenshots/test evidence were defined early but should be stricter for post-MVP work.

## Key lessons

- Keep milestone definitions crisp, but include explicit non-goals per milestone to avoid spillover.
- Start design system conventions earlier in the lifecycle to reduce retrofit cost.
- Maintain release-readiness checklists throughout milestones, not only near release.

## Follow-up actions

- Track post-MVP milestones in `docs/roadmap-post-mvp.md`.
- Keep MVP docs as a stable baseline and avoid retroactive churn.
- Preserve the small-PR process while raising testing/observability expectations.
