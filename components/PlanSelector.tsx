'use client'

import { BadgeCheck } from 'lucide-react'
import { formatCurrency } from '@/lib/currencyFormatter'
import { requiredPerPeriod } from '@/lib/calculatePlan'
import type { Goal, PlanType } from '@/lib/types'

export const PlanSelector = ({ goal, onSelect }: { goal: Goal; onSelect: (plan: PlanType) => void }) => {
  const plans: PlanType[] = ['daily', 'weekly', 'monthly']

  return (
    <section className="rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
      <h2 className="text-xl font-semibold">Pick your plan</h2>
      <p className="mb-4 text-sm text-slate-500">Pick a saving that feels right for you. You can change it anytime.</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {plans.map((plan) => (
          <button key={plan} onClick={() => onSelect(plan)} className={`rounded-xl border p-3 text-left ${goal.planType === plan ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30' : 'border-slate-200 dark:border-slate-700'}`}>
            <p className="font-semibold capitalize">{plan}</p>
            <p className="text-sm text-slate-500">{formatCurrency(requiredPerPeriod(goal, plan), goal.currency)}</p>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 dark:bg-emerald-950/20">
        <p className="mb-2 flex items-center gap-2 font-semibold text-emerald-700"><BadgeCheck className="h-5 w-5" />My Savings Plan</p>
        <ul className="text-sm">
          <li>Target: {formatCurrency(goal.targetAmount, goal.currency)}</li>
          <li>Target Date: {new Date(goal.targetDate).toLocaleDateString()}</li>
          <li>Required saving ({goal.planType}): {formatCurrency(requiredPerPeriod(goal), goal.currency)}</li>
        </ul>
      </div>
    </section>
  )
}
