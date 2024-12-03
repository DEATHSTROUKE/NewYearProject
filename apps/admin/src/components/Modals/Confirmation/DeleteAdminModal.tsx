import { useLocation } from 'react-router-dom'

import { useDeleteAdmin } from '@/api/admin'

import { ConfirmModal } from './ConfirmModal'

export const DeleteAdminModal = ({ isOpen }: { isOpen: boolean }) => {
  const { state } = useLocation() as { state: { adminId: string } }
  const { deleteAdmin } = useDeleteAdmin()

  return (
    <ConfirmModal
      title="Вы уверены, что хотите удалить администратора?"
      action={() => {
        deleteAdmin(state.adminId)
      }}
      isOpen={isOpen}
    />
  )
}
