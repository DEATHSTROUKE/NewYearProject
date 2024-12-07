import { adminApi } from '@/api'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { ROUTES } from '@/config/routes'

export const Main = () => {
  const { isError, error } = adminApi.useGetApiAdminCheck()
  const navigate = useNavigate()

  useEffect(() => {
    if (error instanceof AxiosError && error.status === 401) {
      navigate(ROUTES.Login)
    }
  }, [error, isError])

  return <Outlet />
}
