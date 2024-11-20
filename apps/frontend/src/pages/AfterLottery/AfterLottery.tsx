import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Message } from '@/components/Message/Message'
import { Tree } from '@/components/Tree/Tree'

import { useMainStore } from '@/store/mainStore'

import { AfterLotteryState } from '@/types/gameState'

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
        <Tree activeGifts={activeGifts} />
      </div>
      <div className="main-page__row">
        <Message text={text} />
      </div>
    </div>
  )
}
