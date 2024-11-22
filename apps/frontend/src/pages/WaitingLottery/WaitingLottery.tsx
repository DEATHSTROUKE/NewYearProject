import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { LotteryTicket } from '@/components/LotteryTicket/LotteryTicket'
import { Message } from '@/components/Message/Message'
import { Tree } from '@/components/Tree/Tree'

import { useMainStore } from '@/store/mainStore'

import { WaitEndLotteryState } from '@/types/gameState'

export const WaitingLottery = () => {
  const setTimer = useMainStore(state => state.setTimer)
  const location = useLocation() as { state: WaitEndLotteryState }
  const {
    text,
    activeGifts,
    activePrizes,
    nonActivePrizes,
    lotteryTime,
    textWithLink,
    ticketNumber,
  } = location.state

  useLayoutEffect(() => {
    setTimer(lotteryTime)
  }, [setTimer, lotteryTime])

  return (
    <div className="main-wrapper">
      <div className="main-page__row">
        <Tree
          activeGifts={activeGifts}
          activePrizes={activePrizes}
          nonActivePrizes={nonActivePrizes}
        />
      </div>
      <div className="main-page__row">
        <Message text={text} />
      </div>
      <div className="main-page__row">
        <LotteryTicket
          ticketNumber={ticketNumber.toString()}
          textBelow={textWithLink}
        />
      </div>
    </div>
  )
}
