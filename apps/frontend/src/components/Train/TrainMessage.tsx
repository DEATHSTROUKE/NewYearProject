import cn from 'classnames'
import { FC } from 'react'

type TreeMessageProps = {
  text: string | null
}

export const TrainMessage: FC<TreeMessageProps> = ({ text }) => {
  return (
    <div
      className={cn('train-message', {
        'train-message--visible': text !== null,
      })}
    >
      <div className="message">
        <span dangerouslySetInnerHTML={{ __html: text || '' }}></span>
      </div>
    </div>
  )
}
