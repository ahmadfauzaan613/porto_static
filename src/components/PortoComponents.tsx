'use client'
// import Image from 'next/image'
import { motion } from 'framer-motion'
import { CardPorto } from './CardPorto'

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

export default function PortoComponents({ portfolios, portoLogo }: Project) {
  return (
    <motion.div
      className="px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="my-5 px-4 sm:px-6 lg:px-8">
        <motion.div
          className=" my-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl xl:text-[96px]">PORTOFOLIO</h1>
          {/* <motion.div className="bg-black mt-5 w-full h-[25vh] sm:h-[30vh] md:h-[40vh] relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}>
            <Image src="/images/Bersoreria12828-BW.jpg" alt="Gambar dari Pinterest" fill className="object-cover" />
          </motion.div> */}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <CardPorto portfolios={portfolios} portoLogo={portoLogo} />
        </motion.div>
      </div>
    </motion.div>
  )
}
