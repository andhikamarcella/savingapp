'use client'

import Link from 'next/link'
import { useSavingsStore } from '@/store/useSavingsStore'
import { LanguageToggle } from '@/components/LanguageToggle'
import { ThemeToggle } from '@/components/ThemeToggle'
import { requestNotificationPermission, startReminder, stopReminder } from '@/lib/reminderScheduler'
import { motion } from 'framer-motion'
import { t } from '@/lib/i18n'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Tabs } from '@/components/ui/Tabs'
import { Accordion } from '@/components/ui/Accordion'

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
    <main className="min-h-screen bg-hk-50 p-4 dark:bg-slate-950 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-3xl space-y-6 rounded-3xl bg-white/80 p-6 shadow-sm border border-hk-100 backdrop-blur-md dark:bg-slate-900/80 dark:border-pink-900/50"
      >
        <Breadcrumbs items={[{ label: t('settings', language) }]} />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-hk-600 to-hk-400 dark:from-hk-400 dark:to-hk-200 bg-clip-text text-transparent">{t('settings', language)}</h1>
          <div className="flex gap-2"><LanguageToggle /><ThemeToggle /></div>
        </div>

        <section className="space-y-4 rounded-3xl border-2 border-hk-200 bg-hk-50/50 p-6 dark:border-pink-900/50 dark:bg-slate-800/40">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200">Reminder Settings</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="max-w-[300px] w-full">
              <Tabs
                options={[
                  { label: t('daily', language), value: 'daily' },
                  { label: t('weekly', language), value: 'weekly' },
                  { label: t('monthly', language), value: 'monthly' },
                ]}
                activeValue={reminderFrequency}
                onChange={(val) => setReminder(reminderEnabled, val as 'daily' | 'weekly' | 'monthly')}
              />
            </div>
            <div className="flex gap-2 items-center">
              <button
                className={`px-4 py-2.5 rounded-2xl text-sm font-bold shadow-sm transition-all ${reminderEnabled ? 'bg-hk-500 text-white shadow-[0_4px_14px_0_rgba(236,72,153,0.39)]' : 'bg-white border-2 border-hk-200 text-slate-700 hover:bg-hk-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:border-pink-900'}`}
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
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200">Active Goals</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {active.map((g) => (
              <div key={g.id} className="flex flex-col gap-3 rounded-2xl border-2 border-hk-100 bg-white p-4 shadow-sm transition-all hover:shadow-[0_8px_30px_rgb(236,72,153,0.12)] hover:border-hk-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-pink-900">
                <span className="font-bold text-lg">{g.emoji} {g.title}</span>
                <div className="flex gap-2 mt-auto">
                  <button className="btn-secondary flex-1 text-xs py-2" onClick={() => archiveGoal(g.id)}>Archive</button>
                  <button className="rounded-xl flex-1 bg-hk-red-50 border-2 border-hk-red-200 px-3 py-2 text-xs font-bold text-hk-red-600 transition hover:bg-hk-red-100 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/50" onClick={() => deleteGoal(g.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {!active.length && <p className="text-sm text-slate-500 italic">No active goals.</p>}
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200">Archive</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {archived.map((g) => (
              <div key={g.id} className="flex flex-col gap-3 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 opacity-75 grayscale hover:grayscale-0 transition-all">
                <span className="font-bold text-lg line-through text-slate-500">{g.emoji} {g.title}</span>
                <button className="btn-secondary mt-auto text-xs py-2" onClick={() => restoreGoal(g.id)}>Restore</button>
              </div>
            ))}
          </div>
          {!archived.length && <p className="text-sm text-slate-500 italic">No archived goals.</p>}
        </section>

        <section className="space-y-3 pt-4">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200">FAQ & Information</h2>
          <Accordion
            items={[
              {
                id: '1',
                title: 'How does local storage work?',
                content: 'Everything is saved directly on your device. We do not use any servers so your data is 100% private and secure.'
              },
              {
                id: '2',
                title: 'Can I change the display language?',
                content: 'Yes! Use the language toggle button at the top of the settings page to switch between available languages like English and Indonesian.'
              },
              {
                id: '3',
                title: 'What does deleting a goal do?',
                content: 'Deleting a goal will permanently erase its history and transactions. If you just want to hide it, considering Archiving it instead.'
              }
            ]}
          />
        </section>

        <div className="flex flex-wrap items-center gap-4 pt-6 border-t-2 border-hk-100 dark:border-pink-900/50">
          <Link href="/privacy" className="text-sm font-bold text-slate-500 hover:text-hk-600 dark:text-slate-400 dark:hover:text-hk-400 transition-colors">{t('privacyPolicy', language)}</Link>
          <Link href="/terms" className="text-sm font-bold text-slate-500 hover:text-hk-600 dark:text-slate-400 dark:hover:text-hk-400 transition-colors">{t('termsUse', language)}</Link>
          <Link href="/" className="ml-auto btn-secondary">{t('back', language)}</Link>
        </div>
      </motion.div>
    </main>
  )
}
