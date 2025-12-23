import { ExperienceRepository } from '../../../repository/experience.repository'
import ExperienceClient from './experience-client'

export default async function Page() {
  const experiences = await ExperienceRepository.findAll()

  return (
    <div>
      <ExperienceClient experiences={experiences} />
    </div>
  )
}
