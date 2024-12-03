import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Sheet, Stack, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'

import { useLogin } from '@/api/login'

import { Input } from '@/components/Input/Input'

import { LoginRequestData, TLoginRequestData } from '@/types/login'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
  } = useForm<TLoginRequestData>({
    resolver: zodResolver(LoginRequestData),
    defaultValues: {
      mail: '',
      password: '',
    },
  })

  const { isPending, login } = useLogin()

  const onSubmit = (data: TLoginRequestData) => {
    login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Sheet
        sx={{
          backgroundColor: 'white',
          padding: '149px 89px',
          boxShadow: '0px 0px 97.8px 0px #00000010',
          borderRadius: '15px',
          minWidth: '500px',
        }}
      >
        <Typography
          level="h2"
          sx={{ mb: '60px' }}
        >
          Вход в систему
        </Typography>

        <Stack rowGap={'20px'}>
          <Input
            label="Логин"
            {...register('mail')}
            onBlur={() => trigger('mail')}
            textError={errors.mail?.message}
          />
          <Input
            label="Пароль"
            type="password"
            {...register('password')}
            textError={errors.password?.message}
          />
          <Button
            type="submit"
            disabled={!isValid}
            loading={isPending}
          >
            Войти
          </Button>
        </Stack>
      </Sheet>
    </form>
  )
}
