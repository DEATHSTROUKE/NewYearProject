import { Stack, Typography } from '@mui/joy'
import { useState } from 'react'

import { MainLayout } from '@/components/Layouts/MainLayout'

import { PinCode } from '../SettingsPage/components/PinCode'

export const Component = () => {
  const [pin, setPin] = useState('')

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Управление заданиями
      </Typography>

      <Stack rowGap={'20px'}>
        <PinCode
          value={pin}
          onChange={setPin}
        />
      </Stack>
    </MainLayout>
  )
}
