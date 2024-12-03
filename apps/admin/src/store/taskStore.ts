import { create } from 'zustand'

import { getPermutationIndexes } from '@/utils/getPermutationIndexes'

import {
  TTaskData,
  TUpdateTaskRequestData,
  UpdateTaskRequestData,
} from '@/types/task'

type TaskStore = {
  tasks: TTaskData[]
  setTasks: (arg: TTaskData[]) => void

  changeVisibility: (id: string) => TUpdateTaskRequestData | undefined
  changeOrder: (newOrder: TTaskData[]) => TUpdateTaskRequestData | undefined
}

export const useTaskStore = create<TaskStore>()(set => ({
  tasks: [],
  setTasks: tasks => set({ tasks }),

  changeVisibility: id => {
    const { tasks } = useTaskStore.getState()
    const curTask = tasks.find(item => item.id === id)
    if (!curTask) return
    curTask.visibility = !curTask.visibility
    set({ tasks })

    const newTasks = UpdateTaskRequestData.parse(tasks)
    return newTasks
  },

  changeOrder: newOrder => {
    const { tasks } = useTaskStore.getState()

    const [idx1, idx2] = getPermutationIndexes(tasks, newOrder)
    const temp = tasks[idx1]
    tasks[idx1] = tasks[idx2]
    tasks[idx2] = temp

    set({ tasks })

    const newTasks = UpdateTaskRequestData.parse(tasks)
    return newTasks
  },
}))
