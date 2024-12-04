import axios from 'axios'

import { API_URL, initDataRaw } from '../config/config'

//import { getTgParams } from '../utils/getTgParams'

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
