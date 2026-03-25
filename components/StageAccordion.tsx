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

  const emailsMatch =
    email.length > 0 &&
    confirmEmail.length > 0 &&
    email.trim().toLowerCase() === confirmEmail.trim().toLowerCase()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setFileName(file.name)
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
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-transform duration-200 group-hover:scale-105 ${
              premium ? "bg-cyan-400 text-black" : "bg-[#1b274b] text-white"
            }`}
          >
            {icon}
          </div>

          <div>
            <div className="text-sm text-white/60">{stage}</div>
           <div
  className={`text-lg md:text-xl font-semibold transition-colors duration-200 ${
    title === "CV & ATS Screening"
      ? "text-[#f6d67a] group-hover:text-[#ffe89a]"
      : "group-hover:text-cyan-300"
  }`}
>
              {title}
            </div>
          </div>

          <div className="flex justify-center">
            {premium ? (
              <div className="px-3 py-1 rounded-full text-xs bg-cyan-400 text-black font-semibold whitespace-nowrap">
                Premium
              </div>
            ) : (
              <div className="h-6" />
            )}
          </div>

          <div
            className={`text-lg text-white/60 text-center transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ⌄
          </div>
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-[60px] text-white/75 leading-7 text-base max-w-4xl pb-1">
            {description}

            <div className="flex flex-wrap gap-3 mt-6">
              {guideHref && guideLabel && (
                <Link
                  href={guideHref}
                  className="inline-flex items-center rounded-xl bg-[#182a57] border border-[#29447b] px-4 py-3 font-semibold text-white hover:border-cyan-400 transition"
                >
                  Click here to access {guideLabel}
                </Link>
              )}

              {practiceHref && practiceLabel && (
                <Link
                  href={practiceHref}
                  className="inline-flex items-center rounded-xl bg-cyan-400 text-black px-4 py-3 font-semibold hover:opacity-90 transition"
                >
                  {practiceLabel}
                </Link>
              )}

              {videoHref && videoLabel && (
                <Link
                  href={videoHref}
                  className="inline-flex items-center rounded-xl bg-cyan-400 text-black px-4 py-3 font-semibold hover:opacity-90 transition"
                >
                  {videoLabel}
                </Link>
              )}
            </div>

            {showCvForm && (
              <div className="mt-8 rounded-[24px] border border-[#5e4b16] bg-[linear-gradient(180deg,rgba(44,33,7,0.35)_0%,rgba(18,14,6,0.2)_100%)] p-6">
                <div className="inline-flex rounded-full bg-[#3b2e0d] border border-[#70571a] px-4 py-2 text-sm font-semibold text-[#f6d67a] mb-5">
                  CV & ATS Review
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-[#f6d67a] leading-tight">
                  Submit your CV for expert review
                </h3>

                <p className="text-[#dcc37a] mt-4 leading-7">
                  Upload your CV, leave room for a future Stripe payment flow,
                  and tell us where you want your feedback sent.
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="block text-sm text-[#f2dc95] mb-2">
                      Email address for feedback
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-2xl border border-[#70571a] bg-[#1d1709] px-4 py-4 outline-none text-white placeholder:text-[#b89b56]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#f2dc95] mb-2">
                      Confirm email address
                    </label>
                    <input
                      type="email"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      placeholder="Re-enter your email"
                      className="w-full rounded-2xl border border-[#70571a] bg-[#1d1709] px-4 py-4 outline-none text-white placeholder:text-[#b89b56]"
                    />

                    {confirmEmail.length > 0 && (
                      <p
                        className={`mt-2 text-sm ${
                          emailsMatch ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {emailsMatch ? "Emails match" : "Emails do not match"}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="block text-sm text-[#f2dc95] mb-2">
                      Upload CV
                    </p>

                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      className="block w-full rounded-[24px] border-2 border-dashed border-[#8a6a1f] bg-[#1d1709] p-8 text-center cursor-pointer hover:bg-[#231c0b] transition"
                    >
                      <input
                        type="file"
                        accept=".txt,.pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="text-4xl mb-3">📄</div>
                      <div className="text-lg font-bold text-[#f6d67a]">
                        Drag and drop your CV here
                      </div>
                      <div className="text-[#c6aa63] mt-2">
                        or click to upload a file
                      </div>
                      <div className="text-sm text-[#9f8647] mt-2">
                        Accepts .txt, .pdf, .doc, .docx
                      </div>

                      {fileName && (
                        <div className="mt-4 text-sm text-green-400 font-semibold">
                          Uploaded: {fileName}
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="rounded-2xl border border-[#70571a] bg-[#1d1709] p-4">
                    <p className="text-sm text-[#f2dc95] mb-1">Payment</p>
                    <p className="text-[#c6aa63] leading-7">
                      Stripe payment can be connected here later before final CV
                      submission.
                    </p>
                  </div>

                  <button className="w-full rounded-2xl bg-[#d4af37] text-[#241b05] py-4 font-extrabold text-lg hover:opacity-95 transition">
                    Continue to CV Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}