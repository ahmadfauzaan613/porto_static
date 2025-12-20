'use server'

import { cookies } from 'next/headers'
import { AboutRepository } from '../../../repository/about.repository'

export async function handleAboutData(id: string | null, text: string) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session) {
      throw new Error('Unauthorized')
    }
    const about = await AboutRepository.findFirst()

    if (about) {
      await AboutRepository.updateById(about.id, text)
    } else {
      await AboutRepository.create(text)
    }

    return {
      success: true,
      message: 'About updated successfully',
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Failed to save about data',
    }
  }
}
