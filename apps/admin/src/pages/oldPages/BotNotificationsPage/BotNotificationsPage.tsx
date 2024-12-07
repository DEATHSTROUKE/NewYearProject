import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid, Sheet, Stack, Typography } from '@mui/joy'
import { Controller, useForm } from 'react-hook-form'

import { usePostNotification } from '@/api/notification'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { Select } from '@/components/Select/Select'
import { Textarea } from '@/components/Textarea/Textarea'
import { UploadImage } from '@/components/UploadImage/UploadImage'

import { useExcursionStore } from '@/store/excursionStore'

import { BotNotificationData, TBotNotificationData } from '@/types/notification'

export const Component = () => {
  const { sendNotice, isPending } = usePostNotification()
  const excursionList = useExcursionStore(state => state.excursionList)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TBotNotificationData>({
    resolver: zodResolver(BotNotificationData),
    defaultValues: {
      image: null,
    },
  })

  const onSend = (data: TBotNotificationData) => {
    console.log(data)
    sendNotice(data)
  }

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Уведомления в боте
      </Typography>
      <Stack rowGap={'15px'}>
        <Typography sx={{ mb: '20px' }}>
          Вы на экскурсии “Экскурсия AVITO.TECH”
        </Typography>

        <form onSubmit={handleSubmit(onSend)}>
          <Sheet sx={{ p: '15px', backgroundColor: '#fff' }}>
            <Stack rowGap={'30px'}>
              <Grid
                container
                columnSpacing={'20px'}
              >
                <Grid md={4}>
                  <Textarea
                    label="Текст сообщения"
                    placeholder="Введите текст сообщения, которое увидит пользователь"
                    {...register('htmlText')}
                    textError={errors.htmlText?.message}
                  />
                </Grid>
                <Grid
                  md={4}
                  sx={{ maxWidth: '250px' }}
                >
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <UploadImage
                          label="Картинка локации"
                          value={value}
                          setImage={onChange}
                        />
                      )
                    }}
                  />
                </Grid>
                <Grid md={4}>
                  <Box>
                    <Controller
                      control={control}
                      name="excursionId"
                      render={({ field: { onChange, value } }) => {
                        return (
                          <Select
                            labelPosition="top"
                            label="Выбрать экскурсию"
                            currentValue={value}
                            onChange={onChange}
                            defaultValue={'all'}
                            values={excursionList.reduce(
                              (obj: Record<string, { text: string }>, item) => {
                                obj[item.id] = { text: item.name }
                                return obj
                              },
                              { all: { text: 'Отправить всем пользователям' } },
                            )}
                          />
                        )
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Stack
                direction={'row'}
                justifyContent={'center'}
              >
                <Button
                  loading={isPending}
                  type="submit"
                >
                  Отправить
                </Button>
              </Stack>
            </Stack>
          </Sheet>
        </form>
      </Stack>
    </MainLayout>
  )
}
