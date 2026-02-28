'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/currencyFormatter'
import type { Goal } from '@/lib/types'
import { useSavingsStore } from '@/store/useSavingsStore'

export const TotalSavingsCard = ({ goals }: { goals: Goal[] }) => {
    const language = useSavingsStore((s) => s.language)

    const totals = useMemo(() => {
        const map = new Map<string, number>()
        for (const g of goals) {
            if (!g.archived) {
                const current = map.get(g.currency) || 0
                map.set(g.currency, current + g.savedAmount)
            }
        }
        return Array.from(map.entries())
    }, [goals])

    if (totals.length === 0) return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-gradient-to-br from-hk-500 to-hk-400 p-6 sm:p-8 shadow-[0_8px_30px_rgb(236,72,153,0.2)] text-white dark:from-pink-900/80 dark:to-pink-950/80 dark:border dark:border-pink-800/50 overflow-hidden relative"
        >
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <p className="text-sm font-bold text-white/90 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {language === 'id' ? 'Total Tabungan Aktif' : 'Total Active Savings'}
                    </p>
                    <div className="flex flex-col gap-2">
                        {totals.map(([currency, amount]) => (
                            <h2 key={currency} className="text-4xl sm:text-5xl font-extrabold drop-shadow-md tracking-tight">
                                {formatCurrency(amount, currency as any)}
                            </h2>
                        ))}
                    </div>
                </div>
                <div className="text-5xl sm:text-6xl drop-shadow-xl opacity-90 group-hover:scale-110 transition-transform hidden sm:block">
                    💎
                </div>
            </div>
        </motion.div>
    )
}
