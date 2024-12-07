import { Typography } from '@mui/joy'
import { useLocation } from 'react-router-dom'

import { useCreateExcursion } from '@/api/excursion'

import { CenterContainer } from '@/components/Containers/CenterContainer'
import { CreateExcursionForm } from '@/components/Forms/CreateExcursionForm'
import { MainLayout } from '@/components/Layouts/MainLayout'

export const Component = () => {
  const { state } = useLocation() as { state: { copyExcursionId: string } }

  const { createExcursion, isPending } = useCreateExcursion()

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Создании экскурсии
      </Typography>
      <CenterContainer>
        <CreateExcursionForm
          isLoading={isPending}
          action={(name: string) =>
            createExcursion({
              name,
              copyExcursionId: parseInt(state?.copyExcursionId) || null,
            })
          }
        />
      </CenterContainer>
    </MainLayout>
  )
}
