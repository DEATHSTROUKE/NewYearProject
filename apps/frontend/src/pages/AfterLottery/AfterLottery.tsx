import { AfterLotteryState } from '@shared'
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Message } from '@/components/Message/Message'
import { Train } from '@/components/Train/Train'

import { useMainStore } from '@/store/mainStore'

export const AfterLottery = () => {
  const setTimer = useMainStore(state => state.setTimer)
  const location = useLocation() as { state: AfterLotteryState }
  const { text, activeGifts } = location.state

  useLayoutEffect(() => {
    setTimer(null)
  }, [setTimer])

  return (
    <div className="main-wrapper">
      <div className="main-page__row">
        <Train activeGifts={activeGifts} />
      </div>
      <div className="main-page__row">
        <Message text={text} />
      </div>
    </div>
  )
}
