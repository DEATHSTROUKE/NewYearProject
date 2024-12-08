import { FC } from 'react'

import { TrainCanvas } from './TrainCanvas'

type TrainProps = {
  activeGifts: number
  prizesText?: string[]
  isBigTrain?: boolean
}

export const Train: FC<TrainProps> = ({
  activeGifts,
  prizesText,
  isBigTrain,
}) => {
  console.info('TRAIN')
  return activeGifts === undefined ? (
    <div className="main-image__container">
      <div className="main-page__title">
        <h1>Экспресс Благополучие</h1>
      </div>
    </div>
  ) : (
    <TrainCanvas
      activeGifts={activeGifts}
      prizesText={prizesText}
      isBigTrain={isBigTrain}
    />
  )
}
