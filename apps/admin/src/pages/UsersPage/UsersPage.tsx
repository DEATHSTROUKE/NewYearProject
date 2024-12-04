import { Button, Stack, Switch, Typography } from '@mui/joy'
import { TrashIcon } from '@primer/octicons-react'

import { useGetUsers } from '@/api/user'

import { ButtonsLayout } from '@/components/Layouts/ButtonsLayout'
import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'
import { Table } from '@/components/Table/Table'

import { MODALS } from '@/config/routes'

import { useUserStore } from '@/store/userStore'

import { useOpenModal } from '@/hooks/useModals'

import { UserDropdown } from './UserDropdown/UserDropdown'
import { TableRow } from './UsersTable/TableRow'

export const Component = () => {
  const { usersData, isLoading } = useGetUsers()
  const { currentExcursion, finished, setFinished } = useUserStore()
  const { openModal } = useOpenModal()

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Управление участниками
      </Typography>

      <Stack rowGap={'15px'}>
        <Typography sx={{ mb: '20px' }}>
          {currentExcursion
            ? `Вы на экскурсии ${currentExcursion.name}`
            : 'Все экскурсии'}
        </Typography>

        <ButtonsLayout
          left={[
            <Stack
              key={1}
              direction={'row'}
              alignItems={'center'}
              columnGap={'12px'}
            >
              Показать только завершенных
              <Switch
                checked={finished}
                onChange={e => setFinished(e.target.checked)}
              />
            </Stack>,
            <UserDropdown key={2} />,
          ]}
          right={[
            <Button
              onClick={() => {
                if (!currentExcursion) {
                  openModal(MODALS.DeleteAllUsers)
                } else {
                  openModal(MODALS.DeleteAllUsers, {
                    excursionId: currentExcursion.id,
                  })
                }
              }}
              variant="outlined"
              color="danger"
              startDecorator={
                <TrashIcon
                  size={16}
                  fill="var(--danger-color)"
                />
              }
            >
              Удалить участников
            </Button>,
          ]}
        />

        {isLoading && <Loader />}

        {usersData && !isLoading && (
          <Table
            headers={[
              'ID участника',
              'Username',
              'Кол-во баллов',
              'Пройдено заданий',
              'Действия',
            ]}
            rows={usersData.map(item => (
              <TableRow
                key={item.id + item.excursionId}
                row={item}
              />
            ))}
            endAlignRight
          />
        )}
      </Stack>
    </MainLayout>
  )
}
