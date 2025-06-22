import { Plus } from 'lucide-react'
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
import { useAppDispatch } from '@/store'
import { add } from '@/store/slices/tasks'

export function CreateTask() {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  function handleCreateTask(data: FormType) {
    dispatch(add(data))

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-foreground cursor-pointer">
          New
          <Plus className="text-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
        </DialogHeader>

        <TaskForm onSubmit={handleCreateTask} />
      </DialogContent>
    </Dialog>
  )
}
