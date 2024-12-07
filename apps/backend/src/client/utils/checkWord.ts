import { Letter, LetterState } from '@shared'

export const checkWord = (inputWord: string, correctWord: string) => {
  if (inputWord.length !== correctWord.length) return
  inputWord = inputWord.toLowerCase()
  correctWord = correctWord.toLowerCase()

  const usedLettersInAnswer: LetterState[] = new Array(correctWord.length).fill(
    'yellow',
  )
  const usedLettersInWord: LetterState[] = new Array(inputWord.length).fill(
    'grey',
  )

  for (let i = 0; i < inputWord.length; i++) {
    if (inputWord[i] === correctWord[i]) {
      usedLettersInAnswer[i] = 'green'
      usedLettersInWord[i] = 'green'
    }
  }

  const result: Letter[] = []
  for (let i = 0; i < inputWord.length; ++i) {
    if (usedLettersInWord[i] === 'green') {
      result.push({ letter: inputWord[i], state: 'green' })
      continue
    }

    let state: LetterState = 'grey'
    for (let j = 0; j < correctWord.length; ++j) {
      if (usedLettersInAnswer[j] === 'green') {
        continue
      }
      if (inputWord[i] === correctWord[j]) {
        usedLettersInAnswer[j] = 'green'
        state = 'yellow'
        break
      }
    }
    result.push({ letter: inputWord[i], state })
  }

  return result
}
