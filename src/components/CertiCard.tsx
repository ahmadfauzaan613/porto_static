import Image from 'next/image'
interface Certificate {
  certificates: { name: string; description: string; image: string }[]
}
export default function CertiCard({ certificates }: Certificate) {
  return certificates.length === 0 ? (
    <p className="text-sm text-muted-foreground">No certificate has been added yet.</p>
  ) : (
    certificates.map((item, idx) => (
      <div
        className="w-full  h-[30vh] sm:h-[40vh] md:h-[50vh] bg-white relative overflow-hidden shadow hover:shadow-lg transition-all"
        key={idx}
      >
        <Image src={item.image} alt={item.name} fill className="object-contain" />
      </div>
    ))
  )
}
