import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadWorkspaceState, saveWorkspaceState } from './workspaceState';

function createLocalStorage() {
  const values = new Map<string, string>();

  return {
    clear: () => values.clear(),
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
}

describe('workspace state persistence', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { localStorage: createLocalStorage() });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('falls back to defaults when storage is corrupt', () => {
    window.localStorage.setItem('personal-hq.workspace-state.v1', '{broken');

    expect(loadWorkspaceState()).toMatchObject({
      selectedFileId: null,
      sidebarCollapsed: false,
      lastRoute: '/',
      displayMode: 'website',
    });
  });

  it('sanitizes persisted values before returning state', () => {
    window.localStorage.setItem(
      'personal-hq.workspace-state.v1',
      JSON.stringify({
        selectedFileId: 12,
        sidebarCollapsed: 'yes',
        lastRoute: '/docs',
        displayMode: 'terminal',
      }),
    );

    expect(loadWorkspaceState()).toMatchObject({
      selectedFileId: null,
      sidebarCollapsed: false,
      lastRoute: '/docs',
      displayMode: 'website',
    });
  });

  it('does nothing in non-browser environments', () => {
    vi.stubGlobal('window', undefined);

    expect(loadWorkspaceState().lastRoute).toBe('/');
    expect(() =>
      saveWorkspaceState({
        selectedFileId: 'file-hq-home',
        sidebarCollapsed: true,
        lastRoute: '/workspace',
        displayMode: 'workspace',
      }),
    ).not.toThrow();
  });
});
