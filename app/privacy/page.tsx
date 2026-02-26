import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-4 dark:bg-slate-950">
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <h1 className="mb-3 text-2xl font-bold">Privacy Policy</h1>
        <p className="text-sm">All app data is stored locally in your browser via LocalStorage. No backend sync is used in this version.</p>
        <Link href="/" className="btn-secondary mt-4 inline-block">Back</Link>
      </section>
    </main>
  )
}
