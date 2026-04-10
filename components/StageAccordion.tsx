"use client"

import Link from "next/link"
import { useState } from "react"

type StageProps = {
  stage: string
  title: string
  icon: string
  premium?: boolean
  description: string
  guideHref?: string
  guideLabel?: string
  practiceHref?: string
  practiceLabel?: string
  videoHref?: string
  videoLabel?: string
  showCvForm?: boolean
}

export default function StageAccordion({
  stage,
  title,
  icon,
  premium,
  description,
  guideHref,
  guideLabel,
  practiceHref,
  practiceLabel,
  videoHref,
  videoLabel,
  showCvForm,
}: StageProps) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [fileName, setFileName] = useState("")
  const [fileObject, setFileObject] = useState<File | null>(null)
  const [cvLoading, setCvLoading] = useState(false)

  const emailsMatch =
    email.length > 0 &&
    confirmEmail.length > 0 &&
    email.trim().toLowerCase() === confirmEmail.trim().toLowerCase()

  // ✅ FILE UPLOAD (with 10MB limit)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large. Max size is 10MB.")
        return
      }

      setFileName(file.name)
      setFileObject(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large. Max size is 10MB.")
        return
      }

      setFileName(file.name)
      setFileObject(file)
    }
  }

  // ✅ STRIPE FLOW
  const handleCvCheckout = async () => {
    if (!emailsMatch) {
      alert("Emails do not match.")
      return
    }

    if (!fileObject) {
      alert("Upload your CV first.")
      return
    }

    try {
      setCvLoading(true)

      const formData = new FormData()
      formData.append("file", fileObject)
      formData.append("email", email)

      const uploadRes = await fetch("/api/cv/upload", {
        method: "POST",
        body: formData,
      })

      const uploadData = await uploadRes.json()

      if (!uploadRes.ok) {
        throw new Error(uploadData.error)
      }

      const checkoutRes = await fetch("/api/stripe/cv-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          filePath: uploadData.filePath,
          fileName: uploadData.fileName,
        }),
      })

      const checkoutData = await checkoutRes.json()

      if (!checkoutRes.ok) {
        throw new Error(checkoutData.error)
      }

      window.location.href = checkoutData.url
    } catch (error: any) {
      alert(error.message || "Something went wrong")
      setCvLoading(false)
    }
  }

  return (
    <div
      className={`rounded-2xl px-6 py-5 transition-all duration-300 ${
        premium
          ? "bg-[#0f1f44] border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
          : "panel-soft"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left cursor-pointer group"
      >
        <div className="grid grid-cols-[44px_1fr_110px_24px] items-center gap-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${
              premium ? "bg-cyan-400 text-black" : "bg-[#1b274b] text-white"
            }`}
          >
            {icon}
          </div>

          <div>
            <div className="text-sm text-white/60">{stage}</div>
            <div className="text-lg md:text-xl font-semibold">
              {title}
            </div>
          </div>

          <div className="flex justify-center">
            {premium ? (
              <div className="px-3 py-1 rounded-full text-xs bg-cyan-400 text-black font-semibold">
                Premium
              </div>
            ) : (
              <div className="h-6" />
            )}
          </div>

          <div className="text-lg text-white/60 text-center">
            {open ? "⌃" : "⌄"}
          </div>
        </div>
      </button>

      {open && (
        <div className="mt-5 ml-[60px] text-white/75">
          <p>{description}</p>

          {showCvForm && (
            <div className="mt-6 space-y-4">

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded bg-[#1d1709]"
              />

              <input
                type="email"
                placeholder="Confirm Email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className="w-full p-3 rounded bg-[#1d1709]"
              />

              <input
                type="file"
                onChange={handleFileChange}
                className="w-full"
              />

              <button
                onClick={handleCvCheckout}
                disabled={cvLoading}
                className="w-full bg-yellow-400 text-black p-4 rounded font-bold"
              >
                {cvLoading ? "Loading..." : "Continue to CV Review"}
              </button>

            </div>
          )}
        </div>
      )}
    </div>
  )
}