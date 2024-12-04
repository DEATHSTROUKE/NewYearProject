import { Checkbox, IconButton, Stack } from '@mui/joy'
import { GrabberIcon, PencilIcon, TrashIcon } from '@primer/octicons-react'
import { Reorder } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { ImageWithPlaceholder } from '@/components/ImageWithPlaceholder/ImageWithPlaceholder'
import { CellText } from '@/components/Table/CellText'

import { MODALS, ROUTES } from '@/config/routes'

import { useOpenModal } from '@/hooks/useModals'

import { TTaskData } from '@/types/task'

export const TableRow = ({
  taskNumber,
  excursionId,
  updateVisibility,
  row,
}: {
  taskNumber: number
  excursionId: string
  updateVisibility: (id: string) => void
  row: TTaskData
}) => {
  const navigate = useNavigate()
  const { openModal } = useOpenModal()
  const { id, image, location, task, visibility } = row

  return (
    <Reorder.Item
      as="tr"
      value={row}
    >
      <td>
        <IconButton>
          <GrabberIcon size={16} />
        </IconButton>
      </td>
      <td>{taskNumber}</td>

      <td>
        <Checkbox
          checked={visibility}
          onChange={() => updateVisibility(id)}
        />
      </td>

      <td><CellText text={task} /></td>

      <td><CellText text={location} /></td>

      <td>
        <ImageWithPlaceholder src={image} />
      </td>
      <td>
        <Stack
          direction={'row'}
          sx={{ width: '100%' }}
          justifyContent={'flex-end'}
        >
          <Stack direction={'row'}>
            <IconButton onClick={() => navigate(`${ROUTES.TaskUpdate}/${id}`)}>
              <PencilIcon size={16} />
            </IconButton>
            <IconButton
              onClick={() =>
                openModal(MODALS.DeleteTask, { excursionId, taskId: id })
              }
            >
              <TrashIcon
                size={16}
                fill="var(--danger-color)"
              />
            </IconButton>
          </Stack>
        </Stack>
      </td>
    </Reorder.Item>
  )
}
