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
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
  },
  {
    title: "Envíos",
    href: "/envios",
    icon: Package,
  },
  {
    title: "Seguimiento",
    href: "/seguimiento",
    icon: Truck,
  },
  {
    title: "Inventario",
    href: "/inventario",
    icon: Boxes,
  },
  {
    title: "Facturación",
    href: "/facturacion",
    icon: CreditCard,
  },
  {
    title: "Pagos",
    href: "/pagos",
    icon: DollarSign,
  },
  {
    title: "Soporte",
    href: "/soporte",
    icon: MessageSquare,
  },
  {
    title: "Marketing",
    href: "/marketing",
    icon: Target,
  },
  {
    title: "Reportes",
    href: "/reportes",
    icon: BarChart3,
  },
  {
    title: "Analíticas",
    href: "/analytics",
    icon: TrendingUp,
  },
  {
    title: "Automatizaciones",
    href: "/automatizaciones",
    icon: Zap,
  },
  {
    title: "Integraciones",
    href: "/integraciones",
    icon: Webhook,
  },
  {
    title: "Configuración",
    href: "/configuracion",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64 bg-white border-r">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-6">
            <Package className="h-8 w-8 text-blue-600 mr-2" />
            <div>
              <h2 className="text-lg font-semibold">CRM Envíos</h2>
              <p className="text-xs text-gray-500">Nicaragua</p>
            </div>
          </div>
          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {sidebarNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start mb-1",
                      pathname === item.href && "bg-blue-50 text-blue-700 border-blue-200",
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
