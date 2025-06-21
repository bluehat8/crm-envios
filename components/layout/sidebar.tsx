"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Package,
  Users,
  Truck,
  BarChart3,
  Settings,
  Home,
  CreditCard,
  MessageSquare,
  Webhook,
  DollarSign,
  Zap,
  Boxes,
  Target,
  TrendingUp,
  LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo } from "react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

const sidebarNavItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Clientes", href: "/clientes", icon: Users },
  { title: "Envíos", href: "/envios", icon: Package },
  { title: "Seguimiento", href: "/seguimiento", icon: Truck },
  { title: "Inventario", href: "/inventario", icon: Boxes },
  { title: "Facturación", href: "/facturacion", icon: CreditCard },
  { title: "Pagos", href: "/pagos", icon: DollarSign },
  { title: "Soporte", href: "/soporte", icon: MessageSquare },
  { title: "Marketing", href: "/marketing", icon: Target },
  { title: "Reportes", href: "/reportes", icon: BarChart3 },
  { title: "Analíticas", href: "/analytics", icon: TrendingUp },
  { title: "Automatizaciones", href: "/automatizaciones", icon: Zap },
  { title: "Integraciones", href: "/integraciones", icon: Webhook },
  { title: "Configuración", href: "/configuracion", icon: Settings },
]

interface NavButtonProps {
  item: NavItem
  isActive: boolean
}

const NavButton = memo(({ item, isActive }: NavButtonProps) => {
  const { href, title, icon: Icon } = item
  
  return (
    <Link href={href} passHref legacyBehavior>
      <Button
        asChild
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start mb-1 transition-colors",
          isActive && "bg-blue-50 text-blue-700 border-blue-200"
        )}
      >
        <span>
          <Icon className="mr-2 h-4 w-4 flex-shrink-0" />
          <span className="truncate">{title}</span>
        </span>
      </Button>
    </Link>
  )
})

NavButton.displayName = 'NavButton'

function SidebarContent() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64 bg-white border-r flex flex-col h-screen sticky top-0">
      <div className="space-y-4 py-4 flex-1 flex flex-col">
        <div className="px-3 py-2 flex-1 flex flex-col">
          <div className="flex items-center mb-6 px-2">
            <Package className="h-8 w-8 text-blue-600 mr-2 flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="text-lg font-semibold truncate">CRM Envíos</h2>
              <p className="text-xs text-gray-500 truncate">Nicaragua</p>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
              <nav className="space-y-1">
                {sidebarNavItems.map((item) => (
                  <NavButton 
                    key={item.href} 
                    item={item} 
                    isActive={pathname === item.href} 
                  />
                ))}
              </nav>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Sidebar = memo(SidebarContent)
