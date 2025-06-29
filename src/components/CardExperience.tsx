import { IExperienceType } from '@/types/Experience'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function CardExperience({ company, role, description, location, startDate, endDate, shouldTruncate, toggleExpand, isExpanded }: IExperienceType) {
  return (
    <div className="p-4 sm:p-5 border-2  shadow-sm hover:shadow-md transition h-full flex flex-col justify-between">
      <p className="text-lg sm:text-xl md:text-2xl font-bold ">{company}</p>
      <p className="text-base sm:text-lg md:text-xl ">{role}</p>
      <div className="text-sm sm:text-base py-3 ">
        <AnimatePresence initial={false}>
          <motion.div key={isExpanded ? 'expanded' : 'collapsed'} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: 'anticipate' }}>
            {description}
          </motion.div>
        </AnimatePresence>

        {shouldTruncate && (
          <button onClick={toggleExpand} className="mt-1 underline cursor-pointer hover:font-bold   transition text-sm">
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
