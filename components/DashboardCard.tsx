'use client'

import { formatCurrency } from '@/lib/currencyFormatter'
import { remainingDays, requiredPerPeriod } from '@/lib/calculatePlan'
import { ProgressBar } from './ProgressBar'
import type { Goal } from '@/lib/types'

export const DashboardCard = ({ goal, onDeposit, onWithdraw, onExport }: { goal: Goal; onDeposit: () => void; onWithdraw: () => void; onExport: () => void }) => {
  const progress = Math.min(100, (goal.savedAmount / goal.targetAmount) * 100)
  const remaining = Math.max(0, goal.targetAmount - goal.savedAmount)

  return (
    <section className="space-y-4 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{goal.emoji}</span>
        <h2 className="text-lg font-semibold">{goal.title}</h2>
      </div>
      <ProgressBar value={progress} />
      <p className="text-sm">{progress.toFixed(1)}%</p>
      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
        <p>Saved: {formatCurrency(goal.savedAmount, goal.currency)}</p>
        <p>Target: {formatCurrency(goal.targetAmount, goal.currency)}</p>
        <p>Remaining: {formatCurrency(remaining, goal.currency)}</p>
        <p>Days left: {remainingDays(goal.targetDate)}</p>
        <p>Required ({goal.planType}): {formatCurrency(requiredPerPeriod(goal), goal.currency)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="btn" onClick={onDeposit}>Add Saving</button>
        <button className="btn-secondary" onClick={onWithdraw}>Withdraw</button>
        <button className="btn-secondary" onClick={onExport}>Export PDF</button>
      </div>
    </section>
  )
}
