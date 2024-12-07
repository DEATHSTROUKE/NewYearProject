import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, Sheet, Stack, Typography } from '@mui/joy'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Input } from '@/components/Input/Input'
import { UploadImage } from '@/components/UploadImage/UploadImage'

import { useSave } from '@/hooks/useSave'

import { FullAchievement, TFullAchievement } from '@/types/achievement'

export const AchievementForm = ({
  sendData,
  data,
  isLoading,
}: {
  sendData: (arg: TFullAchievement) => void
  data?: TFullAchievement
  isLoading: boolean
}) => {
  const { id } = useParams()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFullAchievement>({
    resolver: zodResolver(FullAchievement),
    defaultValues: {
      image: null,
    },
    values: data,
  })

  useSave(handleSubmit(sendData))

  return (
    <form onSubmit={handleSubmit(sendData)}>
      <Sheet sx={{ p: '15px', backgroundColor: '#fff' }}>
        <Stack rowGap={'40px'}>
          <Grid
            container
            columnSpacing={'64px'}
            rowSpacing={'40px'}
          >
            <Grid
              lg={4}
              xs={12}
            >
              <Stack rowGap={'28px'}>
                <Typography
                  level="body-lg"
                  fontWeight={'bold'}
                >
                  Ачивка
                </Typography>
                <Stack rowGap={'24px'}>
                  <Input
                    label="Название ачивки"
                    placeholder="Введите название"
                    {...register('name')}
                    textError={errors.name?.message}
                  />

                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <UploadImage
                          value={value}
                          setImage={onChange}
                          label="Картинка ачивки"
                        />
                      )
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid
              lg={4}
              xs={12}
            >
              <Stack rowGap={'28px'}>
                <Typography
                  level="body-lg"
                  fontWeight={'bold'}
                >
                  Условия получения
                </Typography>
                <Stack rowGap={'24px'}>
                  <Input
                    label="Количество баллов для получения"
                    {...register('score', { valueAsNumber: true })}
                    textError={errors.score?.message}
                  />
                  <Input
                    label='Текст для кнопки "Поделиться"'
                    placeholder="Введите текст"
                    {...register('shareText')}
                    textError={errors.shareText?.message}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Stack
            direction={'row'}
            justifyContent={'center'}
          >
            <Button
              loading={isLoading}
              type="submit"
            >
              {id ? 'Сохранить изменения' : 'Создать'}
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    </form>
  )
}
