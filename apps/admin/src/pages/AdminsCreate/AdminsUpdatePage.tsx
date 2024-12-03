import { Typography } from '@mui/joy'
import { useLocation, useParams } from 'react-router-dom'

import { useUpdateAdmin } from '@/api/admin'

import { CenterContainer } from '@/components/Containers/CenterContainer'
import { CreateAdminForm } from '@/components/Forms/CreateAdminForm'
import { MainLayout } from '@/components/Layouts/MainLayout'

export const Component = () => {
  const { id } = useParams()
  const { state } = useLocation() as { state: { mail: string } }

  const { updateAdmin, isPending } = useUpdateAdmin(id ?? '')

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Управление администраторами
      </Typography>

      {state && (
        <CenterContainer>
          <CreateAdminForm
            isLoading={isPending}
            login={state.mail}
            action={updateAdmin}
          />
        </CenterContainer>
      )}
    </MainLayout>
  )
}
