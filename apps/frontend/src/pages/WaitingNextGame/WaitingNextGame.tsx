import { WaitNextGameState } from '@shared'
import { useLocation } from 'react-router-dom'

import { HowToPlay } from '@/components/HowToPlay/HowToPlay'
import { Message } from '@/components/Message/Message'
import { Rules } from '@/components/Rules/Rules'
import { Train } from '@/components/Train/Train'

export const WaitingNextGame = () => {
  const location = useLocation() as { state: WaitNextGameState }
  const { text, activeGifts, prizesText } = location.state

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
        <Rules />
      </div>
      <div className="main-page__row">
        <HowToPlay />
      </div>
    </div>
  )
}
