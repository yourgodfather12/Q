"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Frame, BarChart, Server, MessageSquare, Settings, Database, Image, LogOut } from 'lucide-react'

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Frame,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
  {
    title: "Servers",
    href: "/servers",
    icon: Server,
  },
  {
    title: "Commands",
    href: "/commands",
    icon: MessageSquare,
  },
  {
    title: "Database",
    href: "/database",
    icon: Database,
  },
  {
    title: "Media",
    href: "/media",
    icon: Image,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-primary text-primary-foreground">
      <div className="flex h-14 items-center border-b px-4">
        <Frame className="mr-2 h-6 w-6" />
        <span className="font-semibold">Discord Bot</span>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          {sidebarNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", 
                  pathname === item.href 
                    ? "bg-secondary text-secondary-foreground" 
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10" onClick={() => console.log("Logout")}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

