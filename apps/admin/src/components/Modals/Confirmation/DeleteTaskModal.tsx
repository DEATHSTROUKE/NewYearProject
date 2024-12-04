import { useLocation } from 'react-router-dom'

import { useDeleteTask } from '@/api/task'

import { ConfirmModal } from './ConfirmModal'

export const DeleteTaskModal = ({ isOpen }: { isOpen: boolean }) => {
  const { state } = useLocation() as {
    state: { excursionId: string; taskId: string }
  }
  const { deleteTask } = useDeleteTask()

  if (!state) return null

  const { taskId, excursionId } = state

  return (
    <ConfirmModal
      title="Вы уверены, что хотите удалить задание?"
      description="Восстановить задание будет невозможно"
      action={() => {
        deleteTask({ taskId, excursionId })
      }}
      isOpen={isOpen}
    />
  )
}
