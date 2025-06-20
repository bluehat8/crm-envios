import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventType, entityType, entityId, eventData } = body

    console.log("Ejecutando automatización:", {
      eventType,
      entityType,
      entityId,
      eventData,
    })

    // Buscar automatizaciones que coincidan con el evento
    const matchingAutomations = await findAutomationsByEvent(eventType)

    const results = []

    for (const automation of matchingAutomations) {
      try {
        // Evaluar condiciones si existen
        if (automation.conditions && !evaluateConditions(automation.conditions, eventData)) {
          continue
        }

        // Aplicar retraso si está configurado
        if (automation.delay > 0) {
          await scheduleExecution(automation, eventData, automation.delay)
        } else {
          // Ejecutar inmediatamente
          const result = await executeAutomation(automation, eventData)
          results.push(result)
        }
      } catch (error) {
        console.error(`Error ejecutando automatización ${automation.id}:`, error)
        results.push({
          automationId: automation.id,
          success: false,
          error: error.message,
        })
      }
    }

    return NextResponse.json({
      success: true,
      executedAutomations: results.length,
      results,
    })
  } catch (error) {
    console.error("Error en sistema de automatización:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

async function findAutomationsByEvent(eventType: string) {
  // Simular búsqueda en base de datos
  const automations = [
    {
      id: 1,
      name: "WhatsApp Nuevo Envío",
      trigger: "shipment_created",
      actions: ["send_whatsapp"],
      conditions: null,
      delay: 0,
      template: "shipment_created_whatsapp",
      isActive: true,
    },
    {
      id: 2,
      name: "Email Bienvenida",
      trigger: "customer_registered",
      actions: ["send_email"],
      conditions: null,
      delay: 5,
      template: "welcome_email",
      isActive: true,
    },
  ]

  return automations.filter((a) => a.trigger === eventType && a.isActive)
}

function evaluateConditions(conditions: string, eventData: any): boolean {
  try {
    // Evaluación segura de condiciones
    // En producción, usar una librería como expr-eval o similar
    console.log("Evaluando condiciones:", conditions, eventData)
    return true // Simplificado para el ejemplo
  } catch (error) {
    console.error("Error evaluando condiciones:", error)
    return false
  }
}

async function executeAutomation(automation: any, eventData: any) {
  const results = []

  for (const action of automation.actions) {
    switch (action) {
      case "send_email":
        results.push(await sendEmail(automation, eventData))
        break
      case "send_sms":
        results.push(await sendSMS(automation, eventData))
        break
      case "send_whatsapp":
        results.push(await sendWhatsApp(automation, eventData))
        break
      case "webhook_call":
        results.push(await callWebhook(automation, eventData))
        break
      default:
        console.log(`Acción no reconocida: ${action}`)
    }
  }

  return {
    automationId: automation.id,
    success: true,
    actions: results,
  }
}

async function sendEmail(automation: any, eventData: any) {
  console.log("Enviando email:", {
    template: automation.template,
    recipient: eventData.customer?.email,
    data: eventData,
  })

  // Simular envío de email
  return {
    action: "send_email",
    success: true,
    recipient: eventData.customer?.email,
    messageId: `email_${Date.now()}`,
  }
}

async function sendSMS(automation: any, eventData: any) {
  console.log("Enviando SMS:", {
    template: automation.template,
    recipient: eventData.customer?.phone,
    data: eventData,
  })

  return {
    action: "send_sms",
    success: true,
    recipient: eventData.customer?.phone,
    messageId: `sms_${Date.now()}`,
  }
}

async function sendWhatsApp(automation: any, eventData: any) {
  console.log("Enviando WhatsApp:", {
    template: automation.template,
    recipient: eventData.customer?.phone,
    data: eventData,
  })

  return {
    action: "send_whatsapp",
    success: true,
    recipient: eventData.customer?.phone,
    messageId: `whatsapp_${Date.now()}`,
  }
}

async function callWebhook(automation: any, eventData: any) {
  console.log("Llamando webhook:", {
    url: automation.webhookUrl,
    data: eventData,
  })

  return {
    action: "webhook_call",
    success: true,
    url: automation.webhookUrl,
    responseStatus: 200,
  }
}

async function scheduleExecution(automation: any, eventData: any, delayMinutes: number) {
  console.log(`Programando ejecución en ${delayMinutes} minutos:`, {
    automationId: automation.id,
    eventData,
  })

  // En producción, usar un sistema de colas como Bull/BullMQ o similar
  setTimeout(
    async () => {
      await executeAutomation(automation, eventData)
    },
    delayMinutes * 60 * 1000,
  )
}
