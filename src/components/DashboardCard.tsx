import { formatCurrency, daysLeft, getPeriods } from '../lib/format'
import type { GoalType } from '../lib/types'

interface Props {
  goal: GoalType
  saved: number
  onDeposit: () => void
  onWithdraw: () => void
}

export const DashboardCard = ({ goal, saved, onDeposit, onWithdraw }: Props) => {
  const progress = Math.min(100, (saved / goal.targetAmount) * 100)
  const remaining = Math.max(0, goal.targetAmount - saved)
  const suggested = remaining / getPeriods('daily', goal.targetDate)
  return (
    <section className="space-y-4 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{goal.emoji}</span>
        <h2 className="text-lg font-semibold">{goal.title}</h2>
      </div>
      <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full rounded-full bg-primary-600 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-sm">{progress.toFixed(1)}% complete</p>
      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
        <p>Saved: {formatCurrency(saved, goal.currency)}</p>
        <p>Target: {formatCurrency(goal.targetAmount, goal.currency)}</p>
        <p>Remaining: {formatCurrency(remaining, goal.currency)}</p>
        <p>Days left: {daysLeft(goal.targetDate)}</p>
        <p>Suggested daily: {formatCurrency(suggested, goal.currency)}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onDeposit} className="btn">Add Saving</button>
        <button onClick={onWithdraw} className="btn-secondary">Withdraw</button>
      </div>
    </section>
  )
}
