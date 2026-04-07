export type WorkspaceState = {
  selectedFileId: string | null;
  sidebarCollapsed: boolean;
  lastRoute: string;
};

const STORAGE_KEY = 'personal-hq.workspace-state.v1';

const defaultState: WorkspaceState = {
  selectedFileId: null,
  sidebarCollapsed: false,
  lastRoute: '/',
};

export function loadWorkspaceState(): WorkspaceState {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<WorkspaceState>;

    return {
      selectedFileId:
        typeof parsed.selectedFileId === 'string' || parsed.selectedFileId === null
          ? parsed.selectedFileId
          : defaultState.selectedFileId,
      sidebarCollapsed:
        typeof parsed.sidebarCollapsed === 'boolean'
          ? parsed.sidebarCollapsed
          : defaultState.sidebarCollapsed,
      lastRoute: typeof parsed.lastRoute === 'string' ? parsed.lastRoute : defaultState.lastRoute,
    };
  } catch {
    return defaultState;
  }
}

export function saveWorkspaceState(state: WorkspaceState) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
