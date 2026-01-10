import fs from 'fs'
import path from 'path'

export async function deleteFile(publicUrl: string) {
  try {
    const fileName = publicUrl.split('/uploads/')[1]
    if (!fileName) return

    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  } catch (error) {
    console.error('Failed to delete local file:', error)
  }
}
