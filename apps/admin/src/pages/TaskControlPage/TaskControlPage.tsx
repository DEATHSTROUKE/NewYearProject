import { Button, Stack, Typography } from '@mui/joy'
import { PlusIcon, TrashIcon } from '@primer/octicons-react'
import { useIsFetching } from '@tanstack/react-query'
import { Reorder } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { useGetTasks, useUpdatePlaces } from '@/api/task'

import { CenterContainer } from '@/components/Containers/CenterContainer'
import { CurrentExcursionLabel } from '@/components/CurrentExcursionLabel/CurrentExcursionLabel'
import { EmptyExcursion } from '@/components/EmptyExcursion/EmptyExcursion'
import { ExcursionDropdown } from '@/components/ExcursionDropdown/ExcursionDropdown'
import { ButtonsLayout } from '@/components/Layouts/ButtonsLayout'
import { MainLayout } from '@/components/Layouts/MainLayout'
import { DraggbleTable } from '@/components/Table/DraggbleTable'

import { MODALS, ROUTES } from '@/config/routes'

import { useExcursionStore } from '@/store/excursionStore'
import { useTaskStore } from '@/store/taskStore'

import { useOpenModal } from '@/hooks/useModals'

import { TTaskData } from '@/types/task'

import { ControlMenu } from './components/ControlMenu/ControlMenu'
import { TableRow } from './components/TaskTable/TableRow'

export const Component = () => {
  const navigate = useNavigate()
  const currentExcursion = useExcursionStore(state => state.currentExcursion)
  const { updatePlaces } = useUpdatePlaces(currentExcursion?.id ?? '')

  useGetTasks()
  const isFetchingExcursion = useIsFetching({ queryKey: ['excursions'] })

  const { tasks, changeVisibility, changeOrder } = useTaskStore(
    ({ tasks, changeVisibility, changeOrder }) => ({
      tasks,
      changeVisibility,
      changeOrder,
    }),
  )

  const updateVisibility = (id: string) => {
    const visibilityArray = changeVisibility(id)
    if (visibilityArray) {
      updatePlaces(visibilityArray)
    }
  }

  const { openModal } = useOpenModal()

  const onReorder = (newOrder: TTaskData[]) => {
    const reorderArray = changeOrder(newOrder)
    if (reorderArray) {
      updatePlaces(reorderArray)
    }
  }

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        Управление заданиями
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
                onClick={() => navigate(ROUTES.TaskCreate)}
              >
                Добавить задание
              </Button>,
              <ControlMenu key={2} />,
              <ExcursionDropdown key={3} />,
            ]}
            right={[
              <Button
                onClick={() => {
                  openModal(MODALS.DeleteExcursion, {
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
                Удалить экскурсию
              </Button>,
            ]}
          />

          {tasks && (
            <DraggbleTable
              headers={[
                '№ задания',
                'Видимость',
                'Задание',
                'Локация',
                'Картинка',
                'Действия',
              ]}
              rows={[
                <Reorder.Group
                  as="tbody"
                  values={tasks}
                  onReorder={onReorder}
                >
                  {tasks.map((item, idx) => (
                    <TableRow
                      key={item.id}
                      taskNumber={idx + 1}
                      excursionId={currentExcursion.id}
                      row={item}
                      updateVisibility={updateVisibility}
                    />
                  ))}
                </Reorder.Group>,
              ]}
              firstEmptyHeader
              endAlignRight
            />
          )}
        </Stack>
      )}
    </MainLayout>
  )
}
