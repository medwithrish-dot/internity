import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ count: 0 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data } = await supabase
    .from("question_attempts")
    .select("id")
    .eq("user_id", user.id)
    .gte("completed_at", today.toISOString())

  return NextResponse.json({ count: data?.length ?? 0 })
}