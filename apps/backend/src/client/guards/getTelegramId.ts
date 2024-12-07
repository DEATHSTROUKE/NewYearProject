export const getTelegramId = (token: any) => {
  try {
    const user = new URLSearchParams(token).get('user') || ''
    return parseInt(JSON.parse(user).id || '')
  } catch (e) {
    return null
  }
}
