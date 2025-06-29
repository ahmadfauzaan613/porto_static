'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ExperienceData from '@/data/Experience.json'
import CardExperience from './CardExperience'
export default function ExperienceComponents() {
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({})

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const shouldTruncate = (text: string) => text.length > 100
  const getDisplayedText = (text: string, isExpanded: boolean) => (isExpanded || !shouldTruncate(text) ? text : text.slice(0, 100) + '...')
  return (
    <motion.div className="mt-10 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <motion.h1 className="font-bold text-4xl sm:text-5xl md:text-6xl xl:text-[96px]" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        EXPERIENCE
      </motion.h1>
      <motion.div
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 my-5"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {ExperienceData?.data.map((item, idx) => {
          const isExpanded = expandedItems[idx] || false
          return (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <CardExperience
                id={item.id}
                createdAt={item.createdAt}
                updatedAt={item.updatedAt}
                company={item.company}
                role={item.role}
                description={getDisplayedText(item.description, isExpanded)}
                location={item.location}
                startDate={item.startDate}
                endDate={item.endDate}
                shouldTruncate={shouldTruncate(item.description)}
                toggleExpand={() => toggleExpand(idx)}
                isExpanded={isExpanded}
              />
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
