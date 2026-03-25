"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.")
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setMessage("Password updated successfully. Redirecting to login...")

    setTimeout(() => {
      router.push("/login")
      router.refresh()
    }, 1500)
  }

  return (
    <main className="container-page max-w-xl">
      <h1 className="text-3xl font-extrabold mb-6">Reset password</h1>

      <form
        onSubmit={handleUpdatePassword}
        className="panel-soft p-6 space-y-4 relative overflow-hidden"
      >
        {loading && (
          <div className="absolute left-0 top-0 h-1 w-full bg-cyan-400 animate-pulse" />
        )}

        <input
          className="w-full rounded-xl bg-[#111d3d] border border-[#21345d] px-4 py-3"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <input
          className="w-full rounded-xl bg-[#111d3d] border border-[#21345d] px-4 py-3"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full cursor-pointer hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Updating..." : "Update password"}
        </button>

        {message && <p className="text-white/70">{message}</p>}
      </form>
    </main>
  )
}