'use client'

import { deleteCertificate } from '@/app/admin/(dashboard)/certificate/action'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useTransition } from 'react'
import { toast } from 'sonner'

export function DeleteCertificateDialog({
  open,
  onOpenChange,
  id,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: number
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete certificate?</AlertDialogTitle>
          <AlertDialogDescription>Certificate will be permanently deleted.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700"
            onClick={() =>
              startTransition(async () => {
                await deleteCertificate(id)
                toast.success('Certificate berhasil dihapus')
                onOpenChange(false)
              })
            }
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
