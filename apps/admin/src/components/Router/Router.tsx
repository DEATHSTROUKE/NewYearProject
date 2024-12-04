import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

import App from '../App/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ROUTES.Admins,
        lazy: () => import('@/pages/AdminsPage/AdminsPage'),
      },
      {
        path: ROUTES.AdminsCreate,
        lazy: () => import('@/pages/AdminsCreate/AdminsCreatePage'),
      },
      {
        path: `${ROUTES.AdminsUpdate}/:id`,
        lazy: () => import('@/pages/AdminsCreate/AdminsUpdatePage'),
      },

      {
        path: ROUTES.TaskControl,
        lazy: () => import('@/pages/TaskControlPage/TaskControlPage'),
      },
      {
        path: ROUTES.TaskCreate,
        lazy: () => import('@/pages/TaskCreatePage/TaskCreatePage'),
      },
      {
        path: `${ROUTES.TaskUpdate}/:id`,
        lazy: () => import('@/pages/TaskCreatePage/TaskCreatePage'),
      },

      {
        path: ROUTES.BotNotifications,
        lazy: () => import('@/pages/BotNotificationsPage/BotNotificationsPage'),
      },

      { path: ROUTES.Users, lazy: () => import('@/pages/UsersPage/UsersPage') },
      {
        path: ROUTES.UserHistory,
        lazy: () => import('@/pages/UserHistoryPage/UserHistoryPage'),
      },

      {
        path: ROUTES.Achievements,
        lazy: () => import('@/pages/AchievementsPage/AchievementsPage'),
      },
      {
        path: ROUTES.AchievementsCreate,
        lazy: () =>
          import('@/pages/AchievementsCreatePage/AchievementsCreatePage'),
      },
      {
        path: `${ROUTES.AchievementsUpdate}/:id`,
        lazy: () =>
          import('@/pages/AchievementsCreatePage/AchievementsCreatePage'),
      },

      {
        path: ROUTES.ExcursionCreate,
        lazy: () => import('@/pages/ExcursionCreatePage/ExcursionCreatePage'),
      },

      {
        path: ROUTES.Settings,
        lazy: () => import('@/pages/SettingsPage/SettingsPage'),
      },
      { path: ROUTES.Login, lazy: () => import('@/pages/LoginPage/LoginPage') },

      { path: '/', element: <Navigate to={ROUTES.TaskControl} /> },
      // TODO: for testing (replace by comment)
      // { path: '/', lazy: () => import('@/pages/TestPage/Test') },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.TaskControl} />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
