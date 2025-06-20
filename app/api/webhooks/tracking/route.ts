import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Verificar firma del webhook para seguridad
    const headersList = headers()
    const signature = headersList.get("x-webhook-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }

    const body = await request.json()

    // Validar estructura del webhook
    if (!body.trackingCode || !body.status || !body.location) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    // Aquí iría la lógica para actualizar el estado del envío en la base de datos
    console.log("Webhook de seguimiento recibido:", {
      trackingCode: body.trackingCode,
      status: body.status,
      location: body.location,
      timestamp: body.timestamp || new Date().toISOString(),
    })

    // Simular actualización en base de datos
    // await updateShipmentStatus(body.trackingCode, body.status, body.location)

    // Enviar notificación al cliente si está configurado
    if (body.notifyCustomer) {
      // await sendCustomerNotification(body.trackingCode, body.status)
    }

    return NextResponse.json({
      success: true,
      message: "Tracking update processed successfully",
    })
  } catch (error) {
    console.error("Error processing tracking webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint for tracking updates",
    expectedPayload: {
      trackingCode: "string",
      status: "string",
      location: "string",
      timestamp: "ISO string (optional)",
      notifyCustomer: "boolean (optional)",
    },
  })
}
