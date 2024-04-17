import Settings from './settings/Settings';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import ChippyErrorBoundary from '~components/common/ErrorBoundary';
import CurrentConversation from '~components/conversation/CurrentConversation';
import ConversationHistory from '~components/conversation/history';
import Themes from '~components/theme/Themes';

const routes: RouteObject[] = [
  {
    path: '/conversations/current',
    element: <CurrentConversation />,
    errorElement: <ChippyErrorBoundary />,
  },
  {
    path: '/conversations/history',
    element: <ConversationHistory />,
    errorElement: <ChippyErrorBoundary />,
  },
  {
    path: '/themes',
    element: <Themes />,
    errorElement: <ChippyErrorBoundary />,
  },
  {
    path: '/settings',
    element: <Settings />,
    errorElement: <ChippyErrorBoundary />,
  },
];

const router = createMemoryRouter(routes, {
  initialIndex: 0,
  initialEntries: ['/conversations/current'],
});

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
