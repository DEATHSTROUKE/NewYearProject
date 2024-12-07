import { adminApi } from '@/api'
import { Stack, Typography } from '@mui/joy'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'
import { Table } from '@/components/Table/Table'

import { TableRow } from './UsersTable/TableRow'

export const Component = () => {
  const { data: usersData, isLoading } = adminApi.useGetApiAdminUsers()

  return (
    <MainLayout>
      <Typography level="h1" sx={{ mb: '20px' }}>
        Игроки
      </Typography>

      <Stack rowGap={'15px'}>
        {isLoading && <Loader />}

        {usersData && (
          <Table
            headers={[
              '№',
              'Телефон',
              'Фамилия',
              'Имя',
              'Отчество',
              'Угадано слов',
              'Действия',
            ]}
            rows={usersData.map((item, index) => (
              <TableRow key={item.id} index={index + 1} row={item} />
            ))}
            endAlignRight
          />
        )}
      </Stack>
    </MainLayout>
  )
}
