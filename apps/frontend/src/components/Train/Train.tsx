import { FC } from 'react'

import { TrainCanvas } from './TrainCanvas'

type TrainProps = {
  activeGifts: number
  prizesText?: string[]
}

export const Train: FC<TrainProps> = ({ activeGifts, prizesText }) => {
  return activeGifts === undefined ? (
    <div className="main-image__container">
      <div className="main-page__title">
        <h1>Экспресс Благополучие</h1>
      </div>
    </div>
  ) : (
    <TrainCanvas activeGifts={activeGifts} prizesText={prizesText} />
  )
}
