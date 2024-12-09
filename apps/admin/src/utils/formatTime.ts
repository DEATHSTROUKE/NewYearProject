import dayjs from 'dayjs'

export const formatDateTime = (dateTime: string | null) => {
  // if (!dateTime) return ''

  // const date = new Date(dateTime)
  // const year = date.getFullYear()
  // const month = `0${date.getMonth() + 1}`.slice(-2)
  // const day = `0${date.getDate()}`.slice(-2)
  // const hour = `0${date.getHours()}`.slice(-2)
  // const minute = `0${date.getMinutes()}`.slice(-2)
  // const second = `0${date.getSeconds()}`.slice(-2)

  // return `${year}-${month}-${day}T${hour}:${minute}:${second}`
  return dayjs(dateTime).format('YYYY-MM-DDTHH:mm:ss')
}
