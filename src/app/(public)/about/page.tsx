import AboutComponents from '@/components/AboutComponents'
import { AboutRepository } from '../../repository/about.repository'

export default async function page() {
  const about = await AboutRepository.findFirst()
  return <AboutComponents text={about?.text} />
}
