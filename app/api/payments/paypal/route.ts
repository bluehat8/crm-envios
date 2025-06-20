import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Configuración de PayPal (sandbox/production)
    const paypalConfig = {
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
      environment: process.env.PAYPAL_ENVIRONMENT || "sandbox",
    }

    // Crear orden de pago en PayPal
    const paypalOrder = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: body.amount,
          },
          description: `Pago factura ${body.invoiceId}`,
          custom_id: body.invoiceId,
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagos/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagos/cancel`,
        brand_name: "Envíos Nicaragua",
        user_action: "PAY_NOW",
      },
    }

    // Simular respuesta de PayPal
    const mockPayPalResponse = {
      id: `PAYPAL_${Date.now()}`,
      status: "CREATED",
      links: [
        {
          href: `https://www.sandbox.paypal.com/checkoutnow?token=PAYPAL_${Date.now()}`,
          rel: "approve",
          method: "GET",
        },
      ],
    }

    // Guardar orden en base de datos
    console.log("Orden PayPal creada:", {
      paypalOrderId: mockPayPalResponse.id,
      invoiceId: body.invoiceId,
      amount: body.amount,
      status: "pending",
    })

    return NextResponse.json({
      success: true,
      orderId: mockPayPalResponse.id,
      approvalUrl: mockPayPalResponse.links[0].href,
    })
  } catch (error) {
    console.error("Error creating PayPal order:", error)
    return NextResponse.json({ error: "Error al crear orden de pago" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")
  const token = searchParams.get("token")

  if (!orderId || !token) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  try {
    // Capturar pago en PayPal
    console.log("Capturando pago PayPal:", { orderId, token })

    // Simular captura exitosa
    const captureResult = {
      id: orderId,
      status: "COMPLETED",
      purchase_units: [
        {
          payments: {
            captures: [
              {
                id: `CAPTURE_${Date.now()}`,
                status: "COMPLETED",
                amount: {
                  currency_code: "USD",
                  value: "100.00",
                },
              },
            ],
          },
        },
      ],
    }

    // Actualizar estado en base de datos
    // await updatePaymentStatus(orderId, "completed", captureResult.purchase_units[0].payments.captures[0].id)

    return NextResponse.json({
      success: true,
      paymentId: captureResult.purchase_units[0].payments.captures[0].id,
      status: "completed",
    })
  } catch (error) {
    console.error("Error capturing PayPal payment:", error)
    return NextResponse.json({ error: "Error al procesar pago" }, { status: 500 })
  }
}
