function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function applyInlineFormatting(value: string) {
  let formatted = escapeHtml(value);

  formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
  );

  return formatted;
}

export function renderMarkdown(markdown: string) {
  const lines = markdown.split(/\r?\n/);

  const html: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let inList = false;

  function closeListIfNeeded() {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  }

  lines.forEach((line) => {
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        closeListIfNeeded();
        inCodeBlock = true;
        codeLines = [];
      } else {
        const code = escapeHtml(codeLines.join('\n'));
        html.push(`<pre><code>${code}</code></pre>`);
        inCodeBlock = false;
      }
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      closeListIfNeeded();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${applyInlineFormatting(headingMatch[2])}</h${level}>`);
      return;
    }

    const listMatch = line.match(/^-\s+(.+)$/);
    if (listMatch) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${applyInlineFormatting(listMatch[1])}</li>`);
      return;
    }

    if (!line.trim()) {
      closeListIfNeeded();
      return;
    }

    closeListIfNeeded();
    html.push(`<p>${applyInlineFormatting(line)}</p>`);
  });

  if (inCodeBlock) {
    html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
  }

  closeListIfNeeded();

  return html.join('\n');
}
