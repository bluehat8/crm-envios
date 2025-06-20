"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Download,
  RefreshCw,
} from "lucide-react"

const payments = [
  {
    id: "PAY-001234",
    invoiceId: "FAC-001234",
    customer: "María González",
    amount: "C$ 517.50",
    method: "PayPal",
    status: "completed",
    transactionId: "TXN-PP-123456789",
    processedAt: "2024-01-15 14:30",
    fee: "C$ 15.52",
    netAmount: "C$ 501.98",
  },
  {
    id: "PAY-001235",
    invoiceId: "FAC-001235",
    customer: "Carlos Pérez",
    amount: "C$ 368.00",
    method: "Stripe",
    status: "pending",
    transactionId: "TXN-ST-987654321",
    processedAt: "2024-01-16 09:15",
    fee: "C$ 11.04",
    netAmount: "C$ 356.96",
  },
  {
    id: "PAY-001236",
    invoiceId: "FAC-001236",
    customer: "Ana Rodríguez",
    amount: "C$ 322.00",
    method: "Transferencia",
    status: "failed",
    transactionId: "TXN-BANK-456789",
    processedAt: "2024-01-16 11:20",
    fee: "C$ 0.00",
    netAmount: "C$ 322.00",
  },
]

const paymentMethods = [
  {
    name: "PayPal",
    status: "active",
    fee: "3.0%",
    processingTime: "Inmediato",
    currencies: ["USD", "NIO"],
  },
  {
    name: "Stripe",
    status: "active",
    fee: "2.9% + C$10",
    processingTime: "1-2 días",
    currencies: ["USD", "NIO"],
  },
  {
    name: "Transferencia Bancaria",
    status: "active",
    fee: "C$0",
    processingTime: "1-3 días",
    currencies: ["NIO"],
  },
  {
    name: "Efectivo",
    status: "active",
    fee: "C$0",
    processingTime: "Inmediato",
    currencies: ["NIO"],
  },
]

const statusConfig = {
  completed: { label: "Completado", color: "bg-green-100 text-green-800", icon: CheckCircle },
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  failed: { label: "Fallido", color: "bg-red-100 text-red-800", icon: AlertCircle },
  refunded: { label: "Reembolsado", color: "bg-gray-100 text-gray-800", icon: RefreshCw },
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalProcessed = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number.parseFloat(p.amount.replace("C$ ", "").replace(",", "")), 0)

  const totalFees = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + Number.parseFloat(p.fee.replace("C$ ", "").replace(",", "")), 0)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Pagos</h2>
          <p className="text-muted-foreground">Administra pagos, métodos de pago y transacciones</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar Reporte
        </Button>
      </div>

      {/* KPIs de Pagos */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Procesado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">C$ {totalProcessed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comisiones</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">C$ {totalFees.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">En comisiones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">Pagos por procesar</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="methods">Métodos de Pago</TabsTrigger>
          <TabsTrigger value="reconciliation">Conciliación</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar transacciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="completed">Completados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="failed">Fallidos</SelectItem>
                <SelectItem value="refunded">Reembolsados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Transacciones</CardTitle>
              <CardDescription>
                {filteredPayments.length} transacción{filteredPayments.length !== 1 ? "es" : ""} encontrada
                {filteredPayments.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pago</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Factura</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Comisión</TableHead>
                    <TableHead>Neto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => {
                    const StatusIcon = statusConfig[payment.status as keyof typeof statusConfig].icon
                    return (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.id}</div>
                            <div className="text-sm text-muted-foreground font-mono">{payment.transactionId}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{payment.customer}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.invoiceId}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.method}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{payment.amount}</TableCell>
                        <TableCell className="text-red-600">{payment.fee}</TableCell>
                        <TableCell className="font-medium text-green-600">{payment.netAmount}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig[payment.status as keyof typeof statusConfig].color}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {statusConfig[payment.status as keyof typeof statusConfig].label}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.processedAt}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago Configurados</CardTitle>
              <CardDescription>Gestiona los métodos de pago disponibles para tus clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {paymentMethods.map((method, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base">{method.name}</CardTitle>
                      <Badge
                        className={
                          method.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {method.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Comisión:</span>
                          <span className="font-medium">{method.fee}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tiempo de procesamiento:</span>
                          <span className="font-medium">{method.processingTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Monedas:</span>
                          <span className="font-medium">{method.currencies.join(", ")}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full">
                        Configurar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conciliación Bancaria</CardTitle>
              <CardDescription>Reconcilia los pagos con los estados de cuenta bancarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">C$ 45,230</div>
                        <p className="text-sm text-muted-foreground">Conciliado</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">C$ 2,150</div>
                        <p className="text-sm text-muted-foreground">Pendiente</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">C$ 320</div>
                        <p className="text-sm text-muted-foreground">Discrepancias</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex space-x-2">
                  <Button>Importar Estado de Cuenta</Button>
                  <Button variant="outline">Ejecutar Conciliación</Button>
                  <Button variant="outline">Exportar Reporte</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
