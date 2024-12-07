import { InGameState } from '@shared'
import { useLocation } from 'react-router-dom'

import { Game } from '@/components/Game/Game'
import { HowToPlay } from '@/components/HowToPlay/HowToPlay'
import { Message } from '@/components/Message/Message'
import { Rules } from '@/components/Rules/Rules'
import { Train } from '@/components/Train/Train'

export const InGame = () => {
  const location = useLocation() as { state: InGameState }
  const {
    text,
    letters,
    currentLine,
    wordLength,
    activeGifts,
    prizesText,
    hasNextButton,
    isFinished,
  } = location.state

  return (
    <div className="main-wrapper">
      <div className="main-page__row">
        <Train activeGifts={activeGifts} prizesText={prizesText} />
      </div>
      {text && (
        <div className="main-page__row">
          <Message text={text} />
        </div>
      )}
      <div className="main-page__row">
        <Game
          wordLength={wordLength}
          currentLine={currentLine}
          letters={letters}
          isEnd={isFinished}
          hasNextButton={hasNextButton}
        />
      </div>
      <div className="main-page__row">
        <Rules />
      </div>
      <div className="main-page__row">
        <HowToPlay />
      </div>
    </div>
  )
}
