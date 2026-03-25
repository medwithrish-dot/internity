import DegreeSelector from "@/components/practice/DegreeSelector"
import PracticeSectionCard from "@/components/practice/PracticeSectionCard"
import { practiceSections } from "@/app/data/practiceData"

export default function PracticePage() {
  const totalSubsections = practiceSections.reduce(
    (sum, section) => sum + section.subsections.length,
    0
  )

  const totalQuestions = practiceSections.reduce(
    (sum, section) =>
      sum +
      section.subsections.reduce(
        (inner, subsection) => inner + subsection.questions.length,
        0
      ),
    0
  )

  return (
    <main className="container-page">
      <section className="mb-8 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_28%),linear-gradient(180deg,#0d1733_0%,#09132d_100%)] p-6 md:p-8">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 mb-4">
              Practice Hub
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Choose a section to practice
            </h1>

            <p className="muted text-lg max-w-3xl mt-4 leading-8">
              Build your performance across numerical, logical, verbal, SJT, and commercial topics.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="#practice-questions"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 text-black px-5 py-3 font-bold hover:opacity-90 transition"
              >
                JUMP TO PRACTICE QUESTIONS
                <span>↓</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 min-w-[320px]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-white/50 text-xs mb-2">Sections</p>
              <p className="text-2xl font-extrabold">5</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-white/50 text-xs mb-2">Subsections</p>
              <p className="text-2xl font-extrabold">{totalSubsections}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-white/50 text-xs mb-2">Questions</p>
              <p className="text-2xl font-extrabold">{totalQuestions}</p>
            </div>
          </div>
        </div>
      </section>

      <DegreeSelector />

      <section className="mt-6 rounded-[24px] border border-white/10 bg-[#0b1430] p-5 md:p-6">
        <div className="max-w-3xl">
          <p className="text-cyan-300 font-semibold text-sm mb-2">Coding</p>

          <h2 className="text-2xl font-extrabold mb-3">
            Coding Interviews
          </h2>

          <p className="text-white/70 leading-7">
            For software engineering or quant roles, coding tests are common.
          </p>

          <p className="text-white/70 leading-7 mt-4">
            We recommend practicing algorithms and data structures on:
          </p>

          <div className="mt-4 space-y-2 text-cyan-300 font-semibold">
            <div>→ LeetCode</div>
            <div>→ HackerRank</div>
            <div>→ CodeSignal</div>
          </div>
        </div>
      </section>

      <section
        id="practice-questions"
        className="mt-8 rounded-[30px] border border-white/30 bg-[linear-gradient(180deg,rgba(15, 28, 67, 0.95)_0%,rgba(9,19,45,0.98)_100%)] p-6 md:p-8 scroll-mt-28"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <p className="text-cyan-300 font-semibold text-sm mb-2">
              Practice Questions
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold">
              Choose a section to start practicing
            </h2>
            <p className="text-white/65 mt-2 leading-7 max-w-3xl">
              Work through section-based question banks designed to improve speed,
              accuracy, and familiarity with real internship assessments.
            </p>
          </div>

          <div className="rounded-2xl border border border-white/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300 font-semibold">
            Core Practice Area
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {practiceSections.map((section) => (
            <PracticeSectionCard key={section.slug} section={section} />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[28px] border border-cyan-400/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.08)_0%,rgba(124,92,255,0.08)_100%)] p-6">
        <p className="text-cyan-300 font-semibold text-sm mb-2">Premium</p>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
          Upgrade for more practice every day
        </h2>
        <p className="text-white/65 leading-7 mb-5">
          Unlock more daily questions, timed sets, full analytics, explanations, and advanced progress tracking.
        </p>
        <button className="rounded-2xl bg-cyan-400 text-black py-4 px-6 font-extrabold">
          Upgrade to Premium
        </button>
      </section>
    </main>
  )
}