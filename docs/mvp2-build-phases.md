# MVP2 Build Phases

Date: 2026-05-07

MVP2 now ships all three planned phases together in this PR so the MVP is reviewable as one complete runway: guided workspace artifacts, search-as-command, and launch readiness.

## Phase 1 — Guided workspace artifacts

Goal: make every selected file explain what it is, why it matters, who owns it, and what should happen next.

Shipped scope:

- Artifact metadata for mock workspace files.
- Readiness states for selected artifacts.
- Recently opened files persisted with workspace state.
- A viewer card that turns raw file previews into guided launch context.

Acceptance criteria:

- Selecting a file updates the artifact summary and next action.
- Recently selected files are available as quick context switches.
- Readiness status is visible before editing or automation is introduced.

## Phase 2 — Search as command layer

Goal: evolve search from content lookup into a command surface that can open files, routes, and guided actions.

Shipped scope:

- Search documents include intent and action labels.
- Readiness and MVP2 phase commands are discoverable from search.
- Result cards distinguish metadata from command intent.
- Enter continues to run the active navigation command.

Acceptance criteria:

- Searching for launch readiness returns a command-style result.
- Every result explains what action it will run.
- Empty and loading states keep coaching users toward command, module, and readiness queries.

## Phase 3 — Launch readiness

Goal: expose release confidence in the product surface.

Shipped scope:

- Launch readiness checklist data.
- Readiness summary count shown on the homepage.
- Workspace launch checklist with ready and deferred statuses.
- Deferred editing scope called out as a deliberate MVP boundary.

Acceptance criteria:

- Reviewers can see what is ready and what is deferred without reading repo-only docs.
- Launch confidence is represented as a visible count.
- Deferred scope does not block MVP2 review because it is intentionally excluded.
