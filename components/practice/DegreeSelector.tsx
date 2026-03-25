"use client"

import { DegreeType, degreeOptions, practiceSections } from "@/app/data/practiceData"
import { useMemo, useState } from "react"

export default function DegreeSelector() {
  const [selectedDegree, setSelectedDegree] = useState<DegreeType>("General")

  const recommendedSections = useMemo(() => {
    return practiceSections.filter(
      (section) =>
        section.recommendedFor?.includes(selectedDegree) ||
        selectedDegree === "General"
    )
  }, [selectedDegree])

  return (
    <div className="rounded-[24px] border border-white/10 bg-[#101b3d] p-4 md:p-5">
      <div className="max-w-xl">
        <p className="text-cyan-300 font-semibold text-xs mb-1">
          Degree-based guidance
        </p>

        <h2 className="text-xl md:text-2xl font-extrabold">
          Recommended for you
        </h2>

        <p className="muted mt-2 text-sm md:text-base leading-6">
          Choose your degree and prioritise the sections most relevant for your applications.
        </p>

        <select
          value={selectedDegree}
          onChange={(e) => setSelectedDegree(e.target.value as DegreeType)}
          className="mt-4 bg-[#111d3d] border border-[#21345d] rounded-xl px-4 py-3 min-w-[220px] outline-none text-sm"
        >
          {degreeOptions.map((degree) => (
            <option key={degree} value={degree}>
              {degree}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-5">
        {recommendedSections.map((section) => (
          <div
            key={section.slug}
            className="rounded-2xl border border-[#1c2b52] bg-[#101b3d] p-3.5"
          >
            <div className="text-xs text-cyan-300 mb-1.5">Recommended</div>
            <div className="font-bold text-base">{section.title}</div>
            <p className="text-white/60 text-sm mt-2 leading-6">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}