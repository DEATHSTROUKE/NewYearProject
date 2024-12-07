import { adminApi } from '@/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Sheet, Stack, Typography } from '@mui/joy'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Input } from '@/components/Input/Input'

import { ROUTES } from '@/config/routes'

import { saveAccessToken } from '@/utils/login'

import { LoginRequestData, TLoginRequestData } from '@/types/login'

export const LoginForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
  } = useForm<TLoginRequestData>({
    resolver: zodResolver(LoginRequestData),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const { isPending, mutate: login } = adminApi.usePostApiAdminSignIn({
    mutation: {
      onSuccess: ({ token }) => {
        if (token) {
          saveAccessToken(token)
        }
        console.info('Login success')
        navigate(ROUTES.Dashboard)
      },
    },
  })

  const onSubmit = (data: TLoginRequestData) => {
    login({ data: data })
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
        <Typography level="h2" sx={{ mb: '60px' }}>
          Вход в систему
        </Typography>

        <Stack rowGap={'20px'}>
          <Input
            label="Логин"
            {...register('login')}
            onBlur={() => trigger('login')}
            textError={errors.login?.message}
          />
          <Input
            label="Пароль"
            type="password"
            {...register('password')}
            textError={errors.password?.message}
          />
          <Button type="submit" disabled={!isValid} loading={isPending}>
            Войти
          </Button>
        </Stack>
      </Sheet>
    </form>
  )
}
