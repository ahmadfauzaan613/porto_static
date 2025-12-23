'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { ExperienceRepository } from '../../../repository/experience.repository'

function parseMonthToDate(value: FormDataEntryValue | null): Date | null {
  if (!value) return null
  const str = value.toString()
  if (!str) return null
  return new Date(`${str}-01`)
}

export async function createExperience(formData: FormData): Promise<void> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }

  await ExperienceRepository.create({
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    description: formData.get('description') as string,
    location: formData.get('location') as string,
    startDate: parseMonthToDate(formData.get('startDate'))!, // required
    endDate: parseMonthToDate(formData.get('endDate')), // optional
  })

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
    startDate: parseMonthToDate(formData.get('startDate'))!,
    endDate: parseMonthToDate(formData.get('endDate')),
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
