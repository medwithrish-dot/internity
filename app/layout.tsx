import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Internity',
  description: 'Internship prep platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-[#030b24] text-white min-h-screen text-sm">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
