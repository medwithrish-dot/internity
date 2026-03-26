import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single()

  const currentPlan = profile?.plan ?? "free"

  if (currentPlan !== "premium") {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count, error: countError } = await supabase
      .from("question_attempts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", today.toISOString())

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 })
    }

    if ((count ?? 0) >= 7) {
      return NextResponse.json(
        { error: "Daily free limit reached" },
        { status: 403 }
      )
    }
  }

  const body = await request.json()

  const { error } = await supabase.from("question_attempts").insert({
    user_id: user.id,
    question_id: body.question_id,
    section_slug: body.section_slug,
    subsection_slug: body.subsection_slug,
    correct: body.correct,
    selected_answer: body.selected_answer,
    correct_answer: body.correct_answer,
    timed_mode: body.timed_mode ?? false,
    seconds_taken: body.seconds_taken ?? null,
    flagged: body.flagged ?? false,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}