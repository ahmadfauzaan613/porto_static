export const dynamic = 'force-dynamic'

import PortoComponents from '@/components/PortoComponents'
import { ProjectRepository } from '../../repository/project.repository'

export default async function pages() {
  const portfolios = await ProjectRepository.findAll()
  return <PortoComponents portfolios={portfolios} />
}
