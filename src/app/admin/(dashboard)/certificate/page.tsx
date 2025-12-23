// app/admin/(dashboard)/certificate/page.tsx
import { CertificateRepository } from '@/app/repository/certificate.repository'
import CertificateClient from './CertificateClient'

export default async function Page() {
  const certificates = await CertificateRepository.findAll()

  return <CertificateClient certificates={certificates} />
}
