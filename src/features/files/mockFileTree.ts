export type FileNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
};

export const mockFileTree: FileNode[] = [
  {
    id: 'folder-docs',
    name: 'docs',
    type: 'folder',
    children: [
      {
        id: 'file-docs-overview',
        name: 'overview.md',
        type: 'file',
        content:
          '# Personal HQ\n\nThis file explorer is the PR-004 foundation. Next: persistence in PR-005.',
      },
      {
        id: 'file-docs-roadmap',
        name: 'roadmap.md',
        type: 'file',
        content: '# Roadmap\n\n- PR-004: file tree + viewer\n- PR-005: state persistence',
      },
    ],
  },
  {
    id: 'folder-notes',
    name: 'notes',
    type: 'folder',
    children: [
      {
        id: 'file-notes-today',
        name: 'today.txt',
        type: 'file',
        content: 'Today focus:\n1) Keyboard flow\n2) File explorer\n3) Persisted workspace',
      },
    ],
  },
];

export function collectFiles(nodes: FileNode[]): FileNode[] {
  const files: FileNode[] = [];

  for (const node of nodes) {
    if (node.type === 'file') {
      files.push(node);
      continue;
    }

    if (node.children) {
      files.push(...collectFiles(node.children));
    }
  }

  return files;
}
