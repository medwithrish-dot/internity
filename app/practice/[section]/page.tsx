import Link from "next/link"
import { getSectionBySlug } from "@/app/data/practiceData"
import { notFound } from "next/navigation"

export default async function PracticeSectionPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params

  const currentSection = getSectionBySlug(section)

  if (!currentSection) {
    notFound()
  }

  return (
    <main className="container-page">
      <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
        <Link href="/practice" className="text-cyan-300">
          Practice
        </Link>
        <span className="text-white/40">/</span>
        <span className="text-white/70">{currentSection.title}</span>
      </div>

      <section className="mb-8">
        <div className="rounded-3xl border border-white/10 bg-[#0d1733] p-6 md:p-8">
          <div className="inline-flex rounded-full bg-[#182754] px-3 py-1 text-xs text-white/70 mb-3">
            Practice Section
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold">
            {currentSection.title}
          </h1>

          <p className="text-white/65 mt-4 max-w-3xl leading-7">
            {currentSection.description}
          </p>

          <div className="mt-6">
            <Link
              href={`/practice/${currentSection.slug}/all`}
              className="inline-flex items-center rounded-xl bg-cyan-400 text-black px-5 py-3 font-extrabold hover:opacity-90 transition"
            >
              Practice All
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-extrabold mb-5">Choose a question type</h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {currentSection.subsections.map((subsection) => {
            const isPremium = subsection.premium === true

            if (isPremium) {
              return (
                <Link
                  key={subsection.slug}
                  href="/pricing"
                  className="group rounded-2xl border border-white/10 bg-[#0d1733] p-5 hover:border-cyan-400/30 transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-extrabold group-hover:text-cyan-300 transition">
                      {subsection.title}
                    </h3>

                    <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-300">
                      Premium
                    </span>
                  </div>

                  <p className="text-white/65 text-sm leading-6 mb-4">
                    {subsection.description}
                  </p>

                  <div className="text-cyan-300 text-sm font-bold">
                    Unlock on Premium →
                  </div>
                </Link>
              )
            }

            return (
              <Link
                key={subsection.slug}
                href={`/practice/${currentSection.slug}/${subsection.slug}`}
                className="group rounded-2xl border border-white/10 bg-[#0d1733] p-5 hover:border-cyan-400/30 transition"
              >
                <h3 className="text-xl font-extrabold mb-3 group-hover:text-cyan-300 transition">
                  {subsection.title}
                </h3>

                <p className="text-white/65 text-sm leading-6 mb-4">
                  {subsection.description}
                </p>

                <div className="text-cyan-300 text-sm font-bold">
                  Start practice →
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}