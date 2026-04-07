import { useMemo } from 'react';
import docsBaselineMarkdown from '../content/docsBaseline.md?raw';
import { renderMarkdown } from '../features/docs/markdown';

export function DocsPage() {
  const docsHtml = useMemo(() => renderMarkdown(docsBaselineMarkdown), []);

  return (
    <section>
      <p className="eyebrow">Docs</p>
      <h2>Documentation surface</h2>
      <article className="docsProse" dangerouslySetInnerHTML={{ __html: docsHtml }} />
    </section>
  );
}
