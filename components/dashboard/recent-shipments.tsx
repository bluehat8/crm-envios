import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentShipments = [
  {
    id: "ENV-001234",
    customer: "María González",
    destination: "Costa Rica",
    status: "en-transito",
    amount: "C$ 450",
  },
  {
    id: "ENV-001235",
    customer: "Carlos Pérez",
    destination: "Guatemala",
    status: "entregado",
    amount: "C$ 320",
  },
  {
    id: "ENV-001236",
    customer: "Ana Rodríguez",
    destination: "Honduras",
    status: "preparacion",
    amount: "C$ 280",
  },
  {
    id: "ENV-001237",
    customer: "Luis Martínez",
    destination: "El Salvador",
    status: "en-transito",
    amount: "C$ 380",
  },
]

const statusConfig = {
  preparacion: { label: "Preparación", color: "bg-yellow-100 text-yellow-800" },
  "en-transito": { label: "En Tránsito", color: "bg-blue-100 text-blue-800" },
  entregado: { label: "Entregado", color: "bg-green-100 text-green-800" },
}

export function RecentShipments() {
  return (
    <div className="space-y-8">
      {recentShipments.map((shipment) => (
        <div key={shipment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>
              {shipment.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{shipment.customer}</p>
            <p className="text-sm text-muted-foreground">
              {shipment.id} → {shipment.destination}
            </p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Badge className={statusConfig[shipment.status as keyof typeof statusConfig].color}>
              {statusConfig[shipment.status as keyof typeof statusConfig].label}
            </Badge>
            <div className="font-medium">{shipment.amount}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
