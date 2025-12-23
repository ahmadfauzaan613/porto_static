'use client'

import { CardCertificateAdmin } from '@/components/AdminCompo/CardCertificateAdmin'
import { CertificateFormDialog } from '@/components/AdminCompo/CertificateFormDialog'
import Title from '@/components/AdminCompo/Title'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface CertificateClientProps {
  certificates: {
    id: number
    name: string
    description: string
    image: string
  }[]
}

export default function CertificateClient({ certificates }: CertificateClientProps) {
  const [openCreate, setOpenCreate] = useState(false)

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Title text="certificate" />
        <Button onClick={() => setOpenCreate(true)}>+ Add Certificate</Button>
      </div>

      {/* LIST */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {certificates.length === 0 ? (
          <p className="text-sm text-muted-foreground col-span-full">Belum ada certificate</p>
        ) : (
          certificates.map(cert => <CardCertificateAdmin key={cert.id} {...cert} />)
        )}
      </div>

      {/* CREATE POPUP */}
      <CertificateFormDialog open={openCreate} onOpenChange={setOpenCreate} mode="create" />
    </div>
  )
}
