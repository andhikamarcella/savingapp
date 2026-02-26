import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Money Saving Planner Pro',
  description: 'Modern savings planner with local-first tracking and planning.',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
