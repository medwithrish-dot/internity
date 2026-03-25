import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-[#07143a]/90 backdrop-blur border-b border-white/10">
      <Link href="/" className="flex items-center">
        <img
          src="/internity-logo.png"
          alt="Internity"
          className="h-18 w-auto"
        />
      </Link>

      <div className="flex gap-8 text-sm text-white/80 items-center">
        <a
          href="/#my-internship-journey"
          className="text-cyan-300 font-semibold hover:text-cyan-200 transition"
        >
          Journey
        </a>
        <Link href="/practice">Practice</Link>
        <Link href="/video-interview">Video Interview</Link>
        <Link href="/tutors">Tutors</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  )
}