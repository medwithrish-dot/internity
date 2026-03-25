"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

const guides = [
  {
    slug: "finding-opportunities",
    title: "Finding Opportunities Guide",
    category: "Finding Opportunities",
    description:
      "Learn where to find internships, spring weeks, insight days, off-cycle roles, and graduate pathways.",
    icon: "🔍",
    accent: "from-cyan-400/25 to-blue-500/10",
  },
  {
    slug: "cv-ats",
    title: "CV & ATS Guide",
    category: "CV & ATS",
    description:
      "Build a strong CV, understand ATS filters, and learn how to position your experience properly.",
    icon: "📄",
    accent: "from-purple-400/25 to-pink-500/10",
  },
  {
    slug: "video-hirevue",
    title: "Video / HireVue Interviews Guide",
    category: "Video Interviews",
    description:
      "Prepare for recorded interviews with structure frameworks, delivery tips, and common question types.",
    icon: "🌟",
    accent: "from-emerald-400/25 to-cyan-500/10",
  },
  {
    slug: "assessment-centres",
    title: "Assessment Centres Guide",
    category: "Assessment Centres",
    description:
      "Understand case studies, presentations, group tasks, and how assessors evaluate candidates.",
    icon: "🏢",
    accent: "from-orange-400/25 to-yellow-500/10",
  },
  {
    slug: "final-interviews",
    title: "Final Interviews Guide",
    category: "Final Interviews",
    description:
      "Prepare for technical and behavioural final rounds with frameworks, examples, and strategy.",
    icon: "🏆",
    accent: "from-fuchsia-400/25 to-violet-500/10",
  },
]

const filters = [
  "All",
  "Finding Opportunities",
  "CV & ATS",
  "Video Interviews",
  "Assessment Centres",
  "Final Interviews",
]

export default function GuidesPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesFilter =
        activeFilter === "All" || guide.category === activeFilter

      const matchesSearch =
        guide.title.toLowerCase().includes(search.toLowerCase()) ||
        guide.category.toLowerCase().includes(search.toLowerCase()) ||
        guide.description.toLowerCase().includes(search.toLowerCase())

      return matchesFilter && matchesSearch
    })
  }, [search, activeFilter])

  const featuredGuide = filteredGuides[0]

  return (
   <main className="container-page scale-[0.85] origin-top">
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f1d45] via-[#0b1534] to-[#081126] px-8 py-10 md:px-12 md:py-14 mb-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 mb-6">
              ✦ Internity Guide Library
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              Your internship prep,
              <br />
              organised in one place
            </h1>

            <p className="muted text-lg md:text-xl max-w-2xl mt-6 leading-8">
              Browse structured guides for every key recruitment stage, from finding
              roles to final interviews. Search by topic and jump straight into what
              you need.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                5 core guides
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                Searchable
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                Built for applications
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-7">
            <p className="text-white/60 text-sm mb-3">Featured guide</p>

            {featuredGuide ? (
              <Link
                href={`/guides/${featuredGuide.slug}`}
                className={`block rounded-[24px] border border-white/10 bg-gradient-to-br ${featuredGuide.accent} p-6 hover:scale-[1.01] transition`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#101b3f] border border-white/10 flex items-center justify-center text-2xl">
                    {featuredGuide.icon}
                  </div>
                  <div className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-white/80">
                    {featuredGuide.category}
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold mt-5 leading-tight">
                  {featuredGuide.title}
                </h2>

                <p className="text-white/75 text-base leading-7 mt-3">
                  {featuredGuide.description}
                </p>

                <div className="mt-6 text-cyan-300 font-semibold">
                  Open featured guide →
                </div>
              </Link>
            ) : (
              <div className="rounded-[24px] border border-white/10 bg-[#0f1938] p-6">
                <p className="text-white/70">No guide matches your search right now.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid xl:grid-cols-[260px_1fr] gap-8">
        <aside className="xl:sticky xl:top-28 h-fit rounded-[28px] border border-white/10 bg-[#0c1635]/90 p-5">
          <h2 className="text-xl font-extrabold mb-5">Browse Guides</h2>

          <div className="space-y-3">
            {filters.map((filter) => {
              const active = activeFilter === filter

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`w-full text-left rounded-2xl px-4 py-3 transition font-semibold ${
                    active
                      ? "bg-cyan-400 text-black"
                      : "bg-[#111d3d] text-white/80 border border-[#21345d] hover:border-cyan-400/50 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/60 mb-2">Showing</p>
            <p className="text-2xl font-extrabold">{filteredGuides.length}</p>
            <p className="text-white/60 text-sm mt-1">matching guide(s)</p>
          </div>
        </aside>

        <div>
          <div className="rounded-[28px] border border-white/10 bg-[#0c1635]/90 p-5 md:p-6 mb-8">
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 text-lg">
                ⌕
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111d3d] border border-[#21345d] rounded-2xl pl-14 pr-5 py-4 outline-none text-white text-base"
                placeholder="Search guides, topics, interview stages..."
              />
            </div>
          </div>

          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredGuides.map((guide, index) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1733] p-6 md:p-7 hover:-translate-y-1 transition"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${guide.accent} opacity-70 pointer-events-none`}
                  />
                  <div className="absolute inset-[1px] rounded-[27px] bg-[#0d1733]" />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#162654] border border-white/10 flex items-center justify-center text-2xl">
                        {guide.icon}
                      </div>
                      <div className="text-white/40 text-sm font-semibold">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="inline-flex mt-5 rounded-full bg-[#1a2955] px-3 py-1 text-sm text-white/70">
                      {guide.category}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-extrabold mt-5 leading-tight group-hover:text-cyan-300 transition">
                      {guide.title}
                    </h2>

                    <p className="muted text-lg leading-8 mt-4 min-h-[120px]">
                      {guide.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-cyan-300 font-semibold">
                        Read guide
                      </span>
                      <span className="text-white/40 group-hover:translate-x-1 transition">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-white/10 bg-[#0c1635] p-10 text-center">
              <div className="text-4xl mb-3">🔎</div>
              <h3 className="text-2xl font-extrabold mb-3">No guides found</h3>
              <p className="muted text-lg">
                Try a different search or pick another category.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}