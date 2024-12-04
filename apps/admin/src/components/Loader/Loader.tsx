import clsx from 'clsx'

import { CenterContainer } from '../Containers/CenterContainer'
import s from './loader.module.css'

export const Loader = ({
  variant = 'dark',
}: {
  variant?: 'light' | 'dark'
}) => {
  return (
    <CenterContainer>
      <div
        className={clsx(s.loader, {
          [s['loader-light']]: variant === 'light',
          [s['loader-dark']]: variant === 'dark',
        })}
      ></div>
    </CenterContainer>
  )
}
