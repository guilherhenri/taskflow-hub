import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Button } from '../ui/button'

const formSchema = z.object({
  title: z.string().min(1),
})
export type FormType = z.infer<typeof formSchema>

interface TaskFormProps {
  title?: string
  onSubmit: (data: FormType) => void
}

export function TaskForm({ title, onSubmit }: TaskFormProps) {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="homework" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="text-foreground float-right"
          disabled={!form.formState.isValid}
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
