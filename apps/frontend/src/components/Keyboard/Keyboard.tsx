import { Letter } from '@shared'
import cn from 'classnames'
import React, { FC, useEffect } from 'react'

import { KeyboardLetter } from './KeyboardLetter'
import { keyboardData } from './keyboardData'
import { setKeyboardState } from './keyboardStateHandler'

type KeyboardProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onChangeInput: (letter?: string) => void
  onNewAttempt: () => void
  letters: Letter[]
  canAttempt: boolean
  inputWord?: string[]
}

export const Keyboard: FC<KeyboardProps> = ({
  isOpen,
  setIsOpen,
  onChangeInput,
  onNewAttempt,
  letters,
  canAttempt,
}) => {
  const keyboardDataWithState = setKeyboardState(keyboardData, letters)
  const onClickLetter = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string,
  ) => {
    e.stopPropagation()
    onChangeInput(key)
  }

  const onClickEnter = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onNewAttempt()
  }

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onChangeInput()
  }

  const closeHandler = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', closeHandler)

    return () => {
      document.removeEventListener('click', closeHandler)
    }
  }, [])

  return (
    <div className={cn('keyboard', { open: isOpen })}>
      {keyboardDataWithState.map(row => (
        <div className="keyboard__row" key={row[0].id}>
          {row.map(item =>
            item.id === 52 ? (
              <KeyboardLetter
                key={item.id}
                id={item.id}
                letter={item.letter}
                onClickLetter={e => onClickEnter(e)}
                canAttempt={canAttempt}
              />
            ) : item.id === 51 ? (
              <KeyboardLetter
                key={item.id}
                id={item.id}
                letter={item.letter}
                onClickLetter={e => onClickDelete(e)}
              />
            ) : (
              <KeyboardLetter
                key={item.id}
                id={item.id}
                state={item.state}
                letter={item.letter}
                onClickLetter={e => onClickLetter(e, item.letter)}
              />
            ),
          )}
        </div>
      ))}
    </div>
  )
}
