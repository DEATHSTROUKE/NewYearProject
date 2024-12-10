import { IconButton, Stack } from '@mui/joy'
import { HistoryIcon, TrashIcon } from '@primer/octicons-react'
import { useNavigate } from 'react-router-dom'

import { UserBasic } from '@/api/generated/users/model'

import { ROUTES } from '@/config/routes'

export const TableRow = ({
  index,
  row: { phone, name, surname, middleName, correctAttempts, id },
  removeUser,
}: {
  index: number
  row: UserBasic
  removeUser: (id: string) => void
}) => {
  const navigate = useNavigate()

  const showFullUser = () => {
    navigate(`${ROUTES.User}/${id}`)
  }

  return (
    <tr>
      <td>{index}</td>
      <td>{phone}</td>
      <td>{surname}</td>
      <td>{name}</td>
      <td>{middleName}</td>
      <td>{correctAttempts}</td>

      <td>
        <Stack
          direction={'row'}
          sx={{ width: '100%' }}
          justifyContent={'flex-end'}
        >
          <Stack direction={'row'}>
            <IconButton onClick={showFullUser}>
              <HistoryIcon size={16} />
            </IconButton>
            <IconButton onClick={() => removeUser(id.toString())}>
              <TrashIcon size={16} fill="var(--danger-color)" />
            </IconButton>
          </Stack>
        </Stack>
      </td>
    </tr>
  )
}
