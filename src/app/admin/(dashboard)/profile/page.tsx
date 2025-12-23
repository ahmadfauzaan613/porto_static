import Title from '@/components/AdminCompo/Title'
import { ProfileRepository } from '../../../repository/profile.repository'
import ProfileForm from './profile-form'

export default async function Page() {
  const profile = await ProfileRepository.findFirst()

  return (
    <div className="w-full">
      <Title text="Profile" />

      <ProfileForm
        defaultValues={{
          name: profile?.name ?? '',
          role: profile?.role ?? '',
          linkedin: profile?.links.find(l => l.type === 'linkedin')?.url ?? '',
          whatsapp: profile?.links.find(l => l.type === 'whatsapp')?.url ?? '',
          email: profile?.links.find(l => l.type === 'email')?.url ?? '',
          resume: profile?.links.find(l => l.type === 'resume')?.url ?? '',
        }}
      />
    </div>
  )
}
