import { FC } from 'react'

import { TrainCanvas } from './TrainCanvas'

type TrainProps = {
  activeGifts?: number
  activePrizes?: string
  nonActivePrizes?: string
}

export const Train: FC<TrainProps> = ({
  activeGifts,
  activePrizes,
  nonActivePrizes,
}) => {
  return activeGifts === undefined ? (
    <div className="main-image__container">
      <div className="main-page__title">
        <h1>Наряди свою ёлочку Благополучия</h1>
      </div>
    </div>
  ) : (
    <TrainCanvas
      activeGifts={activeGifts}
      activePrizes={activePrizes}
      nonActivePrizes={nonActivePrizes}
    />
  )
}
