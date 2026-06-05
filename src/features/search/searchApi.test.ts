import { describe, expect, it, vi } from 'vitest';
import { SearchApiError, searchWorkspace } from './searchApi';

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
            type: 'Workbench',
            category: 'Files',
            intent: 'Resume context',
            actionLabel: 'Open workspace',
          },
        ],
      }),
    } as Response);

    const response = await searchWorkspace('workspace');

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(response.count).toBe(1);

    fetchMock.mockRestore();
  });

  it('throws a traceable error for failed backend responses', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
    } as Response);

    await expect(searchWorkspace('workspace')).rejects.toMatchObject({
      name: 'SearchApiError',
      message: 'Search request failed with status 503',
    });

    fetchMock.mockRestore();
  });

  it('wraps network failures with backend guidance', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));

    await expect(searchWorkspace('workspace')).rejects.toBeInstanceOf(SearchApiError);
    await expect(searchWorkspace('workspace')).rejects.toThrow('backend running on port 8000');

    fetchMock.mockRestore();
  });
});
