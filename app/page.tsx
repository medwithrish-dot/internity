import Link from "next/link"
import PremiumBanner from "@/components/PremiumBanner"
import StageAccordion from "@/components/StageAccordion"

export default function Home() {
  return (
    <main className="container-page">
     <section className="text-center pt-8 pb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl mx-auto">
          Land Your Dream Internship
          <br />
          With Confidence
        </h1>

        <p className="muted text-xl max-w-3xl mx-auto mt-6">
          From finding opportunities to final interviews — Internity gives you structured
          guides, AI-powered practice, and analytics to help you secure top graduate schemes.
        </p>

       <div className="flex justify-center gap-4 mt-8">
  <Link href="/signup" className="btn-primary text-lg">
    Start for Free
  </Link>

  <Link href="/practice" className="btn-secondary text-lg">
    Try Practice Questions
  </Link>
</div>

        <div className="grid md:grid-cols-3 gap-8 mt-14 text-center">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold">Ace interviews</h3>
            <p className="muted mt-2 text-base md:text-lg">AI-powered feedback</p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold">Smash online assessments</h3>
            <p className="muted mt-2 text-base md:text-lg">100&apos;s of practice questions</p>
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold">Maximise potential</h3>
            <p className="muted mt-2 text-base md:text-lg">Analytics dashboard</p>
          </div>
        </div>
      </section>

      <section className="mt-20 panel-soft p-8 md:p-10">
        <h2 className="section-title mb-4">Who are we?</h2>
        <p className="text-white/75 text-lg leading-8 max-w-5xl">
          Internity is an internship preparation platform built to help students
          navigate every stage of the recruitment process with confidence. We combine
          practical guidance, structured question banks, interview preparation, tutor
          support, and performance analytics in one place. Our aim is to make internship
          preparation feel clear, focused, and accessible — whether you are applying
          for finance, consulting, law, or technology roles.
        </p>
      </section>

      <section id="my-internship-journey" className="mt-16 scroll-mt-28">
        <h2 className="section-title text-center">Your Complete Internship Journey</h2>

        <p className="muted text-center text-xl max-w-3xl mx-auto mt-5 mb-12">
          Follow each stage from first applications to final offers. Click each stage
          to learn more.
        </p>

        <div className="space-y-4">
          <StageAccordion
            stage="Stage 1"
            icon="🔍"
            title="Finding Opportunities"
            description="Learn where to find internships, spring weeks, open days, and graduate pathways. This section helps users understand where to apply, how to track deadlines, and how to plan applications throughout the year."
            guideHref="/guides/finding-opportunities"
            guideLabel="the Finding Opportunities guide"
          />

         <StageAccordion
  stage="Stage 2"
  icon="📄"
  title="CV & ATS Screening"
  description="Understand how to build a strong CV, pass automated screening systems, and present your experience effectively. This stage can also include CV examples, a breakdown of strong applications, and paid CV review support."
  guideHref="/guides/cv-ats"
  guideLabel="the CV & ATS guide"
  showCvForm
/>

          <StageAccordion
            stage="Stage 3"
            icon="🌟"
            title="Online Assessments"
            premium
            description="Practise numerical, logical, verbal, situational judgement, and coding-style questions. This is the core section of Internity and should be the most important feature of the platform. Users improve through repeated practice, explanations, and later analytics."
            practiceHref="/practice"
            practiceLabel="Go to Practice Questions"
          />

          <StageAccordion
            stage="Stage 4"
            icon="🌟"
            title="Video / HireVue Interviews"
            premium
            description="Prepare for recorded interviews by learning structure, confidence, delivery, and question strategy. This stage can include guides, practice prompts, and later AI-based feedback on clarity, pacing, and communication."
            guideHref="/guides/video-hirevue"
            guideLabel="the Video / HireVue guide"
            videoHref="/video-interview"
            videoLabel="Go to Video Interview Practice"
          />

          <StageAccordion
            stage="Stage 5"
            icon="🏢"
            title="Assessment Centres"
            description="Get guidance on group exercises, case studies, presentations, and how to stand out in group settings. This stage helps users understand what assessors actually look for beyond technical knowledge."
            guideHref="/guides/assessment-centres"
            guideLabel="the Assessment Centres guide"
          />

          <StageAccordion
            stage="Stage 6"
            icon="🏆"
            title="Final Interviews"
            description="Prepare for technical and behavioural interviews with frameworks, common questions, and targeted guidance. This stage helps users refine final-stage performance and improve their confidence under pressure."
            guideHref="/guides/final-interviews"
            guideLabel="the Final Interviews guide"
          />
        </div>
      </section>

      <section className="mt-20">
        <PremiumBanner />
      </section>
    </main>
  )
}