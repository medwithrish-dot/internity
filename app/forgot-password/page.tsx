"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setMessage(
      error ? error.message : "If that email exists, a password reset link has been sent."
    )
    setLoading(false)
  }

  return (
    <main className="container-page max-w-xl">
      <h1 className="text-3xl font-extrabold mb-6">Forgot password</h1>

      <form onSubmit={handleReset} className="panel-soft p-6 space-y-4 relative overflow-hidden">
        {loading && (
          <div className="absolute left-0 top-0 h-1 w-full bg-cyan-400 animate-pulse" />
        )}

        <p className="text-white/70">
          Enter your email and we’ll send you a password reset link.
        </p>

        <input
          className="w-full rounded-xl bg-[#111d3d] border border-[#21345d] px-4 py-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full cursor-pointer hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        {message && <p className="text-white/70">{message}</p>}
      </form>
    </main>
  )
}