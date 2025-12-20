'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { result } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { DeleteConfirmDialog, PortfolioFormDialog } from './AdminCompo/PortfolioFormDialog'
import { Button } from './ui/button'

interface Project {
  portfolios: {
    id: number
    name: string
    description: string
    image: string
    link: string
  }[]
  portoLogo: {
    id: number
    file: string
  }[]
}

export function CardPorto({ portfolios, portoLogo }: Project) {
  const [expandedItems, setExpandedItems] = React.useState<{ [key: number]: boolean }>({})
  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const shouldTruncate = (text: string) => text.length > 120
  const getDisplayedText = (text: string, isExpanded: boolean) =>
    isExpanded || !shouldTruncate(text) ? text : `${text.slice(0, 120)}...`

  return (
    <div>
      {portfolios.length === 0 ? (
        <p className="text-sm text-muted-foreground">No portfolio has been added yet.</p>
      ) : (
        portfolios.map((Item, idx) => (
          <div className="border  overflow-hidden shadow-md hover:shadow-lg transition" key={idx}>
            <div className="border-b  w-full h-[20vh] sm:h-[25vh]">
              <Image
                src={Item.image}
                alt={`logo-${idx}`}
                className="w-full h-full object-cover"
                width={500}
                height={300}
              />
            </div>

            <div className="px-4 py-3">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold ">{Item.name}</p>
              <div className="text-sm sm:text-base pt-2 ">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={expandedItems[idx] ? 'expanded' : 'collapsed'}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'anticipate' }}
                  >
                    {getDisplayedText(Item.description, expandedItems[idx])}
                  </motion.div>
                </AnimatePresence>

                {shouldTruncate(Item.description) && (
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="mt-1 cursor-pointer hover:font-bold underline transition text-xs sm:text-sm"
                  >
                    {expandedItems[idx] ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 gap-2">
              <div className="flex items-center flex-wrap gap-2">
                {portoLogo.map((item, idx) => (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded" key={idx}>
                    <Image
                      src={result(item, 'file', '')}
                      alt={`logo-${idx}`}
                      width={500}
                      height={500}
                      className="w-full h-full object-fill rounded"
                    />
                  </div>
                ))}
              </div>

              <Link
                href={Item.link}
                target="_blank"
                className="hover:font-bold text-sm sm:text-base"
              >
                Visit
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

interface CardPortfolioAdminProps {
  id: number
  name: string
  description: string
  image: string
  link: string
  logo: { file: string }[]
}

export function CardPortfolioAdmin({
  id,
  name,
  description,
  image,
  link,
  logo,
}: CardPortfolioAdminProps) {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <>
      {/* CARD */}
      <div className="border rounded-xl p-4 hover:shadow-md transition">
        <div className="grid md:grid-cols-3 gap-4">
          {/* IMAGE */}
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>

          {/* CONTENT */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{name}</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setOpenEdit(true)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => setOpenDelete(true)}>
                    Delete
                  </Button>
                </div>
              </div>

              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{description}</p>
            </div>

            {/* LOGO */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {logo.slice(0, 4).map((item, i) => (
                  <div key={i} className="relative w-8 h-8">
                    <Image src={item.file} alt="logo" fill className="object-contain" />
                  </div>
                ))}
              </div>

              <a href={link} target="_blank" className="text-sm text-blue-600 hover:underline">
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT POPUP */}
      <PortfolioFormDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        mode="edit"
        defaultData={{
          id,
          name,
          description,
          link,
          logo,
        }}
      />

      {/* DELETE CONFIRM */}
      <DeleteConfirmDialog open={openDelete} onOpenChange={setOpenDelete} id={id} />
    </>
  )
}
