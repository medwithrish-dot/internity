"use client"

import Link from "next/link"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <main className="container-page max-w-xl">
      <h1 className="text-3xl font-extrabold mb-6">Log in</h1>

      <form
        onSubmit={handleLogin}
        className="panel-soft p-6 space-y-4 relative overflow-hidden"
      >
        {loading && (
          <div className="absolute left-0 top-0 h-1 w-full bg-cyan-400 animate-pulse" />
        )}

        <input
          className="w-full rounded-xl bg-[#111d3d] border border-[#21345d] px-4 py-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          className="w-full rounded-xl bg-[#111d3d] border border-[#21345d] px-4 py-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <div className="flex justify-between items-center gap-3">
          <Link
            href="/signup"
            className="text-sm text-white/70 hover:text-white cursor-pointer"
          >
            No account? Sign up
          </Link>

          <Link
            href="/forgot-password"
            className="text-sm text-cyan-300 hover:text-cyan-200 cursor-pointer"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full cursor-pointer hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {message && <p className="text-white/70">{message}</p>}
      </form>
    </main>
  )
}