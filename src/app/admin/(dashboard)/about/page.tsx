export const dynamic = 'force-dynamic'

import Title from '@/components/AdminCompo/Title'
import { AboutRepository } from '../../../repository/about.repository'
import AboutForm from './about-form'

export default async function About() {
  const aboutData = await AboutRepository.findFirst()
  return (
    <div>
      <Title text="about" />
      <AboutForm id={aboutData?.id ?? null} defaultValue={aboutData?.text ?? ''} />
    </div>
  )
}
