"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Package, Plus, Search, AlertTriangle, TrendingDown, BarChart3 } from "lucide-react"

const inventory = [
  {
    id: 1,
    name: "Cajas Pequeñas (20x15x10cm)",
    category: "Embalaje",
    currentStock: 150,
    minStock: 50,
    maxStock: 500,
    unitCost: 15.0,
    supplier: "Empaques Nicaragua",
    location: "Almacén A-1",
    lastRestocked: "2024-01-10",
  },
  {
    id: 2,
    name: "Cajas Medianas (30x25x20cm)",
    category: "Embalaje",
    currentStock: 25,
    minStock: 30,
    maxStock: 300,
    unitCost: 25.0,
    supplier: "Empaques Nicaragua",
    location: "Almacén A-2",
    lastRestocked: "2024-01-08",
  },
  {
    id: 3,
    name: "Cinta de Embalaje",
    category: "Suministros",
    currentStock: 200,
    minStock: 100,
    maxStock: 1000,
    unitCost: 8.5,
    supplier: "Suministros Industriales",
    location: "Almacén B-1",
    lastRestocked: "2024-01-12",
  },
  {
    id: 4,
    name: "Etiquetas de Envío",
    category: "Suministros",
    currentStock: 5000,
    minStock: 1000,
    maxStock: 10000,
    unitCost: 0.25,
    supplier: "Impresiones Rápidas",
    location: "Oficina Principal",
    lastRestocked: "2024-01-15",
  },
]

const movements = [
  {
    id: 1,
    itemName: "Cajas Pequeñas",
    type: "out",
    quantity: 25,
    reason: "Envío ENV-001234",
    user: "María Operadora",
    date: "2024-01-16 14:30",
  },
  {
    id: 2,
    itemName: "Cinta de Embalaje",
    type: "in",
    quantity: 100,
    reason: "Compra - Orden #123",
    user: "Admin",
    date: "2024-01-16 09:15",
  },
  {
    id: 3,
    itemName: "Cajas Medianas",
    type: "out",
    quantity: 15,
    reason: "Envío ENV-001235",
    user: "Carlos Supervisor",
    date: "2024-01-15 16:45",
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minStock)
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * item.unitCost, 0)

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Inventario</h2>
          <p className="text-muted-foreground">Controla el stock de materiales y suministros</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Artículo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Artículo</DialogTitle>
              <DialogDescription>Registra un nuevo artículo en el inventario</DialogDescription>
            </DialogHeader>
            {/* Formulario de nuevo artículo aquí */}
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs de Inventario */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artículos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <p className="text-xs text-muted-foreground">En inventario</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">C$ {totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Valor del inventario</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">Artículos por reabastecer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Movimientos Hoy</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Entradas y salidas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="movements">Movimientos</TabsTrigger>
          <TabsTrigger value="suppliers">Proveedores</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Artículos en Inventario</CardTitle>
              <CardDescription>Lista completa de artículos y su estado actual</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artículo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Stock Actual</TableHead>
                    <TableHead>Min/Max</TableHead>
                    <TableHead>Costo Unitario</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ubicación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.currentStock}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.minStock} / {item.maxStock}
                      </TableCell>
                      <TableCell>C$ {item.unitCost.toFixed(2)}</TableCell>
                      <TableCell>C$ {(item.currentStock * item.unitCost).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.currentStock <= item.minStock
                              ? "bg-red-100 text-red-800"
                              : item.currentStock <= item.minStock * 1.5
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {item.currentStock <= item.minStock
                            ? "Stock Bajo"
                            : item.currentStock <= item.minStock * 1.5
                              ? "Advertencia"
                              : "Normal"}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimientos Recientes</CardTitle>
              <CardDescription>Historial de entradas y salidas de inventario</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artículo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="font-medium">{movement.itemName}</TableCell>
                      <TableCell>
                        <Badge
                          className={movement.type === "in" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {movement.type === "in" ? "Entrada" : "Salida"}
                        </Badge>
                      </TableCell>
                      <TableCell>{movement.quantity}</TableCell>
                      <TableCell>{movement.reason}</TableCell>
                      <TableCell>{movement.user}</TableCell>
                      <TableCell>{movement.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
