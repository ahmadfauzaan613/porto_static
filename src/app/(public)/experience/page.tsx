import ExperienceComponents from '@/components/ExperienceComponents'
import { ExperienceRepository } from '../../repository/experience.repository'

export default async function page() {
  const experience = await ExperienceRepository.findAll()
  return <ExperienceComponents experience={experience} />
}
