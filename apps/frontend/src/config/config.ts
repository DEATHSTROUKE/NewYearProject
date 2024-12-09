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
    miniApp.setBackgroundColor('#c40a27')
    miniApp.backgroundColor()
  }

  if (miniApp.setHeaderColor.isAvailable()) {
    miniApp.setHeaderColor('#c40a27')
    miniApp.headerColor()
  }
} catch (e) {
  console.error(e)
  envConfig.locationSearch =
    'user=%7B%22id%22%3A405797658%2C%22first_name%22%3A%22%D0%90%D0%BD%D0%B4%D1%80%D1%8E%D1%85%D0%B0%22%2C%22last_name%22%3A%22%D0%91%D1%83%D1%80%D0%B0%D0%BA%D0%BE%D0%B2%22%2C%22username%22%3A%22domestic_wildcat%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FiDKyDsbcrSOKa-kQpUnom57oWlXTCMKSTM-NNzXgfJk.svg%22%7D&chat_instance=-2732409200550958872&chat_type=sender&auth_date=1733344417&signature=lrv0mnhrWl40tVLNmVogrzD9dtpjPL3ZaSV4k9W1xsog7aw4uqaperbwxOt2hHHvv-AOde7ae2dpzOTgM4ecCg&hash=12ce7ea7d4bc2b7fe426cc8229812b09df1dc967e41d11424d114576a1f3de9c'
}
