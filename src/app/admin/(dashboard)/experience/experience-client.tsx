'use client'

import { CardExperienceAdmin } from '@/components/CardExperience'
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
import { useState } from 'react'
import { toast } from 'sonner'
import Title from '../../../../components/AdminCompo/Title'
import { createExperience } from './action'

type Experience = {
  id: string
  company: string
  role: string
  description: string
  location: string
  startDate: Date
  endDate: Date | null
}

export default function ExperienceClient({ experiences }: { experiences: Experience[] }) {
  const [openCreate, setOpenCreate] = useState(false)

  return (
    <>
      <div className="flex item-center justify-between">
        <Title text="experience" />
        <Button onClick={() => setOpenCreate(true)}>+ Add Experience</Button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {experiences.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada experience yang ditambahkan.</p>
        ) : (
          experiences.map(exp => (
            <CardExperienceAdmin
              key={exp.id}
              id={exp.id}
              company={exp.company}
              role={exp.role}
              description={exp.description}
              location={exp.location}
              startDate={exp.startDate.toISOString().slice(0, 10)}
              endDate={exp.endDate ? exp.endDate.toISOString().slice(0, 10) : 'Present'}
            />
          ))
        )}
      </div>

      <Dialog open={openCreate} onOpenChange={setOpenCreate}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Experience</DialogTitle>
          </DialogHeader>
          <form
            action={async (formData: FormData) => {
              await createExperience(formData)
              toast.success('Experience berhasil ditambahkan')
              setOpenCreate(false)
            }}
            className="grid gap-4 py-4"
          >
            <Input name="company" placeholder="Company" />
            <Input name="role" placeholder="Role" />
            <Textarea name="description" placeholder="Description" rows={4} />

            <div className="grid grid-cols-2 gap-3">
              <Input name="startDate" type="month" required />
              <Input name="endDate" type="month" /> {/* optional */}
            </div>

            <Input name="location" placeholder="Location" />

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenCreate(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
