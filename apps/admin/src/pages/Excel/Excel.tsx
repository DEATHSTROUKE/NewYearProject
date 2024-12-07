import { adminApi } from '@/api'
import { Box, Button, Divider, Stack, Typography } from '@mui/joy'

import { MainLayout } from '@/components/Layouts/MainLayout'

export const Component = () => {
  const onDownloadReviews = () => {
    adminApi.getApiAdminExcelAllReviews()
  }

  const onDownloadLotteryNumbers = () => {
    adminApi.getApiAdminExcelLotteryNumbers()
  }

  return (
    <MainLayout>
      <Typography level="h1" sx={{ mb: '20px' }}>
        Выгрузка отзывов и лоттереи
      </Typography>
      <Stack gap={'20px'}>
        <Stack gap={'10px'}>
          <Typography>Загрузить все отзывы отзывы</Typography>
          <Box>
            <Button onClick={onDownloadReviews}>Скачать</Button>
          </Box>
        </Stack>
        <Divider />
        <Stack gap={'10px'}>
          <Typography>
            Загрузить всех участников с номерами для лоттереи
          </Typography>
          <Box>
            <Button onClick={onDownloadLotteryNumbers}>Скачать</Button>
          </Box>
        </Stack>
      </Stack>
    </MainLayout>
  )
}
