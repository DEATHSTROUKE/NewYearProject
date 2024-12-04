import { init, retrieveLaunchParams } from '@telegram-apps/sdk'
import axios from 'axios'

import { API_URL } from '../config/config'

//import { getTgParams } from '../utils/getTgParams'
init()

const { initDataRaw } = retrieveLaunchParams()
interface BaseApiRequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: object
}

export const baseApiRequest = async <T>({
  url,
  method,
  data,
}: BaseApiRequestOptions): Promise<T> => {
  const headers: Record<string, string> = {
    'X-Telegram-Auth': `${initDataRaw}`,
  }

  const apiUrl = `${API_URL}${url}`
  const response = await axios({
    method,
    url: apiUrl,
    data,
    headers,
  })

  return response.data
}
