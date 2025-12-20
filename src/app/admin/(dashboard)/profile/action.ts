'use server'

import { LinkType } from '@prisma/client'
import { cookies } from 'next/headers'
import { ProfileRepository } from '../../../repository/profile.repository'

interface ProfileActionPayload {
  name: string
  role: string
  linkedin: string
  whatsapp: string
  email: string
  resume: string
}

export async function handleSaveProfile(data: ProfileActionPayload) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session) {
      throw new Error('Unauthorized')
    }

    await ProfileRepository.upsertProfile(data.name, data.role, [
      { type: LinkType.linkedin, url: data.linkedin },
      { type: LinkType.whatsapp, url: data.whatsapp },
      { type: LinkType.email, url: data.email },
      { type: LinkType.resume, url: data.resume },
    ])

    return {
      success: true,
      message: 'Profile saved successfully',
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Failed to save profile',
    }
  }
}
