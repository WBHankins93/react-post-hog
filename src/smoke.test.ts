import { describe, expect, it } from 'vitest';
import { router } from './routes';

describe('router', () => {
  it('defines workspace and docs routes', () => {
    const routeConfig = JSON.stringify(router.routes);

    expect(routeConfig).toContain('workspace');
    expect(routeConfig).toContain('docs');
  });

  it('includes overview route label', () => {
    const routeConfig = JSON.stringify(router.routes);
    expect(routeConfig).toContain('Overview');
  });
});
