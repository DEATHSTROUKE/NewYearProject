import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Router } from '@/components/Router/Router'

import '@/config/errorMap'

import '@/styles/index.css'
import '@/styles/variables.css'

dayjs.extend(utc)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
