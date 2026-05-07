import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CommandPalette } from '../components/CommandPalette';
import { loadWorkspaceState, saveWorkspaceState } from './workspaceState';
import type { DisplayMode } from './workspaceState';

const navigation = [
  { to: '/', label: 'home.mdx', description: 'MVP2 runway', end: true },
  { to: '/workspace', label: 'workspace.app', description: 'Guided workbench' },
  { to: '/docs', label: 'docs.mdx', description: 'Handbook docs' },
];

export function AppShell() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => loadWorkspaceState().sidebarCollapsed);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(() => loadWorkspaceState().displayMode);
  const [hasRestoredRoute, setHasRestoredRoute] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const modeLabel = displayMode === 'website' ? 'Website mode' : 'Workspace mode';

  const commands = useMemo(
    () => [
      { id: 'go-overview', label: 'Open home.mdx', run: () => navigate('/') },
      {
        id: 'go-workspace',
        label: 'Open workspace.app',
        run: () => navigate('/workspace'),
      },
      { id: 'go-docs', label: 'Open docs.mdx', run: () => navigate('/docs') },
      {
        id: 'toggle-mode',
        label: displayMode === 'website' ? 'Switch to workspace mode' : 'Switch to website mode',
        run: () => setDisplayMode((previous) => (previous === 'website' ? 'workspace' : 'website')),
      },
      {
        id: 'toggle-sidebar',
        label: isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar',
        run: () => setIsSidebarCollapsed((previous) => !previous),
      },
    ],
    [displayMode, isSidebarCollapsed, navigate],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';

      if (isShortcut) {
        event.preventDefault();
        setIsPaletteOpen((previous) => !previous);
      }

      if (event.key === 'Escape') {
        setIsPaletteOpen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (hasRestoredRoute) {
      return;
    }

    const restoredRoute = loadWorkspaceState().lastRoute;
    if (restoredRoute && restoredRoute !== location.pathname) {
      navigate(restoredRoute, { replace: true });
    }

    setHasRestoredRoute(true);
  }, [hasRestoredRoute, location.pathname, navigate]);

  useEffect(() => {
    const currentState = loadWorkspaceState();
    saveWorkspaceState({
      ...currentState,
      sidebarCollapsed: isSidebarCollapsed,
      displayMode,
      lastRoute: location.pathname,
    });
  }, [displayMode, isSidebarCollapsed, location.pathname]);

  return (
    <div className={`shell shell--${displayMode}Mode`}>
      <aside className={`shell__sidebar${isSidebarCollapsed ? ' shell__sidebar--collapsed' : ''}`}>
        <div className="shell__brandCluster">
          <p className="shell__brandMark">HQ</p>
          <div>
            <h1 className="shell__title">Personal HQ</h1>
            <p className="shell__subtitle">MVP2 runway</p>
          </div>
        </div>

        <button className="shell__commandButton" type="button" onClick={() => setIsPaletteOpen(true)}>
          ⌘K command deck
        </button>
        <button
          className="shell__commandButton shell__commandButton--ghost"
          type="button"
          onClick={() => setDisplayMode((previous) => (previous === 'website' ? 'workspace' : 'website'))}
        >
          {modeLabel}
        </button>
        <button
          className="shell__commandButton shell__commandButton--ghost"
          type="button"
          onClick={() => setIsSidebarCollapsed((previous) => !previous)}
        >
          {isSidebarCollapsed ? 'Expand files' : 'Collapse files'}
        </button>

        {!isSidebarCollapsed && (
          <>
            <p className="shell__routeHint">Current file: {location.pathname === '/' ? '/home' : location.pathname}</p>
            <nav className="shell__nav" aria-label="Primary navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `shell__navLink${isActive ? ' shell__navLink--active' : ''}`
                  }
                >
                  <span className="shell__navFile">{item.label}</span>
                  <span className="shell__navDescription">{item.description}</span>
                </NavLink>
              ))}
            </nav>

            <div className="shell__utilityPanel" aria-label="Workbench utilities">
              <p className="shell__utilityTitle">Workbench</p>
              <div className="shell__utilityRow">
                <span>Mode</span>
                <strong>{displayMode}</strong>
              </div>
              <div className="shell__utilityRow">
                <span>Stage</span>
                <strong>MVP2</strong>
              </div>
              <div className="shell__utilityRow">
                <span>Focus</span>
                <strong>Guidance</strong>
              </div>
            </div>
          </>
        )}
      </aside>
      <main className="shell__content">
        <div className="shell__window" aria-label="Personal HQ workbench window">
          <div className="shell__windowBar">
            <div className="shell__trafficLights" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p>{modeLabel} · {location.pathname === '/' ? 'home.mdx' : location.pathname.slice(1)}</p>
          </div>
          <div className="shell__windowBody">
            <Outlet />
          </div>
        </div>
      </main>

      <CommandPalette
        commands={commands}
        open={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />
    </div>
  );
}
