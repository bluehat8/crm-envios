import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ruc } = body

    if (!ruc) {
      return NextResponse.json({ error: "RUC es requerido" }, { status: 400 })
    }

    // Validar formato de RUC nicaragüense
    const rucPattern = /^[J]\d{10}[0-9A-Z]$/
    if (!rucPattern.test(ruc)) {
      return NextResponse.json({
        valid: false,
        error: "Formato de RUC inválido. Debe ser J seguido de 10 dígitos y un dígito verificador",
      })
    }

    // Simular consulta a la DGI
    console.log("Validando RUC con DGI:", ruc)

    // Simular respuesta de la DGI
    const mockDGIResponse = {
      ruc: ruc,
      razonSocial: "EMPRESA EJEMPLO S.A.",
      estado: "ACTIVO",
      fechaInscripcion: "2020-01-15",
      regimen: "GENERAL",
      direccion: "MANAGUA, NICARAGUA",
      actividadEconomica: "SERVICIOS DE TRANSPORTE Y LOGISTICA",
    }

    return NextResponse.json({
      valid: true,
      data: mockDGIResponse,
    })
  } catch (error) {
    console.error("Error validando RUC:", error)
    return NextResponse.json({ error: "Error al validar RUC con DGI" }, { status: 500 })
  }
}
