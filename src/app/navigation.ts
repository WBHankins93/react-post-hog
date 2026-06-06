import type { DisplayMode } from './workspaceState';

export type NavigationItem = {
  to: string;
  label: string;
  description: string;
  end?: boolean;
};

export const coreNavigationItems: NavigationItem[] = [
  { to: '/', label: 'home.mdx', description: 'Marketing surface', end: true },
  { to: '/workspace', label: 'workspace.app', description: 'File workbench' },
  { to: '/docs', label: 'docs.mdx', description: 'Handbook docs' },
];

export const hqNavigationItems: NavigationItem[] = [
  { to: '/projects', label: 'projects.app', description: 'Work and ventures' },
  { to: '/writing', label: 'writing.app', description: 'Blogs and posts' },
  { to: '/gallery', label: 'gallery.app', description: 'Visual archive' },
  { to: '/tools', label: 'tools.app', description: 'Tech radar' },
  { to: '/about', label: 'about.sys', description: 'Resume and links' },
];

export const navigationItems: NavigationItem[] = [...coreNavigationItems, ...hqNavigationItems];

const routeLabels = new Map(
  navigationItems.map((item) => [item.to, item.label]),
);

export function getModeLabel(displayMode: DisplayMode) {
  return displayMode === 'website' ? 'Website mode' : 'Workspace mode';
}

export function getRouteLabel(pathname: string) {
  return routeLabels.get(pathname) ?? 'not-found.err';
}

export function isKnownRoute(pathname: string) {
  return routeLabels.has(pathname);
}
