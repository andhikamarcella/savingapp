'use client'

import { motion } from 'framer-motion'
import type { Goal } from '@/lib/types'
import { useSavingsStore } from '@/store/useSavingsStore'
import { formatCurrency } from '@/lib/currencyFormatter'

export const GoalCarousel = ({ goals, activeId }: { goals: Goal[]; activeId: string }) => {
    const setActiveGoalId = useSavingsStore((s) => s.setActiveGoalId)

    if (goals.length <= 1) return null

    return (
        <div className="w-full overflow-x-auto pb-4 pt-2 hide-scrollbar">
            <div className="flex gap-4 px-1" style={{ width: 'max-content' }}>
                {goals.map((g) => {
                    const isActive = g.id === activeId
                    return (
                        <motion.button
                            key={g.id}
                            onClick={() => setActiveGoalId(g.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex min-w-[200px] flex-col items-start justify-center gap-2 rounded-2xl border p-4 text-left transition-all ${isActive
                                    ? 'border-gold-400 bg-gradient-to-br from-gold-50/80 to-gold-100/80 ring-2 ring-gold-400/30 shadow-md dark:border-gold-500/50 dark:from-gold-900/60 dark:to-gold-900/20 dark:ring-gold-500/30'
                                    : 'border-slate-200 bg-white/50 hover:border-gold-300 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-gold-700/50 opacity-80 hover:opacity-100 shadow-sm'
                                }`}
                        >
                            <div className="flex w-full items-center justify-between">
                                <span className="text-3xl drop-shadow-sm">{g.emoji}</span>
                                {isActive && (
                                    <span className="flex h-2.5 w-2.5 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(217,148,36,0.8)]" />
                                )}
                            </div>
                            <div>
                                <p className={`font-bold ${isActive ? 'text-gold-700 dark:text-gold-300' : 'text-slate-700 dark:text-slate-200'}`}>
                                    {g.title}
                                </p>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    {formatCurrency(g.savedAmount, g.currency)}
                                </p>
                            </div>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
