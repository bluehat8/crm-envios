"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Mail,
  Smartphone,
  FileText,
  CreditCard,
  Settings,
  CheckCircle,
  AlertCircle,
  Zap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const integrations = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Envío automático de notificaciones por WhatsApp",
    icon: MessageSquare,
    status: "inactive",
    category: "messaging",
    config: {
      apiKey: "",
      phoneNumber: "+50512345678",
      webhookUrl: "",
    },
  },
  {
    id: "twilio",
    name: "Twilio SMS",
    description: "Notificaciones por SMS a clientes",
    icon: Smartphone,
    status: "active",
    category: "messaging",
    config: {
      accountSid: "AC1234567890",
      authToken: "***hidden***",
      fromNumber: "+15551234567",
    },
  },
  {
    id: "sendgrid",
    name: "SendGrid Email",
    description: "Envío masivo de correos electrónicos",
    icon: Mail,
    status: "active",
    category: "email",
    config: {
      apiKey: "SG.***hidden***",
      fromEmail: "noreply@enviosnica.com",
      fromName: "Envíos Nicaragua",
    },
  },
  {
    id: "dgi",
    name: "DGI Nicaragua",
    description: "Facturación electrónica oficial",
    icon: FileText,
    status: "inactive",
    category: "billing",
    config: {
      certificatePath: "",
      environment: "test",
      taxpayerId: "",
    },
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Procesamiento de pagos online",
    icon: CreditCard,
    status: "inactive",
    category: "payments",
    config: {
      clientId: "",
      clientSecret: "",
      environment: "sandbox",
    },
  },
  {
    id: "n8n",
    name: "n8n Automation",
    description: "Automatización de workflows",
    icon: Zap,
    status: "active",
    category: "automation",
    config: {
      webhookUrl: "https://n8n.enviosnica.com/webhook/crm",
      apiKey: "n8n_***hidden***",
    },
  },
]

export default function IntegrationsPage() {
  const { toast } = useToast()
  const [selectedIntegration, setSelectedIntegration] = useState(integrations[0])
  const [config, setConfig] = useState(selectedIntegration.config)

  const handleSaveConfig = () => {
    toast({
      title: "Configuración guardada",
      description: `La configuración de ${selectedIntegration.name} ha sido actualizada`,
    })
  }

  const handleTestConnection = () => {
    toast({
      title: "Probando conexión...",
      description: `Verificando configuración de ${selectedIntegration.name}`,
    })

    // Simular prueba de conexión
    setTimeout(() => {
      toast({
        title: "Conexión exitosa",
        description: `${selectedIntegration.name} está funcionando correctamente`,
      })
    }, 2000)
  }

  const toggleIntegration = (integrationId: string, enabled: boolean) => {
    toast({
      title: enabled ? "Integración activada" : "Integración desactivada",
      description: `${integrations.find((i) => i.id === integrationId)?.name} ha sido ${enabled ? "activada" : "desactivada"}`,
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integraciones</h2>
        <p className="text-muted-foreground">Configura las integraciones externas para automatizar procesos</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="messaging">Mensajería</TabsTrigger>
          <TabsTrigger value="billing">Facturación</TabsTrigger>
          <TabsTrigger value="payments">Pagos</TabsTrigger>
          <TabsTrigger value="automation">Automatización</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => {
              const Icon = integration.icon
              return (
                <Card key={integration.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          integration.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {integration.status === "active" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : (
                          <AlertCircle className="mr-1 h-3 w-3" />
                        )}
                        {integration.status === "active" ? "Activa" : "Inactiva"}
                      </Badge>
                      <Switch
                        checked={integration.status === "active"}
                        onCheckedChange={(checked) => toggleIntegration(integration.id, checked)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{integration.description}</CardDescription>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => setSelectedIntegration(integration)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configurar
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="messaging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de WhatsApp Business</CardTitle>
              <CardDescription>
                Configura la API de WhatsApp Business para enviar notificaciones automáticas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-api-key">API Key</Label>
                  <Input id="whatsapp-api-key" placeholder="Tu API Key de WhatsApp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-phone">Número de Teléfono</Label>
                  <Input id="whatsapp-phone" placeholder="+505 1234-5678" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp-webhook">Webhook URL</Label>
                <Input id="whatsapp-webhook" placeholder="https://tu-dominio.com/webhook/whatsapp" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveConfig}>Guardar Configuración</Button>
                <Button variant="outline" onClick={handleTestConnection}>
                  Probar Conexión
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Twilio SMS</CardTitle>
              <CardDescription>Configura Twilio para enviar notificaciones por SMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twilio-sid">Account SID</Label>
                  <Input id="twilio-sid" placeholder="AC1234567890abcdef" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilio-token">Auth Token</Label>
                  <Input id="twilio-token" type="password" placeholder="Tu Auth Token" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="twilio-from">Número Remitente</Label>
                <Input id="twilio-from" placeholder="+15551234567" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveConfig}>Guardar Configuración</Button>
                <Button variant="outline" onClick={handleTestConnection}>
                  Probar Conexión
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integración DGI Nicaragua</CardTitle>
              <CardDescription>
                Configura la conexión con el sistema de facturación electrónica de la DGI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dgi-taxpayer">RUC Contribuyente</Label>
                  <Input id="dgi-taxpayer" placeholder="J0310000000001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dgi-environment">Ambiente</Label>
                  <select className="w-full p-2 border rounded">
                    <option value="test">Pruebas</option>
                    <option value="production">Producción</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dgi-certificate">Certificado Digital</Label>
                <Input id="dgi-certificate" type="file" accept=".p12,.pfx" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dgi-password">Contraseña del Certificado</Label>
                <Input id="dgi-password" type="password" placeholder="Contraseña del certificado" />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSaveConfig}>Guardar Configuración</Button>
                <Button variant="outline" onClick={handleTestConnection}>
                  Validar Certificado
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Webhooks</CardTitle>
              <CardDescription>Configura endpoints para recibir eventos de sistemas externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Webhook de Seguimiento</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Recibe actualizaciones de estado de envíos desde sistemas de logística
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input
                      value="https://tu-dominio.com/api/webhooks/tracking"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" size="sm">
                      Copiar
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Webhook de Pagos</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Recibe notificaciones de pagos desde plataformas como PayPal, Stripe
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input
                      value="https://tu-dominio.com/api/webhooks/payments"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" size="sm">
                      Copiar
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Webhook de n8n</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Endpoint para automatizaciones y workflows de n8n
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input value="https://tu-dominio.com/api/webhooks/n8n" readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="sm">
                      Copiar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Clave Secreta para Validación</Label>
                <Input
                  id="webhook-secret"
                  placeholder="Clave secreta para validar webhooks entrantes"
                  className="font-mono"
                />
              </div>

              <Button onClick={handleSaveConfig}>Guardar Configuración</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
