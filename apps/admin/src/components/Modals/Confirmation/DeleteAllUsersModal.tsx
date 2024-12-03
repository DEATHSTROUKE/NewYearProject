import { useDeleteAllUsers } from '@/api/user'

import { ConfirmModal } from './ConfirmModal'

export const DeleteAllUsersModal = ({ isOpen }: { isOpen: boolean }) => {
  const { deleteAllUsers } = useDeleteAllUsers()

  return (
    <ConfirmModal
      title="Вы уверены, что хотите удалить ВСЕХ игроков?"
      description="Восстановить игроков будет невозможно"
      action={() => {
        deleteAllUsers()
      }}
      isOpen={isOpen}
    />
  )
}
