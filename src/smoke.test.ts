import { describe, expect, it } from 'vitest';
import { routes } from './routes';
import { collectFiles, mockFileTree } from './features/files/mockFileTree';

describe('router', () => {
  it('defines workspace, docs, and HQ app routes', () => {
    const routeConfig = JSON.stringify(routes);

    expect(routeConfig).toContain('workspace');
    expect(routeConfig).toContain('docs');
    expect(routeConfig).toContain('projects');
    expect(routeConfig).toContain('writing');
    expect(routeConfig).toContain('gallery');
    expect(routeConfig).toContain('tools');
    expect(routeConfig).toContain('about');
  });
});

describe('file tree data', () => {
  it('includes at least one file for the viewer', () => {
    const files = collectFiles(mockFileTree);
    expect(files.length).toBeGreaterThan(0);
  });
});
