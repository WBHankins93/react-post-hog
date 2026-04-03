import { describe, expect, it } from 'vitest';
import { router } from './routes';
import { collectFiles, mockFileTree } from './features/files/mockFileTree';

describe('router', () => {
  it('defines workspace and docs routes', () => {
    const routeConfig = JSON.stringify(router.routes);

    expect(routeConfig).toContain('workspace');
    expect(routeConfig).toContain('docs');
  });
});

describe('file tree data', () => {
  it('includes at least one file for the viewer', () => {
    const files = collectFiles(mockFileTree);
    expect(files.length).toBeGreaterThan(0);
  });
});
