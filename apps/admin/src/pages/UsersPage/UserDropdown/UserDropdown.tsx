import { Stack, Typography } from '@mui/joy'
import { useMemo } from 'react'

import { Dropdown } from '@/components/Dropdown/Dropdown'

import { useExcursionStore } from '@/store/excursionStore'
import { useUserStore } from '@/store/userStore'

import { TExcursion } from '@/types/excursion'

export const UserDropdown = () => {
  const excursionList = useExcursionStore(state => state.excursionList)
  const setCurrentExcursion = useUserStore(state => state.setCurrentExcursion)

  const ItemsList = useMemo(() => {
    return [
      <UserDropDownItem
        excursion={null}
        setExcursion={setCurrentExcursion}
      />,
    ].concat(
      excursionList.map(item => (
        <UserDropDownItem
          excursion={item}
          setExcursion={setCurrentExcursion}
        />
      )),
    )
  }, [excursionList, setCurrentExcursion])

  return (
    <Dropdown
      label="Выбрать экскурсию"
      values={ItemsList}
    />
  )
}

const UserDropDownItem = ({
  excursion,
  setExcursion,
}: {
  excursion: TExcursion | null
  setExcursion: (arg: TExcursion | null) => void
}) => {
  return (
    <Stack
      width={'100%'}
      onClick={() => setExcursion(excursion)}
      direction={'row'}
    >
      <Typography>{excursion?.name || 'Все экскурсии'}</Typography>
    </Stack>
  )
}
