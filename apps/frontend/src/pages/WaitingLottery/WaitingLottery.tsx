import { WaitEndLotteryState } from '@shared'
import { useLocation } from 'react-router-dom'

import { LotteryTicket } from '@/components/LotteryTicket/LotteryTicket'
import { Message } from '@/components/Message/Message'
import { Train } from '@/components/Train/Train'

export const WaitingLottery = () => {
  const location = useLocation() as { state: WaitEndLotteryState }
  const { text, activeGifts, textWithLink, ticketNumber, prizesText } =
    location.state

  // useLayoutEffect(() => {
  //   setTimer(lotteryTime)
  // }, [setTimer, lotteryTime])

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
        <LotteryTicket
          ticketNumber={ticketNumber.toString()}
          textBelow={textWithLink}
        />
      </div>
    </div>
  )
}
