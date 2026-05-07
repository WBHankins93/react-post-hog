export type LaunchReadinessStatus = 'ready' | 'review' | 'deferred';

export type LaunchReadinessItem = {
  id: string;
  label: string;
  status: LaunchReadinessStatus;
  detail: string;
};

export const launchReadinessItems: LaunchReadinessItem[] = [
  {
    id: 'guided-artifacts',
    label: 'Guided artifacts',
    status: 'ready',
    detail: 'Files explain phase, owner, readiness, summary, and next action.',
  },
  {
    id: 'command-search',
    label: 'Command search',
    status: 'ready',
    detail: 'Search results now carry intent and action labels for command-like navigation.',
  },
  {
    id: 'release-confidence',
    label: 'Release confidence',
    status: 'ready',
    detail: 'Launch checklist status is visible in the app before deployment automation.',
  },
  {
    id: 'editing-workflows',
    label: 'Editing workflows',
    status: 'deferred',
    detail: 'Editing stays out of MVP2 so review can focus on guidance and readiness.',
  },
];

export function getLaunchReadinessSummary(items = launchReadinessItems) {
  const readyCount = items.filter((item) => item.status === 'ready').length;
  const reviewCount = items.filter((item) => item.status === 'review').length;
  const deferredCount = items.filter((item) => item.status === 'deferred').length;

  return {
    readyCount,
    reviewCount,
    deferredCount,
    totalCount: items.length,
    confidenceLabel: `${readyCount}/${items.length} ready`,
  };
}
