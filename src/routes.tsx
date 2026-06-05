import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { RouteErrorBoundary } from './app/RouteErrorBoundary';
import { DocsPage } from './pages/DocsPage';
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
    ],
  },
];

export function createAppRouter() {
  return createBrowserRouter(routes);
}
