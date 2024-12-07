import { Box, Button, Stack, Typography } from '@mui/joy'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useGetFullUser } from '@/api/user'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'
import { Table } from '@/components/Table/Table'

import { TableRow } from './UserHistoryTable/TableRow'

export const Component = () => {
  const navigate = useNavigate()

  const [search] = useSearchParams()
  const userId = search.get('userId') || ''
  const excursionId = search.get('excursionId') || ''
  const { userData, isLoading } = useGetFullUser(excursionId, userId)

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        История действий игрока {userId}
      </Typography>
      <Typography sx={{ mb: '20px' }}>{userData?.excursionName}</Typography>

      <Stack rowGap={'15px'}>
        <Box>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => navigate(-1)}
          >
            Вернуться на страницу игроков
          </Button>
        </Box>

        {isLoading && <Loader />}

        {userData && (
          <Table
            headers={[
              'Номер задания',
              'Текст задания',
              'Ответ пользователя',
              'Полученные баллы',
              'Время ответа',
            ]}
            rows={userData.tasks.map((item, idx) => (
              <TableRow
                key={idx}
                row={item}
                taskNumber={idx + 1}
              />
            ))}
          />
        )}
      </Stack>
    </MainLayout>
  )
}
