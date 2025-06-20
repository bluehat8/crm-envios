import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const headersList = headers()
    const signature = headersList.get("x-webhook-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }

    const body = await request.json()

    // Validar estructura del webhook de pagos
    if (!body.invoiceId || !body.status || !body.amount) {
      return NextResponse.json({ error: "Invalid payment payload" }, { status: 400 })
    }

    console.log("Webhook de pago recibido:", {
      invoiceId: body.invoiceId,
      status: body.status,
      amount: body.amount,
      paymentMethod: body.paymentMethod,
      transactionId: body.transactionId,
      timestamp: body.timestamp || new Date().toISOString(),
    })

    // Aquí iría la lógica para actualizar el estado de la factura
    // await updateInvoiceStatus(body.invoiceId, body.status, body.transactionId)

    // Enviar confirmación al cliente
    if (body.status === "completed") {
      // await sendPaymentConfirmation(body.invoiceId)
    }

    return NextResponse.json({
      success: true,
      message: "Payment webhook processed successfully",
    })
  } catch (error) {
    console.error("Error processing payment webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint for payment notifications",
    expectedPayload: {
      invoiceId: "string",
      status: "completed | failed | pending",
      amount: "number",
      paymentMethod: "string",
      transactionId: "string",
      timestamp: "ISO string (optional)",
    },
  })
}
