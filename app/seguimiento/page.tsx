"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin, Clock, Map as MapIcon } from "lucide-react"
import { TrackingTimeline } from "@/components/tracking/tracking-timeline"
import { Map } from "@/components/ui/map"

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState("")
  const [trackingResult, setTrackingResult] = useState<{
    id: string;
    trackingCode: string;
    customer: string;
    origin: string;
    destination: string;
    status: string;
    estimatedDelivery: string;
    currentLocation: string;
    timeline: Array<{
      status: string;
      location: string;
      date: string;
      completed: boolean;
    }>;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!trackingCode.trim()) return

    setIsLoading(true)

    // Simular búsqueda
    setTimeout(() => {
      setTrackingResult({
        id: "ENV-001234",
        trackingCode: trackingCode,
        customer: "María González",
        origin: "Managua, Nicaragua",
        destination: "San José, Costa Rica",
        status: "en-transito",
        estimatedDelivery: "2024-01-18",
        currentLocation: "Frontera Peñas Blancas",
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
      setIsLoading(false)
    }, 1000)
  }

  // Coordenadas de ejemplo (puedes reemplazarlas con datos reales de tu base de datos)
  const getCoordinates = (location: string): [number, number] => {
    // Coordenadas de ejemplo para ubicaciones comunes
    const locations: Record<string, [number, number]> = {
      'Managua, Nicaragua': [12.1364, -86.2514],
      'San José, Costa Rica': [9.9281, -84.0907],
      'Frontera Peñas Blancas': [11.0326, -85.6205],
    };
    
    // Buscar la ubicación exacta o una coincidencia parcial
    const found = Object.entries(locations).find(([key]) => 
      location.toLowerCase().includes(key.toLowerCase())
    );
    
    return found ? found[1] : [10.4806, -84.0065] as [number, number]; // Ubicación por defecto (Centroamérica)
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Seguimiento de Envíos</h2>
        <p className="text-muted-foreground">Rastrea el estado de tus envíos en tiempo real</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Envío</CardTitle>
          <CardDescription>Ingresa el código de seguimiento para ver el estado del envío</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ingresa el código de seguimiento (ej: TRK-001234567)"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="pl-8"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {trackingResult && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MapIcon className="h-5 w-5 text-blue-500" />
                  Mapa de Ruta
                </CardTitle>
                <CardDescription>
                  Visualización de la ruta de tu envío
                </CardDescription>
              </div>
              <Badge variant={trackingResult.status === 'entregado' ? 'secondary' : 'default'}>
                {trackingResult.status === 'en-transito' ? 'En tránsito' : 'Entregado'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden border">
              <Map 
                origin={getCoordinates(trackingResult.origin)}
                destination={getCoordinates(trackingResult.destination)}
                currentLocation={getCoordinates(trackingResult.currentLocation)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {trackingResult && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Envío {trackingResult.id}</CardTitle>
                  <CardDescription>Código de seguimiento: {trackingResult.trackingCode}</CardDescription>
                </div>
                <Badge className="bg-blue-100 text-blue-800">En Tránsito</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Origen</p>
                    <p className="text-sm text-muted-foreground">{trackingResult.origin}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Destino</p>
                    <p className="text-sm text-muted-foreground">{trackingResult.destination}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Entrega Estimada</p>
                    <p className="text-sm text-muted-foreground">{trackingResult.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Seguimiento</CardTitle>
              <CardDescription>Ubicación actual: {trackingResult.currentLocation}</CardDescription>
            </CardHeader>
            <CardContent>
              <TrackingTimeline timeline={trackingResult.timeline} />
            </CardContent>
          </Card>
        </div>
      )}

      {!trackingResult && !isLoading && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Busca tu envío</h3>
            <p className="text-muted-foreground">Ingresa el código de seguimiento para ver el estado de tu paquete</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
