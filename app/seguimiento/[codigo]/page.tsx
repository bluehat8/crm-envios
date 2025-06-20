"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, MapPin, Clock, Phone, Mail, Share2 } from "lucide-react"
import { TrackingTimeline } from "@/components/tracking/tracking-timeline"
import { useParams } from "next/navigation"

// Página pública de seguimiento accesible sin login
export default function PublicTrackingPage() {
  const params = useParams()
  const codigo = params.codigo as string
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular búsqueda del código de seguimiento
    setTimeout(() => {
      if (codigo) {
        setTrackingData({
          id: "ENV-001234",
          trackingCode: codigo,
          customer: "María González",
          origin: "Managua, Nicaragua",
          destination: "San José, Costa Rica",
          status: "en-transito",
          estimatedDelivery: "2024-01-18",
          currentLocation: "Frontera Peñas Blancas",
          weight: "2.5 kg",
          packageType: "Paquete pequeño",
          timeline: [
            {
              status: "Paquete recibido",
              location: "Managua, Nicaragua",
              date: "2024-01-15 09:00",
              completed: true,
            },
            {
              status: "En preparación",
              location: "Centro de distribución Managua",
              date: "2024-01-15 14:30",
              completed: true,
            },
            {
              status: "En tránsito",
              location: "Frontera Peñas Blancas",
              date: "2024-01-16 08:00",
              completed: true,
            },
            {
              status: "En aduana",
              location: "San José, Costa Rica",
              date: "2024-01-17 10:00",
              completed: false,
            },
            {
              status: "Entregado",
              location: "San José, Costa Rica",
              date: "2024-01-18 15:00",
              completed: false,
            },
          ],
        })
      }
      setLoading(false)
    }, 1000)
  }, [codigo])

  const shareTracking = () => {
    if (navigator.share) {
      navigator.share({
        title: `Seguimiento ${codigo}`,
        text: `Rastrea tu paquete ${codigo}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-pulse" />
          <p className="text-lg">Buscando tu paquete...</p>
        </div>
      </div>
    )
  }

  if (!trackingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Código no encontrado</h3>
            <p className="text-muted-foreground">No se encontró información para el código {codigo}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Seguimiento de Envío</h1>
          <p className="text-muted-foreground">Código: {trackingData.trackingCode}</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Envío {trackingData.id}</CardTitle>
                  <CardDescription>Estado actual del paquete</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800">En Tránsito</Badge>
                  <Button variant="outline" size="sm" onClick={shareTracking}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <Package className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Origen</p>
                    <p className="text-sm text-muted-foreground">{trackingData.origin}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {trackingData.weight} • {trackingData.packageType}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Destino</p>
                    <p className="text-sm text-muted-foreground">{trackingData.destination}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ubicación actual: {trackingData.currentLocation}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium">Entrega Estimada</p>
                    <p className="text-sm text-muted-foreground">{trackingData.estimatedDelivery}</p>
                    <p className="text-xs text-muted-foreground mt-1">Horario: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Seguimiento</CardTitle>
              <CardDescription>Progreso detallado de tu envío</CardDescription>
            </CardHeader>
            <CardContent>
              <TrackingTimeline timeline={trackingData.timeline} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Necesitas ayuda?</CardTitle>
              <CardDescription>Contáctanos si tienes alguna pregunta sobre tu envío</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">+505 2222-3333</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <Mail className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">soporte@enviosnica.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
