"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CreditCard, DollarSign, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentFormProps {
  invoiceId: string
  amount: number
  customerEmail: string
  onPaymentSuccess: (paymentId: string) => void
}

export function PaymentForm({ invoiceId, amount, customerEmail, onPaymentSuccess }: PaymentFormProps) {
  const { toast } = useToast()
  const [selectedMethod, setSelectedMethod] = useState("")
  const [processing, setProcessing] = useState(false)
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      icon: DollarSign,
      fee: "3.0%",
      description: "Pago seguro con PayPal",
    },
    {
      id: "stripe",
      name: "Tarjeta de Crédito/Débito",
      icon: CreditCard,
      fee: "2.9% + C$10",
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "bank_transfer",
      name: "Transferencia Bancaria",
      icon: Smartphone,
      fee: "Gratis",
      description: "Transferencia directa a nuestra cuenta",
    },
  ]

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Error",
        description: "Selecciona un método de pago",
        variant: "destructive",
      })
      return
    }

    setProcessing(true)

    try {
      switch (selectedMethod) {
        case "paypal":
          await processPayPalPayment()
          break
        case "stripe":
          await processStripePayment()
          break
        case "bank_transfer":
          await processBankTransfer()
          break
      }
    } catch (error) {
      toast({
        title: "Error en el pago",
        description: "No se pudo procesar el pago. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  const processPayPalPayment = async () => {
    const response = await fetch("/api/payments/paypal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoiceId,
        amount: amount.toString(),
        customerEmail,
      }),
    })

    const data = await response.json()

    if (data.success) {
      // Redirigir a PayPal
      window.location.href = data.approvalUrl
    } else {
      throw new Error(data.error)
    }
  }

  const processStripePayment = async () => {
    const response = await fetch("/api/payments/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoiceId,
        amount: amount.toString(),
        customerEmail,
        cardData,
      }),
    })

    const data = await response.json()

    if (data.success) {
      toast({
        title: "Pago procesado",
        description: "Tu pago ha sido procesado exitosamente",
      })
      onPaymentSuccess(data.paymentIntentId)
    } else {
      throw new Error(data.error)
    }
  }

  const processBankTransfer = async () => {
    toast({
      title: "Instrucciones de transferencia",
      description: "Se han enviado las instrucciones de transferencia a tu email",
    })

    // Simular envío de instrucciones
    setTimeout(() => {
      onPaymentSuccess(`BANK_${Date.now()}`)
    }, 2000)
  }

  const calculateFee = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId)
    if (!method) return 0

    switch (methodId) {
      case "paypal":
        return amount * 0.03
      case "stripe":
        return amount * 0.029 + 10
      default:
        return 0
    }
  }

  const selectedMethodData = paymentMethods.find((m) => m.id === selectedMethod)
  const fee = selectedMethod ? calculateFee(selectedMethod) : 0
  const total = amount + fee

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Pago</CardTitle>
          <CardDescription>Factura: {invoiceId}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>C$ {amount.toFixed(2)}</span>
            </div>
            {fee > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Comisión de procesamiento:</span>
                <span>C$ {fee.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>C$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Método de Pago</CardTitle>
          <CardDescription>Selecciona cómo deseas pagar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === method.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{method.fee}</Badge>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {selectedMethod === "stripe" && (
        <Card>
          <CardHeader>
            <CardTitle>Información de Tarjeta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-name">Nombre en la tarjeta</Label>
              <Input
                id="card-name"
                value={cardData.name}
                onChange={(e) => setCardData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Juan Pérez"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">Número de tarjeta</Label>
              <Input
                id="card-number"
                value={cardData.number}
                onChange={(e) => setCardData((prev) => ({ ...prev, number: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-expiry">Vencimiento</Label>
                <Input
                  id="card-expiry"
                  value={cardData.expiry}
                  onChange={(e) => setCardData((prev) => ({ ...prev, expiry: e.target.value }))}
                  placeholder="MM/AA"
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-cvc">CVC</Label>
                <Input
                  id="card-cvc"
                  value={cardData.cvc}
                  onChange={(e) => setCardData((prev) => ({ ...prev, cvc: e.target.value }))}
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button onClick={handlePayment} disabled={!selectedMethod || processing} className="w-full" size="lg">
        {processing ? "Procesando..." : `Pagar C$ ${total.toFixed(2)}`}
      </Button>
    </div>
  )
}
