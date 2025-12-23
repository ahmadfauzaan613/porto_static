import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { Toaster } from 'sonner'
import { AppSidebar } from '../../../components/AdminCompo/AppSidebar'
import { SidebarProvider } from '../../../components/ui/sidebar'

export default async function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    redirect('/admin')
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="p-[5rem] w-full">{children}</div>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  )
}
