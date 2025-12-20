'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { ExperienceRepository } from '../../../repository/experience.repository'

export async function createExperience(formData: FormData): Promise<void> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }

  const company = formData.get('company') as string
  const role = formData.get('role') as string
  const description = formData.get('description') as string
  const location = formData.get('location') as string
  const startDate = new Date(formData.get('startDate') as string)
  const endDateRaw = formData.get('endDate') as string
  const endDate = endDateRaw && endDateRaw !== 'Present' ? new Date(endDateRaw) : null

  await ExperienceRepository.create({
    company,
    role,
    description,
    location,
    startDate,
    endDate,
  })

  // revalidate supaya list di page update otomatis
  revalidatePath('/admin/experience')
}

export async function updateExperience(id: string, formData: FormData) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }

  await ExperienceRepository.updateById(id, {
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    description: formData.get('description') as string,
    location: formData.get('location') as string,
    startDate: new Date(formData.get('startDate') as string),
    endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : null,
  })

  revalidatePath('/admin/experience')
}

export async function deleteExperience(id: string) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }
  await ExperienceRepository.deleteById(id)
  revalidatePath('/admin/experience')
}
