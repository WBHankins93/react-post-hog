# PostHog OS Website Research

Last researched: 2026-06-05

## Source Notes

- PostHog's own writeup frames the OS redesign as a response to large technical websites where readers open many indistinguishable tabs. The goal is multitasking: users can keep several articles, demos, games, and product pages open inside one browser viewport.
- Their implementation includes window snapping, keyboard shortcuts, a bookmark app, an Explorer-like store, presentation-like product pages, an editable document surface, forum/inbox metaphors, media-player views, spreadsheet-formatted pages, desktop backgrounds, and a screensaver.
- PostHog describes the first experience as intentionally jarring. That is useful inspiration, but it means this project should preserve normal web fallbacks and clear routing so novelty does not trap visitors.
- Technically, PostHog separates site chrome from app content. Their Gatsby wrapper renders the OS shell, while each "app" is still a page. Shared content is increasingly structured: product pages use JSON-like product data, and customer/reference data is centralized instead of hard-coded.
- The website repo README says PostHog treats the website like a product and expects it to hold docs, blog, handbook, product features, roadmap, pricing, community features, and visual systems that "spark joy."

## Takeaways For Personal HQ

- Treat the OS metaphor as information architecture, not decoration. Windows, files, docs, galleries, and command surfaces should help visitors compare and move between bodies of work.
- Keep direct URLs and route restoration predictable. A personal portfolio still needs shareable pages and graceful error states.
- Store repeated content in small data modules over time: projects, tools followed, posts, gallery items, work history, references, and changelog entries.
- Make the first screen a usable HQ, not a landing page explaining an HQ. The interface itself should carry the personality.
- Add playful surfaces gradually, behind solid navigation and tests. A surprising UI only works when keyboard movement, fallbacks, and failure messages are boringly reliable.

## Sources

- [Why our website looks like an operating system](https://posthog.com/blog/why-os)
- [How PostHog.com works](https://posthog.com/handbook/engineering/posthog-com/how-posthog-website-works)
- [PostHog.com repository README](https://github.com/PostHog/posthog.com)
