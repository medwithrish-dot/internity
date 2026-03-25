import Link from "next/link"
import { Subsection } from "@/app/data/practiceData"

export default function PracticeSubsectionCard({
  sectionSlug,
  subsection,
}: {
  sectionSlug: string
  subsection: Subsection
}) {
  return (
    <Link
      href={`/practice/${sectionSlug}/${subsection.slug}`}
      className="rounded-[24px] border border-white/10 bg-[#0d1733] p-5 hover:border-cyan-400/40 transition block"
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="rounded-full bg-[#182754] px-3 py-1 text-sm text-white/70">
          {subsection.title}
        </div>
        <div className="text-white/45 text-sm">
          {subsection.questions.length} questions
        </div>
      </div>

      <p className="text-white/70 leading-7">{subsection.description}</p>

      <div className="mt-4 text-cyan-300 font-semibold">Start practice →</div>
    </Link>
  )
}