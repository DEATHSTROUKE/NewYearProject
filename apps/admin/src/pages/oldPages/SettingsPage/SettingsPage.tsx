import { Typography } from '@mui/joy'

import { useGetSettings } from '@/api/settings'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'

import { SettingsForm } from './components/SettingsForm'

export const Component = () => {
  const { settingsData, isLoading } = useGetSettings()

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Настройки
      </Typography>

      {isLoading && <Loader />}
      {settingsData && <SettingsForm data={settingsData} />}
    </MainLayout>
  )
}
