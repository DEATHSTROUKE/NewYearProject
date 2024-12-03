import { Typography } from '@mui/joy'

import { useCreateAdmin } from '@/api/admin'

import { CenterContainer } from '@/components/Containers/CenterContainer'
import { CreateAdminForm } from '@/components/Forms/CreateAdminForm'
import { MainLayout } from '@/components/Layouts/MainLayout'

export const Component = () => {
  const { createAdmin, isPending } = useCreateAdmin()

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Управление администраторами
      </Typography>
      <CenterContainer>
        <CreateAdminForm
          isLoading={isPending}
          action={createAdmin}
        />
      </CenterContainer>
    </MainLayout>
  )
}
