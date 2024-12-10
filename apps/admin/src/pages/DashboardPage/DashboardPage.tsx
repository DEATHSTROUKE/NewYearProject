import { adminApi } from '@/api'
import { Stack, Typography } from '@mui/joy'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'
import { ConfirmModal } from '@/components/Modals/Confirmation/ConfirmModal'
import { Table } from '@/components/Table/Table'

import { TableRow } from './UsersTable/TableRow'

export const Component = () => {
  const { data: usersData, isLoading } = adminApi.useGetApiAdminUsers()

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [userId, setUserId] = useState('')

  const queryClient = useQueryClient()
  const { mutate: removeUserMutation } = adminApi.useDeleteApiAdminUsersId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: adminApi.getGetApiAdminUsersQueryKey(),
        })
      },
    },
  })

  const openModal = (id: string) => {
    setIsConfirmModalOpen(true)
    setUserId(id)
  }

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
              <TableRow
                key={item.id}
                index={index + 1}
                row={item}
                removeUser={openModal}
              />
            ))}
            endAlignRight
          />
        )}
      </Stack>
      <ConfirmModal
        action={() => removeUserMutation({ id: userId })}
        close={() => setIsConfirmModalOpen(false)}
        title="Подтвердите удаление"
        actionTitle="Удалить"
        description="Вы действительно хотите удалить пользователя?"
        isOpen={isConfirmModalOpen}
      />
    </MainLayout>
  )
}
