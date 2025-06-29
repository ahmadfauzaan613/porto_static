'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { result } from 'lodash'
import Linkdata from '@/data/HomeData.json'
import { IDataLinkType, ButtonFunctionProps } from '@/types/HomeType'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { File, FileUser, Linkedin, Mail, Phone } from 'lucide-react'

export default function HomeComponents() {
  const ButtonFunction: React.FC<ButtonFunctionProps> = ({ data }) => {
    switch (data.toLowerCase()) {
      case 'linkedin':
        return <Linkedin />
      case 'whatsapp':
        return <Phone />
      case 'email':
        return <Mail />
      case 'resume':
        return <FileUser />
      case 'portofolio':
        return <File />
      default:
        return null
    }
  }
  return (
    <motion.div className="mt-10 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
        AHMAD FAUZAN
      </motion.h1>
      <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
        Full stack developer
      </motion.h1>
      <motion.div className="w-full bg-black h-[30vh] sm:h-[40vh] md:h-[50vh] mt-10 relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
        <Image src="/images/Bersoreria12814-BW.jpg" alt="Gambar dari Pinterest" fill className="object-cover" />
      </motion.div>
      <motion.div className="flex justify-end flex-wrap gap-4 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
        {result(Linkdata, 'Linkdata.dataLink', []).map((item: IDataLinkType, id: number) => (
          <Link href={item.url} target="_blank" rel="noopener noreferrer" key={id}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="border cursor-pointer rounded-full px-5 py-5">
                <ButtonFunction data={item.type} />
              </Button>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  )
}
