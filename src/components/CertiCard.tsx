import { ICertificateType } from '@/types/CertificateType'
import { result } from 'lodash'
import Image from 'next/image'
import React from 'react'
import CertificateData from '@/data/Certificate.json'

export default function CertiCard() {
  const dataCerti = result(CertificateData, 'data', []) as ICertificateType[]

  return dataCerti.map((item, idx) => (
    <div className="w-full  h-[30vh] sm:h-[40vh] md:h-[50vh] bg-white relative overflow-hidden shadow hover:shadow-lg transition-all" key={idx}>
      <Image src={item.image} alt={item.name} fill className="object-contain" />
    </div>
  ))
}
