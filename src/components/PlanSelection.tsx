import { BadgeCheck } from 'lucide-react'
import { getPeriods, formatCurrency } from '../lib/format'
import type { GoalType, PlanType } from '../lib/types'

interface Props {
  goal: GoalType
  onSelect: (plan: PlanType) => void
}

export const PlanSelection = ({ goal, onSelect }: Props) => {
  const plans: PlanType[] = ['daily', 'weekly', 'monthly']
  return (
    <section className="space-y-4 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
      <h2 className="text-xl font-semibold">Pick your plan</h2>
      <p className="text-sm text-slate-500">Pick a saving that feels right for you. You can change it anytime.</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {plans.map((plan) => {
          const amount = goal.targetAmount / getPeriods(plan, goal.targetDate)
          return (
            <button key={plan} onClick={() => onSelect(plan)} className="rounded-xl border border-slate-200 p-3 text-left transition hover:border-primary-500 dark:border-slate-700">
              <p className="font-semibold capitalize">{plan}</p>
              <p className="text-sm text-slate-500">{formatCurrency(amount, goal.currency)}</p>
            </button>
          )
        })}
      </div>
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 dark:bg-emerald-950/20">
        <p className="mb-2 flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400"><BadgeCheck className="h-5 w-5"/>My Savings Plan</p>
        <ul className="space-y-1 text-sm">
          <li>Total Target: {formatCurrency(goal.targetAmount, goal.currency)}</li>
          <li>Target Date: {new Date(goal.targetDate).toLocaleDateString()}</li>
          <li>Required {goal.planType}: {formatCurrency(goal.targetAmount / getPeriods(goal.planType, goal.targetDate), goal.currency)}</li>
        </ul>
      </div>
    </section>
  )
}
