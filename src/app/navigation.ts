import type { DisplayMode } from './workspaceState';

export type NavigationItem = {
  to: string;
  label: string;
  description: string;
  end?: boolean;
};

export const navigationItems: NavigationItem[] = [
  { to: '/', label: 'home.mdx', description: 'Marketing surface', end: true },
  { to: '/workspace', label: 'workspace.app', description: 'File workbench' },
  { to: '/docs', label: 'docs.mdx', description: 'Handbook docs' },
];

const routeLabels = new Map(
  navigationItems.map((item) => [item.to, item.to === '/' ? 'home.mdx' : item.to.slice(1)]),
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
