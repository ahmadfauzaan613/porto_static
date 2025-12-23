import PortoComponents from '@/components/PortoComponents'
import { ProjectRepository } from '../../repository/project.repository'

export const dynamic = 'force-dynamic'

export default async function pages() {
  const portfolios = await ProjectRepository.findAll()
  return <PortoComponents portfolios={portfolios} />
}
