export default function VideoInterviewPage() {
  return (
    <main className="container-page">
      <section className="text-center py-14">
        <div className="badge-teal inline-flex mb-6">Video Interview Practice</div>
        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight max-w-6xl mx-auto">
          Master Your Video Interview
          <br />
          Performance
        </h1>
        <p className="muted text-2xl max-w-4xl mx-auto mt-8">
          Study expert guides, practise with real questions, and get AI-powered
          feedback on your clarity, confidence, structure, and communication.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <button className="btn-primary text-lg">Read the Guide</button>
          <button className="btn-secondary text-lg">Start Practising</button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="panel-soft p-6">
          <h3 className="card-title mb-3">Answer structure</h3>
          <p className="muted text-lg">
            Aim for 60–90 seconds — enough to be thorough without rambling.
          </p>
        </div>
        <div className="panel-soft p-6">
          <h3 className="card-title mb-3">Common question types</h3>
          <p className="muted text-lg">
            Behavioural, motivational, and situational prompts. Prepare STAR stories.
          </p>
        </div>
        <div className="panel-soft p-6">
          <h3 className="card-title mb-3">Delivery</h3>
          <p className="muted text-lg">
            Vary your tone, maintain eye contact, and treat it like a real interview.
          </p>
        </div>
      </section>

      <section className="panel-soft text-center p-10 md:p-14 mt-12 max-w-5xl mx-auto">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-4xl font-extrabold mb-4">Create a free account to continue</h2>
        <p className="muted text-xl max-w-3xl mx-auto">
          Sign up for free to access the full video interview guide, including
          advanced tips on HireVue AI scoring, handling nerves, and turning
          weaknesses into strengths.
        </p>
        <button className="btn-primary mt-8 text-lg">Create Free Account</button>
      </section>
    </main>
  )
}
