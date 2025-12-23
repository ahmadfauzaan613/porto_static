import { supabaseAdmin } from '@/lib/supabase-admin'

export async function deleteFile(publicUrl: string) {
  const path = publicUrl.split('/uploads/')[1]

  if (!path) return

  const { error } = await supabaseAdmin.storage.from('uploads').remove([path])

  if (error) {
    console.error('Failed to delete file:', error.message)
  }
}
