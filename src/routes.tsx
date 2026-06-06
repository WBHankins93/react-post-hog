import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { RouteErrorBoundary } from './app/RouteErrorBoundary';
import { DocsPage } from './pages/DocsPage';
import { HqAppPage } from './pages/HqAppPage';
import { OverviewPage } from './pages/OverviewPage';
import { WorkspacePage } from './pages/WorkspacePage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: 'workspace',
        element: <WorkspacePage />,
      },
      {
        path: 'docs',
        element: <DocsPage />,
      },
      {
        path: 'projects',
        element: <HqAppPage slug="projects" />,
      },
      {
        path: 'writing',
        element: <HqAppPage slug="writing" />,
      },
      {
        path: 'gallery',
        element: <HqAppPage slug="gallery" />,
      },
      {
        path: 'tools',
        element: <HqAppPage slug="tools" />,
      },
      {
        path: 'about',
        element: <HqAppPage slug="about" />,
      },
    ],
  },
];

export function createAppRouter() {
  return createBrowserRouter(routes);
}
