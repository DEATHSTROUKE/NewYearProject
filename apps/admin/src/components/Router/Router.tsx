import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

import App from '../App/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ROUTES.Dashboard,
        lazy: () => import('@/pages/DashboardPage/DashboardPage'),
      },
      {
        path: `${ROUTES.User}/:id`,
        lazy: () => import('@/pages/User/User'),
      },
      {
        path: ROUTES.AdminTexts,
        lazy: () => import('@/pages/AdminTexts/AdminTexts'),
      },

      {
        path: ROUTES.Tasks,
        lazy: () => import('@/pages/TasksPage/TasksPage'),
      },
      {
        path: ROUTES.Excel,
        lazy: () => import('@/pages/Excel/Excel'),
      },

      { path: ROUTES.Login, lazy: () => import('@/pages/LoginPage/LoginPage') },

      { path: '/', element: <Navigate to={ROUTES.Dashboard} /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.Dashboard} />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
