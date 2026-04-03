import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './app/AppShell';
import { DocsPage } from './pages/DocsPage';
import { OverviewPage } from './pages/OverviewPage';
import { WorkspacePage } from './pages/WorkspacePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
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
]);
