export type FileNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
};

export const mockFileTree: FileNode[] = [
  {
    id: 'folder-hq',
    name: 'personal-hq',
    type: 'folder',
    children: [
      {
        id: 'file-hq-home',
        name: 'home.mdx',
        type: 'file',
        content:
          '# Personal HQ\n\nA playful product website and workbench skeleton: marketing homepage, OS chrome, command deck, docs, search, and original module cards.',
      },
      {
        id: 'file-hq-launch',
        name: 'launch.plan',
        type: 'file',
        content:
          '# Launch Plan\n\n1) Finish PR-011 visual polish\n2) Rework the homepage\n3) Upgrade the file-browser shell\n4) Deepen PR-012 search UX',
      },
    ],
  },
  {
    id: 'folder-modules',
    name: 'modules',
    type: 'folder',
    children: [
      {
        id: 'file-modules-decisions',
        name: 'decisions.adr',
        type: 'file',
        content: '# Decisions\n\nKeep small product and architecture decisions close to the workbench.',
      },
      {
        id: 'file-modules-research',
        name: 'research.db',
        type: 'file',
        content: '# Research\n\nCollect questions, references, and raw ideas before they become roadmap work.',
      },
      {
        id: 'file-modules-changelog',
        name: 'changelog.md',
        type: 'file',
        content: '# Changelog\n\n- PR-011: visual system polish\n- PR-012: search result UX depth\n- Illustration and mascot work: deferred for maintainer exploration',
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
