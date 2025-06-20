"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Calculator, FileText } from "lucide-react"

interface InvoiceFormProps {
  onClose: () => void
}

export function InvoiceForm({ onClose }: InvoiceFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    shipmentId: "",
    customerName: "",
    customerRuc: "",
    customerAddress: "",
    amount: "",
    taxRate: "15",
    description: "Servicio de envío internacional",
    paymentTerms: "30",
  })

  const [calculatedTotals, setCalculatedTotals] = useState({
    subtotal: 0,
    tax: 0,
    total: 0,
  })

  const calculateTotals = () => {
    const subtotal = Number.parseFloat(formData.amount) || 0
    const taxRate = Number.parseFloat(formData.taxRate) / 100
    const tax = subtotal * taxRate
    const total = subtotal + tax

    setCalculatedTotals({
      subtotal,
      tax,
      total,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const invoiceId = `FAC-${String(Date.now()).slice(-6)}`
    const dgiNumber = `001-001-01-${String(Date.now()).slice(-8)}`

    toast({
      title: "Factura generada",
      description: `Factura ${invoiceId} creada con número DGI: ${dgiNumber}`,
    })

    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

    if (e.target.name === "amount") {
      setTimeout(calculateTotals, 100)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información del Cliente</CardTitle>
            <CardDescription>Datos fiscales del cliente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Nombre/Razón Social *</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerRuc">RUC/Cédula *</Label>
              <Input
                id="customerRuc"
                name="customerRuc"
                value={formData.customerRuc}
                onChange={handleChange}
                placeholder="J0310000000001"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerAddress">Dirección Fiscal *</Label>
              <Input
                id="customerAddress"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalles del Servicio</CardTitle>
            <CardDescription>Información del envío facturado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shipmentId">ID de Envío</Label>
              <Input
                id="shipmentId"
                name="shipmentId"
                value={formData.shipmentId}
                onChange={handleChange}
                placeholder="ENV-001234"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción del Servicio *</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Monto (C$) *</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  onBlur={calculateTotals}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">IVA (%)</Label>
                <Select
                  value={formData.taxRate}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, taxRate: value }))
                    setTimeout(calculateTotals, 100)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0% (Exento)</SelectItem>
                    <SelectItem value="15">15% (General)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {calculatedTotals.subtotal > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              Resumen de Facturación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">C$ {calculatedTotals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA ({formData.taxRate}%):</span>
                <span className="font-medium">C$ {calculatedTotals.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>C$ {calculatedTotals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Términos de Pago</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="paymentTerms">Días para pago</Label>
            <Select
              value={formData.paymentTerms}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentTerms: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Inmediato</SelectItem>
                <SelectItem value="15">15 días</SelectItem>
                <SelectItem value="30">30 días</SelectItem>
                <SelectItem value="45">45 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          <FileText className="mr-2 h-4 w-4" />
          Generar Factura
        </Button>
      </div>
    </form>
  )
}
