'use server'

import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'
import path from 'path'

import { CertificateRepository } from '@/app/repository/certificate.repository'
import { saveFile } from '@/lib/upload'
import { cookies } from 'next/headers'

export async function createCertificate(formData: FormData) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const imageFile = formData.get('image') as File

  if (!name || !description || !imageFile) {
    throw new Error('Invalid form data')
  }

  const imagePath = await saveFile(imageFile, 'certificates')

  await CertificateRepository.create({
    name,
    description,
    image: imagePath,
  })

  revalidatePath('/admin/certificate')
}

export async function updateCertificate(id: number, formData: FormData) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const imageFile = formData.get('image') as File | null

  let imagePath: string | undefined = undefined

  if (imageFile && imageFile.size > 0) {
    imagePath = await saveFile(imageFile, 'certificates')
  }

  await CertificateRepository.updateById(id, {
    name,
    description,
    image: imagePath,
  })

  revalidatePath('/admin/certificate')
}

export async function deleteCertificate(id: number) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }

  const certificate = await CertificateRepository.findById(id)
  if (!certificate) return

  // hapus file image
  if (certificate.image) {
    const filePath = path.join(process.cwd(), 'public', certificate.image)
    await fs.unlink(filePath).catch(() => {})
  }

  await CertificateRepository.deleteById(id)

  revalidatePath('/admin/certificate')
}
