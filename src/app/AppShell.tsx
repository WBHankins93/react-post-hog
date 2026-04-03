import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CommandPalette } from '../components/CommandPalette';

const navigation = [
  { to: '/', label: 'Overview', end: true },
  { to: '/workspace', label: 'Workspace' },
  { to: '/docs', label: 'Docs' },
];

export function AppShell() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const commands = useMemo(
    () => [
      { id: 'go-overview', label: 'Go to Overview', run: () => navigate('/') },
      {
        id: 'go-workspace',
        label: 'Go to Workspace',
        run: () => navigate('/workspace'),
      },
      { id: 'go-docs', label: 'Go to Docs', run: () => navigate('/docs') },
    ],
    [navigate],
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

  return (
    <div className="shell">
      <aside className="shell__sidebar">
        <h1 className="shell__title">Personal HQ</h1>
        <button className="shell__commandButton" type="button" onClick={() => setIsPaletteOpen(true)}>
          Open command palette (⌘/Ctrl + K)
        </button>
        <p className="shell__routeHint">Current: {location.pathname}</p>
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
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="shell__content">
        <Outlet />
      </main>

      <CommandPalette
        commands={commands}
        open={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />
    </div>
  );
}
