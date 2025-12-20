'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import { CertificateFormDialog } from './CertificateFormDialog'
import { DeleteCertificateDialog } from './DeleteCertificateDialog'

interface Props {
  id: number
  name: string
  description: string
  image: string
}

export function CardCertificateAdmin({ id, name, description, image }: Props) {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <>
      {/* CARD */}
      <div className="border rounded-xl overflow-hidden hover:shadow-md transition">
        <div className="relative h-48 w-full">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

          <div className="flex gap-2 pt-2 item-center justify-end">
            <Button size="sm" variant="outline" onClick={() => setOpenEdit(true)}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => setOpenDelete(true)}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* EDIT */}
      <CertificateFormDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        mode="edit"
        defaultData={{ id, name, description, image }}
      />

      {/* DELETE */}
      <DeleteCertificateDialog open={openDelete} onOpenChange={setOpenDelete} id={id} />
    </>
  )
}
