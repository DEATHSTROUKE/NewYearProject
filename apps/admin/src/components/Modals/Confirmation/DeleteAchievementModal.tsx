import { useLocation } from 'react-router-dom'

import { useDeleteAchievement } from '@/api/achievement'

import { ConfirmModal } from './ConfirmModal'

export const DeleteAchievementModal = ({ isOpen }: { isOpen: boolean }) => {
  const { state } = useLocation() as {
    state: { excursionId: string; achievementId: string }
  }
  const { deleteAchievement } = useDeleteAchievement()

  if (!state) return null

  const { achievementId, excursionId } = state

  return (
    <ConfirmModal
      title="Вы уверены, что хотите удалить ачивку?"
      description="Восстановить ачивку будет невозможно"
      action={() => {
        deleteAchievement({ achievementId, excursionId })
      }}
      isOpen={isOpen}
    />
  )
}
