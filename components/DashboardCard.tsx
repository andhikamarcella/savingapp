'use client'

import { formatCurrency } from '@/lib/currencyFormatter'
import { remainingDays, requiredPerPeriod } from '@/lib/calculatePlan'
import { ProgressBar } from './ProgressBar'
import type { Goal } from '@/lib/types'
import { motion } from 'framer-motion'
import { useSavingsStore } from '@/store/useSavingsStore'
import { t } from '@/lib/i18n'

export const DashboardCard = ({ goal, onDeposit, onWithdraw, onExport }: { goal: Goal; onDeposit: () => void; onWithdraw: () => void; onExport: () => void }) => {
  const language = useSavingsStore((s) => s.language)
  const progress = Math.min(100, (goal.savedAmount / goal.targetAmount) * 100)
  const remaining = Math.max(0, goal.targetAmount - goal.savedAmount)

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-4 rounded-3xl bg-white/80 p-5 shadow-soft backdrop-blur-md dark:bg-slate-900/80"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl drop-shadow-sm">{goal.emoji}</span>
        <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">{goal.title}</h2>
      </div>
      <ProgressBar value={progress} />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{progress.toFixed(1)}%</p>
      <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/20">
          <p className="text-xs text-slate-500 mb-1">{t('saved', language)}</p>
          <p className="font-semibold text-emerald-600">{formatCurrency(goal.savedAmount, goal.currency)}</p>
        </div>
        <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/20">
          <p className="text-xs text-slate-500 mb-1">{t('target', language)}</p>
          <p className="font-semibold">{formatCurrency(goal.targetAmount, goal.currency)}</p>
        </div>
        <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/20">
          <p className="text-xs text-slate-500 mb-1">{t('remaining', language)}</p>
          <p className="font-semibold">{formatCurrency(remaining, goal.currency)}</p>
        </div>
        <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/20">
          <p className="text-xs text-slate-500 mb-1">{t('daysLeft', language)}</p>
          <p className="font-semibold">{remainingDays(goal.targetDate)}</p>
        </div>
        <div className="rounded-xl border border-slate-100 p-3 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/20 col-span-2 sm:col-span-1">
          <p className="text-xs text-slate-500 mb-1">{t('required', language)} ({t(goal.planType, language)})</p>
          <p className="font-semibold">{formatCurrency(requiredPerPeriod(goal), goal.currency)}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        <button className="btn" onClick={onDeposit}>{t('addSaving', language)}</button>
        <button className="btn-secondary" onClick={onWithdraw}>{t('withdraw', language)}</button>
        <button className="btn-secondary" onClick={onExport}>{t('exportPdf', language)}</button>
      </div>
    </motion.section>
  )
}
