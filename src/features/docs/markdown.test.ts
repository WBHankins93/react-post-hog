import { describe, expect, it } from 'vitest';
import { renderMarkdown } from './markdown';

describe('renderMarkdown', () => {
  it('renders headings, list items, inline code, and fenced code blocks', () => {
    const markdown = [
      '# Title',
      '',
      '- first',
      '- second',
      '',
      'Use `Cmd+K`',
      '',
      '```ts',
      'const x = 1;',
      '```',
    ].join('\n');

    const html = renderMarkdown(markdown);

    expect(html).toContain('<h1>Title</h1>');
    expect(html).toContain('<ul>');
    expect(html).toContain('<li>first</li>');
    expect(html).toContain('<code>Cmd+K</code>');
    expect(html).toContain('<pre><code>const x = 1;</code></pre>');
  });
});
