import { init, retrieveLaunchParams } from '@telegram-apps/sdk'
import { miniApp } from '@telegram-apps/sdk'

export const envConfig = {
  apiUrl: import.meta.env.VITE_API_URL || '',
  locationSearch: '',
  isDev: import.meta.env.DEV,
}

try {
  init()

  const { initDataRaw } = retrieveLaunchParams()
  envConfig.locationSearch = initDataRaw || ''

  console.info(initDataRaw)
  if (miniApp.mount.isAvailable()) {
    miniApp.mount()
    miniApp.isMounted()
  }

  if (miniApp.setBackgroundColor.isAvailable()) {
    miniApp.setBackgroundColor('#ab001b')
    miniApp.backgroundColor()
  }

  if (miniApp.setHeaderColor.isAvailable()) {
    miniApp.setHeaderColor('#ab001b')
    miniApp.headerColor()
  }
} catch (e) {
  console.error(e)
}
