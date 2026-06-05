import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CommandPalette } from '../components/CommandPalette';
import { getModeLabel, getRouteLabel, isKnownRoute, navigationItems } from './navigation';
import { loadWorkspaceState, saveWorkspaceState } from './workspaceState';
import type { DisplayMode } from './workspaceState';

export function AppShell() {
  const initialWorkspaceState = useMemo(() => loadWorkspaceState(), []);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(initialWorkspaceState.sidebarCollapsed);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(initialWorkspaceState.displayMode);
  const [hasRestoredRoute, setHasRestoredRoute] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const modeLabel = getModeLabel(displayMode);
  const routeLabel = getRouteLabel(location.pathname);

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

    const restoredRoute = initialWorkspaceState.lastRoute;
    if (isKnownRoute(restoredRoute) && restoredRoute !== location.pathname) {
      navigate(restoredRoute, { replace: true });
    }

    setHasRestoredRoute(true);
  }, [hasRestoredRoute, initialWorkspaceState.lastRoute, location.pathname, navigate]);

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
            <p className="shell__subtitle">product-os.local</p>
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
              {navigationItems.map((item) => (
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
                <span>Zoom</span>
                <strong>100%</strong>
              </div>
              <div className="shell__utilityRow">
                <span>Font</span>
                <strong>Inter</strong>
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
            <p>{modeLabel} · {routeLabel}</p>
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
