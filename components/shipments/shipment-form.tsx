"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Calculator } from "lucide-react"

interface ShipmentFormProps {
  onClose: () => void
}

export function ShipmentForm({ onClose }: ShipmentFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    originAddress: "",
    originCity: "Managua",
    destinationAddress: "",
    destinationCity: "",
    destinationCountry: "",
    weight: "",
    dimensions: "",
    packageType: "",
    description: "",
    declaredValue: "",
    specialInstructions: "",
    serviceType: "standard",
  })

  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null)

  const countries = ["Costa Rica", "Guatemala", "Honduras", "El Salvador", "Panamá", "México", "Estados Unidos"]

  const packageTypes = [
    "Documentos",
    "Paquete pequeño",
    "Paquete mediano",
    "Paquete grande",
    "Electrónicos",
    "Ropa",
    "Medicamentos",
    "Otros",
  ]

  const calculatePrice = () => {
    const weight = Number.parseFloat(formData.weight)
    const basePrice = 150 // Precio base en córdobas
    const pricePerKg = 80

    if (weight && formData.destinationCountry) {
      let multiplier = 1
      switch (formData.destinationCountry) {
        case "Costa Rica":
        case "Honduras":
        case "El Salvador":
          multiplier = 1.2
          break
        case "Guatemala":
          multiplier = 1.3
          break
        case "Panamá":
          multiplier = 1.4
          break
        case "México":
          multiplier = 1.8
          break
        case "Estados Unidos":
          multiplier = 2.5
          break
      }

      const price = (basePrice + weight * pricePerKg) * multiplier
      setCalculatedPrice(Math.round(price))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generar código de seguimiento único
    const trackingCode = `TRK-${Date.now()}`

    toast({
      title: "Envío creado",
      description: `Envío registrado con código de seguimiento: ${trackingCode}`,
    })

    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información del Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información del Cliente</CardTitle>
            <CardDescription>Datos del remitente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Nombre Completo *</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Teléfono *</Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Correo Electrónico</Label>
              <Input
                id="customerEmail"
                name="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Información del Paquete */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información del Paquete</CardTitle>
            <CardDescription>Detalles del envío</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg) *</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  onBlur={calculatePrice}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensiones (cm)</Label>
                <Input
                  id="dimensions"
                  name="dimensions"
                  placeholder="L x A x H"
                  value={formData.dimensions}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="packageType">Tipo de Paquete *</Label>
              <Select
                value={formData.packageType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, packageType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {packageTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción del Contenido *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Direcciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dirección de Origen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="originAddress">Dirección Completa *</Label>
              <Textarea
                id="originAddress"
                name="originAddress"
                value={formData.originAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originCity">Ciudad</Label>
              <Input id="originCity" name="originCity" value={formData.originCity} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dirección de Destino</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="destinationAddress">Dirección Completa *</Label>
              <Textarea
                id="destinationAddress"
                name="destinationAddress"
                value={formData.destinationAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="destinationCity">Ciudad *</Label>
                <Input
                  id="destinationCity"
                  name="destinationCity"
                  value={formData.destinationCity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationCountry">País *</Label>
                <Select
                  value={formData.destinationCountry}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, destinationCountry: value }))
                    setTimeout(calculatePrice, 100)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar país" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cálculo de Precio */}
      {calculatedPrice && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Precio Calculado:</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">C$ {calculatedPrice.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Crear Envío</Button>
      </div>
    </form>
  )
}
