import Link from "next/link"
import { notFound } from "next/navigation"

const guides = {
  "finding-opportunities": {
    stage: "Finding Opportunities",
    title: "Finding Opportunities Guide",
    intro:
      "Learn where to find internships, how to track deadlines, and how to plan your applications throughout the year.",
    sections: [
      {
        heading: "Where to look",
        text: "Use company career pages, LinkedIn, Handshake, university portals, spring week trackers, student societies, and networking channels. Build a shortlist of firms by sector and application opening month.",
      },
      {
        heading: "How to stay organised",
        text: "Track role title, firm, opening date, deadline, application link, current stage, and notes. This stops you missing early deadlines and helps you prioritise the strongest opportunities first.",
      },
      {
        heading: "How to choose what to apply for",
        text: "Balance ambition with realism. Apply across a range of firms and sectors rather than only targeting the hardest names. A broad application strategy gives you more interview exposure and more optionality.",
      },
    ],
  },
  "cv-ats": {
    stage: "CV & ATS",
    title: "CV & ATS Guide",
    intro:
      "Learn how to build a clear, high-conviction CV that passes screening and presents your experience properly.",
    sections: [
      {
        heading: "What recruiters want",
        text: "A strong CV is concise, easy to scan, achievement-led, and tailored to the role. Focus on academics, relevant work experience, leadership, projects, and quantified impact.",
      },
      {
        heading: "How ATS screening works",
        text: "Applicant tracking systems scan for structure, keywords, and role relevance. Match language to the job description naturally and keep formatting clean and simple.",
      },
      {
        heading: "How to improve weak experience",
        text: "If you do not yet have high-level experience, use societies, virtual internships, part-time work, volunteering, and personal projects to demonstrate ownership, skills, and initiative.",
      },
    ],
  },
  "video-hirevue": {
    stage: "Video / HireVue Interviews",
    title: "Video / HireVue Interviews Guide",
    intro:
      "Prepare for recorded interviews with stronger structure, better delivery, and more confidence on camera.",
    sections: [
      {
        heading: "Question types",
        text: "Expect behavioural, motivational, commercial awareness, and situational questions. Build a bank of flexible STAR stories you can adapt quickly.",
      },
      {
        heading: "Answer structure",
        text: "Aim for answers that are clear and organised. A simple structure is point, example, impact, and reflection. Keep energy high and avoid sounding memorised.",
      },
      {
        heading: "Delivery",
        text: "Look at the camera, speak with intent, pause between points, and avoid rushing. Practising aloud matters more than silently planning answers.",
      },
    ],
  },
  "assessment-centres": {
    stage: "Assessment Centres",
    title: "Assessment Centres Guide",
    intro:
      "Understand the main exercises you may face and how to stand out across the whole day.",
    sections: [
      {
        heading: "Common formats",
        text: "Assessment centres may include group exercises, written tasks, case studies, presentations, interviews, and networking sessions.",
      },
      {
        heading: "What assessors look for",
        text: "They want teamwork, structure, judgement, communication, and professionalism. Being calm, collaborative, and commercially sensible usually matters more than dominating discussion.",
      },
      {
        heading: "How to prepare",
        text: "Practise reading case material quickly, summarising key points, speaking clearly under time pressure, and contributing useful ideas without over-speaking.",
      },
    ],
  },
  "final-interviews": {
    stage: "Final Interviews",
    title: "Final Interviews Guide",
    intro:
      "Prepare for final rounds with a sharper story, stronger commercial reasoning, and better interview control.",
    sections: [
      {
        heading: "What changes at final stage",
        text: "Final rounds often test depth rather than surface-level polish. You need stronger motivation, clearer examples, and better judgement under pressure.",
      },
      {
        heading: "Technical and behavioural prep",
        text: "Prepare role-specific technical foundations while also refining your key experiences, strengths, weaknesses, and motivations with strong examples.",
      },
      {
        heading: "How to leave a strong impression",
        text: "Be concise, thoughtful, and commercially aware. Ask sharp questions at the end and show real understanding of the team and role.",
      },
    ],
  },
} as const

type GuideSlug = keyof typeof guides

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = guides[slug as GuideSlug]

  if (!guide) {
    notFound()
  }

  return (
    <main className="container-page">
      <div className="max-w-4xl mx-auto">
        <Link href="/guides" className="text-cyan-300 inline-block mb-8">
          ← Back to Guides
        </Link>

        <div className="panel-soft p-8 md:p-10 text-sm md:text-base">
          <div className="inline-flex rounded-full bg-[#1b274b] px-4 py-2 text-sm text-white/70 mb-6">
            {guide.stage}
          </div>

         <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
            {guide.title}
          </h1>

          <p className="muted text-xl leading-8 mb-10">
            {guide.intro}
          </p>

          <div className="space-y-10">
            {guide.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold mb-3">
                  {section.heading}
                </h2>
               <p className="text-white/75 text-base leading-7">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          <div className="panel mt-12 p-8 text-center border border-cyan-400/40">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-3xl font-extrabold mb-4">
              Create a free account to continue
            </h3>
            <p className="muted text-lg max-w-2xl mx-auto">
              Sign up for free to unlock the rest of this guide, deeper examples,
              full walkthroughs, and future Internity member content.
            </p>
            <button className="btn-primary mt-8 text-lg">
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}