import { IconButton, Stack } from '@mui/joy'
import { PencilIcon, TrashIcon } from '@primer/octicons-react'
import { useNavigate } from 'react-router-dom'

import { ImageWithPlaceholder } from '@/components/ImageWithPlaceholder/ImageWithPlaceholder'

import { MODALS, ROUTES } from '@/config/routes'

import { useOpenModal } from '@/hooks/useModals'

import { TVisibleAchievementData } from '@/types/achievement'

export const TableRow = ({
  excursionId,
  row: { id, image, name, score },
}: {
  excursionId: string
  row: TVisibleAchievementData
}) => {
  const { openModal } = useOpenModal()
  const navigate = useNavigate()

  return (
    <tr>
      <td>{name}</td>
      <td>{score}</td>

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
            <IconButton
              onClick={() => navigate(`${ROUTES.AchievementsUpdate}/${id}`)}
            >
              <PencilIcon size={16} />
            </IconButton>
            <IconButton
              onClick={() =>
                openModal(MODALS.DeleteAchievement, {
                  excursionId,
                  achievementId: id,
                })
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
    </tr>
  )
}
