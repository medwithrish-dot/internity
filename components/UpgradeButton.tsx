"use client"

import { useState } from "react"

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      if (data.url) {
        window.location.href = data.url
        return
      }

      throw new Error("No checkout URL returned")
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className={`group relative w-full overflow-hidden rounded-2xl px-5 py-4 font-extrabold text-lg transition-all duration-300 ${
          loading
            ? "bg-cyan-300/80 text-black cursor-wait"
            : "bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 text-black shadow-[0_10px_30px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(34,211,238,0.35)] cursor-pointer"
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {loading ? (
            <>
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              Redirecting to Stripe...
            </>
          ) : (
            <>
              <span>Upgrade to Premium</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </>
          )}
        </span>

        {!loading && (
          <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="absolute inset-y-0 left-[-30%] w-[30%] rotate-12 bg-white/25 blur-xl transition-all duration-500 group-hover:left-[120%]" />
          </span>
        )}
      </button>

      {loading && (
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-[loadingBar_1.1s_ease-in-out_infinite] rounded-full bg-cyan-300" />
        </div>
      )}
    </div>
  )
}