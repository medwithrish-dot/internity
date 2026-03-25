import QuestionPlayer from "@/components/practice/QuestionPlayer"
import {
  getSectionBySlug,
  getSubsectionBySlug,
} from "@/app/data/practiceData"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

export default async function PracticeSubsectionPage({
  params,
}: {
  params: Promise<{ section: string; subsection: string }>
}) {
  const { section, subsection } = await params

  const currentSection = getSectionBySlug(section)
  const currentSubsection = getSubsectionBySlug(section, subsection)

  if (!currentSection || !currentSubsection) {
    notFound()
  }

  if (currentSubsection.premium) {
    redirect("/pricing")
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let filteredQuestions = currentSubsection.questions

  if (user) {
    const { data: attempts } = await supabase
      .from("question_attempts")
      .select("question_id")
      .eq("user_id", user.id)

    const attemptedIds = new Set(attempts?.map((a) => a.question_id))

    const unseenQuestions = currentSubsection.questions.filter(
      (q) => !attemptedIds.has(q.id)
    )

    filteredQuestions =
      unseenQuestions.length > 0 ? unseenQuestions : currentSubsection.questions
  }

  return (
    <main className="container-page">
      <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
        <Link href="/practice" className="text-cyan-300">
          Practice
        </Link>
        <span className="text-white/40">/</span>
        <Link
          href={`/practice/${currentSection.slug}`}
          className="text-cyan-300"
        >
          {currentSection.title}
        </Link>
        <span className="text-white/40">/</span>
        <span className="text-white/70">{currentSubsection.title}</span>
      </div>

      <QuestionPlayer
        questions={filteredQuestions}
        sectionTitle={currentSection.title}
        subsectionTitle={currentSubsection.title}
        sectionSlug={currentSection.slug}
        subsectionSlug={currentSubsection.slug}
      />
    </main>
  )
}