"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { FileSpreadsheet, FileText, TrendingUp, Clock, DollarSign } from "lucide-react"
import { addDays } from "date-fns"

const volumeData = [
  { month: "Jul", envios: 145, ingresos: 65430 },
  { month: "Ago", envios: 189, ingresos: 85210 },
  { month: "Sep", envios: 234, ingresos: 105680 },
  { month: "Oct", envios: 198, ingresos: 89340 },
  { month: "Nov", envios: 267, ingresos: 120450 },
  { month: "Dic", envios: 312, ingresos: 145230 },
]

const countryData = [
  { name: "Costa Rica", value: 35, color: "#3b82f6" },
  { name: "Guatemala", value: 25, color: "#10b981" },
  { name: "Honduras", value: 20, color: "#f59e0b" },
  { name: "El Salvador", value: 12, color: "#ef4444" },
  { name: "Panamá", value: 5, color: "#8b5cf6" },
  { name: "México", value: 3, color: "#06b6d4" },
]

const deliveryTimeData = [
  { route: "Nicaragua → Costa Rica", promedio: 2.5, meta: 3 },
  { route: "Nicaragua → Guatemala", promedio: 3.2, meta: 4 },
  { route: "Nicaragua → Honduras", promedio: 2.8, meta: 3 },
  { route: "Nicaragua → El Salvador", promedio: 3.5, meta: 4 },
  { route: "Nicaragua → Panamá", promedio: 4.2, meta: 5 },
  { route: "Nicaragua → México", promedio: 7.8, meta: 8 },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [reportType, setReportType] = useState("volume")

  const exportToExcel = () => {
    // Simular exportación a Excel
    const data = volumeData.map((item) => ({
      Mes: item.month,
      "Total Envíos": item.envios,
      "Ingresos (C$)": item.ingresos,
    }))

    console.log("Exportando a Excel:", data)
    // Aquí iría la lógica real de exportación
  }

  const exportToPDF = () => {
    // Simular exportación a PDF
    console.log("Generando reporte PDF...")
    // Aquí iría la lógica real de exportación
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reportes y Estadísticas</h2>
          <p className="text-muted-foreground">Análisis detallado del rendimiento operativo</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportToExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" onClick={exportToPDF}>
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tipo de reporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="volume">Volumen de Envíos</SelectItem>
            <SelectItem value="revenue">Ingresos</SelectItem>
            <SelectItem value="countries">Países Destino</SelectItem>
            <SelectItem value="delivery">Tiempos de Entrega</SelectItem>
            <SelectItem value="satisfaction">Satisfacción Cliente</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      </div>

      {/* KPIs Principales */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Envíos Totales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,345</div>
            <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 días</div>
            <p className="text-xs text-muted-foreground">-0.3 días vs meta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">+0.2 vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rentabilidad</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5%</div>
            <p className="text-xs text-muted-foreground">+1.2% vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Gráfico de Volumen */}
        <Card>
          <CardHeader>
            <CardTitle>Volumen de Envíos por Mes</CardTitle>
            <CardDescription>Tendencia de envíos en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="envios" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Países */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Países</CardTitle>
            <CardDescription>Porcentaje de envíos por destino</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Tiempos de Entrega */}
      <Card>
        <CardHeader>
          <CardTitle>Tiempos de Entrega por Ruta</CardTitle>
          <CardDescription>Comparación entre tiempo promedio y meta establecida</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ruta</TableHead>
                <TableHead>Tiempo Promedio</TableHead>
                <TableHead>Meta</TableHead>
                <TableHead>Rendimiento</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryTimeData.map((route, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{route.route}</TableCell>
                  <TableCell>{route.promedio} días</TableCell>
                  <TableCell>{route.meta} días</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${route.promedio <= route.meta ? "bg-green-500" : "bg-red-500"}`}
                          style={{ width: `${Math.min((route.meta / route.promedio) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm">{((route.meta / route.promedio) * 100).toFixed(0)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        route.promedio <= route.meta ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }
                    >
                      {route.promedio <= route.meta ? "En Meta" : "Fuera de Meta"}
                    </Badge>
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
