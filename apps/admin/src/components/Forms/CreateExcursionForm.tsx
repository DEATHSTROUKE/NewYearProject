import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Sheet, Stack, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '../Input/Input'

const FormSchema = z.object({ name: z.string().trim().min(1) })
type TFormSchema = z.infer<typeof FormSchema>

export const CreateExcursionForm = ({
  isLoading,
  action,
}: {
  isLoading: boolean
  action: (name: string) => void
}) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = (data: TFormSchema) => {
    console.log('submit', data)
    action(data.name)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Sheet
        sx={{
          p: '30px',
          boxShadow: '0px 0px 36px 0px #2C2C2C10',
          borderRadius: '15px',
        }}
      >
        <Stack rowGap={'40px'}>
          <Typography level="h3">Введите название экскурсии</Typography>
          <Stack rowGap={'20px'}>
            <Input
              placeholder="Например: Экскурсия AVITO.TECH"
              {...register('name')}
            />
            <Button
              loading={isLoading}
              disabled={!isValid}
              type="submit"
            >
              Создать
            </Button>
          </Stack>
        </Stack>
      </Sheet>
    </form>
  )
}
