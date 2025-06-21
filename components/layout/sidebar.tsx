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
          "w-full justify-start transition-colors hover:bg-accent hover:text-accent-foreground",
          isActive 
            ? "bg-accent text-primary font-medium" 
            : "text-muted-foreground"
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
    <div className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0">
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-pink-600">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">CRM Envíos</h2>
              <p className="text-xs text-muted-foreground">Nicaragua</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <nav className="p-2 space-y-1">
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
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          v1.0.0
        </div>
      </div>
    </div>
  )
}

export const Sidebar = memo(SidebarContent)
