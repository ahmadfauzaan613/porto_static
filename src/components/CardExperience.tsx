'use client'

import { IExperienceAdminType, IExperienceType } from '@/types/Experience'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { deleteExperience, updateExperience } from '../app/admin/(dashboard)/experience/action'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
export function CardExperience({
  company,
  role,
  description,
  location,
  startDate,
  endDate,
  shouldTruncate,
  toggleExpand,
  isExpanded,
}: IExperienceType) {
  return (
    <div className="p-4 sm:p-5 border-2  shadow-sm hover:shadow-md transition h-full flex flex-col justify-between">
      <p className="text-lg sm:text-xl md:text-2xl font-bold ">{company}</p>
      <p className="text-base sm:text-lg md:text-xl ">{role}</p>
      <div className="text-sm sm:text-base py-3 ">
        <AnimatePresence initial={false}>
          <motion.div
            key={isExpanded ? 'expanded' : 'collapsed'}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'anticipate' }}
          >
            {description}
          </motion.div>
        </AnimatePresence>

        {shouldTruncate && (
          <button
            onClick={toggleExpand}
            className="mt-1 underline cursor-pointer hover:font-bold   transition text-sm"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="">{location}</p>
        <p className="">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  )
}

export function CardExperienceAdmin({
  id,
  company,
  role,
  description,
  location,
  startDate,
  endDate,
}: IExperienceAdminType) {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <>
      {/* CARD */}
      <div className="p-4 border-2 rounded-[10px] shadow-sm hover:shadow-md transition">
        <div className="flex justify-between">
          <p className="text-xl font-bold">{company}</p>
          <div className="flex gap-2">
            <Button
              onClick={() => setOpenEdit(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </Button>
            <Button
              onClick={() => setOpenDelete(true)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </Button>
          </div>
        </div>

        <p className="text-lg">{role}</p>
        <p className="text-sm py-2">{description}</p>

        <div className="flex justify-between text-sm">
          <p>{location}</p>
          <p>
            {startDate} - {endDate}
          </p>
        </div>
      </div>

      {/* EDIT DIALOG */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Experience</DialogTitle>
          </DialogHeader>

          <form
            action={updateExperience.bind(null, id)}
            onSubmit={() => {
              startTransition(() => {
                toast.success('Experience berhasil diupdate')
                setOpenEdit(false)
              })
            }}
            className="grid gap-4 py-4"
          >
            <Input name="company" defaultValue={company} />
            <Input name="role" defaultValue={role} />
            <Textarea name="description" defaultValue={description} rows={4} />

            <div className="grid grid-cols-2 gap-3">
              <Input name="startDate" type="date" defaultValue={startDate} />
              <Input name="endDate" type="date" defaultValue={endDate} />
            </div>

            <Input name="location" defaultValue={location} />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setOpenEdit(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete experience?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() =>
                startTransition(async () => {
                  await deleteExperience(id)
                  toast.success('Experience berhasil dihapus')
                  setOpenDelete(false)
                })
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
