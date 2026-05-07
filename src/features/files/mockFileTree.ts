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
          '# MVP2 Launch Plan\n\n1) Ship the polished MVP shell\n2) Add guided workspace prompts and recents\n3) Upgrade search into command discovery\n4) Show launch readiness and release confidence',
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
        content: '# Changelog\n\n- PR-011: visual system polish completed for MVP review\n- PR-012: search result UX depth\n- MVP2: guided workspace, command search, and launch readiness',
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
