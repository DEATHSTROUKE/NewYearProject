import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Grid, Sheet, Stack, Typography } from '@mui/joy'
import { Controller, useForm } from 'react-hook-form'

import { useUpdateSettings } from '@/api/settings'

import { DateTimePicker } from '@/components/DateTimePicker/DateTimePicker'
import { Select } from '@/components/Select/Select'
import { Textarea } from '@/components/Textarea/Textarea'

import { useExcursionStore } from '@/store/excursionStore'

import { useSave } from '@/hooks/useSave'

import {
  SettingsData,
  SettingsDataToSend,
  TSettingsData,
} from '@/types/settings'

import { PinCode } from './PinCode'

export const SettingsForm = ({ data }: { data: TSettingsData }) => {
  const excursionList = useExcursionStore(state => state.excursionList)
  const { updateSettings, isPending } = useUpdateSettings()

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TSettingsData>({
    resolver: zodResolver(SettingsData),
    defaultValues: {
      pinCode: '',
    },
    values: data,
  })

  const onSave = (data: TSettingsData) => {
    updateSettings(SettingsDataToSend.parse(data))
  }

  useSave(handleSubmit(onSave))

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Sheet sx={{ p: '15px', backgroundColor: '#fff' }}>
        <Stack rowGap={'40px'}>
          <Grid
            container
            columnSpacing={'64px'}
            rowSpacing={'36px'}
          >
            <Grid md={4}>
              <Typography
                level="body-lg"
                fontWeight={'bold'}
              >
                Экран с пин-кодом
              </Typography>
            </Grid>
            <Grid md={4}>
              <Typography
                level="body-lg"
                fontWeight={'bold'}
              >
                Экран приветствия
              </Typography>
            </Grid>
            <Grid md={4}>
              <Typography
                level="body-lg"
                fontWeight={'bold'}
              >
                Экран с результатами
              </Typography>
            </Grid>
            <Grid md={4}>
              <Textarea
                label="Текст описания"
                placeholder="Введите текст"
                {...register('pinCodeText')}
                textError={errors.pinCodeText?.message}
              />
            </Grid>
            <Grid md={4}>
              <Textarea
                label="Текст описания"
                placeholder="Введите текст"
                {...register('helloText')}
                textError={errors.helloText?.message}
              />
            </Grid>
            <Grid md={4}>
              <Textarea
                label="Текст описания"
                placeholder="Введите текст"
                {...register('shareText')}
                textError={errors.shareText?.message}
              />
            </Grid>
          </Grid>

          <Box sx={{ maxWidth: '200px' }}>
            <Controller
              control={control}
              name="pinCode"
              render={({ field: { value, onChange } }) => {
                return (
                  <PinCode
                    value={value}
                    onChange={onChange}
                    textError={errors.pinCode?.message}
                  />
                )
              }}
            />
          </Box>

          <Grid
            container
            columnSpacing={'64px'}
            rowGap={'36px'}
          >
            <Grid md={4}>
              <Typography
                level="body-lg"
                fontWeight={'bold'}
              >
                Страница не найдена(404)
              </Typography>
            </Grid>
            <Grid md={4}>
              <Typography
                level="body-lg"
                fontWeight={'bold'}
              >
                Время проведения экскурсии(MSK)
              </Typography>
            </Grid>
            <Grid md={4}>
              <Typography
                level="body-lg"
                fontWeight={'bold'}
              >
                Текущая рабочая экскурсия
              </Typography>
            </Grid>
            <Grid md={4}>
              <Stack rowGap={'24px'}>
                <Textarea
                  label="Текст описания"
                  placeholder="Введите текст"
                  {...register('notFoundText')}
                  textError={errors.notFoundText?.message}
                />
              </Stack>
            </Grid>
            <Grid md={4}>
              <Stack rowGap={'24px'}>
                <DateTimePicker
                  label="Дата начала"
                  {...register('startTime')}
                  textError={errors.startTime?.message}
                />
                <DateTimePicker
                  label="Дата окончания"
                  {...register('endTime')}
                  textError={errors.endTime?.message}
                />
              </Stack>
            </Grid>
            <Grid md={4}>
              <Controller
                control={control}
                name="mainExcursionId"
                render={({ field: { value, onChange } }) => {
                  const values = excursionList.reduce(
                    (obj: Record<string, { text: string }>, item) => {
                      obj[item.id] = { text: item.name }
                      return obj
                    },
                    {},
                  )

                  return (
                    <Select
                      label="Выберите экскурсию"
                      values={values}
                      currentValue={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
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
              Сохранить изменения
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    </form>
  )
}
