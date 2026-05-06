# Future Feature Ideas

Date: 2026-05-06

## Purpose

This document captures the next layer of product ideas for the PostHog-inspired Personal HQ direction without starting implementation. The intent is to preserve the agreed path before any visual/mascot exploration begins.

The product should borrow the **skeleton and interaction patterns** of a playful product website/workbench, not exact artwork or proprietary imagery. The visual identity, illustrations, and mascot should remain original.

## Near-term product direction

### 1. Finish PR-011 — Design system and layout refinement

Before adding more pages, finish the visual foundation already in progress:

- finalize color, spacing, typography, radius, shadow, and focus tokens
- make app chrome, docs, search, and workspace panels feel cohesive
- improve hierarchy, density, hover states, and active states
- keep visible UI changes screenshot-ready for review

### 2. Convert Overview into a true marketing homepage

The current overview is useful as a search demo, but the product needs a stronger public-facing landing surface.

Ideas to include:

- hero eyebrow, headline, pitch, and clear CTAs
- playful install command or terminal card
- product/module grid that links into Workspace and Docs
- small credibility/fun section such as changelog notes, handbook links, or launch notes
- search panel demoted below the hero or reframed as part of the product OS

### 3. Make the shell feel like an OS/file-browser website

Lean harder into the unique website/workbench metaphor.

Ideas to include:

- file-like navigation labels such as `home.mdx`, `workspace.app`, and `docs.mdx`
- sidebar utility row or footer controls like mode, zoom, or font controls
- window chrome around the main content area
- a small status strip that reinforces the app/workbench feel
- preserved keyboard accessibility and route behavior

### 4. Deepen search and result UX

This maps to PR-012 on the roadmap.

Ideas to include:

- result cards with type/category metadata
- richer snippets and destination labels
- distinct empty, loading, no-match, error, and success states
- arrow-key navigation between results
- enter-to-open selected result
- backend search fixtures expanded beyond the current small corpus

### 5. Improve workspace ergonomics

This maps to PR-013 on the roadmap.

Ideas to include:

- recent files or recent contexts
- persisted context history
- faster file switching
- better information scent in the file tree
- optional tabs or pinned contexts once the core flow feels stable

## Larger feature ideas

### Website mode / app mode toggle

Create a signature mode switch between a spacious marketing website and a denser app/workbench.

Possible implementation notes:

- persist a `displayMode` value such as `website` or `workspace`
- expose the toggle in the shell chrome
- apply mode-specific shell classes
- keep the same routes but alter density, chrome, and presentation

### Playful command palette actions

The command palette should become part of the personality, not just route navigation.

Possible commands:

- Open launch checklist
- Show changelog
- Toggle website mode
- Open random file
- Copy install command
- Focus search

### Original Product OS-style module cards

Use the idea of grouped product capabilities, but make the modules original to Personal HQ.

Possible modules:

- Notes / docs
- Tasks / launches
- Experiments
- Decisions
- Changelog
- Research
- Metrics
- Inbox

Each module should have a title, short description, visual cue, and either a route or a clear coming-soon state.

### Changelog and handbook surfaces

Expose the repo's strong process documentation as product content.

Possible pages:

- Changelog
- Handbook
- Decision log
- Roadmap
- Retrospective/release notes

These can reuse the existing markdown rendering pipeline and draw from existing docs where appropriate.

### Original illustration and mascot system

This is intentionally not implemented yet. The maintainer will explore the mascot and illustration direction separately.

Guidelines for later:

- do not copy PostHog artwork or characters
- create a distinct mascot/object language
- prefer lightweight SVG or CSS-native illustration components when implementation starts
- possible motifs: retro terminal, file folders, tiny workstation, toolbox, notebook, launch console, or a unique creature mascot

### Quality hardening

After the main UX direction is clearer, increase confidence with focused tests.

Areas to test:

- command palette behavior
- workspace state persistence
- markdown rendering edge cases
- search empty/loading/error/result states
- backend search case-insensitivity, limits, no matches, validation, and CORS config parsing

## Non-goals for this checkpoint

- no mascot or illustration implementation yet
- no copied imagery from PostHog
- no unrelated UI rebuild outside the agreed homepage, shell, search, and mode-toggle sequence
- no backend expansion beyond what is needed for search UX depth
- no authentication, collaboration, or real-time features yet

## Recommended next sequence

1. Finish PR-011 visual/design-system polish.
2. Rework Overview into the true PostHog-inspired marketing homepage.
3. Upgrade AppShell into a more playful OS/file-browser frame.
4. Complete PR-012 search UX depth.
5. Add website/app mode toggle.
6. Add original product modules, changelog, handbook, and illustration system.

## Implementation note

The first implementation pass should stop short of final mascot/illustration production. The shell, homepage, search UX, mode toggle, and module/changelog/handbook structure can move forward while final artwork remains a separate maintainer-led review.
