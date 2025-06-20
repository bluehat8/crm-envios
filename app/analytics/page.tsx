"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, Package, DollarSign, Clock, Target, Download } from "lucide-react"
import { addDays } from "date-fns"

const revenueData = [
  { month: "Jul", revenue: 65430, shipments: 145, avgValue: 451 },
  { month: "Ago", revenue: 85210, shipments: 189, avgValue: 451 },
  { month: "Sep", revenue: 105680, shipments: 234, avgValue: 452 },
  { month: "Oct", revenue: 89340, shipments: 198, avgValue: 451 },
  { month: "Nov", revenue: 120450, shipments: 267, avgValue: 451 },
  { month: "Dic", revenue: 145230, shipments: 312, avgValue: 465 },
]

const customerAnalytics = [
  { segment: "Nuevos", count: 89, percentage: 23, revenue: 45230 },
  { segment: "Recurrentes", count: 156, percentage: 41, revenue: 89450 },
  { segment: "VIP", count: 67, percentage: 18, revenue: 67890 },
  { segment: "Inactivos", count: 68, percentage: 18, revenue: 12340 },
]

const performanceMetrics = [
  { metric: "Tiempo Promedio Entrega", value: "3.2 días", target: "3.5 días", status: "good" },
  { metric: "Satisfacción Cliente", value: "4.8/5", target: "4.5/5", status: "excellent" },
  { metric: "Tasa Entrega Exitosa", value: "97.4%", target: "95%", status: "excellent" },
  { metric: "Costo por Envío", value: "C$ 125", target: "C$ 130", status: "good" },
  { metric: "Retención Clientes", value: "78%", target: "75%", status: "good" },
  { metric: "Tiempo Respuesta Soporte", value: "2.1 hrs", target: "4 hrs", status: "excellent" },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analíticas Avanzadas</h2>
          <p className="text-muted-foreground">Insights profundos del rendimiento del negocio</p>
        </div>
        <div className="flex space-x-2">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">C$ 145,230</div>
            <p className="text-xs text-green-600">+15.2% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Envíos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-green-600">+12.8% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">380</div>
            <p className="text-xs text-green-600">+8.5% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">C$ 465</div>
            <p className="text-xs text-green-600">+2.1% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Entrega</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 días</div>
            <p className="text-xs text-green-600">-0.3 días vs meta</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-green-600">+0.2 vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Ingresos</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
          <TabsTrigger value="operations">Operaciones</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="predictions">Predicciones</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Ingresos</CardTitle>
                <CardDescription>Evolución mensual de ingresos y envíos</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valor Promedio por Envío</CardTitle>
                <CardDescription>Evolución del ticket promedio</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgValue" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Segmentación de Clientes</CardTitle>
                <CardDescription>Distribución por tipo de cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerAnalytics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ segment, percentage }) => `${segment} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {customerAnalytics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#3b82f6", "#10b981", "#f59e0b", "#ef4444"][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valor por Segmento</CardTitle>
                <CardDescription>Ingresos generados por cada segmento</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Rendimiento</CardTitle>
              <CardDescription>KPIs operativos vs objetivos establecidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{metric.metric}</h4>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-2xl font-bold">{metric.value}</span>
                        <span className="text-sm text-muted-foreground">Meta: {metric.target}</span>
                      </div>
                    </div>
                    <Badge
                      className={
                        metric.status === "excellent"
                          ? "bg-green-100 text-green-800"
                          : metric.status === "good"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {metric.status === "excellent" ? "Excelente" : metric.status === "good" ? "Bueno" : "Mejorable"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predicciones y Tendencias</CardTitle>
              <CardDescription>Proyecciones basadas en datos históricos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">C$ 180,000</div>
                      <p className="text-sm text-muted-foreground">Ingresos proyectados próximo mes</p>
                      <Badge className="mt-2 bg-blue-100 text-blue-800">+24% crecimiento</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">420</div>
                      <p className="text-sm text-muted-foreground">Envíos proyectados próximo mes</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">+35% crecimiento</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">95</div>
                      <p className="text-sm text-muted-foreground">Nuevos clientes proyectados</p>
                      <Badge className="mt-2 bg-purple-100 text-purple-800">+18% crecimiento</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
