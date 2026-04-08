import { describe, expect, it, vi } from 'vitest';
import { searchWorkspace } from './searchApi';

describe('searchWorkspace', () => {
  it('returns empty results for blank queries', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const response = await searchWorkspace('   ');

    expect(response).toEqual({ query: '', count: 0, results: [] });
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });

  it('requests backend search endpoint for non-empty queries', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        query: 'workspace',
        count: 1,
        results: [
          {
            id: 'doc-workspace',
            title: 'Workspace file explorer',
            snippet: 'Tree selection with content viewer.',
            route: '/workspace',
          },
        ],
      }),
    } as Response);

    const response = await searchWorkspace('workspace');

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(response.count).toBe(1);

    fetchMock.mockRestore();
  });
});
