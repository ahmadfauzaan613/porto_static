import { supabaseAdmin } from '@/lib/supabase-admin'
import crypto from 'crypto'
import path from 'path'

export type UploadFolder = 'projects' | 'logos' | 'certificates'

export async function saveFile(file: File, folder: UploadFolder) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = path.extname(file.name)
  const filename = `${crypto.randomUUID()}${ext}`
  const filePath = `${folder}/${filename}`

  const { error } = await supabaseAdmin.storage.from('uploads').upload(filePath, buffer, {
    contentType: file.type,
    upsert: false,
  })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  const { data } = supabaseAdmin.storage.from('uploads').getPublicUrl(filePath)

  return data.publicUrl
}
