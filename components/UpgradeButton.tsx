"use client"

export default function UpgradeButton() {
  const handleUpgrade = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
      return
    }

    alert(data.error || "Something went wrong")
  }

  return (
    <button
      onClick={handleUpgrade}
      className="w-full rounded-xl bg-cyan-400 text-black px-5 py-3 font-extrabold hover:opacity-90 transition"
    >
      Upgrade to Premium
    </button>
  )
}