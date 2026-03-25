export default function PremiumBanner() {
  return (
    <section className="panel border-cyan-400/70 border-2 p-8 md:p-10 grid md:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
      <div>
        <div className="badge-teal inline-flex mb-6">Premium Membership</div>
        <h2 className="section-title mb-4">Unlock Your Full Potential</h2>
        <p className="muted text-xl max-w-3xl mb-8">
          Get unlimited practice questions, timed mock assessments, AI-powered
          video interview feedback, and full analytics.
        </p>

        <div className="space-y-4 text-lg">
          <div>✓ Questions across all assessment sections</div>
          <div>✓ Timed mock tests with answer explanations</div>
          <div>✓ AI interview feedback on communication and clarity</div>
          <div>✓ Full historical analytics and progress tracking</div>
        </div>
      </div>

      <div className="text-center">
        <div className="panel-soft p-8 rounded-3xl">
          <div className="muted mb-3 text-lg">Monthly</div>
          <div className="text-6xl font-extrabold mb-3">£5.99</div>
          <div className="muted text-lg">per month, cancel anytime</div>
        </div>

        <button className="mt-8 text-green-400 font-extrabold text-2xl">
          Upgrade to Premium
        </button>
        <p className="muted mt-3">No commitment. Cancel in one click.</p>
      </div>
    </section>
  )
}
