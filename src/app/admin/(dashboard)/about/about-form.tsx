'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleAboutData } from './action'

interface FormValues {
  text: string
}

interface Props {
  id: string | null
  defaultValue: string
}

export default function AboutForm({ id, defaultValue }: Props) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      text: defaultValue,
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      const loadingId = toast.loading('Saving about...')

      const result = await handleAboutData(id, data.text)

      toast.dismiss(loadingId)

      if (result?.success) {
        toast.success(result.message)
      } else {
        toast.error(result?.message)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
      <Textarea
        rows={6}
        {...register('text', { required: true })}
        placeholder="Type your message here"
        disabled={isPending}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save'}
      </Button>
    </form>
  )
}
