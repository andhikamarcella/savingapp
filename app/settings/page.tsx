'use client'

import Link from 'next/link'
import { useSavingsStore } from '@/store/useSavingsStore'
import { LanguageToggle } from '@/components/LanguageToggle'
import { ThemeToggle } from '@/components/ThemeToggle'
import { requestNotificationPermission, startReminder, stopReminder } from '@/lib/reminderScheduler'
import { motion } from 'framer-motion'
import { t } from '@/lib/i18n'

export default function SettingsPage() {
  const language = useSavingsStore((s) => s.language)
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
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-100 p-4 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-3xl space-y-6 rounded-3xl bg-white/80 p-6 shadow-soft backdrop-blur-md dark:bg-slate-900/80"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{t('settings', language)}</h1>
          <div className="flex gap-2"><LanguageToggle /><ThemeToggle /></div>
        </div>

        <section className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 dark:border-slate-800/50 dark:bg-slate-800/20">
          <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Reminder Settings</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <select className="input max-w-[200px]" value={reminderFrequency} onChange={(e) => setReminder(reminderEnabled, e.target.value as 'daily' | 'weekly' | 'monthly')}>
              <option value="daily">{t('daily', language)}</option>
              <option value="weekly">{t('weekly', language)}</option>
              <option value="monthly">{t('monthly', language)}</option>
            </select>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${reminderEnabled ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700'}`}
                onClick={async () => {
                  const p = await requestNotificationPermission()
                  if (p === 'granted') {
                    setReminder(true, reminderFrequency)
                    startReminder(reminderFrequency, language)
                  }
                }}>{t('enableReminder', language)}</button>
              <button className="btn-secondary" onClick={() => { setReminder(false, reminderFrequency); stopReminder() }}>Disable</button>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Active Goals</h2>
          {active.map((g) => (
            <div key={g.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700/50 dark:bg-slate-800/50">
              <span className="font-medium">{g.emoji} {g.title}</span>
              <div className="flex gap-2">
                <button className="btn-secondary text-xs py-1" onClick={() => archiveGoal(g.id)}>Archive</button>
                <button className="rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/50" onClick={() => deleteGoal(g.id)}>Delete</button>
              </div>
            </div>
          ))}
          {!active.length && <p className="text-sm text-slate-500 italic">No active goals.</p>}
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-lg text-slate-800 dark:text-slate-200">Archive</h2>
          {archived.map((g) => (
            <div key={g.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700/50 dark:bg-slate-800/50 opacity-75 grayscale hover:grayscale-0 transition-all">
              <span className="font-medium line-through">{g.emoji} {g.title}</span>
              <button className="btn-secondary text-xs py-1" onClick={() => restoreGoal(g.id)}>Restore</button>
            </div>
          ))}
          {!archived.length && <p className="text-sm text-slate-500 italic">No archived goals.</p>}
        </section>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link href="/privacy" className="text-sm font-medium text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">{t('privacyPolicy', language)}</Link>
          <Link href="/terms" className="text-sm font-medium text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">{t('termsUse', language)}</Link>
          <Link href="/" className="ml-auto btn-secondary">{t('back', language)}</Link>
        </div>
      </motion.div>
    </main>
  )
}
