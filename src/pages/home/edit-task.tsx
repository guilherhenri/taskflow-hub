import { Pencil } from 'lucide-react'
import { useState } from 'react'

import { type FormType, TaskForm } from '@/components/shared/task-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAppDispatch, useAppSelector } from '@/store'
import { update } from '@/store/slices/tasks'

export function EditTask({ id }: { id: number }) {
  const dispatch = useAppDispatch()
  const task = useAppSelector((state) =>
    state.tasks.list.find((task) => task.id === id),
  )

  const [open, setOpen] = useState(false)

  function handleEditTask({ title }: FormType) {
    dispatch(
      update({
        id,
        title,
      }),
    )

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-secondary hover:[&>svg]:text-primary cursor-pointer rounded-sm
            transition-colors"
        >
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update task</DialogTitle>
        </DialogHeader>

        <TaskForm title={task?.title} onSubmit={handleEditTask} />
      </DialogContent>
    </Dialog>
  )
}
