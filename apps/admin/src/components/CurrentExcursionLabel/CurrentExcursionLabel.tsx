import { Typography } from '@mui/joy'

import { useExcursionStore } from '@/store/excursionStore'

export const CurrentExcursionLabel = () => {
  const currentExcursion = useExcursionStore(state => state.currentExcursion)

  return (
    <>
      {currentExcursion && (
        <Typography sx={{ mb: '20px' }}>
          Вы на экскурсии {currentExcursion.name}
        </Typography>
      )}
    </>
  )
}
