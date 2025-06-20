import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Configuración de Stripe
    const stripeConfig = {
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    }

    // Crear Payment Intent en Stripe
    const paymentIntent = {
      amount: Math.round(Number.parseFloat(body.amount) * 100), // Stripe usa centavos
      currency: "usd",
      metadata: {
        invoiceId: body.invoiceId,
        customerId: body.customerId,
      },
      description: `Pago factura ${body.invoiceId} - Envíos Nicaragua`,
    }

    // Simular respuesta de Stripe
    const mockStripeResponse = {
      id: `pi_${Date.now()}`,
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      status: "requires_payment_method",
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    }

    console.log("Payment Intent creado:", {
      paymentIntentId: mockStripeResponse.id,
      invoiceId: body.invoiceId,
      amount: body.amount,
    })

    return NextResponse.json({
      success: true,
      clientSecret: mockStripeResponse.client_secret,
      paymentIntentId: mockStripeResponse.id,
    })
  } catch (error) {
    console.error("Error creating Stripe payment intent:", error)
    return NextResponse.json({ error: "Error al crear intención de pago" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentIntentId, status } = body

    console.log("Actualizando estado de pago Stripe:", {
      paymentIntentId,
      status,
    })

    // Aquí iría la lógica para actualizar el estado en la base de datos
    // await updatePaymentStatus(paymentIntentId, status)

    return NextResponse.json({
      success: true,
      message: "Estado de pago actualizado",
    })
  } catch (error) {
    console.error("Error updating Stripe payment:", error)
    return NextResponse.json({ error: "Error al actualizar pago" }, { status: 500 })
  }
}
