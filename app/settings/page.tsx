'use client'

import Link from 'next/link'
import { useSavingsStore } from '@/store/useSavingsStore'
import { LanguageToggle } from '@/components/LanguageToggle'
import { ThemeToggle } from '@/components/ThemeToggle'
import { requestNotificationPermission, startReminder, stopReminder } from '@/lib/reminderScheduler'

export default function SettingsPage() {
  const goals = useSavingsStore((s) => s.goals)
  const archiveGoal = useSavingsStore((s) => s.archiveGoal)
  const restoreGoal = useSavingsStore((s) => s.restoreGoal)
  const deleteGoal = useSavingsStore((s) => s.deleteGoal)
  const reminderEnabled = useSavingsStore((s) => s.reminderEnabled)
  const reminderFrequency = useSavingsStore((s) => s.reminderFrequency)
  const setReminder = useSavingsStore((s) => s.setReminder)

  const archived = goals.filter((g) => g.archived)
  const active = goals.filter((g) => !g.archived)

  return (
    <main className="min-h-screen bg-slate-100 p-4 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl space-y-4 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex gap-2"><LanguageToggle /><ThemeToggle /></div>

        <section className="space-y-2">
          <h2 className="font-semibold">Reminder</h2>
          <select className="input" value={reminderFrequency} onChange={(e) => setReminder(reminderEnabled, e.target.value as 'daily' | 'weekly' | 'monthly')}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={async () => {
              const p = await requestNotificationPermission()
              if (p === 'granted') {
                setReminder(true, reminderFrequency)
                startReminder(reminderFrequency)
              }
            }}>Enable Reminder</button>
            <button className="btn-secondary" onClick={() => { setReminder(false, reminderFrequency); stopReminder() }}>Disable Reminder</button>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold">Active Goals</h2>
          {active.map((g) => <div key={g.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700"><span>{g.emoji} {g.title}</span><div className="flex gap-2"><button className="btn-secondary" onClick={() => archiveGoal(g.id)}>Archive</button><button className="btn-secondary" onClick={() => deleteGoal(g.id)}>Delete</button></div></div>)}
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold">Archive</h2>
          {archived.map((g) => <div key={g.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700"><span>{g.emoji} {g.title}</span><button className="btn-secondary" onClick={() => restoreGoal(g.id)}>Restore</button></div>)}
          {!archived.length && <p className="text-sm text-slate-500">No archived goals.</p>}
        </section>

        <div className="flex gap-2"><Link href="/privacy" className="btn-secondary">Privacy Policy</Link><Link href="/terms" className="btn-secondary">Terms of Use</Link><Link href="/" className="btn-secondary">Back</Link></div>
      </div>
    </main>
  )
}
