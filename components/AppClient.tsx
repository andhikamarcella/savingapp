'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GoalWizard } from './GoalWizard'
import { PlanSelector } from './PlanSelector'
import { DashboardCard } from './DashboardCard'
import { Timeline } from './Timeline'
import { TransactionForm } from './TransactionForm'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import { exportGoalPDF } from './ExportPDFButton'
import { useSavingsStore } from '@/store/useSavingsStore'
import { requestNotificationPermission, startReminder, stopReminder } from '@/lib/reminderScheduler'
import { t } from '@/lib/i18n'

export const AppClient = ({ forceCreate }: { forceCreate?: boolean }) => {
  const goals = useSavingsStore((s) => s.goals)
  const activeGoalId = useSavingsStore((s) => s.activeGoalId)
  const createGoal = useSavingsStore((s) => s.createGoal)
  const setPlanType = useSavingsStore((s) => s.setPlanType)
  const addTransaction = useSavingsStore((s) => s.addTransaction)
  const theme = useSavingsStore((s) => s.theme)
  const language = useSavingsStore((s) => s.language)
  const reminderEnabled = useSavingsStore((s) => s.reminderEnabled)
  const reminderFrequency = useSavingsStore((s) => s.reminderFrequency)
  const setReminder = useSavingsStore((s) => s.setReminder)
  const [formType, setFormType] = useState<'deposit' | 'withdraw' | null>(null)

  const activeGoal = goals.find((g) => g.id === activeGoalId && !g.archived) ?? goals.find((g) => !g.archived)

  useEffect(() => {
    if (!reminderEnabled) {
      stopReminder()
      return
    }
    startReminder(reminderFrequency, language)
  }, [reminderEnabled, reminderFrequency, language])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-gold-100 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-4xl space-y-5">
        <header className="rounded-3xl bg-white/60 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white/40 dark:border-slate-800/60 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-500 to-gold-600 dark:from-gold-300 dark:to-gold-100 bg-clip-text text-transparent drop-shadow-sm">{t('title', language)}</h1>
            <div className="flex gap-2"><LanguageToggle /><ThemeToggle /></div>
          </div>
          <nav className="mt-4 flex flex-wrap gap-2 text-sm">
            <Link className="btn-secondary dark:text-slate-200 dark:hover:bg-slate-800" href="/">{t('dashboard', language)}</Link>
            <Link className="btn-secondary dark:text-slate-200 dark:hover:bg-slate-800" href="/create">{t('create', language)}</Link>
            <Link className="btn-secondary dark:text-slate-200 dark:hover:bg-slate-800" href="/settings">{t('settings', language)}</Link>
            <Link className="btn-secondary dark:text-slate-200 dark:hover:bg-slate-800" href="/privacy">{t('privacy', language)}</Link>
            <Link className="btn-secondary dark:text-slate-200 dark:hover:bg-slate-800" href="/terms">{t('terms', language)}</Link>
            <button
              className={`px-4 py-2 rounded-xl font-medium transition ${reminderEnabled ? 'bg-gold-100 text-gold-800 dark:bg-gold-900/40 dark:text-gold-300 dark:border dark:border-gold-800/50' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'}`}
              onClick={async () => {
                if (reminderEnabled) {
                  setReminder(false, reminderFrequency)
                } else {
                  const permission = await requestNotificationPermission()
                  if (permission === 'granted') setReminder(true, reminderFrequency)
                  else alert("Notification permission denied")
                }
              }}>
              {reminderEnabled ? t('reminderEnabled', language) : t('enableReminder', language)}
            </button>
          </nav>
        </header>

        {(!activeGoal || forceCreate) && (
          <GoalWizard onDone={(goal) => {
            createGoal(goal)
            if (forceCreate) window.location.href = '/'
          }} />
        )}

        {activeGoal && !forceCreate && (
          <>
            <PlanSelector goal={activeGoal} onSelect={(plan) => setPlanType(activeGoal.id, plan)} />
            <DashboardCard
              goal={activeGoal}
              onDeposit={() => setFormType('deposit')}
              onWithdraw={() => setFormType('withdraw')}
              onExport={() => exportGoalPDF(activeGoal)}
            />
            {formType && <TransactionForm type={formType} onSubmit={(tx) => { addTransaction(activeGoal.id, tx); setFormType(null) }} />}
            <Timeline currency={activeGoal.currency} transactions={activeGoal.transactions} />
          </>
        )}
      </div>
    </main>
  )
}
