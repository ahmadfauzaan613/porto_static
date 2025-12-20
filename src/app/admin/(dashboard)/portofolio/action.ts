// app/admin/(dashboard)/portfolio/action.ts
'use server'

import { ProjectRepository } from '@/app/repository/project.repository'
import { saveFile } from '@/lib/upload'
import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import path from 'path'

export async function createProject(formData: FormData) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }

  const imageFile = formData.get('image') as File
  const logoFiles = formData.getAll('logos') as File[]

  const imagePath = imageFile ? await saveFile(imageFile, 'projects') : ''

  const logos = []
  for (const file of logoFiles) {
    const path = await saveFile(file, 'logos')
    logos.push({ file: path })
  }

  await ProjectRepository.create({
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    link: formData.get('link') as string,
    image: imagePath,
    logos,
  })

  revalidatePath('/admin/portfolio')
}

export async function deleteProject(id: number) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }
  const project = await ProjectRepository.findById(id)
  if (!project) return

  // hapus image
  if (project.image) {
    await fs.unlink(path.join(process.cwd(), 'public', project.image))
  }

  // hapus logos
  for (const logo of project.logos) {
    await fs.unlink(path.join(process.cwd(), 'public', logo.file))
  }

  await ProjectRepository.deleteById(id)
  revalidatePath('/admin/portfolio')
}

export async function updateProject(id: number, formData: FormData) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    throw new Error('Unauthorized')
  }
  const imageFile = formData.get('image') as File
  const logoFiles = formData.getAll('logos') as File[]

  let imagePath: string | undefined = undefined

  if (imageFile && imageFile.size > 0) {
    imagePath = await saveFile(imageFile, 'projects')
  }

  const logos =
    logoFiles.length > 0
      ? await Promise.all(
          logoFiles.map(async file => ({
            file: await saveFile(file, 'logos'),
          }))
        )
      : undefined

  await ProjectRepository.updateById(id, {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    link: formData.get('link') as string,
    image: imagePath,
    logos,
  })

  revalidatePath('/admin/portfolio')
}
