import { NavLink, Outlet } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Overview', end: true },
  { to: '/workspace', label: 'Workspace' },
  { to: '/docs', label: 'Docs' },
];

export function AppShell() {
  return (
    <div className="shell">
      <aside className="shell__sidebar">
        <h1 className="shell__title">Personal HQ</h1>
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
    </div>
  );
}
