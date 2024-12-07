import { adminApi } from '@/api'
import { Button, Card, Grid, Stack, Typography } from '@mui/joy'
import {
  AdminTextsTitle,
  AdminTextsTitleHumanReadable,
  DATETIME_TEXTS,
} from '@shared'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { GetAdminTextsRequest } from '@/api/generated/users/model'

import { DateTimePicker } from '@/components/DateTimePicker/DateTimePicker'
import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'
import { Textarea } from '@/components/Textarea/Textarea'

import { formatDateTime } from '@/utils/formatTime'

export const Component = () => {
  const { data, isLoading } = adminApi.useGetApiAdminText()

  return (
    <MainLayout>
      <Typography level="h1" sx={{ mb: '20px' }}>
        Редактирование текстов
      </Typography>

      {isLoading && <Loader />}

      <Grid
        container
        sx={{ width: '100%' }}
        rowSpacing={'25px'}
        columnSpacing={'25px'}
      >
        {data &&
          data.map((item, index) => <AdminTextField {...item} key={index} />)}
      </Grid>
    </MainLayout>
  )
}

export const AdminTextField = ({
  title,
  text,
  startDate,
  endDate,
}: GetAdminTextsRequest) => {
  const { mutate: updateAdminText } = adminApi.usePatchApiAdminText()
  const queryClient = useQueryClient()
  const [form, setForm] = useState<Omit<GetAdminTextsRequest, 'title'>>({
    text,
    startDate: formatDateTime(startDate),
    endDate: formatDateTime(endDate),
  })

  const handleSave = () => {
    console.info(form)
    updateAdminText(
      {
        data: {
          title,
          ...form,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: adminApi.getGetApiAdminTextQueryKey(),
          })
        },
      },
    )
  }

  return (
    <Grid md={7} xs={12}>
      <Card>
        <Stack gap={'15px'}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography level="h4">
              {AdminTextsTitleHumanReadable[title as AdminTextsTitle]}
            </Typography>
            <Button variant="outlined" onClick={handleSave}>
              Save
            </Button>
          </Stack>
          <Textarea
            maxRows={10}
            value={form.text}
            onChange={e => setForm(prev => ({ ...prev, text: e.target.value }))}
            placeholder="Введите текст"
          />
          {DATETIME_TEXTS.includes(title as AdminTextsTitle) && (
            <DateTimePicker
              value={form.startDate || new Date().toISOString()}
              onChange={e =>
                setForm(prev => ({ ...prev, startDate: e.target.value }))
              }
              label="Время начала события"
            />
          )}
          {DATETIME_TEXTS.includes(title as AdminTextsTitle) && (
            <DateTimePicker
              value={form.endDate || new Date().toISOString()}
              onChange={e =>
                setForm(prev => ({ ...prev, endDate: e.target.value }))
              }
              label="Время конца события"
            />
          )}
        </Stack>
      </Card>
    </Grid>
  )
}
