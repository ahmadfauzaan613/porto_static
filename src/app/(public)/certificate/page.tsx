export const dynamic = 'force-dynamic'

import CertiComponents from '@/components/CertiComponents'
import { CertificateRepository } from '../../repository/certificate.repository'

export default async function page() {
  const certificates = await CertificateRepository.findAll()
  return <CertiComponents certificates={certificates} />
}
