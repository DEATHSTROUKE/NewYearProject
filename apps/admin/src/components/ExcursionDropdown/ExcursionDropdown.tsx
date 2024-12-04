import { Button, IconButton, Stack, Typography } from '@mui/joy'
import { PlusIcon, TrashIcon } from '@primer/octicons-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { MODALS, ROUTES } from '@/config/routes'

import { useExcursionStore } from '@/store/excursionStore'

import { useOpenModal } from '@/hooks/useModals'

import { TExcursion } from '@/types/excursion'

import { Dropdown } from '../Dropdown/Dropdown'

export const ExcursionDropdown = () => {
  const { excursionList, setCurrentExcursion } = useExcursionStore(
    ({ excursionList, setCurrentExcursion }) => ({
      excursionList,
      setCurrentExcursion,
    }),
  )

  const ItemsList = useMemo(() => {
    return excursionList
      .map(item => (
        <ExcursionDropdownItem
          excursion={item}
          setExcursion={setCurrentExcursion}
        />
      ))
      .concat(
        <Link to={ROUTES.ExcursionCreate}>
          <Button startDecorator={<PlusIcon size={16} />}>
            Создать экскурсию
          </Button>
        </Link>,
      )
  }, [excursionList, setCurrentExcursion])

  return (
    <Dropdown
      label="Выбрать экскурсию"
      values={ItemsList}
    />
  )
}

const ExcursionDropdownItem = ({
  excursion,
  setExcursion,
}: {
  excursion: TExcursion
  setExcursion: (arg: TExcursion) => void
}) => {
  const { openModal } = useOpenModal()

  return (
    <Stack
      width={'100%'}
      onClick={() => setExcursion(excursion)}
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Typography>{excursion.name}</Typography>
      <IconButton
        onClick={() =>
          openModal(MODALS.DeleteExcursion, { excursionId: excursion.id })
        }
      >
        <TrashIcon size={16} />
      </IconButton>
    </Stack>
  )
}
