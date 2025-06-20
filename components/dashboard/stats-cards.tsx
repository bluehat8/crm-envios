import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, Truck, DollarSign } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Envíos",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "Clientes Activos",
      value: "456",
      change: "+8%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "En Tránsito",
      value: "89",
      change: "-2%",
      changeType: "negative" as const,
      icon: Truck,
    },
    {
      title: "Ingresos Mes",
      value: "C$ 125,430",
      change: "+15%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
              {stat.change} desde el mes pasado
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
