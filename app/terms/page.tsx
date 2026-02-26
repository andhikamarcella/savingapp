import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-4 dark:bg-slate-950">
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <h1 className="mb-3 text-2xl font-bold">Terms of Use</h1>
        <p className="text-sm">Money Saving Planner Pro is a planning tool and does not constitute financial advice.</p>
        <Link href="/" className="btn-secondary mt-4 inline-block">Back</Link>
      </section>
    </main>
  )
}
