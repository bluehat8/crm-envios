"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, Shield, Bell, Globe, Database, Edit, Trash2, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const users = [
  {
    id: 1,
    name: "Administrador Principal",
    email: "admin@enviosnica.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-16 10:30",
  },
  {
    id: 2,
    name: "María Operadora",
    email: "maria@enviosnica.com",
    role: "employee",
    status: "active",
    lastLogin: "2024-01-16 09:15",
  },
  {
    id: 3,
    name: "Carlos Supervisor",
    email: "carlos@enviosnica.com",
    role: "supervisor",
    status: "active",
    lastLogin: "2024-01-15 16:45",
  },
]

const rolePermissions = {
  admin: ["Gestión completa", "Configuración", "Reportes", "Usuarios"],
  supervisor: ["Gestión de envíos", "Reportes", "Soporte"],
  employee: ["Gestión de envíos", "Clientes", "Soporte básico"],
}

export default function ConfigurationPage() {
  const { toast } = useToast()
  const [companySettings, setCompanySettings] = useState({
    name: "Envíos Nicaragua S.A.",
    ruc: "J0310000000001",
    address: "Managua, Nicaragua",
    phone: "+505 2222-3333",
    email: "info@enviosnica.com",
    website: "www.enviosnica.com",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: false,
    customerNotifications: true,
    internalNotifications: true,
  })

  const handleSaveCompanySettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La información de la empresa ha sido actualizada",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notificaciones actualizadas",
      description: "La configuración de notificaciones ha sido guardada",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h2>
        <p className="text-muted-foreground">Administra la configuración general y usuarios del sistema</p>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company">Empresa</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="backup">Respaldos</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Información de la Empresa
              </CardTitle>
              <CardDescription>
                Configura los datos básicos de tu empresa para facturación y comunicaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la Empresa</Label>
                  <Input
                    id="company-name"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-ruc">RUC</Label>
                  <Input
                    id="company-ruc"
                    value={companySettings.ruc}
                    onChange={(e) => setCompanySettings((prev) => ({ ...prev, ruc: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-address">Dirección</Label>
                <Textarea
                  id="company-address"
                  value={companySettings.address}
                  onChange={(e) => setCompanySettings((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Teléfono</Label>
                  <Input
                    id="company-phone"
                    value={companySettings.phone}
                    onChange={(e) => setCompanySettings((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => setCompanySettings((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Sitio Web</Label>
                  <Input
                    id="company-website"
                    value={companySettings.website}
                    onChange={(e) => setCompanySettings((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </div>

              <Button onClick={handleSaveCompanySettings}>Guardar Configuración</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Configuración Regional
              </CardTitle>
              <CardDescription>Configura zona horaria, moneda y formato de fechas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select defaultValue="america/managua">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america/managua">América/Managua (CST)</SelectItem>
                      <SelectItem value="america/guatemala">América/Guatemala (CST)</SelectItem>
                      <SelectItem value="america/costa_rica">América/Costa Rica (CST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <Select defaultValue="nio">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nio">Córdoba Nicaragüense (C$)</SelectItem>
                      <SelectItem value="usd">Dólar Estadounidense ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Formato de Fecha</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button>Guardar Configuración Regional</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Gestión de Usuarios</h3>
              <p className="text-sm text-muted-foreground">Administra usuarios y sus permisos</p>
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usuarios del Sistema</CardTitle>
              <CardDescription>Lista de usuarios con acceso al CRM</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : user.role === "supervisor"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {user.role === "admin"
                            ? "Administrador"
                            : user.role === "supervisor"
                              ? "Supervisor"
                              : "Empleado"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {user.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
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

          <Card>
            <CardHeader>
              <CardTitle>Permisos por Rol</CardTitle>
              <CardDescription>Configuración de permisos para cada tipo de usuario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(rolePermissions).map(([role, permissions]) => (
                  <div key={role} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2 capitalize">
                      {role === "admin" ? "Administrador" : role === "supervisor" ? "Supervisor" : "Empleado"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {permissions.map((permission) => (
                        <Badge key={permission} variant="outline">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Configuración de Notificaciones
              </CardTitle>
              <CardDescription>Configura qué notificaciones enviar y por qué canales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">Enviar notificaciones por correo electrónico</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">Notificaciones por SMS</Label>
                    <p className="text-sm text-muted-foreground">Enviar notificaciones por mensaje de texto</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, smsNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="whatsapp-notifications">Notificaciones por WhatsApp</Label>
                    <p className="text-sm text-muted-foreground">Enviar notificaciones por WhatsApp Business</p>
                  </div>
                  <Switch
                    id="whatsapp-notifications"
                    checked={notificationSettings.whatsappNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, whatsappNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="customer-notifications">Notificaciones a Clientes</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar automáticamente a clientes sobre cambios de estado
                    </p>
                  </div>
                  <Switch
                    id="customer-notifications"
                    checked={notificationSettings.customerNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, customerNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="internal-notifications">Notificaciones Internas</Label>
                    <p className="text-sm text-muted-foreground">Notificar al equipo sobre eventos importantes</p>
                  </div>
                  <Switch
                    id="internal-notifications"
                    checked={notificationSettings.internalNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, internalNotifications: checked }))
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications}>Guardar Configuración de Notificaciones</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Configuración de Seguridad
              </CardTitle>
              <CardDescription>Configura políticas de seguridad y protección de datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticación de Dos Factores (2FA)</Label>
                    <p className="text-sm text-muted-foreground">Requerir 2FA para todos los usuarios</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Expiración de Sesión</Label>
                    <p className="text-sm text-muted-foreground">
                      Cerrar sesión automáticamente después de inactividad
                    </p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Política de Contraseñas</Label>
                    <p className="text-sm text-muted-foreground">Requerir contraseñas seguras</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Registro de Auditoría</Label>
                    <p className="text-sm text-muted-foreground">Registrar todas las acciones de usuarios</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>

              <Button>Guardar Configuración de Seguridad</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Respaldos Automáticos
              </CardTitle>
              <CardDescription>Configura respaldos automáticos de la base de datos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Respaldos Automáticos</Label>
                    <p className="text-sm text-muted-foreground">Crear respaldos automáticos de la base de datos</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Frecuencia de Respaldo</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Cada hora</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Retención</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 días</SelectItem>
                        <SelectItem value="30">30 días</SelectItem>
                        <SelectItem value="90">90 días</SelectItem>
                        <SelectItem value="365">1 año</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ubicación de Respaldos</Label>
                  <Input placeholder="/backups/crm-envios" />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button>Guardar Configuración</Button>
                <Button variant="outline">Crear Respaldo Ahora</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Respaldos</CardTitle>
              <CardDescription>Últimos respaldos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">backup_2024-01-16_10-30.sql</p>
                    <p className="text-sm text-muted-foreground">16 Enero 2024, 10:30 AM</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className="bg-green-100 text-green-800">Exitoso</Badge>
                    <Button variant="outline" size="sm">
                      Descargar
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <p className="font-medium">backup_2024-01-15_10-30.sql</p>
                    <p className="text-sm text-muted-foreground">15 Enero 2024, 10:30 AM</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className="bg-green-100 text-green-800">Exitoso</Badge>
                    <Button variant="outline" size="sm">
                      Descargar
                    </Button>
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
