# Personal HQ MVP Process

Last updated: 2026-06-06

## Product Purpose

Personal HQ is the bridge between code, career, agency work, product experiments, writing, social proof, and future coaching offers.

GitHub shows code. LinkedIn shows job history. A traditional portfolio shows selected skills. Personal HQ should connect all of it into one hosted operating surface: work, resume, portfolio, Sprooutflow, blogs, social links, AI coaching, e-commerce ventures, experiments, and public build logs.

## MVP Principles

- Build the real HQ as the first screen. Avoid a marketing-only landing page.
- Use the OS metaphor for navigation and discovery, not decoration alone.
- Keep routes shareable and crawlable so the hosted site still behaves like a normal website.
- Keep ventures grouped intentionally. E-commerce stores can appear as "ventures" or "labs" without implying they are personal-service brands.
- Prefer static, structured content for the first hosted release. Add backend features only when a dynamic workflow justifies the complexity.
- Add tests with each phase so the interface can become playful without becoming fragile.

## Phase 1: Foundation And Hosting Readiness

Goal: make the repo reliable enough to keep building and eventually host.

Scope:

- Keep generated screenshots and local image review folders out of PRs.
- Document the MVP process, validation gates, and hosting assumptions.
- Keep the existing OS shell, command palette, persistence, search fallback, route error boundary, and e2e smoke flow working.
- Confirm that Vercel can host the frontend as a static Vite app.

Acceptance criteria:

- `.DS_Store` and local UI image archives are ignored.
- README references the MVP process and e2e command.
- Unit tests, typecheck, lint, production build, and e2e smoke pass.
- No accidental image assets are staged.

## Phase 2: HQ Information Architecture

Goal: create the first set of Personal HQ "apps" that define the product.

Core apps:

- `projects.app`: selected work, experiments, e-commerce ventures, Sprooutflow work, and portfolio case studies.
- `writing.app`: blogs, build notes, Reddit-style posts, lessons, and public thinking.
- `gallery.app`: visual work, UI explorations, product photos when ready, and snapshots from experiments.
- `tools.app`: technologies, products, frameworks, AI tools, and software worth tracking.
- `about.sys`: resume, personal story, contact links, social profiles, and current focus.

Acceptance criteria:

- Each app has a route.
- Each app renders from a shared content model rather than hard-coded one-off page markup.
- Sidebar navigation and command palette can open each app.
- The homepage explains the HQ purpose clearly.
- E2E smoke covers at least one new app route.

## Phase 3: Hosted MVP Content Pass

Goal: make the first public version worth sharing.

Minimum content:

- 3 to 5 strong project entries.
- Sprooutflow as an agency/work venture.
- Resume/report generator as an active product.
- 2 to 3 e-commerce ventures as private-label or lab ventures.
- Blog/build-log placeholders with at least one real entry.
- About/resume/contact surface.
- Social links: GitHub, LinkedIn, Instagram, Reddit, and other channels as appropriate.

Acceptance criteria:

- A stranger understands who Ben is, what he builds, what services/products exist, and where to go next.
- Every important external surface has a clear link.
- Draft or coming-soon items are labeled honestly.

## Phase 4: Deploy And Release

Goal: publish the first stable hosted version.

Scope:

- Configure frontend hosting.
- Add production metadata, OpenGraph, favicon, and social preview content.
- Add analytics after privacy posture is decided.
- Add deployment runbook updates.
- Keep CI quality gates green.

Acceptance criteria:

- Production URL is live.
- Preview deploys work for PRs.
- README and runbook explain local and hosted workflows.
- The first release can be shared publicly without caveats beyond clearly marked coming-soon apps.
