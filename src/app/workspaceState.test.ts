import { describe, expect, it } from 'vitest';
import { updateRecentFileIds } from './workspaceState';

describe('updateRecentFileIds', () => {
  it('places the selected file first without duplicating it', () => {
    expect(updateRecentFileIds(['file-a', 'file-b'], 'file-b')).toEqual(['file-b', 'file-a']);
  });

  it('keeps only the most recent four files', () => {
    expect(updateRecentFileIds(['file-a', 'file-b', 'file-c', 'file-d'], 'file-e')).toEqual([
      'file-e',
      'file-a',
      'file-b',
      'file-c',
    ]);
  });
});
