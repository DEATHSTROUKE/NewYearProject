import path from 'path'
import { InlineKeyboardBuilder, MediaSourceType, Telegram } from 'puregram'

import { envConfig } from './config/constants'

const telegram = Telegram.fromToken(envConfig.botToken)

const keyboard = new InlineKeyboardBuilder().webAppButton({
  text: 'Играть',
  url: envConfig.appLink,
})

telegram.updates.on('message', context => {
  context.sendPhoto(
    {
      type: MediaSourceType.Path,
      value: path.resolve(__dirname, 'assets/image.jpg'),
    },
    {
      caption: envConfig.imageCaption,
      parse_mode: 'Markdown',
      reply_markup: keyboard,
    },
  )
})

telegram.updates.startPolling()
