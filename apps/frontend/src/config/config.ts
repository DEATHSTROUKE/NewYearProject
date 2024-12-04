import { init, retrieveLaunchParams } from '@telegram-apps/sdk'
import { miniApp } from '@telegram-apps/sdk'

export const API_URL: string = import.meta.env.VITE_API_URL || ''

init()

export const { initDataRaw } = retrieveLaunchParams()
console.info(initDataRaw)
if (miniApp.mount.isAvailable()) {
  miniApp.mount()
  miniApp.isMounted()
}

if (miniApp.setBackgroundColor.isAvailable()) {
  miniApp.setBackgroundColor('#e12c31')
  miniApp.backgroundColor()
}

if (miniApp.setHeaderColor.isAvailable()) {
  miniApp.setHeaderColor('#e12c31')
  miniApp.headerColor()
}
