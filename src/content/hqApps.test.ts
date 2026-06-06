import { describe, expect, it } from 'vitest';
import { hqApps } from './hqApps';

describe('hqApps content model', () => {
  it('defines the required MVP app surfaces', () => {
    expect(hqApps.map((app) => app.slug)).toEqual([
      'projects',
      'writing',
      'gallery',
      'tools',
      'about',
    ]);
  });

  it('keeps every app routable and populated', () => {
    for (const app of hqApps) {
      expect(app.route).toBe(`/${app.slug}`);
      expect(app.fileLabel).toMatch(/\.(app|sys)$/);
      expect(app.items.length).toBeGreaterThanOrEqual(3);
    }
  });
});
