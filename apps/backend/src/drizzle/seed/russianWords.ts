import fs from 'fs'
import path from 'path'

const russianWords = fs
  .readFileSync(path.resolve(__dirname, './russian-nouns.txt'), 'utf8')
  .split('\n')

export const getRussianWords = () => russianWords
