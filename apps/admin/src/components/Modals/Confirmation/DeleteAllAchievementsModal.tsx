import { useLocation } from 'react-router-dom'

import { useDeleteAllAchievements } from '@/api/achievement'

import { ConfirmModal } from './ConfirmModal'

export const DeleteAllAchievementsModal = ({ isOpen }: { isOpen: boolean }) => {
  const { state } = useLocation() as {
    state: { excursionId: string }
  }
  const { deleteAllAchievement } = useDeleteAllAchievements()

  return (
    <ConfirmModal
      title="Вы уверены, что хотите удалить ВСЕ ачивки из экскурсии?"
      description="Восстановить ачивки будет невозможно"
      action={() => {
        deleteAllAchievement(state.excursionId)
      }}
      isOpen={isOpen}
    />
  )
}
