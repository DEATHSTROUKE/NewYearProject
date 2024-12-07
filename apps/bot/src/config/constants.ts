import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {
  botToken: process.env.BOT_TOKEN,
  appLink: process.env.APP_LINK || 'https://192.168.0.4:4201',
  imageCaption:
    process.env.IMAGE_CAPTION ||
    'Новогодний экспресс с подарками уже ждет! Угадывайте загадки, собирайте подарки и участвуйте в розыгрыше призов!',
}
