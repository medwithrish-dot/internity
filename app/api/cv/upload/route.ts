import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const file = formData.get("file") as File | null
    const email = formData.get("email") as string | null

    if (!file || !email) {
      return NextResponse.json(
        { error: "Missing file or email" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const safeFileName = file.name.replace(/\s+/g, "-")
    const filePath = `${Date.now()}-${Math.random()
  .toString(36)
  .substring(2)}-${safeFileName}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from("cv-uploads")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      filePath,
      fileName: file.name,
    })
  } catch (error) {
    console.error("CV upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload CV" },
      { status: 500 }
    )
  }
}