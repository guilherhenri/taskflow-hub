import { LayoutList, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '../ui/sidebar'

export function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <SidebarProvider>
        <Sidebar>
          <div className="flex flex-col gap-4 p-4">
            <SidebarHeader className="p-0">
              <span className="text-primary text-lg font-semibold">
                TaskFlow Hub
              </span>
            </SidebarHeader>
            <SidebarSeparator className="m-0" />
            <SidebarContent>
              <NavLink
                to="/"
                className="hover:bg-secondary aria-[current=page]:bg-secondary
                  aria-[current=page]:text-primary flex items-center justify-start gap-2
                  rounded-xs p-2"
              >
                <LayoutList className="size-5" />
                Tasks
              </NavLink>
              <NavLink
                to="/users"
                className="hover:bg-secondary aria-[current=page]:bg-secondary
                  aria-[current=page]:text-primary flex items-center justify-start gap-2
                  rounded-xs p-2"
              >
                <Users className="size-5" />
                Users
              </NavLink>
            </SidebarContent>
          </div>
        </Sidebar>

        <div className="w-full space-y-4 px-6 py-4">
          <SidebarTrigger />

          <main className="w-full space-y-6">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}
