import { Box, Grid, Stack, Typography } from '@mui/joy'
import { Reorder } from 'framer-motion'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Input } from '@/components/Input/Input'

import { getPermutationIndexes } from '@/utils/getPermutationIndexes'

import { TFullTaskForm } from '@/types/task'

import { AnswerElement } from './AnswerElement'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let copyArray: any[] = []

export const ButtonsForm = () => {
  const {
    register,
    control,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<TFullTaskForm>()

  const countFields = watch('answer.buttons.buttonsAmount')

  const { fields, append, swap } = useFieldArray<TFullTaskForm>({
    control,
    name: 'answer.buttons.options',
  })

  useEffect(() => {
    if (!countFields) return

    const fieldsCount = Math.min(countFields, 10) - fields.length
    console.log({ countFields, fieldsCount, len: fields.length })
    onChangeFieldsCount(fieldsCount)
  }, [append, countFields, setValue, fields.length])

  const onChangeFieldsCount = (fieldsCount: number) => {
    if (fieldsCount > 0) {
      for (let i = 0; i < fieldsCount; i++) {
        if (copyArray.length > fields.length + i) {
          append({ value: copyArray[fields.length + i].value })
        } else {
          append({ value: '' })
        }
      }
    } else if (fieldsCount < 0) {
      copyArray = [...fields]
      const newArray = fields.slice(0, fieldsCount)
      setValue('answer.buttons.options', newArray)
    }
    trigger('answer.buttons.correctAnswerNumber')
  }

  useEffect(() => {
    trigger('answer.buttons.correctAnswerNumber')
  }, [watch('answer.buttons.correctAnswerNumber')])

  const onReorder = (newOrder: Array<{ id: string; value: string }>) => {
    const [el1, el2] = getPermutationIndexes(fields, newOrder)
    swap(el1, el2)
  }

  return (
    <>
      <Grid md={4}>
        <Input
          label="Кол-во вариантов ответа"
          {...register('answer.buttons.buttonsAmount', {
            valueAsNumber: true,
          })}
          textError={errors.answer?.buttons?.buttonsAmount?.message}
        />
        <Input
          label="Номер верного ответа"
          {...register('answer.buttons.correctAnswerNumber', {
            valueAsNumber: true,
          })}
          textError={errors.answer?.buttons?.correctAnswerNumber?.message}
        />
      </Grid>
      <Grid md={5}>
        <Typography>Варианты ответа</Typography>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Stack rowGap={'10px'}>
            <Reorder.Group
              onReorder={onReorder}
              values={fields}
            >
              {fields.map((item, index) => {
                return (
                  <AnswerElement
                    key={item.id}
                    item={item}
                    {...register(`answer.buttons.options.${index}.value`)}
                    error={
                      !!errors.answer?.buttons?.options?.[index]?.value?.message
                    }
                  />
                )
              })}
            </Reorder.Group>
          </Stack>
        </Box>
      </Grid>
    </>
  )
}
