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
              ? 'border-hk-400 bg-gradient-to-br from-hk-50/80 to-hk-100/80 ring-4 ring-hk-200 shadow-[0_8px_30px_rgb(236,72,153,0.15)] transform scale-[1.02] dark:border-pink-900/50 dark:from-pink-950/60 dark:to-pink-900/20 dark:ring-pink-900/50'
              : 'border-slate-200 bg-white/50 hover:border-hk-300 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-pink-900 opacity-90 hover:opacity-100 shadow-sm'
              }`}
          >
            <p className={`font-bold capitalize text-lg ${goal.planType === plan ? 'text-hk-600 dark:text-hk-300' : 'text-slate-700 dark:text-slate-200'}`}>
              {t(plan, language)}
            </p>
            <p className={`text-sm font-medium mt-1 ${goal.planType === plan ? 'text-hk-500 dark:text-hk-400' : 'text-slate-500 dark:text-slate-400'}`}>
              {formatCurrency(requiredPerPeriod(goal, plan), goal.currency)} / {t(plan, language)}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-hk-200/50 bg-gradient-to-r from-white to-hk-50/50 p-5 dark:border-pink-900/30 dark:from-slate-800/50 dark:to-slate-800/30 shadow-sm">
        <p className="mb-3 flex items-center gap-2 font-bold text-lg text-hk-600 dark:text-hk-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
          {t('mySavingsPlan', language)}
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
