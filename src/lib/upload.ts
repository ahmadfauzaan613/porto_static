import crypto from 'crypto'
import fs from 'fs/promises'
import path from 'path'

export type UploadFolder = 'projects' | 'logos' | 'certificates'

export async function saveFile(file: File, folder: UploadFolder) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = path.extname(file.name)
  const filename = `${crypto.randomUUID()}${ext}`

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)
  await fs.mkdir(uploadDir, { recursive: true })

  const filePath = path.join(uploadDir, filename)
  await fs.writeFile(filePath, buffer)

  return `/uploads/${folder}/${filename}`
}
