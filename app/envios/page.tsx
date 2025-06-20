"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Eye, Edit, Package, MapPin } from "lucide-react"
import { ShipmentForm } from "@/components/shipments/shipment-form"

const shipments = [
  {
    id: "ENV-001234",
    customer: "María González",
    origin: "Managua, Nicaragua",
    destination: "San José, Costa Rica",
    weight: "2.5 kg",
    status: "en-transito",
    createdDate: "2024-01-15",
    estimatedDelivery: "2024-01-18",
    trackingCode: "TRK-001234567",
    amount: "C$ 450",
  },
  {
    id: "ENV-001235",
    customer: "Carlos Pérez",
    origin: "León, Nicaragua",
    destination: "Guatemala City, Guatemala",
    weight: "1.8 kg",
    status: "entregado",
    createdDate: "2024-01-10",
    estimatedDelivery: "2024-01-13",
    trackingCode: "TRK-001234568",
    amount: "C$ 320",
  },
  {
    id: "ENV-001236",
    customer: "Ana Rodríguez",
    origin: "Granada, Nicaragua",
    destination: "Tegucigalpa, Honduras",
    weight: "3.2 kg",
    status: "preparacion",
    createdDate: "2024-01-16",
    estimatedDelivery: "2024-01-19",
    trackingCode: "TRK-001234569",
    amount: "C$ 280",
  },
]

const statusConfig = {
  preparacion: { label: "Preparación", color: "bg-yellow-100 text-yellow-800" },
  "en-transito": { label: "En Tránsito", color: "bg-blue-100 text-blue-800" },
  entregado: { label: "Entregado", color: "bg-green-100 text-green-800" },
  problema: { label: "Problema", color: "bg-red-100 text-red-800" },
}

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Envíos</h2>
          <p className="text-muted-foreground">Administra todos los envíos y su estado de entrega</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Envío
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Envío</DialogTitle>
              <DialogDescription>Completa la información del envío para registrarlo en el sistema</DialogDescription>
            </DialogHeader>
            <ShipmentForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID, cliente o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Envíos</CardTitle>
          <CardDescription>
            {filteredShipments.length} envío{filteredShipments.length !== 1 ? "s" : ""} encontrado
            {filteredShipments.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Envío</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Ruta</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead>Entrega Estimada</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{shipment.id}</div>
                      <div className="text-sm text-muted-foreground font-mono">{shipment.trackingCode}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{shipment.customer}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Package className="mr-1 h-3 w-3 text-blue-500" />
                        {shipment.origin}
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-1 h-3 w-3 text-green-500" />
                        {shipment.destination}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{shipment.weight}</TableCell>
                  <TableCell>
                    <Badge className={statusConfig[shipment.status as keyof typeof statusConfig].color}>
                      {statusConfig[shipment.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{shipment.createdDate}</TableCell>
                  <TableCell>{shipment.estimatedDelivery}</TableCell>
                  <TableCell className="font-medium">{shipment.amount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
