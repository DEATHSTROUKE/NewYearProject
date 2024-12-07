import { IconButton, Stack } from '@mui/joy'
import { PencilIcon, TrashIcon } from '@primer/octicons-react'
import { useNavigate } from 'react-router-dom'

import { MODALS, ROUTES } from '@/config/routes'

import { useOpenModal } from '@/hooks/useModals'

type AdminProps = {
  row: {
    id: string
    mail: string
  }
}

export const TableRow = ({ row: { mail, id } }: AdminProps) => {
  const navigate = useNavigate()
  const { openModal } = useOpenModal()

  return (
    <tr>
      <td>{mail}</td>
      <td style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Stack direction={'row'}>
          <IconButton
            onClick={() =>
              navigate(`${ROUTES.AdminsUpdate}/${id}`, { state: { mail } })
            }
          >
            <PencilIcon size={16} />
          </IconButton>
          <IconButton
            onClick={() => openModal(MODALS.DeleteAdmin, { adminId: id })}
          >
            <TrashIcon
              size={16}
              fill="var(--danger-color)"
            />
          </IconButton>
        </Stack>
      </td>
    </tr>
  )
}
