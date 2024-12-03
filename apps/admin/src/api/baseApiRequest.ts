import axios from 'axios'

import { envConfig } from '@/config/constants'

interface BaseApiRequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: object
  signal?: AbortSignal
  params?: string[][] | Record<string, string> | string | URLSearchParams
  headers?: Record<string, string>
  responseType?: 'json' | 'blob'
}

export const baseApiRequest = async <T>({
  url,
  method,
  data,
  signal,
  params,
  headers: addHeaders,
  responseType,
}: BaseApiRequestOptions): Promise<T> => {
  const signature = envConfig.locationSearch

  const urlParams = new URLSearchParams(params)

  const headers: Record<string, string> = {
    Authorization: signature,
    ...(envConfig.isDev && { 'ngrok-skip-browser-warning': 'true' }),
    ...addHeaders,
  }

  const apiUrl = `${envConfig.apiUrl}${url}`
  const response = await axios({
    method,
    url: apiUrl,
    params: urlParams,
    data,
    headers,
    signal,
    responseType,
  })

  return response.data
}
