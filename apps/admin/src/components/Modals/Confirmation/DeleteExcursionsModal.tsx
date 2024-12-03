import { useLocation } from 'react-router-dom'

import { useDeleteExcursion } from '@/api/excursion'

import { ConfirmModal } from './ConfirmModal'

export const DeleteExcursionsModal = ({ isOpen }: { isOpen: boolean }) => {
  const { state } = useLocation() as { state: { excursionId: string } }
  const { deleteExcursion } = useDeleteExcursion()

  return (
    <ConfirmModal
      title="Вы уверены, что хотите удалить экскурсию?"
      description="Восстановить экскурсию будет невозможно"
      action={() => {
        deleteExcursion(state.excursionId)
      }}
      isOpen={isOpen}
    />
  )
}
