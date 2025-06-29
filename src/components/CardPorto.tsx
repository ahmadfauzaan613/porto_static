'use client'

import { IPortofolioType } from '@/types/Portofolio'
import { result } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import portoData from '@/data/Portofolio.json'

export default function CardPorto() {
  const [expandedItems, setExpandedItems] = React.useState<{ [key: number]: boolean }>({})
  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const shouldTruncate = (text: string) => text.length > 120
  const getDisplayedText = (text: string, isExpanded: boolean) => (isExpanded || !shouldTruncate(text) ? text : `${text.slice(0, 120)}...`)
  console.log(portoData, 'portoData')
  return result(portoData, 'data', []).map((Item: IPortofolioType, idx: number) => (
    <div className="border  overflow-hidden shadow-md hover:shadow-lg transition" key={idx}>
      <div className="border-b  w-full h-[20vh] sm:h-[25vh]">
        <Image src={Item.image} alt={`logo-${idx}`} className="w-full h-full object-cover" width={500} height={300} />
      </div>

      <div className="px-4 py-3">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold ">{Item.name}</p>
        <div className="text-sm sm:text-base pt-2 ">
          <AnimatePresence initial={false}>
            <motion.div key={expandedItems[idx] ? 'expanded' : 'collapsed'} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'anticipate' }}>
              {getDisplayedText(Item.description, expandedItems[idx])}
            </motion.div>
          </AnimatePresence>

          {shouldTruncate(Item.description) && (
            <button onClick={() => toggleExpand(idx)} className="mt-1 cursor-pointer hover:font-bold underline transition text-xs sm:text-sm">
              {expandedItems[idx] ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 gap-2">
        <div className="flex items-center flex-wrap gap-2">
          {result(Item, 'logo', []).map((item, idx) => (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded" key={idx}>
              <Image src={result(item, 'file', '')} alt={`logo-${idx}`} width={500} height={500} className="w-full h-full object-fill rounded" />
            </div>
          ))}
        </div>

        <Link href={Item.link} target="_blank" className="hover:font-bold text-sm sm:text-base">
          Visit
        </Link>
      </div>
    </div>
  ))
}
