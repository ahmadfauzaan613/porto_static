'use client'

import { NavMain } from '@/components/AdminCompo/nav-main'
import { NavUser } from '@/components/AdminCompo/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Image from 'next/image'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: '',
    },
    {
      title: 'Profile',
      url: '/admin/profile',
      icon: '',
    },
    {
      title: 'About',
      url: '/admin/about',
      icon: '',
    },
    {
      title: 'Experience',
      url: '/admin/experience',
      icon: '',
    },
    {
      title: 'Portofolio',
      url: '/admin/portofolio',
      icon: '',
    },
    {
      title: 'Certificate',
      url: '/admin/certificate',
      icon: '',
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Image
                src="/images/logo_white.png"
                alt={`logo`}
                width={200}
                height={200}
                className="w-full h-full"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
