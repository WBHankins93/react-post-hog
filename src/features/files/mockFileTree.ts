export type FileArtifact = {
  phase: string;
  readiness: 'ready' | 'needs-review' | 'blocked';
  summary: string;
  nextAction: string;
  owner: string;
};

export type FileNode = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  artifact?: FileArtifact;
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
        artifact: {
          phase: 'Phase 1 · Guided context',
          readiness: 'ready',
          summary: 'Defines the external story that frames the workbench for reviewers.',
          nextAction: 'Keep homepage messaging aligned with the MVP2 readiness panel.',
          owner: 'Product',
        },
      },
      {
        id: 'file-hq-launch',
        name: 'launch.plan',
        type: 'file',
        content:
          '# MVP2 Launch Plan\n\n1) Ship the polished MVP shell\n2) Add guided workspace prompts and recents\n3) Upgrade search into command discovery\n4) Show launch readiness and release confidence',
        artifact: {
          phase: 'Phase 1 · Guided context',
          readiness: 'needs-review',
          summary: 'Turns the MVP2 runway into a sequenced launch plan with visible next steps.',
          nextAction: 'Validate the launch checklist fields before wiring live task state.',
          owner: 'Launch',
        },
      },
    ],
  },
  {
    id: 'folder-modules',
    name: 'hq-apps',
    type: 'folder',
    children: [
      {
        id: 'file-app-projects',
        name: 'projects.app',
        type: 'file',
        content:
          '# Projects\n\nSprooutflow, portfolio work, the resume report product, and e-commerce venture experiments live here.',
        artifact: {
          phase: 'Phase 1 · Guided context',
          readiness: 'ready',
          summary: 'Defines the portfolio, agency, product, and venture surface for the HQ.',
          nextAction: 'Replace placeholders with the first real Sprooutflow and resume product entries.',
          owner: 'Product',
        },
      },
      {
        id: 'file-app-writing',
        name: 'writing.app',
        type: 'file',
        content:
          '# Writing\n\nBlogs, build logs, Reddit-style posts, and AI coaching notes become the public thinking layer.',
      },
      {
        id: 'file-app-about',
        name: 'about.sys',
        type: 'file',
        content:
          '# About\n\nResume, social links, current focus, and the story that connects GitHub, LinkedIn, portfolio work, ventures, and coaching.',
      },
    ],
  },
  {
    id: 'folder-ops',
    name: 'ops',
    type: 'folder',
    children: [
      {
        id: 'file-ops-research',
        name: 'research.db',
        type: 'file',
        content: '# Research\n\nCollect questions, references, and raw ideas before they become roadmap work.',
        artifact: {
          phase: 'Phase 2 · Search as command layer',
          readiness: 'needs-review',
          summary: 'Holds raw signals that should become searchable command context.',
          nextAction: 'Tag research entries with intent before expanding the search API.',
          owner: 'Research',
        },
      },
      {
        id: 'file-ops-changelog',
        name: 'changelog.md',
        type: 'file',
        content:
          '# Changelog\n\n- Phase 1: foundation and MVP process\n- Phase 2: HQ app surfaces\n- MVP2: guided workspace, command search, and launch readiness\n- Next: real content, deploy metadata, and static search',
        artifact: {
          phase: 'Phase 3 · Launch readiness',
          readiness: 'blocked',
          summary: 'Explains what shipped and what still needs release confidence.',
          nextAction: 'Connect changelog entries to checklist status after launch state is modeled.',
          owner: 'Release',
        },
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
