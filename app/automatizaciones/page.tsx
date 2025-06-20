"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
import {
  Zap,
  Plus,
  Play,
  Edit,
  Trash2,
  MessageSquare,
  Mail,
  Smartphone,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const automations = [
  {
    id: 1,
    name: "Notificación WhatsApp - Nuevo Envío",
    description: "Envía mensaje de WhatsApp cuando se crea un nuevo envío",
    trigger: "shipment_created",
    actions: ["send_whatsapp"],
    status: "active",
    executions: 156,
    lastRun: "2024-01-16 14:30",
    successRate: 98.7,
  },
  {
    id: 2,
    name: "Email Bienvenida Cliente",
    description: "Envía email de bienvenida a nuevos clientes registrados",
    trigger: "customer_registered",
    actions: ["send_email"],
    status: "active",
    executions: 23,
    lastRun: "2024-01-16 09:15",
    successRate: 100,
  },
  {
    id: 3,
    name: "Recordatorio Pago Factura",
    description: "Envía recordatorio 3 días antes del vencimiento",
    trigger: "invoice_due_reminder",
    actions: ["send_email", "send_sms"],
    status: "paused",
    executions: 45,
    lastRun: "2024-01-15 10:00",
    successRate: 95.6,
  },
  {
    id: 4,
    name: "Actualización Estado Envío",
    description: "Notifica cambios de estado a clientes automáticamente",
    trigger: "shipment_status_changed",
    actions: ["send_sms", "update_tracking"],
    status: "active",
    executions: 234,
    lastRun: "2024-01-16 15:45",
    successRate: 97.4,
  },
]

const triggers = [
  { value: "shipment_created", label: "Envío Creado" },
  { value: "shipment_status_changed", label: "Estado de Envío Cambiado" },
  { value: "shipment_delivered", label: "Envío Entregado" },
  { value: "customer_registered", label: "Cliente Registrado" },
  { value: "invoice_generated", label: "Factura Generada" },
  { value: "invoice_due_reminder", label: "Recordatorio de Vencimiento" },
  { value: "support_ticket_created", label: "Ticket de Soporte Creado" },
  { value: "payment_received", label: "Pago Recibido" },
]

const actions = [
  { value: "send_email", label: "Enviar Email", icon: Mail },
  { value: "send_sms", label: "Enviar SMS", icon: Smartphone },
  { value: "send_whatsapp", label: "Enviar WhatsApp", icon: MessageSquare },
  { value: "update_tracking", label: "Actualizar Seguimiento", icon: Zap },
  { value: "create_task", label: "Crear Tarea", icon: CheckCircle },
  { value: "webhook_call", label: "Llamar Webhook", icon: Zap },
]

export default function AutomationsPage() {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    description: "",
    trigger: "",
    actions: [] as string[],
    conditions: "",
    delay: 0,
    template: "",
  })

  const toggleAutomation = (id: number, enabled: boolean) => {
    toast({
      title: enabled ? "Automatización activada" : "Automatización pausada",
      description: `La automatización ha sido ${enabled ? "activada" : "pausada"} exitosamente`,
    })
  }

  const createAutomation = () => {
    toast({
      title: "Automatización creada",
      description: "La nueva automatización ha sido configurada exitosamente",
    })
    setIsDialogOpen(false)
    setNewAutomation({
      name: "",
      description: "",
      trigger: "",
      actions: [],
      conditions: "",
      delay: 0,
      template: "",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Automatizaciones</h2>
          <p className="text-muted-foreground">Configura workflows automáticos para optimizar procesos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Automatización
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Automatización</DialogTitle>
              <DialogDescription>Configura un nuevo workflow automático para tu CRM</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="automation-name">Nombre</Label>
                  <Input
                    id="automation-name"
                    value={newAutomation.name}
                    onChange={(e) => setNewAutomation((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Nombre de la automatización"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="automation-trigger">Disparador</Label>
                  <Select
                    value={newAutomation.trigger}
                    onValueChange={(value) => setNewAutomation((prev) => ({ ...prev, trigger: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar disparador" />
                    </SelectTrigger>
                    <SelectContent>
                      {triggers.map((trigger) => (
                        <SelectItem key={trigger.value} value={trigger.value}>
                          {trigger.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="automation-description">Descripción</Label>
                <Textarea
                  id="automation-description"
                  value={newAutomation.description}
                  onChange={(e) => setNewAutomation((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe qué hace esta automatización"
                />
              </div>

              <div className="space-y-2">
                <Label>Acciones a Ejecutar</Label>
                <div className="grid grid-cols-2 gap-2">
                  {actions.map((action) => {
                    const Icon = action.icon
                    return (
                      <div key={action.value} className="flex items-center space-x-2 p-2 border rounded">
                        <input
                          type="checkbox"
                          id={action.value}
                          checked={newAutomation.actions.includes(action.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewAutomation((prev) => ({
                                ...prev,
                                actions: [...prev.actions, action.value],
                              }))
                            } else {
                              setNewAutomation((prev) => ({
                                ...prev,
                                actions: prev.actions.filter((a) => a !== action.value),
                              }))
                            }
                          }}
                        />
                        <Icon className="h-4 w-4" />
                        <Label htmlFor={action.value} className="text-sm">
                          {action.label}
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="automation-delay">Retraso (minutos)</Label>
                  <Input
                    id="automation-delay"
                    type="number"
                    value={newAutomation.delay}
                    onChange={(e) =>
                      setNewAutomation((prev) => ({ ...prev, delay: Number.parseInt(e.target.value) || 0 }))
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="automation-template">Plantilla</Label>
                  <Select
                    value={newAutomation.template}
                    onValueChange={(value) => setNewAutomation((prev) => ({ ...prev, template: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plantilla" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome_email">Email de Bienvenida</SelectItem>
                      <SelectItem value="shipment_created">Envío Creado</SelectItem>
                      <SelectItem value="payment_reminder">Recordatorio de Pago</SelectItem>
                      <SelectItem value="delivery_notification">Notificación de Entrega</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="automation-conditions">Condiciones (opcional)</Label>
                <Textarea
                  id="automation-conditions"
                  value={newAutomation.conditions}
                  onChange={(e) => setNewAutomation((prev) => ({ ...prev, conditions: e.target.value }))}
                  placeholder="Ej: customer.country === 'Costa Rica' && shipment.weight > 5"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={createAutomation}>Crear Automatización</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs de Automatización */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automatizaciones Activas</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automations.filter((a) => a.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">de {automations.length} configuradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ejecuciones Hoy</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+23% vs ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Éxito</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">97.8%</div>
            <p className="text-xs text-muted-foreground">Últimos 7 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Ahorrado</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5h</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Automatizaciones Activas</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="logs">Registro de Ejecución</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automatizaciones Configuradas</CardTitle>
              <CardDescription>Gestiona tus workflows automáticos y su rendimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Disparador</TableHead>
                    <TableHead>Acciones</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Ejecuciones</TableHead>
                    <TableHead>Éxito</TableHead>
                    <TableHead>Última Ejecución</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {automations.map((automation) => (
                    <TableRow key={automation.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{automation.name}</div>
                          <div className="text-sm text-muted-foreground">{automation.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{triggers.find((t) => t.value === automation.trigger)?.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {automation.actions.map((action, index) => {
                            const actionConfig = actions.find((a) => a.value === action)
                            const Icon = actionConfig?.icon || Zap
                            return <Icon key={index} className="h-4 w-4 text-muted-foreground" />
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              automation.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {automation.status === "active" ? "Activa" : "Pausada"}
                          </Badge>
                          <Switch
                            checked={automation.status === "active"}
                            onCheckedChange={(checked) => toggleAutomation(automation.id, checked)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>{automation.executions}</TableCell>
                      <TableCell>
                        <span
                          className={
                            automation.successRate >= 95
                              ? "text-green-600"
                              : automation.successRate >= 90
                                ? "text-yellow-600"
                                : "text-red-600"
                          }
                        >
                          {automation.successRate}%
                        </span>
                      </TableCell>
                      <TableCell>{automation.lastRun}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bienvenida Cliente</CardTitle>
                <CardDescription>Email automático para nuevos clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Disparador:</strong> Cliente registrado
                  </div>
                  <div className="text-sm">
                    <strong>Canal:</strong> Email
                  </div>
                  <div className="text-sm">
                    <strong>Retraso:</strong> 5 minutos
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Usar Plantilla
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notificación Envío</CardTitle>
                <CardDescription>WhatsApp cuando se crea envío</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Disparador:</strong> Envío creado
                  </div>
                  <div className="text-sm">
                    <strong>Canal:</strong> WhatsApp
                  </div>
                  <div className="text-sm">
                    <strong>Retraso:</strong> Inmediato
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Usar Plantilla
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recordatorio Pago</CardTitle>
                <CardDescription>SMS antes del vencimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Disparador:</strong> 3 días antes vencimiento
                  </div>
                  <div className="text-sm">
                    <strong>Canal:</strong> SMS + Email
                  </div>
                  <div className="text-sm">
                    <strong>Retraso:</strong> Programado
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Usar Plantilla
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Ejecuciones</CardTitle>
              <CardDescription>Historial detallado de todas las automatizaciones ejecutadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">WhatsApp Nuevo Envío</p>
                      <p className="text-sm text-muted-foreground">Enviado a María González - TRK-001234567</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">16 Ene 2024, 14:30</p>
                    <p className="text-xs text-muted-foreground">Ejecutado en 1.2s</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Email Bienvenida</p>
                      <p className="text-sm text-muted-foreground">Enviado a carlos.perez@empresa.com</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">16 Ene 2024, 09:20</p>
                    <p className="text-xs text-muted-foreground">Ejecutado en 0.8s</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">SMS Recordatorio</p>
                      <p className="text-sm text-muted-foreground">Error: Número inválido +505 8765-XXXX</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">15 Ene 2024, 16:45</p>
                    <p className="text-xs text-muted-foreground">Error después de 3 reintentos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
