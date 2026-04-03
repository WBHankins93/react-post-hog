# MVP Scope

## In scope (must ship)

1. App shell layout
   - sidebar nav
   - primary content pane
   - top command trigger area

2. Keyboard command palette
   - open/close (`Cmd/Ctrl + K`)
   - execute route-level actions

3. File system surface
   - tree navigation
   - file/folder selection
   - file detail/render pane

4. Stateful workspace
   - persist active file/view
   - persist sidebar collapse + recent context

5. Docs rendering baseline
   - readable typography
   - code blocks
   - heading anchors/TOC (if low effort)

## Out of scope (MVP non-goals)

- authentication/authorization
- collaborative editing
- advanced permissions
- real-time subscriptions
- complex drag-and-drop windowing
- AI assistant workflows
- enterprise analytics layer

## Acceptance criteria

MVP is complete when:

- all 5 in-scope capabilities are merged to `main`
- CI quality gates pass on `main`
- frontend + backend deployed with documented runbook
- README and docs are sufficient for external onboarding

