import PortoComponents from '@/components/PortoComponents'
import { ProjectRepository } from '../../repository/project.repository'

export default async function pages() {
  const portfolios = await ProjectRepository.findAll()
  const portoLogo = await ProjectRepository.findAllLogo()
  return <PortoComponents portfolios={portfolios} portoLogo={portoLogo} />
}
