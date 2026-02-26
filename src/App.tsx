import { useMemo, useState } from 'react'
import { DashboardCard } from './components/DashboardCard'
import { GoalWizard } from './components/GoalWizard'
import { PlanSelection } from './components/PlanSelection'
import { ThemeLanguageBar } from './components/ThemeLanguageBar'
import { Timeline } from './components/Timeline'
import { TransactionForm } from './components/TransactionForm'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { SettingsPage } from './pages/SettingsPage'
import { TermsPage } from './pages/TermsPage'
import { usePlannerStore } from './store/usePlannerStore'

export const App = () => {
  const goal = usePlannerStore((s) => s.goal)
  const saveGoal = usePlannerStore((s) => s.saveGoal)
  const setPlanType = usePlannerStore((s) => s.setPlanType)
  const addTransaction = usePlannerStore((s) => s.addTransaction)
  const transactions = usePlannerStore((s) => s.transactions)
  const theme = usePlannerStore((s) => s.theme)
  const [tab, setTab] = useState<'home' | 'settings' | 'privacy' | 'terms'>('home')
  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark)

  const savedAmount = useMemo(
    () => transactions.reduce((sum, tx) => sum + (tx.type === 'deposit' ? tx.amount : -tx.amount), 0),
    [transactions],
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-100 p-4 text-slate-800 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        <header className="space-y-3">
          <h1 className="text-2xl font-bold">Money Saving Planner</h1>
          <ThemeLanguageBar />
          <nav className="flex gap-2 text-sm">
            <button className="btn-secondary" onClick={() => setTab('home')}>Home</button>
            <button className="btn-secondary" onClick={() => setTab('settings')}>Settings</button>
          </nav>
        </header>

        {tab === 'home' && !goal && <GoalWizard onComplete={saveGoal} />}

        {tab === 'home' && goal && (
          <>
            <PlanSelection goal={goal} onSelect={setPlanType} />
            <DashboardCard goal={goal} saved={savedAmount} onDeposit={() => setShowDeposit((v) => !v)} onWithdraw={() => setShowWithdraw((v) => !v)} />
            <div className="grid gap-3 md:grid-cols-2">
              {showDeposit && <TransactionForm type="deposit" currency={goal.currency} onSubmit={(payload) => addTransaction({ ...payload, goalId: goal.id, id: crypto.randomUUID() })} />}
              {showWithdraw && <TransactionForm type="withdraw" currency={goal.currency} onSubmit={(payload) => addTransaction({ ...payload, goalId: goal.id, id: crypto.randomUUID() })} />}
            </div>
            <Timeline transactions={transactions} currency={goal.currency} />
          </>
        )}

        {tab === 'settings' && <SettingsPage onOpenPrivacy={() => setTab('privacy')} onOpenTerms={() => setTab('terms')} />}
        {tab === 'privacy' && <PrivacyPolicyPage />}
        {tab === 'terms' && <TermsPage />}
      </div>
    </main>
  )
}
