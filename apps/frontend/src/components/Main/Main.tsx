import { ApiError, ApiErrorString } from '@shared'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useGetState } from '@/api/getState'

import { IsLoading } from '../IsLoading/IsLoading'

export const Main = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useGetState()

  useEffect(() => {
    if (isError && error instanceof AxiosError) {
      const err = error as AxiosError<ApiError>
      if (err.response?.data.message === ApiErrorString.NotRegistered) {
        navigate('/register')
      }
      return
    }

    // return navigate('/testPage')

    if (data) {
      switch (data.gameState) {
        case 'beforeGame':
          navigate('/beforeGame', { state: data })
          return
        case 'inGame':
          navigate('/inGame', { state: data })
          return
        case 'waitFeedback':
          navigate('/waitFeedback', { state: data })
          return
        case 'waitNextGame':
          navigate('/waitNextGame', { state: data })
          return
        case 'waitEndLottery':
          navigate('/waitEndLottery', { state: data })
          return
        case 'afterLottery':
          navigate('/afterLottery', { state: data })
          return
        default:
          console.log('default')
          return
      }
    }
  }, [data, isError, isLoading])

  return (
    <main className="main">
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="main__content">
          <div className="main-page">
            <div className="container">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
