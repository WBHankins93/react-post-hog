import { describe, expect, it } from 'vitest';
import { getLaunchReadinessSummary, launchReadinessItems } from './launchReadiness';

describe('getLaunchReadinessSummary', () => {
  it('summarizes ready and deferred readiness items', () => {
    const summary = getLaunchReadinessSummary(launchReadinessItems);

    expect(summary.readyCount).toBe(3);
    expect(summary.deferredCount).toBe(1);
    expect(summary.confidenceLabel).toBe('3/4 ready');
  });
});
