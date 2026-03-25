const tutors = [
  {
    name: 'Sunita Raventhiran',
    company: 'JP Morgan Chase',
    text: 'Technology analyst intern at JP Morgan; cleared coding tests and video interview rounds.',
  },
  {
    name: 'Felix Brandt-Karlsson',
    company: 'McKinsey & Company',
    text: 'Business analyst intern; completed assessment centre processes at multiple top firms.',
  },
  {
    name: 'Amara Osei-Bonsu',
    company: 'Goldman Sachs',
    text: 'Placed in top 5% of cohort; passed SHL numerical and verbal tests first attempt.',
  },
]

export default function TutorsPage() {
  return (
    <main className="container-page">
      <section className="text-center py-14">
        <div className="badge-teal inline-flex mb-6">Expert Mentors & Coaches</div>
        <h1 className="text-6xl font-extrabold leading-tight">
          Find Your Perfect
          <br />
          Internship Mentor
        </h1>
        <p className="muted text-2xl max-w-4xl mx-auto mt-6">
          Connect with tutors who&apos;ve landed roles at top firms. Get personalised
          guidance on CVs, assessments, and interviews.
        </p>

        <div className="flex justify-center gap-14 mt-10 text-center">
          <div>
            <div className="text-4xl font-extrabold text-[#7c5cff]">50+</div>
            <div className="muted">Expert Mentors</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-[#7c5cff]">30+</div>
            <div className="muted">Top Employers</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-[#7c5cff]">1,200+</div>
            <div className="muted">Sessions Booked</div>
          </div>
        </div>
      </section>

      <div className="panel-soft p-5 mb-8 flex gap-4 flex-col md:flex-row">
        <input
          className="flex-1 bg-[#111d3d] border border-[#21345d] rounded-xl px-5 py-4 outline-none"
          placeholder="e.g. Goldman Sachs, Oxford, Software Engineer..."
        />
        <select className="bg-[#111d3d] border border-[#21345d] rounded-xl px-5 py-4 min-w-[180px]">
          <option>All Areas</option>
        </select>
        <button className="btn-primary">Apply Filters</button>
      </div>

      <h2 className="text-4xl font-extrabold mb-6">Browse Mentors</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <div key={tutor.name} className="panel-soft p-5">
            <div className="bg-[#d9d9d9] rounded-2xl h-56 mb-5" />
            <h3 className="card-title">{tutor.name}</h3>
            <p className="muted mt-1">{tutor.company}</p>
            <p className="text-yellow-400 mt-3">★★★★★ <span className="text-white/70 text-sm">5.0</span></p>
            <p className="muted mt-4">{tutor.text}</p>

            <div className="flex flex-wrap gap-2 mt-4 text-sm">
              <span className="rounded-full bg-[#1b274b] px-3 py-1">CV Writing</span>
              <span className="rounded-full bg-[#1b274b] px-3 py-1">Numerical Reasoning</span>
              <span className="rounded-full bg-[#1b274b] px-3 py-1">Final Interviews</span>
            </div>

            <button className="btn-primary w-full mt-6">View Profile & Book</button>
          </div>
        ))}
      </div>
    </main>
  )
}
