import { WaitFeedbackState } from '@shared'
import { useLocation } from 'react-router-dom'

import { Feedback } from '@/components/Feedback/Feedback'
import { Train } from '@/components/Train/Train'

export const WaitingFeedback = () => {
  const location = useLocation() as { state: WaitFeedbackState }
  const { feedbackQuestion, afterFeedbackResponse, activeGifts, prizesText } =
    location.state

  return (
    <div className="main-wrapper">
      <div className="main-page__row">
        <Train activeGifts={activeGifts} prizesText={prizesText} />
      </div>

      <div className="main-page__row">
        <Feedback
          text={feedbackQuestion}
          afterFeedbackText={afterFeedbackResponse}
        />
      </div>
    </div>
  )
}
