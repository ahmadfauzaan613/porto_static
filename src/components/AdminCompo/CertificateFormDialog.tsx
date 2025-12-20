'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useTransition } from 'react'
import { toast } from 'sonner'
import {
  createCertificate,
  updateCertificate,
} from '../../app/admin/(dashboard)/certificate/action'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  defaultData?: {
    id: number
    name: string
    description: string
    image: string
  }
}

export function CertificateFormDialog({ open, onOpenChange, mode, defaultData }: Props) {
  const [isPending, startTransition] = useTransition()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add Certificate' : 'Edit Certificate'}</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData: FormData) => {
            startTransition(async () => {
              if (mode === 'create') {
                await createCertificate(formData)
                toast.success('Certificate berhasil ditambahkan')
              }

              if (mode === 'edit' && defaultData) {
                await updateCertificate(defaultData.id, formData)
                toast.success('Certificate berhasil diupdate')
              }

              onOpenChange(false)
            })
          }}
          className="space-y-4 py-4"
        >
          <Input name="name" placeholder="Certificate Name" defaultValue={defaultData?.name} />

          <Textarea
            name="description"
            rows={3}
            placeholder="Description"
            defaultValue={defaultData?.description}
          />

          <Input name="image" type="file" accept="image/*" />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : mode === 'create' ? 'Create' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
