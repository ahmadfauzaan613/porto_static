import Image from 'next/image'

export default function Dashboard() {
  return (
     <div className="min-h-[90vh] flex flex-col items-center justify-center gap-6">
      <Image src="/images/logo_white.png" alt="logo" width={500} height={500} />
    </div>
  )
}
