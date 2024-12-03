import dotenv from 'dotenv'
import path from 'path'
import { InlineKeyboardBuilder, MediaSourceType, Telegram } from 'puregram'

dotenv.config()

const telegram = Telegram.fromToken(process.env.BOT_TOKEN)

const keyboard = new InlineKeyboardBuilder().webAppButton({
  text: 'Играть',
  url: 'https://google.com',
})

telegram.updates.on('message', context => {
  context.sendPhoto(
    {
      type: MediaSourceType.Path,
      value: path.resolve(__dirname, 'assets/image.jpg'),
    },
    {
      caption: 'Собери все подарки и выиграй приз в лотерею',
      parse_mode: 'Markdown',
      reply_markup: keyboard,
    },
  )
})

telegram.updates.startPolling()

// telegram.api.sendMessage({
//   chat_id: 405797658,
//   text: 'Hello',
// })
