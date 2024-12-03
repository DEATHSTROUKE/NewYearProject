import { Typography } from '@mui/joy'
import { useParams } from 'react-router-dom'

import {
  useCreateAchievement,
  useGetFullAchievement,
  useUpdateAchievement,
} from '@/api/achievement'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'

import { useExcursionStore } from '@/store/excursionStore'

import { TFullAchievement } from '@/types/achievement'

import { AchievementForm } from './AchievementForm/AchievementForm'

export const Component = () => {
  const { id } = useParams()
  const currentExcursion = useExcursionStore(state => state.currentExcursion)

  const { createAchievement, isCreatePending } = useCreateAchievement(
    currentExcursion?.id ?? '',
  )
  const { updateAchievement, isUpdatePending } = useUpdateAchievement(
    currentExcursion?.id ?? '',
    id ?? '',
  )
  const { fullAchievementData, isLoading } = useGetFullAchievement(
    currentExcursion?.id ?? '',
    id ?? '',
  )

  const onSave = (data: TFullAchievement) => {
    console.log(data)

    if (id) {
      updateAchievement(data)
    } else {
      createAchievement(data)
    }
  }

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        {id ? 'Редактирование ачивки' : 'Создание ачивки'}
      </Typography>

      {isLoading && <Loader />}

      {(fullAchievementData || !id) && (
        <AchievementForm
          data={fullAchievementData}
          sendData={onSave}
          isLoading={isCreatePending || isUpdatePending}
        />
      )}
    </MainLayout>
  )
}
