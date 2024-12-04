import { Box, Button, Stack, Typography } from '@mui/joy'
import { PlusIcon } from '@primer/octicons-react'
import { useNavigate } from 'react-router-dom'

import { useGetAdmins } from '@/api/admin'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'
import { Table } from '@/components/Table/Table'

import { ROUTES } from '@/config/routes'

import { TableRow } from './AdminsTable/TableRow'

export const Component = () => {
  const navigate = useNavigate()
  const { adminsData, isAdminsLoading } = useGetAdmins()

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Управление администраторами
      </Typography>

      <Stack rowGap={'15px'}>
        <Box sx={{ maxWidth: '300px' }}>
          <Button
            startDecorator={<PlusIcon size={16} />}
            onClick={() => navigate(ROUTES.AdminsCreate)}
          >
            Добавить администратора
          </Button>
        </Box>

        {isAdminsLoading && <Loader variant="dark" />}

        {adminsData && (
          <Table
            headers={['Логин администратора', 'Действия']}
            rows={adminsData.map(item => (
              <TableRow
                key={item.id}
                row={item}
              />
            ))}
            endAlignRight
          />
        )}
      </Stack>
    </MainLayout>
  )
}
