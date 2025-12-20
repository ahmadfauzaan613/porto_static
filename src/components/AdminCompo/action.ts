'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function updatePasswordOnly(newPassword: string) {
  const cookieStore = await cookies()
  const userId = cookieStore.get('admin_session')?.value

  if (!userId) throw new Error('Unauthorized')

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.users_auth.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
    },
  })
}
export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const user = await prisma.users_auth.findUnique({
    where: { username },
  })

  if (!user) throw new Error('Invalid credentials')

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error('Invalid credentials')

  const cookieStore = await cookies()

  cookieStore.set({
    name: 'admin_session',
    value: user.id,
    httpOnly: true,
    path: '/',
  })

  redirect('/admin/dashboard')
}

export async function logoutAction() {
  const cookieStore = await cookies()

  cookieStore.delete({
    name: 'admin_session',
    path: '/',
  })

  redirect('/admin')
}
