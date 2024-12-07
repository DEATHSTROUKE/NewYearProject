import { adminApi } from '@/api'
import { Button, Card, Grid, Stack, Typography } from '@mui/joy'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { Task, UpdateTaskRequest } from '@/api/generated/users/model'

import { DateTimePicker } from '@/components/DateTimePicker/DateTimePicker'
import { Input } from '@/components/Input/Input'
import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'
import { Textarea } from '@/components/Textarea/Textarea'

import { formatDateTime } from '@/utils/formatTime'

export const Component = () => {
  const { data, isLoading } = adminApi.useGetApiAdminTask()
  const queryClient = useQueryClient()
  const { mutate: createTask } = adminApi.usePostApiAdminTask()

  const onCreateClick = () => {
    if (!data) return

    createTask(
      {
        data: {
          answer: '',
          meaning: '',
          question: '',
          startDate: new Date().toISOString(),
          wordIndex: data[data.length - 1].wordIndex + 1,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: adminApi.getGetApiAdminTaskQueryKey(),
          })
        },
      },
    )
  }

  return (
    <MainLayout>
      <Typography level="h1" sx={{ mb: '20px' }}>
        Задания
      </Typography>

      {isLoading && <Loader />}

      <Button
        sx={{ mb: '20px' }}
        disabled={isLoading || (data && data?.length >= 5)}
        onClick={onCreateClick}
      >
        Добавить слово
      </Button>

      <Grid
        container
        sx={{ width: '100%' }}
        rowSpacing={'25px'}
        columnSpacing={'25px'}
      >
        {data && data.map((item, index) => <TaskBlock key={index} {...item} />)}
      </Grid>
    </MainLayout>
  )
}

export const TaskBlock = ({
  id,
  answer,
  meaning,
  question,
  startDate,
}: Task) => {
  const queryClient = useQueryClient()
  const { mutate: updateTask } = adminApi.usePatchApiAdminTaskId()
  const [form, setForm] = useState<UpdateTaskRequest>({
    answer,
    meaning,
    question,
    startDate: formatDateTime(startDate),
  })

  const handleSave = () => {
    console.info(form)
    updateTask(
      {
        id,
        data: {
          ...form,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: adminApi.getGetApiAdminTaskQueryKey(),
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
            <Input
              value={form.answer}
              onChange={e =>
                setForm(prev => ({ ...prev, answer: e.target.value }))
              }
              label="Слово"
              labelStyle="bold"
            />
            <Button variant="outlined" onClick={handleSave}>
              Save
            </Button>
          </Stack>

          <Textarea
            maxRows={10}
            value={form.question}
            onChange={e =>
              setForm(prev => ({ ...prev, question: e.target.value }))
            }
            placeholder="Введите текст"
            label="Вопрос"
            labelStyle="bold"
          />
          <Textarea
            maxRows={10}
            value={form.meaning}
            onChange={e =>
              setForm(prev => ({ ...prev, meaning: e.target.value }))
            }
            placeholder="Введите текст"
            label="Значение слова"
            labelStyle="bold"
          />
          {
            <DateTimePicker
              labelStyle="bold"
              value={form.startDate}
              onChange={e =>
                setForm(prev => ({ ...prev, startDate: e.target.value }))
              }
              label="Время начала события"
            />
          }
        </Stack>
      </Card>
    </Grid>
  )
}
