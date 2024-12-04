import { IconButton, Stack } from '@mui/joy'
import { HistoryIcon, TrashIcon } from '@primer/octicons-react'
import { useNavigate } from 'react-router-dom'

import { MODALS, ROUTES } from '@/config/routes'

import { useOpenModal } from '@/hooks/useModals'

import { TUserState } from '@/types/user'

export const TableRow = ({
  row: { excursionId, finishedTasks, id, score, tasksAmount, username },
}: {
  row: TUserState
}) => {
  const navigate = useNavigate()
  const { openModal } = useOpenModal()

  const showHistory = () => {
    navigate(`${ROUTES.UserHistory}?excursionId=${excursionId}&userId=${id}`)
  }

  return (
    <tr>
      <td>{id}</td>
      <td>{username || 'null'}</td>
      <td>{score}</td>

      <td>
        {finishedTasks}/{tasksAmount}
      </td>
      <td>
        <Stack
          direction={'row'}
          sx={{ width: '100%' }}
          justifyContent={'flex-end'}
        >
          <Stack direction={'row'}>
            <IconButton onClick={showHistory}>
              <HistoryIcon size={16} />
            </IconButton>
            <IconButton
              onClick={() => {
                openModal(MODALS.DeleteUser, { excursionId, userId: id })
              }}
            >
              <TrashIcon
                size={16}
                fill="var(--danger-color)"
              />
            </IconButton>
          </Stack>
        </Stack>
      </td>
    </tr>
  )
}
