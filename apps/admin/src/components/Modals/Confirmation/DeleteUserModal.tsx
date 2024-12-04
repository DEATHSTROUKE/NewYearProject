import { useLocation } from 'react-router-dom'

import { useDeleteUser } from '@/api/user'

import { ConfirmModal } from './ConfirmModal'

export const DeleteUserModal = ({ isOpen }: { isOpen: boolean }) => {
  const { state } = useLocation() as {
    state: { excursionId: string; userId: string }
  }
  const { deleteUser } = useDeleteUser()

  if (!state) return null

  const { userId, excursionId } = state

  return (
    <ConfirmModal
      title="Вы уверены, что хотите удалить игрока?"
      description="Восстановить игрока будет невозможно"
      action={() => {
        deleteUser({ userId, excursionId })
      }}
      isOpen={isOpen}
    />
  )
}
