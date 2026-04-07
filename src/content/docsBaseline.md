# Docs quality baseline

This page validates the **PR-006 docs renderer** baseline for Personal HQ.

## Why this matters

- Improves readability for long-form writing.
- Makes code snippets easy to scan and copy.
- Establishes a reusable visual style for future product docs.

## Keyboard workflow

Use the command palette with `Cmd/Ctrl + K` and route between sections quickly.

## Example code block

```ts
export function createPreviewRoute(path: string) {
  return {
    path,
    cache: 'preview',
  };
}
```

## Next step after this phase

Ship backend scaffold work (`/health`) in PR-007.
