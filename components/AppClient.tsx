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

export const AppClient = () => {
  const goals = useSavingsStore((s) => s.goals)
  const activeGoalId = useSavingsStore((s) => s.activeGoalId)
  const createGoal = useSavingsStore((s) => s.createGoal)
  const setPlanType = useSavingsStore((s) => s.setPlanType)
  const addTransaction = useSavingsStore((s) => s.addTransaction)
  const theme = useSavingsStore((s) => s.theme)
  const reminderEnabled = useSavingsStore((s) => s.reminderEnabled)
  const reminderFrequency = useSavingsStore((s) => s.reminderFrequency)
  const setReminder = useSavingsStore((s) => s.setReminder)
  const [formType, setFormType] = useState<'deposit' | 'withdraw' | null>(null)

  const activeGoal = goals.find((g) => g.id === activeGoalId && !g.archived) ?? goals.find((g) => !g.archived)

  useEffect(() => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', isDark)
  }, [theme])

  useEffect(() => {
    if (!reminderEnabled) {
      stopReminder()
      return
    }
    startReminder(reminderFrequency)
  }, [reminderEnabled, reminderFrequency])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-100 p-4 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-4xl space-y-4">
        <header className="rounded-3xl bg-white p-4 shadow-soft dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-2xl font-bold">Money Saving Planner Pro</h1>
            <div className="flex gap-2"><LanguageToggle /><ThemeToggle /></div>
          </div>
          <nav className="mt-3 flex flex-wrap gap-2 text-sm">
            <Link className="btn-secondary" href="/">Dashboard</Link>
            <Link className="btn-secondary" href="/create">Create</Link>
            <Link className="btn-secondary" href="/settings">Settings</Link>
            <Link className="btn-secondary" href="/privacy">Privacy</Link>
            <Link className="btn-secondary" href="/terms">Terms</Link>
            <button className="btn-secondary" onClick={async () => {
              const permission = await requestNotificationPermission()
              if (permission === 'granted') setReminder(true, reminderFrequency)
            }}>Enable Reminder</button>
          </nav>
        </header>

        {!activeGoal && <GoalWizard onDone={createGoal} />}

        {activeGoal && (
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
