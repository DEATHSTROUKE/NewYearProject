import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Sheet, Stack } from '@mui/joy'
import { useForm } from 'react-hook-form'

import { useSave } from '@/hooks/useSave'

import { LoginRequestData, TLoginRequestData } from '@/types/login'

import { Input } from '../Input/Input'

export const CreateAdminForm = ({
  login,
  isLoading,
  action,
}: {
  login?: string
  isLoading: boolean
  action: (arg: TLoginRequestData) => void
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginRequestData>({
    resolver: zodResolver(LoginRequestData),
    defaultValues: { mail: login },
  })

  const onSave = (data: TLoginRequestData) => {
    console.log(data)
    action(data)
  }

  useSave(handleSubmit(onSave))

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Sheet
        sx={{
          p: '30px',
          boxShadow: '0px 0px 36px 0px #2C2C2C10',
          borderRadius: '15px',
          minWidth: '360px',
        }}
      >
        <Stack rowGap={'20px'}>
          <Input
            label="Логин администратора"
            {...register('mail')}
            textError={errors.mail?.message}
          />
          <Input
            label="Пароль"
            type="password"
            {...register('password')}
            textError={errors.password?.message}
          />
          <Button
            loading={isLoading}
            type="submit"
          >
            {login ? 'Сохранить изменения' : 'Создать'}
          </Button>
        </Stack>
      </Sheet>
    </form>
  )
}
