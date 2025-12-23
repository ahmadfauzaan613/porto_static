'use client'

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
  createProject,
  deleteProject,
  updateProject,
} from '../../app/admin/(dashboard)/portofolio/action'
import { LogoBulkInput } from './LogoBulkInput'

interface PortfolioFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  defaultData?: {
    id: number
    name: string
    description: string
    link: string
    logo: { file: string }[]
  }
}

export function PortfolioFormDialog({
  open,
  onOpenChange,
  mode,
  defaultData,
}: PortfolioFormDialogProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add New Portfolio' : 'Edit Portfolio'}</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData: FormData) => {
            startTransition(async () => {
              if (mode === 'create') {
                await createProject(formData)
                toast.success('Portfolio berhasil dibuat')
              }

              if (mode === 'edit' && defaultData) {
                await updateProject(defaultData.id, formData)
                toast.success('Portfolio berhasil diupdate')
              }

              onOpenChange(false)
            })
          }}
          className="space-y-4 py-4"
        >
          <Input name="name" defaultValue={defaultData?.name} placeholder="Project Name" />
          <Textarea
            name="description"
            rows={4}
            defaultValue={defaultData?.description}
            placeholder="Description"
          />
          <Input name="link" defaultValue={defaultData?.link} placeholder="Live Demo Link" />

          {/* IMAGE */}
          <Input name="image" type="file" accept="image/*" />

          {/* LOGO BULK */}
          <LogoBulkInput logos={defaultData?.logo} />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : mode === 'create' ? 'Create Portfolio' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  id: number
}

export function DeleteConfirmDialog({ open, onOpenChange, id }: DeleteConfirmDialogProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this portfolio?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700"
            onClick={() =>
              startTransition(async () => {
                await deleteProject(id)
                toast.success('Portfolio berhasil dihapus')
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
