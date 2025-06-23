import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { EditTask } from '@/pages/home/edit-task'
import { useAppDispatch } from '@/store'
import { remove, toggle } from '@/store/slices/tasks'

interface TaskCardProps {
  id: number
  title: string
  completed: boolean
}

export function TaskCard({ id, title, completed }: TaskCardProps) {
  const dispatch = useAppDispatch()

  function handleToggleTask() {
    dispatch(toggle({ id }))
  }

  function handleRemoveTask() {
    dispatch(remove({ id }))
  }

  return (
    <Card
      className={cn(
        'cursor-pointer justify-between transition-colors',
        completed && 'border-primary',
        !completed && 'hover:bg-secondary',
      )}
      onClick={handleToggleTask}
      aria-label="task-card"
    >
      <CardContent>
        <p className={cn('text-lg', completed && 'line-through')}>{title}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <EditTask id={id} />

        <Separator orientation="vertical" className="h-8!" />

        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-secondary hover:[&>svg]:text-destructive cursor-pointer rounded-sm
            transition-colors"
          onClick={handleRemoveTask}
        >
          <Trash className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
