import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("Webhook de n8n recibido:", body)

    // Procesar diferentes tipos de eventos de n8n
    switch (body.eventType) {
      case "shipment_created":
        // Automatización cuando se crea un envío
        await handleShipmentCreated(body.data)
        break

      case "customer_registered":
        // Automatización cuando se registra un cliente
        await handleCustomerRegistered(body.data)
        break

      case "invoice_generated":
        // Automatización cuando se genera una factura
        await handleInvoiceGenerated(body.data)
        break

      case "support_ticket_created":
        // Automatización cuando se crea un ticket
        await handleSupportTicketCreated(body.data)
        break

      default:
        console.log("Evento no reconocido:", body.eventType)
    }

    return NextResponse.json({
      success: true,
      message: "n8n webhook processed successfully",
    })
  } catch (error) {
    console.error("Error processing n8n webhook:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleShipmentCreated(data: any) {
  // Ejemplo: Enviar WhatsApp al cliente
  console.log("Procesando nuevo envío para automatización:", data.trackingCode)
  // Aquí iría la lógica para disparar workflows de n8n
}

async function handleCustomerRegistered(data: any) {
  // Ejemplo: Enviar email de bienvenida
  console.log("Procesando nuevo cliente para automatización:", data.customerEmail)
}

async function handleInvoiceGenerated(data: any) {
  // Ejemplo: Enviar factura por email automáticamente
  console.log("Procesando nueva factura para automatización:", data.invoiceId)
}

async function handleSupportTicketCreated(data: any) {
  // Ejemplo: Notificar al equipo de soporte
  console.log("Procesando nuevo ticket para automatización:", data.ticketId)
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook endpoint for n8n automation",
    supportedEvents: ["shipment_created", "customer_registered", "invoice_generated", "support_ticket_created"],
  })
}
