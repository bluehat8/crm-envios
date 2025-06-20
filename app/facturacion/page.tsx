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
import { Plus, Search, Eye, Download, FileText, DollarSign } from "lucide-react"
import { InvoiceForm } from "@/components/billing/invoice-form"

const invoices = [
  {
    id: "FAC-001234",
    shipmentId: "ENV-001234",
    customer: "María González Pérez",
    ruc: "J0310000000001",
    amount: "C$ 450.00",
    tax: "C$ 67.50",
    total: "C$ 517.50",
    status: "pagada",
    issueDate: "2024-01-15",
    dueDate: "2024-01-30",
    dgiNumber: "001-001-01-00001234",
  },
  {
    id: "FAC-001235",
    shipmentId: "ENV-001235",
    customer: "Carlos Pérez Martínez",
    ruc: "J0310000000002",
    amount: "C$ 320.00",
    tax: "C$ 48.00",
    total: "C$ 368.00",
    status: "pendiente",
    issueDate: "2024-01-16",
    dueDate: "2024-01-31",
    dgiNumber: "001-001-01-00001235",
  },
  {
    id: "FAC-001236",
    shipmentId: "ENV-001236",
    customer: "Ana Rodríguez López",
    ruc: "J0310000000003",
    amount: "C$ 280.00",
    tax: "C$ 42.00",
    total: "C$ 322.00",
    status: "vencida",
    issueDate: "2024-01-10",
    dueDate: "2024-01-25",
    dgiNumber: "001-001-01-00001236",
  },
]

const statusConfig = {
  pagada: { label: "Pagada", color: "bg-green-100 text-green-800" },
  pendiente: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  vencida: { label: "Vencida", color: "bg-red-100 text-red-800" },
  cancelada: { label: "Cancelada", color: "bg-gray-100 text-gray-800" },
}

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPending = invoices
    .filter((inv) => inv.status === "pendiente" || inv.status === "vencida")
    .reduce((sum, inv) => sum + Number.parseFloat(inv.total.replace("C$ ", "").replace(",", "")), 0)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Facturación Electrónica</h2>
          <p className="text-muted-foreground">Gestiona facturas según normativa DGI de Nicaragua</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Factura
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Generar Nueva Factura</DialogTitle>
              <DialogDescription>Crear factura electrónica compatible con DGI Nicaragua</DialogDescription>
            </DialogHeader>
            <InvoiceForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Facturado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">C$ 1,207.50</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Por Cobrar</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">C$ {totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Pendiente de pago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facturas Mes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Enero 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa Cobro</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 días</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar facturas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facturas Emitidas</CardTitle>
          <CardDescription>
            {filteredInvoices.length} factura{filteredInvoices.length !== 1 ? "s" : ""} encontrada
            {filteredInvoices.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Factura</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Envío</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>IVA</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{invoice.id}</div>
                      <div className="text-sm text-muted-foreground font-mono">DGI: {invoice.dgiNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{invoice.customer}</div>
                      <div className="text-sm text-muted-foreground">RUC: {invoice.ruc}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{invoice.shipmentId}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.tax}</TableCell>
                  <TableCell className="font-medium">{invoice.total}</TableCell>
                  <TableCell>
                    <Badge className={statusConfig[invoice.status as keyof typeof statusConfig].color}>
                      {statusConfig[invoice.status as keyof typeof statusConfig].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
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
