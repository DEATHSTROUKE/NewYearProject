import { Typography } from '@mui/joy'
import { useParams } from 'react-router-dom'

import { useCreateTask, useGetFullTask, useUpdateTask } from '@/api/task'

import { MainLayout } from '@/components/Layouts/MainLayout'
import { Loader } from '@/components/Loader/Loader'

import { useExcursionStore } from '@/store/excursionStore'

import { TaskCreateForm } from './components/TaskCreateForm'

export const Component = () => {
  const { id } = useParams()
  const currentExcursion = useExcursionStore(state => state.currentExcursion)

  const { data, isLoading } = useGetFullTask(
    currentExcursion?.id ?? '',
    id ?? '',
  )

  const { createTask, isCreateTaskPending } = useCreateTask(
    currentExcursion?.id ?? '',
  )
  const { updateTask, isUpdateTaskPending } = useUpdateTask(
    currentExcursion?.id ?? '',
    id ?? '',
  )

  return (
    <MainLayout>
      <Typography
        level="h1"
        sx={{ mb: '20px' }}
      >
        {id ? 'Редактирование задания' : 'Создание задания'}
      </Typography>
      {isLoading && id && <Loader />}

      {(data || !id) && (
        <TaskCreateForm
          defaultData={data}
          sendData={id ? updateTask : createTask}
          isLoading={isCreateTaskPending || isUpdateTaskPending}
        />
      )}
    </MainLayout>
  )
}
