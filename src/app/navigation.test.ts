import { describe, expect, it } from 'vitest';
import { getModeLabel, getRouteLabel, isKnownRoute } from './navigation';

describe('navigation helpers', () => {
  it('formats mode and route labels for the window chrome', () => {
    expect(getModeLabel('website')).toBe('Website mode');
    expect(getModeLabel('workspace')).toBe('Workspace mode');
    expect(getRouteLabel('/')).toBe('home.mdx');
    expect(getRouteLabel('/workspace')).toBe('workspace.app');
    expect(getRouteLabel('/projects')).toBe('projects.app');
  });

  it('rejects unknown restored routes', () => {
    expect(isKnownRoute('/docs')).toBe(true);
    expect(isKnownRoute('/tools')).toBe(true);
    expect(isKnownRoute('/missing')).toBe(false);
  });
});
