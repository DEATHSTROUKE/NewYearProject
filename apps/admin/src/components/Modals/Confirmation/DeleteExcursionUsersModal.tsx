import { useLocation } from 'react-router-dom'

import { useDeleteExcursionUsers } from '@/api/user'

import { ConfirmModal } from './ConfirmModal'

export const DeleteExcursionUsersModal = ({ isOpen }: { isOpen: boolean }) => {
  const { state } = useLocation() as { state: { excursionId: string } }
  const { deleteExcursionUser } = useDeleteExcursionUsers()

  return (
    <ConfirmModal
      title="Вы уверены, что хотите удалить ВСЕХ игроков данной экскурсии?"
      description="Восстановить игроков будет невозможно"
      action={() => {
        deleteExcursionUser(state.excursionId)
      }}
      isOpen={isOpen}
    />
  )
}
