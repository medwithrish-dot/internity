import UpgradeButton from "@/components/UpgradeButton"

import Link from "next/link"

export default function PricingPage() {
  return (
    <main className="container-page max-w-6xl space-y-10">
      <section className="text-center max-w-3xl mx-auto pt-4">
        <div className="inline-flex rounded-full bg-[#111d3d] border border-white/10 px-4 py-1 text-sm text-cyan-300 mb-4">
          Internity Premium
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Choose the plan that fits your internship prep
        </h1>

        <p className="text-white/65 mt-4 text-lg leading-8">
          Start free, then upgrade when you want more questions, deeper analytics,
          and premium practice features.
        </p>
      </section>

      <section className="grid lg:grid-cols-2 gap-6 items-stretch">
        <div className="rounded-3xl border border-white/10 bg-[#0d1733] p-6">
          <div className="mb-6">
            <p className="text-white/50 text-sm mb-2">Current option</p>
            <h2 className="text-2xl font-extrabold">Free</h2>
            <p className="text-white/65 mt-2">A solid start for trying Internity.</p>
          </div>

          <div className="mb-6">
            <p className="text-4xl font-extrabold">£0</p>
            <p className="text-white/50 mt-1">No payment needed</p>
          </div>

          <div className="space-y-3 text-white/80">
            <div className="rounded-xl border border-white/10 bg-[#111d3d] px-4 py-3">
              Access to selected practice questions
            </div>
            <div className="rounded-xl border border-white/10 bg-[#111d3d] px-4 py-3">
              Basic dashboard stats
            </div>
            <div className="rounded-xl border border-white/10 bg-[#111d3d] px-4 py-3">
              Try timed and untimed practice
            </div>
            <div className="rounded-xl border border-white/10 bg-[#111d3d] px-4 py-3">
              Limited premium content
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/practice"
              className="block w-full rounded-xl border border-white/10 bg-[#111d3d] px-5 py-3 text-center font-bold hover:border-white/25 transition"
            >
              Continue on Free
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-400/30 bg-[linear-gradient(180deg,rgba(34,211,238,0.08)_0%,rgba(124,92,255,0.10)_100%)] p-6 relative overflow-hidden">
          <div className="absolute top-4 right-4 rounded-full bg-cyan-400 text-black px-3 py-1 text-xs font-extrabold">
            Recommended
          </div>

          <div className="mb-6">
            <p className="text-cyan-300 text-sm mb-2">Upgrade option</p>
            <h2 className="text-2xl font-extrabold">Premium</h2>
            <p className="text-white/75 mt-2">
              Built for students who want a more complete prep experience.
            </p>
          </div>

          <div className="mb-6">
            <p className="text-4xl font-extrabold">£5.99<span className="text-lg text-white/55">/month</span></p>
            <p className="text-white/50 mt-1">Change this later to your real price</p>
          </div>

          <div className="space-y-3 text-white/90">
            <div className="rounded-xl border border-cyan-400/20 bg-[#111d3d]/80 px-4 py-3">
              FULL access to PREMIUM question banks
            </div>
            <div className="rounded-xl border border-cyan-400/20 bg-[#111d3d]/80 px-4 py-3">
              Access to AI interview help
            </div>
            <div className="rounded-xl border border-cyan-400/20 bg-[#111d3d]/80 px-4 py-3">
              Better ANALYTICS and PROGRESS tracking
            </div>
            <div className="rounded-xl border border-cyan-400/20 bg-[#111d3d]/80 px-4 py-3">
              Smarter mixed practice and revision tools
            </div>
            <div className="rounded-xl border border-cyan-400/20 bg-[#111d3d]/80 px-4 py-3">
              Future premium features as Internity grows
            </div>
          </div>

          <div className="mt-6 space-y-3">
  <UpgradeButton />

  <p className="text-white/50 text-sm text-center">
    Secure checkout powered by Stripe.
  </p>
</div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#0d1733] p-6">
        <h3 className="text-2xl font-extrabold mb-4 text-center">
          Compare plans
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="py-4 pr-4">Feature</th>
                <th className="py-4 pr-4">Free</th>
                <th className="py-4">Premium</th>
              </tr>
            </thead>
            <tbody className="text-white/85">
              <tr className="border-b border-white/10">
                <td className="py-4 pr-4">Practice questions</td>
                <td className="py-4 pr-4">Limited</td>
                <td className="py-4">Full access</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-4 pr-4">Timed / untimed practice</td>
                <td className="py-4 pr-4">Yes</td>
                <td className="py-4">Yes</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-4 pr-4">Performance tracking</td>
                <td className="py-4 pr-4">Basic</td>
                <td className="py-4">Advanced</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-4 pr-4">Premium-only content</td>
                <td className="py-4 pr-4">No</td>
                <td className="py-4">Yes</td>
              </tr>
              <tr>
                <td className="py-4 pr-4">Future premium tools</td>
                <td className="py-4 pr-4">No</td>
                <td className="py-4">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}