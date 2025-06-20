"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, MessageSquare, TrendingUp, Eye, Plus, Send, Target, BarChart3 } from "lucide-react"

const campaigns = [
  {
    id: 1,
    name: "Promoción Navideña 2024",
    type: "email",
    status: "active",
    audience: 1250,
    sent: 1200,
    opened: 480,
    clicked: 96,
    converted: 24,
    revenue: 12500,
    startDate: "2024-01-15",
    endDate: "2024-01-31",
  },
  {
    id: 2,
    name: "Descuento Clientes Frecuentes",
    type: "sms",
    status: "completed",
    audience: 350,
    sent: 350,
    opened: 315,
    clicked: 89,
    converted: 18,
    revenue: 8900,
    startDate: "2024-01-10",
    endDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Lanzamiento Servicio Express",
    type: "whatsapp",
    status: "draft",
    audience: 800,
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    revenue: 0,
    startDate: "2024-01-20",
    endDate: "2024-02-05",
  },
]

const segments = [
  {
    id: 1,
    name: "Clientes VIP",
    description: "Clientes con más de 10 envíos",
    criteria: "shipments_count > 10",
    size: 156,
    lastUpdated: "2024-01-16",
  },
  {
    id: 2,
    name: "Nuevos Clientes",
    description: "Registrados en los últimos 30 días",
    criteria: "registration_date >= 30_days_ago",
    size: 89,
    lastUpdated: "2024-01-16",
  },
  {
    id: 3,
    name: "Clientes Inactivos",
    description: "Sin envíos en los últimos 90 días",
    criteria: "last_shipment_date <= 90_days_ago",
    size: 234,
    lastUpdated: "2024-01-16",
  },
]

export default function MarketingPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0)
  const totalSent = campaigns.reduce((sum, campaign) => sum + campaign.sent, 0)
  const totalOpened = campaigns.reduce((sum, campaign) => sum + campaign.opened, 0)
  const avgOpenRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing y Campañas</h2>
          <p className="text-muted-foreground">Gestiona campañas de marketing y segmentación de clientes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Campaña
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Campaña</DialogTitle>
              <DialogDescription>Configura una nueva campaña de marketing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Nombre de la Campaña</Label>
                  <Input id="campaign-name" placeholder="Ej: Promoción Verano 2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-type">Tipo de Campaña</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Marketing</SelectItem>
                      <SelectItem value="sms">SMS Marketing</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp Marketing</SelectItem>
                      <SelectItem value="mixed">Campaña Mixta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign-description">Descripción</Label>
                <Textarea id="campaign-description" placeholder="Describe el objetivo de la campaña..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign-segment">Segmento de Audiencia</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    {segments.map((segment) => (
                      <SelectItem key={segment.id} value={segment.id.toString()}>
                        {segment.name} ({segment.size} clientes)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button>Crear Campaña</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs de Marketing */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campañas Activas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.filter((c) => c.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">En ejecución</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Apertura</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOpenRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Promedio general</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Marketing</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">340%</div>
            <p className="text-xs text-muted-foreground">Retorno de inversión</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Generados</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">C$ {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="segments">Segmentación</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campañas de Marketing</CardTitle>
              <CardDescription>Gestiona tus campañas activas y su rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaña</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Audiencia</TableHead>
                    <TableHead>Enviados</TableHead>
                    <TableHead>Tasa Apertura</TableHead>
                    <TableHead>Conversiones</TableHead>
                    <TableHead>Ingresos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {campaign.startDate} - {campaign.endDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {campaign.type === "email" && <Mail className="mr-1 h-3 w-3" />}
                          {campaign.type === "sms" && <MessageSquare className="mr-1 h-3 w-3" />}
                          {campaign.type === "whatsapp" && <MessageSquare className="mr-1 h-3 w-3" />}
                          {campaign.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            campaign.status === "active"
                              ? "bg-green-100 text-green-800"
                              : campaign.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {campaign.status === "active"
                            ? "Activa"
                            : campaign.status === "completed"
                              ? "Completada"
                              : "Borrador"}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.audience.toLocaleString()}</TableCell>
                      <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                      <TableCell>
                        {campaign.sent > 0 ? `${((campaign.opened / campaign.sent) * 100).toFixed(1)}%` : "-"}
                      </TableCell>
                      <TableCell>{campaign.converted}</TableCell>
                      <TableCell>C$ {campaign.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segmentos de Clientes</CardTitle>
              <CardDescription>Organiza tus clientes en grupos específicos para campañas dirigidas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Criterios</TableHead>
                    <TableHead>Tamaño</TableHead>
                    <TableHead>Última Actualización</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {segments.map((segment) => (
                    <TableRow key={segment.id}>
                      <TableCell className="font-medium">{segment.name}</TableCell>
                      <TableCell>{segment.description}</TableCell>
                      <TableCell className="font-mono text-sm">{segment.criteria}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{segment.size} clientes</Badge>
                      </TableCell>
                      <TableCell>{segment.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Send className="mr-1 h-3 w-3" />
                          Campaña
                        </Button>
                      </TableCell>
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
