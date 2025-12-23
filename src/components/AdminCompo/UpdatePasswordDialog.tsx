'use client'

import { updatePasswordOnly } from '@/components/AdminCompo/action'
import { AlertDialog, AlertDialogAction } from '@/components/ui/alert-dialog'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdatePasswordDialog({ open, onOpenChange }: Props) {
  const [password, setPassword] = useState('')
  const [isPending, startTransition] = useTransition()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      ...
      <AlertDialogAction
        onClick={() =>
          startTransition(async () => {
            await updatePasswordOnly(password)
            toast.success('Password berhasil diupdate')
            onOpenChange(false)
          })
        }
      >
        Update
      </AlertDialogAction>
    </AlertDialog>
  )
}
