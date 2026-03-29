import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
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

  const { data: attempts } = await supabase
    .from("question_attempts")
    .select("*")
    .eq("user_id", user.id)

  const totalCompleted = attempts?.length ?? 0
  const totalCorrect = attempts?.filter((a) => a.correct).length ?? 0

  const accuracy =
    totalCompleted > 0
      ? Math.round((totalCorrect / totalCompleted) * 100)
      : 0

  const sectionStats = [
    { slug: "numerical-reasoning", label: "Numerical Reasoning" },
    { slug: "logical-abstract-reasoning", label: "Logical / Abstract Reasoning" },
    { slug: "verbal-reasoning", label: "Verbal Reasoning" },
    { slug: "situational-judgement", label: "Situational Judgement" },
    { slug: "financial-commercial-knowledge", label: "Financial / Commercial Knowledge" },
  ].map((section) => {
    const related = attempts?.filter((a) => a.section_slug === section.slug) ?? []
    const correct = related.filter((a) => a.correct).length
    const value =
      related.length > 0
        ? Math.round((correct / related.length) * 100)
        : 0

    return { label: section.label, value }
  })

  return (
    <main className="container-page space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <p className="text-white/60 mt-2">
            Track your progress and manage your account.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0d1733] p-4">
          <p className="text-white/50 text-sm">Questions Completed</p>
          <p className="text-2xl font-extrabold">{totalCompleted}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d1733] p-4">
          <p className="text-white/50 text-sm">Correct Answers</p>
          <p className="text-2xl font-extrabold">{totalCorrect}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d1733] p-4">
          <p className="text-white/60 text-sm mb-1">Accuracy</p>
          <p className="text-2xl font-extrabold">{accuracy}%</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0d1733] p-5">
          <h2 className="text-lg font-extrabold mb-4">Performance by Section</h2>

          <div className="space-y-4">
            {sectionStats.map((section) => (
              <div key={section.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{section.label}</span>
                  <span>{section.value}%</span>
                </div>

                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400"
                    style={{ width: `${section.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <details className="rounded-2xl border border-white/10 bg-[#0d1733] p-5" open>
            <summary className="cursor-pointer list-none font-extrabold text-lg flex items-center justify-between">
              Account
              <span className="text-white/40 text-sm">Open</span>
            </summary>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-white/50 text-sm">Email</p>
                <p className="font-bold break-all">{user.email}</p>
              </div>

              <div>
  <p className="text-white/50 text-sm">Plan</p>
  <p className="font-bold">
    {currentPlan === "premium" ? "Premium" : "Free"}
  </p>
</div>

              <form action="/auth/signout" method="post">
  <button
    type="submit"
    className="w-full rounded-xl bg-red-500 text-white px-5 py-3 font-bold cursor-pointer hover:bg-red-400 transition"
  >
    Log out
  </button>
</form>
            </div>
          </details>

                    <div className="rounded-2xl border border-white/10 bg-[#0d1733] p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="font-extrabold text-lg">Subscription</h2>
                <p className="text-white/50 text-sm mt-1">
                  Manage your current plan and unlock premium features.
                </p>
              </div>

              <span className="rounded-full bg-[#111d3d] border border-white/10 px-3 py-1 text-xs font-bold text-cyan-300">
                {currentPlan === "premium" ? "Premium Plan" : "Free Plan"}
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-[#111d3d] p-4">
                <p className="text-white/70 text-sm">
                  You’re currently on the {currentPlan} plan.
                </p>
              </div>

              {currentPlan !== "premium" ? (
  <a
    href="/pricing"
    className="block w-full rounded-xl bg-cyan-400 text-black px-5 py-3 font-extrabold cursor-pointer hover:opacity-90 transition text-center"
  >
    Upgrade to Premium
  </a>
) : (
  <div className="block w-full rounded-xl bg-green-500 text-white px-5 py-3 font-extrabold text-center">
    You are on Premium ✅
  </div>
)}
            </div>
          </div>

          <details className="rounded-2xl border border-white/10 bg-[#0d1733] p-5">
            <summary className="cursor-pointer list-none font-extrabold text-lg flex items-center justify-between">
              Support
              <span className="text-white/40 text-sm">Open</span>
            </summary>

            <div className="mt-4 space-y-3">
              <p className="text-white/70 text-sm break-all">
                support@internity.co.uk
              </p>
              <p className="text-white/50 text-sm">
                Reach out for account help, bugs, or feedback.
              </p>
            </div>
          </details>
        </div>
      </div>
    </main>
  )
}