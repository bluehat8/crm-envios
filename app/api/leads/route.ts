import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Simular obtención de leads
    const leads = [
      {
        id: 1,
        name: "Empresa Importadora XYZ",
        email: "contacto@importadoraxyz.com",
        phone: "+505 8888-9999",
        company: "Importadora XYZ",
        source: "website",
        status: "new",
        score: 85,
        estimatedValue: 15000,
        notes: "Interesado en servicio de importación desde China",
        createdAt: "2024-01-16T10:30:00Z",
        lastContact: null,
      },
      {
        id: 2,
        name: "María Fernández",
        email: "maria.fernandez@tienda.com",
        phone: "+505 7777-8888",
        company: "Tienda Online",
        source: "referral",
        status: "qualified",
        score: 92,
        estimatedValue: 8500,
        notes: "Necesita envíos regulares a Costa Rica",
        createdAt: "2024-01-15T14:20:00Z",
        lastContact: "2024-01-16T09:15:00Z",
      },
    ]

    return NextResponse.json({ success: true, leads })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Error al obtener leads" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos del lead
    const requiredFields = ["name", "email", "source"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Campo requerido: ${field}` }, { status: 400 })
      }
    }

    // Calcular score del lead basado en criterios
    const score = calculateLeadScore(body)

    const newLead = {
      id: Date.now(),
      ...body,
      score,
      status: "new",
      createdAt: new Date().toISOString(),
      lastContact: null,
    }

    console.log("Nuevo lead creado:", newLead)

    // Disparar automatización para nuevo lead
    await fetch("/api/automation/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "lead_created",
        entityType: "lead",
        entityId: newLead.id,
        eventData: newLead,
      }),
    })

    return NextResponse.json({ success: true, lead: newLead })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ error: "Error al crear lead" }, { status: 500 })
  }
}

function calculateLeadScore(leadData: any): number {
  let score = 0

  // Puntuación por fuente
  const sourceScores = {
    website: 20,
    referral: 30,
    social_media: 15,
    advertising: 25,
    cold_outreach: 10,
  }
  score += sourceScores[leadData.source as keyof typeof sourceScores] || 0

  // Puntuación por empresa
  if (leadData.company) score += 20

  // Puntuación por teléfono
  if (leadData.phone) score += 15

  // Puntuación por valor estimado
  if (leadData.estimatedValue) {
    if (leadData.estimatedValue > 10000) score += 25
    else if (leadData.estimatedValue > 5000) score += 15
    else if (leadData.estimatedValue > 1000) score += 10
  }

  // Puntuación por urgencia
  if (leadData.urgency === "high") score += 20
  else if (leadData.urgency === "medium") score += 10

  return Math.min(score, 100) // Máximo 100 puntos
}
