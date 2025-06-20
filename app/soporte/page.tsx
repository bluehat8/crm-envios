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
import { Plus, Search, Eye, MessageSquare, AlertCircle, CheckCircle } from "lucide-react"
import { TicketForm } from "@/components/support/ticket-form"

const tickets = [
  {
    id: "TKT-001",
    customer: "María González",
    subject: "Paquete no entregado",
    status: "abierto",
    priority: "alta",
    createdDate: "2024-01-15",
    lastUpdate: "2024-01-16",
    shipmentId: "ENV-001234",
  },
  {
    id: "TKT-002",
    customer: "Carlos Pérez",
    subject: "Consulta sobre facturación",
    status: "en-proceso",
    priority: "media",
    createdDate: "2024-01-14",
    lastUpdate: "2024-01-15",
    shipmentId: "ENV-001235",
  },
  {
    id: "TKT-003",
    customer: "Ana Rodríguez",
    subject: "Cambio de dirección de entrega",
    status: "resuelto",
    priority: "baja",
    createdDate: "2024-01-12",
    lastUpdate: "2024-01-13",
    shipmentId: "ENV-001236",
  },
]

const statusConfig = {
  abierto: { label: "Abierto", color: "bg-red-100 text-red-800", icon: AlertCircle },
  "en-proceso": { label: "En Proceso", color: "bg-yellow-100 text-yellow-800", icon: MessageSquare },
  resuelto: { label: "Resuelto", color: "bg-green-100 text-green-800", icon: CheckCircle },
}

const priorityConfig = {
  alta: { label: "Alta", color: "bg-red-100 text-red-800" },
  media: { label: "Media", color: "bg-yellow-100 text-yellow-800" },
  baja: { label: "Baja", color: "bg-green-100 text-green-800" },
}

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Soporte al Cliente</h2>
          <p className="text-muted-foreground">Gestiona tickets de soporte y consultas de clientes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Ticket</DialogTitle>
              <DialogDescription>Registra una nueva consulta o problema de cliente</DialogDescription>
            </DialogHeader>
            <TicketForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tickets de Soporte</CardTitle>
          <CardDescription>
            {filteredTickets.length} ticket{filteredTickets.length !== 1 ? "s" : ""} encontrado
            {filteredTickets.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Ticket</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Asunto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Fecha Creación</TableHead>
                <TableHead>Última Actualización</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => {
                const StatusIcon = statusConfig[ticket.status as keyof typeof statusConfig].icon
                return (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{ticket.id}</div>
                        {ticket.shipmentId && (
                          <div className="text-sm text-muted-foreground">Envío: {ticket.shipmentId}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{ticket.customer}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[ticket.status as keyof typeof statusConfig].color}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig[ticket.status as keyof typeof statusConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityConfig[ticket.priority as keyof typeof priorityConfig].color}>
                        {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.createdDate}</TableCell>
                    <TableCell>{ticket.lastUpdate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
