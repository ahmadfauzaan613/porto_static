import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

export type UploadFolder = 'projects' | 'logos' | 'certificates'

export async function saveFile(file: File, folder: UploadFolder) {
  // baca file dari request
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // generate nama file aman
  const ext = path.extname(file.name)
  const filename = `${crypto.randomUUID()}${ext}`

  // folder target: public/uploads/{folder}
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)

  // pastikan folder ada
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  // path file final
  const fullPath = path.join(uploadDir, filename)

  // simpan file
  fs.writeFileSync(fullPath, buffer)

  // return public url (SAMA seperti Supabase sebelumnya)
  return `/uploads/${folder}/${filename}`
}
