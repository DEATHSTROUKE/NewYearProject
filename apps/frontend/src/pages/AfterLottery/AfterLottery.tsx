import { AfterLotteryState } from '@shared'
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { LotteryTicket } from '@/components/LotteryTicket/LotteryTicket'
import { Message } from '@/components/Message/Message'
import { Train } from '@/components/Train/Train'

import { useMainStore } from '@/store/mainStore'

export const AfterLottery = () => {
  const setTimer = useMainStore(state => state.setTimer)
  const location = useLocation() as { state: AfterLotteryState }
  const { text, activeGifts, prizesText, ticketNumber } = location.state

  useLayoutEffect(() => {
    setTimer(null)
  }, [setTimer])

  return (
    <div className="main-wrapper">
      <div className="main-page__row">
        <Train activeGifts={activeGifts} prizesText={prizesText} />
      </div>
      <div className="main-page__row">{text && <Message text={text} />}</div>
      <div className="main-page__row">
        <LotteryTicket ticketNumber={ticketNumber.toString()} textBelow="" />
      </div>
    </div>
  )
}
