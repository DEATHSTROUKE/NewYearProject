import { adminApi } from '@/api'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/joy'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
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
        Игрок {id}
      </Typography>

      <Stack rowGap={'15px'}>{isLoading && <Loader />}</Stack>

      <Stack
        divider={<Divider orientation="horizontal" />}
        spacing={2}
        sx={{ mt: '20px' }}
      >
        {usersData && (
          <Stack gap={'20px'}>
            <Stack gap={'10px'}>
              <RowItem title="ID" value={usersData.id} />
              <RowItem title="Имя" value={usersData.name} />
              <RowItem title="Фамилия" value={usersData.surname} />
              <RowItem title="Отчество" value={usersData.middleName} />
              <RowItem title="Электронная почта" value={usersData.email} />
              <RowItem title="Телефон" value={`+7${usersData.phone}`} />
              <RowItem title="Место" value={usersData.place} />
              <RowItem title="Дивизион" value={usersData.division} />
              <RowItem
                title="Номер в розыгрыше"
                value={usersData.lotteryNumber || 'Нет'}
              />
              <RowItem
                title="Участник розыгрыша"
                value={usersData.isLotteryUser ? 'Да' : 'Нет'}
              />
            </Stack>

            <Stack gap={'10px'}>
              <Typography fontWeight={'bold'}>Ответы:</Typography>
              <Grid container spacing={'15px'}>
                {usersData.answers.map((item, index) => (
                  <Grid md={4} key={index} spacing={2}>
                    <Typography fontWeight={'bold'}>
                      {item.correctWord}
                    </Typography>
                    <Stack rowGap={'3px'}>
                      {item.attempts.map(attempt => {
                        return (
                          <Stack direction={'row'} gap={'10px'}>
                            <Typography
                              key={attempt.id}
                              color={
                                attempt.word.toLowerCase() ===
                                item.correctWord.toLowerCase()
                                  ? 'success'
                                  : 'danger'
                              }
                            >
                              {attempt.word}
                            </Typography>
                            <Typography>
                              {dayjs(attempt.createdAt).format(
                                'DD.MM.YYYY HH:mm',
                              )}
                            </Typography>
                          </Stack>
                        )
                      })}
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>

            {usersData.reviews && (
              <Stack gap={'10px'}>
                <Typography fontWeight={'bold'}>Отзыв:</Typography>
                <Stack gap={'10px'}>
                  <Typography>{usersData.reviews.text}</Typography>
                  <Typography>
                    {dayjs(usersData.reviews.createdAt).format(
                      'DD.MM.YYYY HH:mm',
                    )}
                  </Typography>
                </Stack>
              </Stack>
            )}

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
          </Stack>
        )}
      </Stack>
    </MainLayout>
  )
}

const RowItem = ({
  title,
  value,
}: {
  title: string
  value: string | number
}) => {
  return (
    <Stack direction={'row'} gap={1} alignItems={'center'}>
      <Typography fontWeight={'bold'}>{title}:</Typography>
      <Typography>{value}</Typography>
    </Stack>
  )
}
