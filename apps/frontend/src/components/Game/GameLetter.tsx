import { Letter } from '@shared'
import cn from 'classnames'
import { FC } from 'react'

type GameLetterProps = Partial<Letter>

export const GameLetter: FC<GameLetterProps> = ({ state, letter }) => {
  return (
    <div
      className={cn(
        'game-field__cell',
        { grey: state === 'grey' },
        { green: state === 'green' },
        { yellow: state === 'yellow' },
      )}
    >
      <div className="letter">{letter || ''}</div>
    </div>
  )
}
