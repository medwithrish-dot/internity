import Link from "next/link"
import { PracticeSection } from "@/app/data/practiceData"

const sectionAccentMap: Record<string, {
  pill: string
  text: string
  bar: string
  hover: string
}> = {
  "numerical-reasoning": {
    pill: "bg-cyan-400/15 text-cyan-300",
    text: "group-hover:text-cyan-300",
    bar: "bg-cyan-400",
    hover: "hover:border-cyan-400/30",
  },
  "logical-abstract-reasoning": {
    pill: "bg-purple-400/15 text-purple-300",
    text: "group-hover:text-purple-300",
    bar: "bg-purple-400",
    hover: "hover:border-purple-400/30",
  },
  "verbal-reasoning": {
    pill: "bg-blue-400/15 text-blue-300",
    text: "group-hover:text-blue-300",
    bar: "bg-blue-400",
    hover: "hover:border-blue-400/30",
  },
  "situational-judgement": {
    pill: "bg-pink-400/15 text-pink-300",
    text: "group-hover:text-pink-300",
    bar: "bg-pink-400",
    hover: "hover:border-pink-400/30",
  },
  "financial-commercial-knowledge": {
    pill: "bg-yellow-400/15 text-yellow-300",
    text: "group-hover:text-yellow-300",
    bar: "bg-yellow-400",
    hover: "hover:border-yellow-400/30",
  },
}

export default function PracticeSectionCard({
  section,
}: {
  section: PracticeSection
}) {
  const totalQuestions = section.subsections.reduce(
    (sum, subsection) => sum + subsection.questions.length,
    0
  )

  const accent =
    sectionAccentMap[section.slug] ?? {
      pill: "bg-cyan-400/15 text-cyan-300",
      text: "group-hover:text-cyan-300",
      bar: "bg-cyan-400",
      hover: "hover:border-cyan-400/30",
    }

  return (
    <Link
  href={`/practice/${section.slug}`}
  prefetch={false}
  className={`group rounded-[22px] border p-4 md:p-5 transition block hover:-translate-y-1 ${accent.hover}`}
  style={{
    background:
      "linear-gradient(180deg, rgba(19,32,74,1) 0%, rgba(13,23,51,1) 100%)",
    borderColor: "rgba(255,255,255,0.08)",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.02) inset",
  }}
>
      <div className={`h-[3px] w-12 rounded-full mb-4 ${accent.bar}`} />

      <div className="flex items-center justify-between gap-3 mb-3">
        <div className={`rounded-full px-3 py-1 text-xs ${accent.pill}`}>
          {section.subsections.length} subsections
        </div>
        <div className="text-white/40 text-xs">{totalQuestions} questions</div>
      </div>

      <h3
        className={`text-xl md:text-2xl font-extrabold transition leading-tight ${accent.text}`}
      >
        {section.title}
      </h3>

      <p className="muted text-sm md:text-base leading-6 mt-3">
        {section.description}
      </p>

      <div className="mt-4 text-white/75 font-semibold text-sm">
        Open section →
      </div>
    </Link>
  )
}