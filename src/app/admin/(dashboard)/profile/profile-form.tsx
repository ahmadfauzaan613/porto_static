'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleSaveProfile } from './action'

interface FormValues {
  name: string
  role: string
  linkedin: string
  whatsapp: string
  email: string
  resume: string
}

interface Props {
  defaultValues: FormValues
}

export default function ProfileForm({ defaultValues }: Props) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues,
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      const loadingId = toast.loading('Saving profile...')

      const result = await handleSaveProfile(data)

      toast.dismiss(loadingId)

      if (result.success) toast.success(result.message)
      else toast.error(result.message)
    })
  }

  return (
    <Card className="mt-6 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* BASIC INFO */}
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input {...register('name')} disabled={isPending} />
          </div>

          <div>
            <Label>Role</Label>
            <Input {...register('role')} disabled={isPending} />
          </div>
        </div>

        {/* LINKS */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Links</h3>

          <div>
            <Label>LinkedIn</Label>
            <Input {...register('linkedin')} disabled={isPending} />
          </div>

          <div>
            <Label>WhatsApp</Label>
            <Input {...register('whatsapp')} disabled={isPending} />
          </div>

          <div>
            <Label>Email</Label>
            <Input {...register('email')} disabled={isPending} />
          </div>

          <div>
            <Label>Resume (Google Drive)</Label>
            <Input {...register('resume')} disabled={isPending} />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
