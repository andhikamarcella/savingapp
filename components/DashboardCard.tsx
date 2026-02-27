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
      className="space-y-6"
    >
      <div className="flex items-center gap-4 bg-white/80 dark:bg-slate-900/80 p-6 rounded-3xl shadow-sm border border-hk-100 dark:border-pink-900/50 backdrop-blur-xl">
        <span className="text-5xl drop-shadow-sm">{goal.emoji}</span>
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-hk-600 to-hk-400 dark:from-hk-300 dark:to-white bg-clip-text text-transparent">{goal.title}</h2>
          <div className="mt-3">
            <ProgressBar value={progress} />
            <p className="text-sm font-bold text-hk-600 dark:text-hk-400 mt-1">{progress.toFixed(1)}% Completed</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 auto-rows-min">
        {/* Bento Item 1: Saved Amount (Large) */}
        <div className="col-span-2 row-span-2 rounded-[2rem] border-2 border-hk-200/50 p-6 bg-gradient-to-br from-hk-50 to-white dark:from-slate-800/80 dark:to-slate-900/60 dark:border-pink-900/[0.15] shadow-sm flex flex-col justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-bold uppercase tracking-wider">{t('saved', language)}</p>
          <p className="font-extrabold text-4xl sm:text-5xl text-hk-600 dark:text-hk-400 tabular-nums break-words">{formatCurrency(goal.savedAmount, goal.currency)}</p>
        </div>

        {/* Bento Item 2: Target Amount */}
        <div className="col-span-2 sm:col-span-2 rounded-[2rem] border border-slate-100/80 p-5 bg-white/70 dark:bg-slate-800/40 dark:border-slate-700/50 shadow-sm flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">{t('target', language)}</p>
          <p className="font-bold text-xl text-slate-800 dark:text-slate-200">{formatCurrency(goal.targetAmount, goal.currency)}</p>
        </div>

        {/* Bento Item 3: Remaining */}
        <div className="col-span-1 border border-slate-100/80 rounded-3xl p-5 bg-white/70 dark:bg-slate-800/40 dark:border-slate-700/50 shadow-sm flex flex-col justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-bold">{t('remaining', language)}</p>
          <p className="font-bold text-lg sm:text-xl text-slate-700 dark:text-slate-200">{formatCurrency(remaining, goal.currency)}</p>
        </div>

        {/* Bento Item 4: Days Left */}
        <div className="col-span-1 border border-slate-100/80 rounded-3xl p-5 bg-white/70 dark:bg-slate-800/40 dark:border-slate-700/50 shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-hk-100 dark:bg-pink-900/30 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-bold relative z-10">{t('daysLeft', language)}</p>
          <p className="font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 relative z-10">{remainingDays(goal.targetDate)}</p>
        </div>

        {/* Bento Item 5: Required Plan */}
        <div className="col-span-2 sm:col-span-4 rounded-3xl border border-hk-100/60 p-5 bg-white/60 dark:bg-slate-800/50 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-hk-200/50 flex items-center justify-center text-hk-600 dark:bg-pink-900/40 dark:text-hk-300">
              🗓️
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">{t('required', language)} ({t(goal.planType, language)})</p>
              <p className="font-bold text-lg text-slate-800 dark:text-slate-200">{formatCurrency(requiredPerPeriod(goal), goal.currency)}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn w-12 h-12 flex items-center justify-center p-0 rounded-full shadow-lg" onClick={onDeposit} aria-label="Deposit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            </button>
            <button className="btn-secondary w-12 h-12 flex items-center justify-center p-0 rounded-full border-2" onClick={onWithdraw} aria-label="Withdraw">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-2">
        <button className="text-xs font-bold text-slate-400 hover:text-hk-500 transition-colors uppercase tracking-widest flex items-center gap-1" onClick={onExport}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          {t('exportPdf', language)}
        </button>
      </div>
    </motion.section>
  )
}
