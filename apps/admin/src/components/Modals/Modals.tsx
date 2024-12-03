import { useSearchParams } from 'react-router-dom'

import { MODALS } from '@/config/routes'

import { CheckNotificationModal } from './CheckNotificationModal'
import { DeleteAchievementModal } from './Confirmation/DeleteAchievementModal'
import { DeleteAdminModal } from './Confirmation/DeleteAdminModal'
import { DeleteAllAchievementsModal } from './Confirmation/DeleteAllAchievementsModal'
import { DeleteAllUsersModal } from './Confirmation/DeleteAllUsersModal'
import { DeleteExcursionUsersModal } from './Confirmation/DeleteExcursionUsersModal'
import { DeleteExcursionsModal } from './Confirmation/DeleteExcursionsModal'
import { DeleteTaskModal } from './Confirmation/DeleteTaskModal'
import { DeleteUserModal } from './Confirmation/DeleteUserModal'

export const Modals = () => {
  const [searchParams] = useSearchParams()
  const modal = searchParams.get('modal')

  return (
    <>
      <CheckNotificationModal isOpen={modal === MODALS.CheckNotification} />

      <DeleteAllAchievementsModal
        isOpen={modal === MODALS.DeleteAllAchievements}
      />
      <DeleteAchievementModal isOpen={modal === MODALS.DeleteAchievement} />
      <DeleteAdminModal isOpen={modal === MODALS.DeleteAdmin} />
      <DeleteTaskModal isOpen={modal === MODALS.DeleteTask} />
      <DeleteExcursionsModal isOpen={modal === MODALS.DeleteExcursion} />
      <DeleteUserModal isOpen={modal === MODALS.DeleteUser} />
      <DeleteExcursionUsersModal
        isOpen={modal === MODALS.DeleteExcursionUsers}
      />
      <DeleteAllUsersModal isOpen={modal === MODALS.DeleteAllUsers} />
    </>
  )
}
