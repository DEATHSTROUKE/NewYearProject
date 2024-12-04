import { Outlet } from 'react-router-dom'

import { useGetExcursions } from '@/api/excursion'

export const Main = () => {
  useGetExcursions()

  return <Outlet />
}
