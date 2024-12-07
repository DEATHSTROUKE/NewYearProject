import { adminApi } from '@/api'
import { Box, Button, Divider, Stack, Typography } from '@mui/joy'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'

export const Component = () => {
  const { id } = useParams()

  const queryClient = useQueryClient()
  const { mutate: changeIsLotteryUser, isPending } =
    adminApi.usePatchApiAdminUsersIdChangeIsLotteryUser()
  const { data: usersData, isLoading } = adminApi.useGetApiAdminUsersId(
    id || '',
    {
      query: { enabled: !!id },
    },
  )

  console.info(usersData)

  const toggleIsLotteryUser = () => {
    if (!usersData) return

    changeIsLotteryUser(
      {
        id: usersData.id?.toString() || '',
        data: { isLotteryUser: !usersData.isLotteryUser },
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: adminApi.getGetApiAdminUsersIdQueryKey(id || ''),
          })
        },
      },
    )
  }

  return (
    <MainLayout>
      <Typography level="h1" sx={{ mb: '20px' }}>
        Игроки
      </Typography>

      <Stack rowGap={'15px'}>{isLoading && <Loader />}</Stack>

      <Stack
        divider={<Divider orientation="horizontal" />}
        spacing={2}
        sx={{ mt: '20px' }}
      >
        {usersData && (
          <>
            <Typography>ID: {usersData.id}</Typography>
            <Typography>Имя: {usersData.name}</Typography>
            <Typography>Фамилия: {usersData.surname}</Typography>
            <Typography>Отчество: {usersData.middleName}</Typography>
            <Typography>Электронная почта: {usersData.email}</Typography>
            <Typography>Телефон: {usersData.phone}</Typography>
            <Typography>Место: {usersData.place}</Typography>
            <Typography>Дивизион: {usersData.division}</Typography>
            <Typography>
              Номер в розыгрыше: {usersData.lotteryNumber || 'Нет'}
            </Typography>
            <Typography>
              Участник розыгрыша: {usersData.isLotteryUser ? 'Да' : 'Нет'}
            </Typography>
            <Box>
              <Button
                variant="outlined"
                color="danger"
                onClick={toggleIsLotteryUser}
                disabled={isPending}
              >
                {usersData.isLotteryUser
                  ? 'Удалить из розыгрыша'
                  : 'Добавить в розыгрыш'}
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </MainLayout>
  )
}
