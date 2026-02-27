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
                            className={`flex min-w-[200px] flex-col items-start justify-center gap-2 rounded-[2rem] border-2 p-5 text-left transition-all duration-300 ${isActive
                                ? 'border-hk-400 bg-gradient-to-br from-hk-50 to-white ring-4 ring-hk-200 shadow-[0_8px_30px_rgb(236,72,153,0.15)] dark:border-pink-900 dark:from-pink-950/60 dark:to-slate-900 dark:ring-pink-900/50 transform scale-105'
                                : 'border-hk-100 bg-white/70 hover:border-hk-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-pink-900 opacity-70 hover:opacity-100 shadow-sm'
                                }`}
                        >
                            <div className="flex w-full items-center justify-between">
                                <span className="text-4xl drop-shadow-sm">{g.emoji}</span>
                                {isActive && (
                                    <span className="flex h-3 w-3 rounded-full bg-hk-500 shadow-[0_0_10px_rgba(244,114,182,0.8)]" />
                                )}
                            </div>
                            <div className="mt-2">
                                <p className={`font-extrabold text-lg ${isActive ? 'text-hk-600 dark:text-hk-300' : 'text-slate-700 dark:text-slate-200'}`}>
                                    {g.title}
                                </p>
                                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
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
