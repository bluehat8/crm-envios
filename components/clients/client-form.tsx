"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface ClientFormProps {
  onClose: () => void
}

export function ClientForm({ onClose }: ClientFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    ruc: "",
    address: "",
    city: "",
    country: "Nicaragua",
    notes: "",
    acceptsMarketing: false,
    dataConsent: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.dataConsent) {
      toast({
        title: "Error",
        description: "Debe aceptar el consentimiento de datos personales",
        variant: "destructive",
      })
      return
    }

    // Aquí iría la lógica para guardar el cliente
    toast({
      title: "Cliente registrado",
      description: "El cliente ha sido registrado exitosamente",
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre Completo *</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico *</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono *</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+505 8765-4321"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ruc">RUC/Cédula</Label>
          <Input id="ruc" name="ruc" value={formData.ruc} onChange={handleChange} placeholder="J0310000000001" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Dirección Completa *</Label>
        <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad *</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">País</Label>
          <Input id="country" name="country" value={formData.country} onChange={handleChange} disabled />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas Adicionales</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Información adicional sobre el cliente..."
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="acceptsMarketing"
            checked={formData.acceptsMarketing}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptsMarketing: checked as boolean }))}
          />
          <Label htmlFor="acceptsMarketing" className="text-sm">
            Acepta recibir comunicaciones de marketing
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="dataConsent"
            checked={formData.dataConsent}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, dataConsent: checked as boolean }))}
          />
          <Label htmlFor="dataConsent" className="text-sm">
            Acepto el tratamiento de mis datos personales según la Ley de Protección de Datos Personales de Nicaragua *
          </Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Registrar Cliente</Button>
      </div>
    </form>
  )
}
