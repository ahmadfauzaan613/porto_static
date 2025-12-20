// app/admin/(dashboard)/portofolio/page.tsx
import { ProjectRepository } from '@/app/repository/project.repository'
import PortfolioClient from './PortfolioClient'

export default async function Page() {
  const portfolios = await ProjectRepository.findAll()

  return <PortfolioClient portfolios={portfolios} />
}
