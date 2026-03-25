import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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