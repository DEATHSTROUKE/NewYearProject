import { BeforeGameState } from '@shared'
import { useLocation } from 'react-router-dom'

import { HowToPlay } from '@/components/HowToPlay/HowToPlay'
import { Message } from '@/components/Message/Message'
import { Rules } from '@/components/Rules/Rules'
import { Train } from '@/components/Train/Train'

export const BeforeGame = () => {
  const location = useLocation() as { state: BeforeGameState }
  const { text } = location.state

  return (
    <div className="main-wrapper">
      <div className="main-page__row">
        <Train activeGifts={0} isBigTrain />
      </div>
      {text && (
        <div className="main-page__row">
          <Message text={text} />
        </div>
      )}

      <div className="main-page__row">
        <a
          rel="noreferrer"
          href="https://telegra.ph/Novogodnij-ehkspress-Blagopoluchiya-soberi-vagon-podarkov-12-11"
          target="_blank"
          className="main-page__btn"
        >
          К правилам
        </a>
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
