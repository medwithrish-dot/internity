import QuestionPlayer from "@/components/practice/QuestionPlayer"
import {
  getSectionBySlug,
  getFlattenedQuestionsBySection,
  shuffleQuestions,
} from "@/app/data/practiceData"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

export default async function PracticeAllSectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params

  const currentSection = getSectionBySlug(section)
  if (!currentSection) {
    notFound()
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single()

  const currentPlan = profile?.plan ?? "free"

  if (currentPlan !== "premium") {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { count } = await supabase
      .from("question_attempts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", today.toISOString())

    if ((count ?? 0) >= 7) {
      redirect("/pricing")
    }
  }

  let mixedQuestions = shuffleQuestions(
    getFlattenedQuestionsBySection(section).filter((question) => !question.premium)
  )

  const { data: attempts } = await supabase
    .from("question_attempts")
    .select("question_id")
    .eq("user_id", user.id)

  const attemptedIds = new Set(attempts?.map((a) => a.question_id))

  const unseenQuestions = mixedQuestions.filter(
    (question) => !attemptedIds.has(question.id)
  )

  mixedQuestions = unseenQuestions.length > 0 ? unseenQuestions : mixedQuestions

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
        <span className="text-white/70">Practice All</span>
      </div>

      <QuestionPlayer
        questions={mixedQuestions}
        sectionTitle={currentSection.title}
        subsectionTitle="Practice All"
        sectionSlug={currentSection.slug}
        subsectionSlug="all"
      />
    </main>
  )
}