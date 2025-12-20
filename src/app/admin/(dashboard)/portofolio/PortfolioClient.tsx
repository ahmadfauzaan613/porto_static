'use client'

import { PortfolioFormDialog } from '@/components/AdminCompo/PortfolioFormDialog'
import Title from '@/components/AdminCompo/Title'
import { CardPortfolioAdmin } from '@/components/CardPorto'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface PortfolioClientProps {
  portfolios: {
    id: number
    name: string
    description: string
    image: string
    link: string
    logos: { file: string }[]
  }[]
}

export default function PortfolioClient({ portfolios }: PortfolioClientProps) {
  const [openCreate, setOpenCreate] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between">
        <Title text="portofolio" />
        <Button onClick={() => setOpenCreate(true)}>+ Add Portfolio</Button>
      </div>

      {/* LIST / EMPTY STATE */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {portfolios.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada portofolio yang ditambahkan.</p>
        ) : (
          portfolios.map(item => (
            <CardPortfolioAdmin
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              link={item.link}
              logo={item.logos}
            />
          ))
        )}
      </div>

      <PortfolioFormDialog open={openCreate} onOpenChange={setOpenCreate} mode="create" />
    </div>
  )
}
