import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Grid, Sheet, Stack, Typography } from '@mui/joy'
import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Input } from '@/components/Input/Input'
import { Select } from '@/components/Select/Select'
import { Textarea } from '@/components/Textarea/Textarea'
import { UploadImage } from '@/components/UploadImage/UploadImage'

import { BUTTONS_VALUES } from '@/config/constants'

import { useSave } from '@/hooks/useSave'

import {
  FullTaskForm,
  FullTaskFormToReq,
  TFullTask,
  TFullTaskForm,
} from '@/types/task'

import { ButtonsForm } from './ButtonsForm'

export const TaskCreateForm = ({
  sendData,
  isLoading,
  defaultData,
}: {
  sendData: (data: TFullTask) => void
  isLoading: boolean
  defaultData?: TFullTaskForm
}) => {
  const { id } = useParams()
  const methods = useForm<TFullTaskForm>({
    resolver: zodResolver(FullTaskForm),
    defaultValues: {
      image: null,
      answer: {
        type: 'buttons',
        buttons: {
          buttonsAmount: 1,
        },
      },
    },
    values: defaultData,
  })

  const {
    register,
    unregister,
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = methods

  const onSave = (data: TFullTaskForm) => {
    sendData(FullTaskFormToReq.parse(data))
  }

  const formType = watch('answer.type')

  useEffect(() => {
    if (formType === 'textfield') {
      unregister('answer.buttons')
      setValue(
        'answer.textfield.options',
        defaultData?.answer?.textfield?.options || '',
      )
    } else {
      unregister('answer.textfield')
      setValue('answer.textfield', undefined)
    }
  }, [formType, unregister])

  useSave(handleSubmit(onSave))

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSave)}>
        <Sheet sx={{ p: '15px', backgroundColor: '#fff' }}>
          <Stack rowGap={'40px'}>
            <Grid
              container
              columnSpacing={'60px'}
            >
              <Grid md={4}>
                <Stack rowGap={'36px'}>
                  <Typography
                    level="body-lg"
                    fontWeight={'bold'}
                  >
                    Локация
                  </Typography>
                  <Stack rowGap={'28px'}>
                    <Input
                      label="Название локации"
                      placeholder="Введите название"
                      {...register('location')}
                      textError={errors.location?.message}
                    />
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
                  </Stack>
                </Stack>
              </Grid>

              <Grid md={8}>
                <Stack rowGap={'36px'}>
                  <Typography
                    level="body-lg"
                    fontWeight={'bold'}
                  >
                    Задание
                  </Typography>
                  <Grid
                    container
                    columnSpacing={'30px'}
                  >
                    <Grid md={6}>
                      <Stack rowGap={'28px'}>
                        <Input
                          label="Баллы за задание"
                          {...register('score', { valueAsNumber: true })}
                          textError={errors.score?.message}
                        />
                        <Input
                          label="Текст верного ответа"
                          placeholder="Введите текст"
                          {...register('textForCorrectResponse')}
                          textError={errors.textForCorrectResponse?.message}
                        />
                        <Input
                          label="Текст неверного ответа"
                          placeholder="Введите текст"
                          {...register('textForIncorrectResponse')}
                          textError={errors.textForIncorrectResponse?.message}
                        />
                      </Stack>
                    </Grid>

                    <Grid md={6}>
                      <Stack rowGap={'28px'}>
                        <Textarea
                          label="Текст предисловия"
                          placeholder="Введите текст"
                          {...register('htmlForIntroTask')}
                          textError={errors.htmlForIntroTask?.message}
                        />
                        <Textarea
                          label="Текст задания"
                          placeholder="Введите текст"
                          {...register('htmlForTask')}
                          textError={errors.htmlForTask?.message}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
            <Stack rowGap={'30px'}>
              <Grid
                container
                columnSpacing={'30px'}
              >
                <Grid md={3}>
                  <Controller
                    control={control}
                    name="answer.type"
                    render={({ field: { value, onChange } }) => {
                      return (
                        <Select
                          label="Вид ответа"
                          labelPosition="top"
                          defaultValue={'textfield'}
                          currentValue={value}
                          onChange={onChange}
                          values={BUTTONS_VALUES}
                        />
                      )
                    }}
                  />
                </Grid>
                {formType === 'buttons' ? (
                  <ButtonsForm />
                ) : (
                  <Grid md={4}>
                    <Input
                      label="Варианты верного ответа"
                      placeholder="Например: кот, котенок, кошка"
                      {...register('answer.textfield.options')}
                      textError={errors.answer?.textfield?.options?.message}
                    />
                  </Grid>
                )}
              </Grid>
            </Stack>
            <Stack
              direction={'row'}
              justifyContent={'center'}
            >
              <Button
                type="submit"
                loading={isLoading}
              >
                {id ? 'Сохранить изменения' : 'Создать'}
              </Button>
            </Stack>
          </Stack>
        </Sheet>
      </form>
    </FormProvider>
  )
}
