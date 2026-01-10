export const dynamic = 'force-dynamic'

import HomeComponents from '@/components/HomeComponents'
import { ProfileRepository } from '../repository/profile.repository'

export default async function Home() {
  const profile = await ProfileRepository.findFirst()
  const profileLik = await ProfileRepository.findProfileLink()
  return <HomeComponents profile={profile} profileLik={profileLik} />
}
