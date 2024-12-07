import { Button, Stack, Typography } from '@mui/joy'
import { PlusIcon, TrashIcon } from '@primer/octicons-react'
import { useIsFetching } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useGetAchievements } from '@/api/achievement'

import { CenterContainer } from '@/components/Containers/CenterContainer'
import { CurrentExcursionLabel } from '@/components/CurrentExcursionLabel/CurrentExcursionLabel'
import { EmptyExcursion } from '@/components/EmptyExcursion/EmptyExcursion'
import { ExcursionDropdown } from '@/components/ExcursionDropdown/ExcursionDropdown'
import { ButtonsLayout } from '@/components/Layouts/ButtonsLayout'
import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'
import { Table } from '@/components/Table/Table'

import { MODALS, ROUTES } from '@/config/routes'

import { useExcursionStore } from '@/store/excursionStore'

import { useOpenModal } from '@/hooks/useModals'

import { TableRow } from './AchievementsTable/TableRow'

export const Component = () => {
  const currentExcursion = useExcursionStore(state => state.currentExcursion)
  const navigate = useNavigate()
  const { openModal } = useOpenModal()

  const isFetchingExcursion = useIsFetching({ queryKey: ['excursions'] })
  console.log(isFetchingExcursion)

  const { achievementsData, isLoading } = useGetAchievements()

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Управление ачивками
      </Typography>

      {!currentExcursion && !isFetchingExcursion && (
        <CenterContainer>
          <EmptyExcursion />
        </CenterContainer>
      )}

      {currentExcursion && (
        <Stack rowGap={'15px'}>
          <CurrentExcursionLabel />

          <ButtonsLayout
            left={[
              <Button
                key={1}
                startDecorator={<PlusIcon size={16} />}
                onClick={() => navigate(ROUTES.AchievementsCreate)}
              >
                Добавить ачивку
              </Button>,
              <ExcursionDropdown key={2} />,
            ]}
            right={[
              <Button
                onClick={() => {
                  openModal(MODALS.DeleteAllAchievements, {
                    excursionId: currentExcursion.id,
                  })
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
                Удалить все
              </Button>,
            ]}
          />

          {(isLoading || isFetchingExcursion === 1) && <Loader />}

          {achievementsData && !isLoading && (
            <Table
              headers={['Название', 'Баллы', 'Картинка', 'Действия']}
              rows={achievementsData.map((item, idx) => (
                <TableRow
                  key={idx}
                  excursionId={currentExcursion.id}
                  row={item}
                />
              ))}
              endAlignRight
            />
          )}
        </Stack>
      )}
    </MainLayout>
  )
}
