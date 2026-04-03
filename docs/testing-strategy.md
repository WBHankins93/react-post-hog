# Testing Strategy

## Goals

- protect critical interaction flows
- keep feedback loop fast for small PRs
- avoid overengineering in MVP

## MVP testing pyramid

1. **Static checks (required in CI)**
   - lint
   - typecheck

2. **Unit tests (required for critical logic)**
   - workspace state reducers/store behavior
   - command registry behavior
   - utility functions

3. **Integration tests (targeted)**
   - command palette open/execute behavior
   - file tree selection to content pane update

4. **E2E smoke tests (minimal)**
   - page boot + core navigation path

## Backend testing

- API unit tests for search logic
- endpoint tests for `/health` and `/search`

## Test quality policy

- every bug fix includes at least one test if practical
- flaky tests are fixed or removed quickly
- fast, deterministic tests are preferred over broad brittle suites

## Definition of done for feature PRs

- acceptance criteria satisfied
- relevant tests added/updated
- CI green
- PR evidence complete (template + screenshots if UI visible)

