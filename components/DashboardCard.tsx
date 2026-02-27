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
      className="space-y-5 rounded-3xl bg-white/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white/40 dark:border-slate-800/60 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl drop-shadow-sm">{goal.emoji}</span>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gold-600 to-gold-500 dark:from-gold-300 dark:to-white bg-clip-text text-transparent">{goal.title}</h2>
      </div>
      <ProgressBar value={progress} />
      <p className="text-sm font-semibold text-gold-600 dark:text-gold-400">{progress.toFixed(1)}%</p>

      <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
        <div className="rounded-2xl border border-gold-100/50 p-4 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/40 shadow-sm">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">{t('saved', language)}</p>
          <p className="font-bold text-lg text-gold-600 dark:text-gold-400">{formatCurrency(goal.savedAmount, goal.currency)}</p>
        </div>
        <div className="rounded-2xl border border-slate-100/50 p-4 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/40 shadow-sm">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">{t('target', language)}</p>
          <p className="font-bold text-lg text-slate-700 dark:text-slate-200">{formatCurrency(goal.targetAmount, goal.currency)}</p>
        </div>
        <div className="rounded-2xl border border-slate-100/50 p-4 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/40 shadow-sm">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">{t('remaining', language)}</p>
          <p className="font-bold text-lg text-slate-700 dark:text-slate-200">{formatCurrency(remaining, goal.currency)}</p>
        </div>
        <div className="rounded-2xl border border-slate-100/50 p-4 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/40 shadow-sm">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">{t('daysLeft', language)}</p>
          <p className="font-bold text-lg text-slate-700 dark:text-slate-200">{remainingDays(goal.targetDate)}</p>
        </div>
        <div className="rounded-2xl border border-slate-100/50 p-4 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/40 shadow-sm col-span-2 sm:col-span-1">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">{t('required', language)} ({t(goal.planType, language)})</p>
          <p className="font-bold text-lg text-slate-700 dark:text-slate-200">{formatCurrency(requiredPerPeriod(goal), goal.currency)}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pt-3">
        <button className="btn bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 dark:from-gold-600 dark:to-gold-500 dark:hover:from-gold-500 dark:hover:to-gold-400 dark:text-white shadow-lg text-white font-medium rounded-xl px-5 py-2.5" onClick={onDeposit}>{t('addSaving', language)}</button>
        <button className="btn-secondary dark:text-slate-200 dark:hover:bg-slate-800 px-5 py-2.5" onClick={onWithdraw}>{t('withdraw', language)}</button>
        <button className="btn-secondary dark:text-slate-200 dark:hover:bg-slate-800 px-5 py-2.5" onClick={onExport}>{t('exportPdf', language)}</button>
      </div>
    </motion.section>
  )
}
