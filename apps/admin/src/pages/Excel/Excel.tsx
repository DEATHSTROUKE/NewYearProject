import { adminApi } from '@/api'
import { Box, Button, Divider, Stack, Typography } from '@mui/joy'

import { MainLayout } from '@/components/Layouts/MainLayout'

export const Component = () => {
  const downloadFile = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  const onDownloadReviews = async () => {
    const data = await adminApi.getApiAdminExcelAllReviews()
    downloadFile(data, 'reviews.csv')
  }

  const onDownloadLotteryNumbers = async () => {
    const data = await adminApi.getApiAdminExcelLotteryNumbers()
    downloadFile(data, 'lotteryNumbers.xlsx')
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
