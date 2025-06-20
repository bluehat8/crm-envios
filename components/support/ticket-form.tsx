"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface TicketFormProps {
  onClose: () => void
}

export function TicketForm({ onClose }: TicketFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shipmentId: "",
    subject: "",
    description: "",
    priority: "media",
    category: "",
  })

  const categories = [
    "Problema con entrega",
    "Consulta de facturación",
    "Cambio de dirección",
    "Paquete dañado",
    "Retraso en envío",
    "Información general",
    "Otros",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const ticketId = `TKT-${String(Date.now()).slice(-3).padStart(3, "0")}`

    toast({
      title: "Ticket creado",
      description: `Ticket ${ticketId} creado exitosamente`,
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
          <Label htmlFor="customerName">Nombre del Cliente *</Label>
          <Input id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerEmail">Correo Electrónico *</Label>
          <Input
            id="customerEmail"
            name="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerPhone">Teléfono</Label>
          <Input id="customerPhone" name="customerPhone" value={formData.customerPhone} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shipmentId">ID de Envío (opcional)</Label>
          <Input
            id="shipmentId"
            name="shipmentId"
            placeholder="ENV-001234"
            value={formData.shipmentId}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Asunto *</Label>
        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoría *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baja">Baja</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción del Problema *</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Crear Ticket</Button>
      </div>
    </form>
  )
}
