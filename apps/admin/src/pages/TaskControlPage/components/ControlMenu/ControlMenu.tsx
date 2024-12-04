import { Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'

import { useTurnOffQuestions, useTurnOnQuestions } from '@/api/task'

import { Dropdown } from '@/components/Dropdown/Dropdown'

import { ROUTES } from '@/config/routes'

import { useExcursionStore } from '@/store/excursionStore'

import { SaveIcon } from '@/assets/svgs/SaveIcon'
import { TurnOffAllIcon } from '@/assets/svgs/TurnOffAllIcon'
import { TurnOnAllIcon } from '@/assets/svgs/TurnOnAllIcon'

export const ControlMenu = () => {
  const { turnOnQuestions } = useTurnOnQuestions()
  const { turnOffQuestions } = useTurnOffQuestions()
  const navigate = useNavigate()
  const currentExcursion = useExcursionStore(state => state.currentExcursion)

  const values = [
    <Typography
      startDecorator={<TurnOnAllIcon />}
      onClick={() => turnOnQuestions(currentExcursion?.id ?? '')}
    >
      Включить все задания
    </Typography>,
    <Typography
      startDecorator={<TurnOffAllIcon />}
      onClick={() => turnOffQuestions(currentExcursion?.id ?? '')}
    >
      Выключить все задания
    </Typography>,
    <Typography
      startDecorator={<SaveIcon />}
      onClick={() =>
        navigate(ROUTES.ExcursionCreate, {
          state: { copyExcursionId: currentExcursion?.id || '' },
        })
      }
    >
      Скопировать экскурсию
    </Typography>,
  ]

  return (
    <Dropdown
      key={2}
      label="Управление экскурсией"
      values={values}
    />
  )
}
