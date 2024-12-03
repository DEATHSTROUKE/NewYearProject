import { Button, Stack, Typography } from '@mui/joy'
import { useNavigate } from 'react-router-dom'

import { BaseModal } from '../BaseModal'

type ConfirmModalProps = {
  action: () => void
  isOpen: boolean
  title: string
  description?: string
  actionTitle?: string
}

export const ConfirmModal = ({
  isOpen,
  action,
  description,
  title,
  actionTitle = 'Удалить',
}: ConfirmModalProps) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={() => navigate(-1)}
      maxWidth={350}
      title={title}
    >
      <Typography
        sx={{
          color: 'var(--dark-gray)',
          py: '17px',
          maxWidth: '200px',
          m: '0 auto',
        }}
      >
        {description}
      </Typography>
      <Stack
        direction={'row'}
        columnGap={'15px'}
      >
        <Button
          onClick={() => {
            action()
            navigate(-1)
          }}
          sx={{ width: '100%' }}
        >
          {actionTitle}
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          sx={{ width: '100%' }}
          onClick={() => navigate(-1)}
        >
          Отменить
        </Button>
      </Stack>
    </BaseModal>
  )
}
