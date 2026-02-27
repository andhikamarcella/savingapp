'use client'

import { BadgeCheck } from 'lucide-react'
import { formatCurrency } from '@/lib/currencyFormatter'
import { requiredPerPeriod } from '@/lib/calculatePlan'
import type { Goal, PlanType } from '@/lib/types'
import { useSavingsStore } from '@/store/useSavingsStore'
import { t } from '@/lib/i18n'

export const PlanSelector = ({ goal, onSelect }: { goal: Goal; onSelect: (plan: PlanType) => void }) => {
  const language = useSavingsStore((s) => s.language)
  const plans: PlanType[] = ['daily', 'weekly', 'monthly']

  return (
    <section className="rounded-3xl bg-white/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white/40 dark:border-slate-800/60 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">{t('pickPlan', language)}</h2>
      <p className="mb-5 text-sm text-slate-500 dark:text-slate-400 mt-1">{t('pickPlanDesc', language)}</p>

      <div className="grid gap-3 sm:grid-cols-3">
        {plans.map((plan) => (
          <button
            key={plan}
            onClick={() => onSelect(plan)}
            className={`rounded-2xl border p-4 text-left transition-all ${goal.planType === plan
                ? 'border-gold-400 bg-gradient-to-br from-gold-50/80 to-gold-100/80 ring-2 ring-gold-400/30 shadow-md transform scale-[1.02] dark:border-gold-500/50 dark:from-gold-900/60 dark:to-gold-900/20 dark:ring-gold-500/30'
                : 'border-slate-200 bg-white/50 hover:border-gold-300 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-gold-700/50 opacity-90 hover:opacity-100 shadow-sm'
              }`}
          >
            <p className={`font-bold capitalize text-lg ${goal.planType === plan ? 'text-gold-700 dark:text-gold-300' : 'text-slate-700 dark:text-slate-200'}`}>
              {t(plan, language)}
            </p>
            <p className={`text-sm font-medium mt-1 ${goal.planType === plan ? 'text-gold-600 dark:text-gold-400' : 'text-slate-500 dark:text-slate-400'}`}>
              {formatCurrency(requiredPerPeriod(goal, plan), goal.currency)}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-gold-200/50 bg-gradient-to-r from-white to-gold-50/50 p-5 dark:border-gold-900/30 dark:from-slate-800/50 dark:to-slate-800/30 shadow-sm">
        <p className="mb-3 flex items-center gap-2 font-bold text-lg text-gold-600 dark:text-gold-400">
          <BadgeCheck className="h-6 w-6" />{t('mySavingsPlan', language)}
        </p>
        <ul className="text-sm space-y-2 font-medium">
          <li className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t('target', language)}</span>
            <span className="text-slate-800 dark:text-slate-200">{formatCurrency(goal.targetAmount, goal.currency)}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">{t('targetDate', language)}</span>
            <span className="text-slate-800 dark:text-slate-200">{new Date(goal.targetDate).toLocaleDateString()}</span>
          </li>
          <li className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400">{t('required', language)} ({t(goal.planType, language)})</span>
            <span className="text-slate-800 dark:text-slate-200 text-base font-bold">{formatCurrency(requiredPerPeriod(goal), goal.currency)}</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
