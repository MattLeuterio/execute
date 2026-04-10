import { NextResponse } from "next/server"

type WaitlistBody = {
  name: string
  email: string
  isNutritionProfessional: boolean
  interestedPlan: "starter" | "growth" | "studio" | null
  message?: string
}

type SupabaseInsertError = {
  code?: string | null
  message?: string | null
  details?: string | null
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function parseWaitlistBody(body: unknown): WaitlistBody | null {
  if (!body || typeof body !== "object") return null

  const data = body as Record<string, unknown>
  const name = typeof data.name === "string" ? data.name.trim() : ""
  const email = typeof data.email === "string" ? data.email.trim() : ""
  const isNutritionProfessional = data.isNutritionProfessional
  const interestedPlanValue = data.interestedPlan

  if (!name) return null
  if (!email || !isValidEmail(email)) return null
  if (typeof isNutritionProfessional !== "boolean") return null

  const isValidPlan =
    interestedPlanValue === undefined ||
    interestedPlanValue === null ||
    interestedPlanValue === "starter" ||
    interestedPlanValue === "growth" ||
    interestedPlanValue === "studio"

  if (!isValidPlan) return null

  const interestedPlan = isNutritionProfessional
    ? (interestedPlanValue ?? "growth")
    : null

  const messageValue = data.message
  const message =
    typeof messageValue === "string" ? messageValue.trim() : undefined

  if (messageValue !== undefined && typeof messageValue !== "string") return null

  return {
    name,
    email,
    isNutritionProfessional,
    interestedPlan,
    message,
  }
}

function isWaitlistEmailConflict(error: SupabaseInsertError) {
  if (error.code !== "23505") return false

  const errorText = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase()

  if (!errorText.trim()) return true

  return (
    errorText.includes("waitlist_email") ||
    errorText.includes("waitlist.email") ||
    errorText.includes("(email)") ||
    (errorText.includes("waitlist") && errorText.includes("email"))
  )
}

export async function POST(request: Request) {
  let jsonBody: unknown

  try {
    jsonBody = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid form data." },
      { status: 400 }
    )
  }

  const payload = parseWaitlistBody(jsonBody)

  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Invalid form data." },
      { status: 400 }
    )
  }

  let error: SupabaseInsertError | null = null

  try {
    const { supabaseAdmin } = await import("@/lib/supabase/admin")

    const insertResult = await supabaseAdmin.from("waitlist").insert({
      name: payload.name,
      email: payload.email,
      is_nutrition_professional: payload.isNutritionProfessional,
      interested_plan: payload.interestedPlan,
      message: payload.message,
    })

    error = insertResult.error
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }

  if (error) {
    if (isWaitlistEmailConflict(error)) {
      return NextResponse.json(
        { success: false, message: "This email is already on the waitlist." },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }

  return NextResponse.json(
    {
      success: true,
      message: "You're in. We’ll reach out soon with early access.",
    },
    { status: 200 }
  )
}
