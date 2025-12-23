import React from 'react'
import Navbar from '../../components/Navbar'

export default function layoutPublic({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className=" mx-auto container">{children}</div>
    </>
  )
}
