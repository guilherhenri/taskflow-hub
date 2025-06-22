import { useEffect } from 'react'

import { Separator } from '@/components/ui/separator'
import { useAppDispatch } from '@/store'
import { loadTasks, useListTasks } from '@/store/slices/tasks'

import { CreateTask } from './create-task'
import { TaskCard } from './task-card'

export function Home() {
  const dispatch = useAppDispatch()
  const tasks = useListTasks()

  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl">Home</h1>

        <CreateTask />
      </div>
      <Separator />
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-3">
        {tasks.slice(0, 10).map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  )
}
